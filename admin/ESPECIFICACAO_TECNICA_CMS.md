# ESPECIFICAÇÃO TÉCNICA - CMS MURAYAMA

## Arquitetura, Banco de Dados e Integração

---

## 1. ARQUITETURA GERAL

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENTE (Browser)                        │
│                  ┌─────────────────────────────┐                 │
│                  │  Painel Admin (React 18)    │                 │
│                  │  - Autenticação             │                 │
│                  │  - CRUD Interfaces          │                 │
│                  │  - Upload de arquivos       │                 │
│                  │  - Visualização de logs     │                 │
│                  └────────────┬────────────────┘                 │
└─────────────────────────────────┼────────────────────────────────┘
                                  │
                    ┌─────────────┴──────────────┐
                    │      HTTPS / JWT           │
                    ▼                            ▼
         ┌──────────────────────┐    ┌─────────────────────┐
         │  API Backend         │    │  Upload Storage     │
         │  (Express.js)        │    │  (S3/Vercel Blob)   │
         │                      │    │                     │
         │  - Autenticação      │    │  - Imagens obras    │
         │  - REST Endpoints    │    │  - Logos parceiros  │
         │  - Validação dados   │    │  - Arquivos upload  │
         │  - Logs de auditoria │    │                     │
         └──────────┬───────────┘    └─────────────────────┘
                    │
        ┌───────────┴────────────┐
        ▼                        ▼
    ┌─────────────┐      ┌──────────────┐
    │  PostgreSQL │      │  Redis Cache │
    │  Database   │      │  (opcional)  │
    │             │      │              │
    │ - Users     │      └──────────────┘
    │ - Works     │
    │ - Services  │
    │ - Partners  │
    │ - Audit Logs│
    │ - Sessions  │
    └─────────────┘
```

---

## 2. ESTRUTURA DE BANCO DE DADOS

### 2.1 Tabela: `users`

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('master', 'admin') NOT NULL DEFAULT 'admin',
  status ENUM('active', 'inactive', 'suspended') NOT NULL DEFAULT 'active',
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),
  deleted_at TIMESTAMP NULL, -- Soft delete

  INDEXES:
    - idx_email
    - idx_role
    - idx_status
);
```

---

### 2.2 Tabela: `constructions` (Obras)

```sql
CREATE TABLE constructions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  location VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  description_full TEXT,
  client VARCHAR(255),
  conclusion_year INTEGER,
  area VARCHAR(50), -- ex: "1.200 m²"
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  featured BOOLEAN DEFAULT false, -- Destaque
  order_index INTEGER, -- Para reordenação
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),
  deleted_at TIMESTAMP NULL,

  INDEXES:
    - idx_slug
    - idx_category
    - idx_status
    - idx_created_at
    - UNIQUE(category, order_index) -- Por categoria
);
```

---

### 2.3 Tabela: `construction_services` (Serviços de cada obra)

```sql
CREATE TABLE construction_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  construction_id UUID NOT NULL REFERENCES constructions(id) ON DELETE CASCADE,
  service_name VARCHAR(100) NOT NULL, -- "Projeto", "Gerenciamento", etc

  UNIQUE(construction_id, service_name)
);
```

---

### 2.4 Tabela: `construction_images` (Galeria)

```sql
CREATE TABLE construction_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  construction_id UUID NOT NULL REFERENCES constructions(id) ON DELETE CASCADE,
  url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(255),
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEXES:
    - idx_construction_id
    - idx_order_index
);
```

---

### 2.5 Tabela: `services` (Serviços globais)

```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(50) UNIQUE NOT NULL, -- "gestao", "arquitetonico", etc
  category VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description_short TEXT NOT NULL,
  description_full TEXT NOT NULL,
  icon_name VARCHAR(100), -- Nome do ícone Lucide
  image_url VARCHAR(500),
  cta_text VARCHAR(100),
  cta_action VARCHAR(255),
  status ENUM('active', 'inactive') DEFAULT 'active',
  order_index INTEGER,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by UUID REFERENCES users(id),

  INDEXES:
    - idx_key
    - idx_order_index
);
```

---

### 2.6 Tabela: `service_items` (Itens de cada serviço)

```sql
CREATE TABLE service_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  item_text VARCHAR(255) NOT NULL,
  order_index INTEGER,

  INDEXES:
    - idx_service_id
);
```

---

### 2.7 Tabela: `testimonials` (Depoimentos)

```sql
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author VARCHAR(255) NOT NULL,
  testimonial TEXT NOT NULL,
  date_received DATE,
  status ENUM('active', 'inactive', 'pending_review') DEFAULT 'pending_review',
  order_index INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),

  INDEXES:
    - idx_status
    - idx_order_index
    - idx_created_at
);
```

---

### 2.8 Tabela: `partners` (Parceiros)

```sql
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  logo_url VARCHAR(500),
  external_link VARCHAR(500),
  status ENUM('active', 'inactive') DEFAULT 'active',
  order_index INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),

  INDEXES:
    - idx_status
    - idx_order_index
);
```

---

### 2.9 Tabela: `contacts` (Informações de contato)

```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_primary VARCHAR(20),
  phone_whatsapp VARCHAR(20),
  email_primary VARCHAR(255),
  address_street VARCHAR(255),
  address_neighborhood VARCHAR(100),
  address_city VARCHAR(100),
  address_state CHAR(2),
  address_zip VARCHAR(10),
  social_facebook VARCHAR(255),
  social_instagram VARCHAR(255),
  social_linkedin VARCHAR(255),
  whatsapp_message TEXT,
  business_hours_open TIME,
  business_hours_close TIME,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by UUID REFERENCES users(id)
);
```

---

### 2.10 Tabela: `pages` (Conteúdo de páginas)

```sql
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) UNIQUE NOT NULL, -- "about", "faq", "terms", etc
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  meta_title VARCHAR(255),
  meta_description VARCHAR(500),
  meta_keywords VARCHAR(500),
  status ENUM('published', 'draft') DEFAULT 'draft',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by UUID REFERENCES users(id),

  INDEXES:
    - idx_slug
    - idx_status
);
```

---

### 2.11 Tabela: `audit_logs` (Auditoria)

```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(50) NOT NULL, -- "create", "update", "delete", "login", etc
  resource_type VARCHAR(50) NOT NULL, -- "construction", "partner", etc
  resource_id UUID,
  changes JSONB, -- { "field": { "from": old_value, "to": new_value } }
  ip_address VARCHAR(45),
  user_agent VARCHAR(500),
  status ENUM('success', 'failure') DEFAULT 'success',
  error_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEXES:
    - idx_user_id
    - idx_created_at
    - idx_resource_type
    - idx_action
);
```

---

### 2.12 Tabela: `sessions` (Sessões JWT)

```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  refresh_token VARCHAR(500) NOT NULL UNIQUE,
  ip_address VARCHAR(45),
  user_agent VARCHAR(500),
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEXES:
    - idx_user_id
    - idx_expires_at
);
```

---

## 3. ESTRUTURA DE ENDPOINTS (API REST)

### 3.1 Autenticação

```
POST   /api/auth/register          - Registro (apenas convite Master)
POST   /api/auth/login             - Login
POST   /api/auth/logout            - Logout
POST   /api/auth/refresh           - Refresh token
POST   /api/auth/forgot-password   - Solicitar reset de senha
POST   /api/auth/reset-password    - Reset de senha
GET    /api/auth/me                - Info do usuário logado
```

### 3.2 Obras (Constructions)

```
GET    /api/constructions                    - Listar (com filtros)
GET    /api/constructions/:id                - Detalhe
GET    /api/constructions/:slug              - Por slug
POST   /api/constructions                    - Criar
PUT    /api/constructions/:id                - Editar
DELETE /api/constructions/:id                - Soft delete
PATCH  /api/constructions/:id/status         - Alterar status
PATCH  /api/constructions/:id/reorder        - Reordenar
POST   /api/constructions/:id/images         - Upload de imagem
DELETE /api/constructions/:id/images/:imgId  - Remover imagem
PATCH  /api/constructions/:id/images/reorder - Reordenar galeria
```

### 3.3 Serviços

```
GET    /api/services                - Listar
GET    /api/services/:id            - Detalhe
PUT    /api/services/:id            - Editar
PATCH  /api/services/reorder        - Reordenar
PATCH  /api/services/:id/status     - Ativar/Desativar
```

### 3.4 Depoimentos

```
GET    /api/testimonials            - Listar
POST   /api/testimonials            - Criar
PUT    /api/testimonials/:id        - Editar
DELETE /api/testimonials/:id        - Deletar
PATCH  /api/testimonials/:id/status - Ativar/Desativar
PATCH  /api/testimonials/reorder    - Reordenar
```

### 3.5 Parceiros

```
GET    /api/partners                - Listar
POST   /api/partners                - Criar
PUT    /api/partners/:id            - Editar
DELETE /api/partners/:id            - Deletar (soft)
PATCH  /api/partners/:id/logo       - Upload de logo
PATCH  /api/partners/reorder        - Reordenar
```

### 3.6 Contatos

```
GET    /api/contacts                - Info de contato
PUT    /api/contacts                - Editar
```

### 3.7 Páginas

```
GET    /api/pages/:slug             - Conteúdo de página
PUT    /api/pages/:slug             - Editar página
```

### 3.8 Usuários (Master only)

```
GET    /api/users                   - Listar usuários
POST   /api/users                   - Criar novo usuário
PUT    /api/users/:id               - Editar usuário
DELETE /api/users/:id               - Deletar usuário (soft)
PATCH  /api/users/:id/password      - Resetar senha
PATCH  /api/users/:id/role          - Alterar perfil
GET    /api/users/:id/activity      - Atividades do usuário
```

### 3.9 Auditoria

```
GET    /api/audit-logs              - Listar logs
GET    /api/audit-logs/:id          - Detalhe de log
GET    /api/audit-logs/user/:userId - Logs por usuário
```

### 3.10 Upload

```
POST   /api/upload                  - Upload genérico
GET    /api/upload/presigned-url    - URL assinada (para upload direto S3)
```

---

## 4. EXEMPLO: FLUXO DE CRIAR OBRA

```
┌────────────────────────────────────────────────────────────────┐
│ 1. User clica "Adicionar Nova Obra"                            │
└────────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────────┐
│ 2. Frontend abre formulário (React Hook Form)                  │
│    - Valida campos obrigatórios (client-side)                  │
│    - Valida arquivo de imagem                                  │
└────────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────────┐
│ 3. User preenche:                                              │
│    - Título, localização, cliente, ano conclusão              │
│    - Descrição, categoria, serviços                            │
│    - Upload múltiplas imagens                                  │
└────────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────────┐
│ 4. Frontend POST /api/constructions                            │
│    {                                                            │
│      "title": "Clínica Nova",                                  │
│      "location": "Botucatu, SP",                               │
│      "category": "comercial",                                  │
│      "description": "...",                                     │
│      "client": "Dr. João",                                     │
│      "conclusion_year": 2026,                                  │
│      "services": ["Projeto", "Gerenciamento"],                │
│      "images": [url1, url2, ...] -- URLs do upload             │
│    }                                                            │
└────────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────────┐
│ 5. Backend valida:                                             │
│    - Token JWT (autenticação)                                  │
│    - Permissões (role do user)                                 │
│    - Dados obrigatórios (Zod schema)                           │
│    - Slug único                                                │
└────────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────────┐
│ 6. Salva no banco:                                             │
│    - INSERT em constructions                                   │
│    - INSERT em construction_images (por imagem)                │
│    - INSERT em construction_services (por serviço)             │
│    - INSERT em audit_logs (quem, quando, o quê)                │
└────────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────────┐
│ 7. Retorna:                                                    │
│    {                                                            │
│      "id": "uuid-xxx",                                         │
│      "title": "Clínica Nova",                                  │
│      "slug": "clinica-nova-uuid",                              │
│      "status": "draft",                                        │
│      "images": [...],                                          │
│      "created_at": "2026-05-05T14:30:00Z"                      │
│    }                                                            │
└────────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────────┐
│ 8. Frontend mostra confirmação:                                │
│    "Obra criada com sucesso! Publicar agora?"                  │
└────────────────────────────────────────────────────────────────┘
```

---

## 5. AUTENTICAÇÃO E SEGURANÇA

### 5.1 Flow de Login

```
1. User insere email + senha
2. Frontend POST /api/auth/login
3. Backend:
   - Busca usuário por email
   - Compara senha com hash (bcrypt.compare)
   - Se inválido: retorna 401 Unauthorized
   - Se válido:
     a. Gera JWT (acess_token, 15min)
     b. Gera Refresh Token (armazena em sessions)
     c. Registra login em audit_logs
4. Frontend:
   - Armazena access_token em memória
   - Armazena refresh_token em httpOnly cookie
   - Redireciona para dashboard
5. Requisições subsequentes:
   - Frontend envia Authorization: Bearer {access_token}
   - Backend verifica JWT
   - Se expirado: usa refresh_token para novo access_token
```

### 5.2 Hashing de Senha

```
Requisito: bcrypt com salt rounds = 12
Exemplo:
  Senha: "MinhaSenha123!"
  Hash armazenado: $2b$12$abcdef... (nunca armazenar senha pura)
```

### 5.3 Headers de Segurança

```
Helmet.js configurado com:
  - Content-Security-Policy (CSP)
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - Strict-Transport-Security (HSTS)
  - X-XSS-Protection
```

### 5.4 Rate Limiting

```
- Login: máx 5 tentativas em 15 minutos (por IP)
- API geral: máx 100 requisições/minuto por usuário
- Upload: máx 50MB por arquivo
```

---

## 6. ESTRATÉGIA DE UPLOAD DE ARQUIVOS

### 6.1 Fluxo com S3/Vercel Blob

```
Frontend                          Backend                   Storage
   ↓                                 ↓                         ↓
[User seleciona imagem]
   ↓
[Valida: tipo, tamanho]
   ↓
POST /api/upload/presigned-url ─→ [Gera URL assinada]
   ↓                               ↓
[Recebe URL]                       S3/Blob
   ↓                               ↓
[Upload direto para S3]  ────────→ [Armazena]
   ↓
[Callback: POST /api/constructions/upload-complete]
   ↓
Backend:
   - Verifica upload completo
   - Gera thumbnail (opcional)
   - Salva URL em construction_images
   - Retorna: { id, url, thumb_url }
   ↓
Frontend atualiza preview
```

### 6.2 Validação

```javascript
// Frontend
const allowedMimes = ["image/jpeg", "image/png", "image/webp"];
const maxSize = 10 * 1024 * 1024; // 10MB

// Backend
if (!allowedMimes.includes(file.mimetype)) throw Error("Invalid");
if (file.size > maxSize) throw Error("Too large");
```

---

## 7. ESTRUTURA DE PASTAS (Projeto Node.js)

```
backend/
├── src/
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   ├── auditLog.ts
│   │   └── validation.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── constructions.routes.ts
│   │   ├── services.routes.ts
│   │   ├── partners.routes.ts
│   │   ├── testimonials.routes.ts
│   │   ├── users.routes.ts
│   │   ├── pages.routes.ts
│   │   └── upload.routes.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── constructionController.ts
│   │   ├── serviceController.ts
│   │   └── ...
│   ├── services/
│   │   ├── authService.ts
│   │   ├── constructionService.ts
│   │   ├── uploadService.ts
│   │   └── ...
│   ├── models/
│   │   ├── User.ts
│   │   ├── Construction.ts
│   │   └── ...
│   ├── schemas/
│   │   ├── construction.schema.ts (Zod)
│   │   ├── user.schema.ts
│   │   └── ...
│   ├── utils/
│   │   ├── jwt.ts
│   │   ├── email.ts
│   │   └── ...
│   ├── config/
│   │   ├── database.ts
│   │   ├── s3.ts
│   │   └── env.ts
│   ├── app.ts
│   └── server.ts
├── prisma/
│   └── schema.prisma (ORM)
├── .env.example
├── docker-compose.yml (PostgreSQL local)
└── package.json
```

---

## 8. VARIÁVEIS DE AMBIENTE (.env)

```bash
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/murayama_cms

# JWT
JWT_SECRET=sua-chave-super-secreta-aqui
JWT_REFRESH_SECRET=outra-chave-secreta
JWT_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Upload
AWS_S3_REGION=sa-east-1
AWS_S3_BUCKET=murayama-cms-uploads
AWS_ACCESS_KEY_ID=xxxxx
AWS_SECRET_ACCESS_KEY=xxxxx

# Email (para password reset)
SMTP_HOST=smtp.seu-email.com
SMTP_PORT=587
SMTP_USER=noreply@murayamaengenharia.com.br
SMTP_PASS=xxxxx

# App
NODE_ENV=production
FRONTEND_URL=https://painel.murayamaengenharia.com.br
BACKEND_URL=https://api.murayamaengenharia.com.br
PORT=3000

# Monitoring
SENTRY_DSN=xxxxx
```

---

## 9. DEPENDÊNCIAS PRINCIPAIS

### Backend

```json
{
  "express": "^4.18.2",
  "prisma": "^5.0.0",
  "@prisma/client": "^5.0.0",
  "jsonwebtoken": "^9.0.0",
  "bcryptjs": "^2.4.3",
  "zod": "^3.22.0",
  "helmet": "^7.0.0",
  "express-ratelimit": "^6.10.0",
  "multer": "^1.4.5",
  "aws-sdk": "^2.1400.0",
  "dotenv": "^16.3.1",
  "tsx": "^3.13.0"
}
```

### Frontend

```json
{
  "react": "^18.3.1",
  "react-router-dom": "^7.10.1",
  "react-hook-form": "^7.47.0",
  "axios": "^1.5.0",
  "zustand": "^4.4.0",
  "shadcn/ui": "latest",
  "@radix-ui/react-dialog": "^1.1.1",
  "framer-motion": "^12.23.26",
  "lucide-react": "^0.561.0",
  "zod": "^3.22.0"
}
```

---

## 10. TESTES

### Testes Unitários (Jest)

```typescript
// Exemplo: authService.test.ts
describe("AuthService", () => {
  it("deve fazer hash da senha com bcrypt", async () => {
    const password = "MyPassword123!";
    const hash = await hashPassword(password);
    expect(await comparePassword(password, hash)).toBe(true);
  });

  it("deve gerar JWT válido", () => {
    const token = generateJWT({ userId: "123", role: "admin" });
    const decoded = verifyJWT(token);
    expect(decoded.userId).toBe("123");
  });
});
```

### Testes de Integração

```typescript
// Exemplo: constructions.test.ts
describe("POST /api/constructions", () => {
  it("deve criar obra com permissão admin", async () => {
    const res = await request(app)
      .post("/api/constructions")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ title: "Nova Obra", ... });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  it("deve rejeitar sem permissão", async () => {
    const res = await request(app)
      .post("/api/constructions")
      .send({ title: "Nova Obra", ... });

    expect(res.status).toBe(401);
  });
});
```

---

## 11. DEPLOYMENT

### Docker (Backend)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### Docker Compose (Local)

```yaml
version: "3.8"
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: murayama_cms
      POSTGRES_PASSWORD: senha_local
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://postgres:senha_local@postgres:5432/murayama_cms
    depends_on:
      - postgres

volumes:
  postgres_data:
```

### Deploy (Vercel)

```json
// vercel.json
{
  "builds": [{ "src": "api/index.ts", "use": "@vercel/node" }],
  "routes": [{ "src": "/api/(.*)", "dest": "/api" }]
}
```

---

## 12. MONITORAMENTO

### Logs com Sentry

```javascript
import * as Sentry from "@sentry/node";

Sentry.init({ dsn: process.env.SENTRY_DSN });

app.use(Sentry.Handlers.errorHandler());
```

### Métricas

- Database queries (tempo)
- Upload success rate
- API response time
- Error rate

---

**Versão:** 1.0  
**Última atualização:** Maio 2026
