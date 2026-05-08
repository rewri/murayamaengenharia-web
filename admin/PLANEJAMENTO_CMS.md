# Planejamento CMS - Painel Administrativo Murayama Engenharia

## 1. VISÃO GERAL DO PROJETO

### Objetivo

Criar um painel administrativo centralizado que permita gerenciar conteúdos do site da Murayama Engenharia de forma segura e intuitiva, com dois níveis de acesso (Master e Admin).

### Arquitetura Proposta

- **Frontend**: React + TypeScript (painel admin integrado ao site existente)
- **Backend**: Node.js + Express + PostgreSQL (API REST)
- **Autenticação**: JWT + Refresh Tokens
- **Upload de Arquivos**: Integração com serviço em nuvem (Vercel Blob / AWS S3)
- **Deployment**: Backend em Vercel ou AWS, banco de dados gerenciado

---

## 2. DADOS EDITÁVEIS DO SITE

### 2.1 PORTFÓLIO (Obras)

**Estrutura base:**

- ID único
- Título da obra
- Localização
- Categoria (Comercial, Industrial, Governamental, Momentum, Parque das Cascatas, Spazio Verde, Terras Altas, Vale do Sol, Reserva)
- Descrição detalhada
- Cliente/Responsável
- Ano de conclusão
- Área (m²)
- Serviços realizados (múltipla seleção: Projeto, Gerenciamento, Acompanhamento, Consultoria, etc.)
- Galeria de imagens (upload múltiplo)
- Vídeo (link ou upload)
- Slug automático (gerado a partir do título)

**Operações:**

- ✅ Criar nova obra
- ✅ Editar informações existentes
- ✅ Reordenar dentro da categoria
- ✅ Gerenciar galeria de imagens (adicionar/remover/reordenar)
- ✅ Publicar/Despublicar
- ✅ Excluir (soft delete)

---

### 2.2 SERVIÇOS

**Estrutura base:**

- ID único
- Chave interna (key)
- Categoria principal (Execução e Controle, Concepção, Infraestrutura, Diagnóstico Técnico, Segurança e Normas)
- Título
- Descrição curta (resumida)
- Descrição detalhada (completa)
- Lista de itens/tópicos
- Ícone (seleção de ícones disponíveis)
- Imagem de destaque (upload)
- Botão CTA (texto e ação)

**Operações:**

- ✅ Editar serviços existentes
- ✅ Reordenar exibição
- ✅ Ativar/Desativar visualização

---

### 2.3 DEPOIMENTOS/TESTEMUNHAS

**Estrutura base:**

- ID único
- Autor/Nome do cliente
- Texto do depoimento
- Data do depoimento
- Ativo/Inativo

**Operações:**

- ✅ Adicionar novo depoimento
- ✅ Editar depoimento existente
- ✅ Ativar/Desativar exibição
- ✅ Excluir depoimento
- ✅ Reordenar exibição

---

### 2.4 PARCEIROS/PATROCINADORES

**Estrutura base:**

- ID único
- Nome do parceiro
- Logo (upload)
- Link externo (opcional)
- Status (ativo/inativo)

**Operações:**

- ✅ Adicionar novo parceiro
- ✅ Editar informações
- ✅ Atualizar logo
- ✅ Ativar/Desativar
- ✅ Excluir
- ✅ Reordenar

---

### 2.5 CONTATOS E INFORMAÇÕES GERAIS

**Estrutura base:**

- Telefone principal
- Telefone WhatsApp
- Email principal
- Endereço (rua, bairro, cidade, estado, CEP)
- Redes sociais (links)
- Horário de funcionamento
- Mensagem padrão WhatsApp

**Operações:**

- ✅ Editar dados de contato
- ✅ Atualizar endereço
- ✅ Gerenciar redes sociais
- ✅ Visualizar histórico de alterações

---

### 2.6 PÁGINAS E CONTEÚDO TEXTUAL

**Estrutura base:**

- Sobre a empresa (missão, visão, valores)
- FAQ/Perguntas frequentes
- Termos e Políticas (cookies, privacidade)
- Banners e destaque home
- Meta tags (SEO por página)

**Operações:**

- ✅ Editar conteúdo
- ✅ Adicionar/Remover seções
- ✅ Gerenciar metadata

---

### 2.7 ORÇAMENTO/COTAÇÃO (Opcional - Fase 2)

**Estrutura base:**

- Formulários de orçamento recebidos
- Status do orçamento
- Histórico de comunicação

**Operações:**

- ✅ Visualizar solicitações
- ✅ Alterar status
- ✅ Anexar propostas
- ✅ Exportar dados

---

## 3. ESTRUTURA DE PERFIS E PERMISSÕES

### 3.1 PERFIL: MASTER (Desenvolvedor/Owner)

**Permissões Completas:**

- ✅ Gerenciar usuários (criar, editar, excluir, resetar senha)
- ✅ Alterar permissões de outros usuários
- ✅ Acesso a TODAS as seções
- ✅ Editar/Publicar conteúdo
- ✅ Gerenciar parceiros
- ✅ Excluir registros permanentemente
- ✅ Ver logs de auditoria (quem fez o quê e quando)
- ✅ Backup/Restore de dados
- ✅ Configurações de sistema

**Restrições:**

- Nenhuma (acesso total)

---

### 3.2 PERFIL: ADMIN (Gestor de Conteúdo)

**Permissões:**

| Módulo             | Ver | Criar | Editar | Excluir | Publicar |
| ------------------ | --- | ----- | ------ | ------- | -------- |
| Portfólio (Obras)  | ✅  | ✅    | ✅     | ❌      | ✅       |
| Serviços           | ✅  | ❌    | ✅     | ❌      | ✅       |
| Depoimentos        | ✅  | ✅    | ✅     | ✅      | ✅       |
| Parceiros          | ✅  | ✅    | ✅     | ❌      | ✅       |
| Contatos           | ✅  | ❌    | ✅     | ❌      | ✅       |
| Páginas/Conteúdo   | ✅  | ❌    | ✅     | ❌      | ✅       |
| Orçamentos         | ✅  | ❌    | ✅     | ❌      | N/A      |
| Gerenciar Usuários | ❌  | ❌    | ❌     | ❌      | N/A      |
| Logs de Auditoria  | ✅  | ❌    | ❌     | ❌      | N/A      |

**Restrições:**

- ❌ Não pode excluir registros permanentemente (soft delete apenas)
- ❌ Não pode gerenciar outros usuários
- ❌ Não pode alterar configurações de sistema

---

## 4. MÓDULOS DO CMS

### 4.1 AUTENTICAÇÃO

- Login com usuário/email e senha
- Recuperação de senha via email
- Validação de força de senha
- Sessões com timeout (30-60 minutos)
- Refresh token para manter sessão

### 4.2 DASHBOARD

- Overview com estatísticas:
  - Total de obras no portfólio
  - Obras adicionadas no último mês
  - Depoimentos pendentes de revisão
  - Atividades recentes
  - Usuários ativos
- Gráficos de obras por categoria
- Últimas modificações

### 4.3 GERENCIAR OBRAS (PORTFÓLIO)

- Lista com filtros (categoria, data, status)
- Busca por título/cliente
- Paginação
- Criar nova obra com formulário
- Editar obra existente
- Reordenar obras (drag & drop)
- Galeria de imagens com preview
- Publicar/Despublicar

### 4.4 GERENCIAR SERVIÇOS

- Lista de serviços
- Edição inline
- Reordenar serviços
- Editar descrições e ícones

### 4.5 GERENCIAR DEPOIMENTOS

- Lista de depoimentos
- Adicionar novo depoimento
- Editar existentes
- Ativar/Desativar
- Reordenar exibição

### 4.6 GERENCIAR PARCEIROS

- Lista de parceiros
- Upload de logo
- Adicionar/Editar/Excluir
- Reordenar

### 4.7 INFORMAÇÕES GERAIS

- Editar contatos
- Gerenciar endereço
- Configurar redes sociais
- Editar horários de funcionamento

### 4.8 GERENCIAR USUÁRIOS (MASTER ONLY)

- Lista de usuários com perfil e status
- Criar novo usuário
- Editar permissões
- Redefinir senha
- Desativar usuário
- Logs de atividade por usuário

### 4.9 AUDITORIA E LOGS

- Histórico de todas as alterações
- Quem, quando, o quê foi alterado
- Possibilidade de ver versões anteriores (opcional)
- Filtrar por usuário, data, tipo de ação

### 4.10 CONFIGURAÇÕES

- Backup automático
- Integração com Google Analytics
- Variáveis de ambiente
- Sincronização com site ao vivo

---

## 5. FLUXO DE DESENVOLVIMENTO

### Fase 1: BACKEND (Semanas 1-2)

- [ ] Setup projeto Node.js + Express
- [ ] Autenticação e JWT
- [ ] ORM e migrations (prisma/typeorm)
- [ ] API REST endpoints
- [ ] Validação de dados
- [ ] Upload de arquivos
- [ ] Testes de API

### Fase 2: FRONTEND CMS (Semanas 3-4)

- [ ] Setup painel admin (React)
- [ ] Login/Autenticação
- [ ] Dashboard
- [ ] Módulos CRUD
- [ ] Upload de imagens
- [ ] Integração com backend

### Fase 3: INTEGRAÇÃO E REFINAMENTO (Semana 5)

- [ ] Testes de integração
- [ ] Deploy backend
- [ ] Deploy frontend
- [ ] Documentação
- [ ] Treinamento do cliente

---

## 6. ESTIMATIVA DE ESFORÇO

### 6.1 BREAKDOWN POR TAREFA

#### **BACKEND (70 horas)**

| Tarefa            | Horas  | Descrição                                               |
| ----------------- | ------ | ------------------------------------------------------- |
| Setup inicial     | 4      | Node.js, Express, banco de dados, variáveis de ambiente |
| Autenticação      | 8      | Login, JWT, refresh token, recuperação de senha         |
| ORM e Database    | 6      | Schema, migrations, relacionamentos                     |
| API Portfólio     | 12     | CRUD completo, validação, upload de imagens             |
| API Serviços      | 4      | CRUD, permissões                                        |
| API Depoimentos   | 4      | CRUD                                                    |
| API Parceiros     | 4      | CRUD, upload logo                                       |
| API Contatos      | 3      | CRUD                                                    |
| API Páginas       | 5      | CRUD de conteúdo                                        |
| API Usuários      | 6      | CRUD, permissões (Master only)                          |
| Auditoria/Logs    | 4      | Middleware de rastreamento                              |
| Upload e S3/Blob  | 4      | Integração com serviço em nuvem                         |
| Testes unitários  | 4      | Testes das funcionalidades críticas                     |
| **Total Backend** | **70** |                                                         |

#### **FRONTEND CMS (90 horas)**

| Tarefa                | Horas  | Descrição                            |
| --------------------- | ------ | ------------------------------------ |
| Setup painel admin    | 4      | React, router, estado global         |
| Login e autenticação  | 6      | Página de login, recovery, validação |
| Dashboard             | 6      | Overview, gráficos, estatísticas     |
| Gerenciar Obras       | 20     | Listagem, CRUD, galeria, reordenação |
| Gerenciar Serviços    | 8      | Listagem, edição, reordenação        |
| Gerenciar Depoimentos | 8      | CRUD, ativar/desativar               |
| Gerenciar Parceiros   | 8      | CRUD, upload logo                    |
| Gerenciar Contatos    | 6      | Formulário de edição                 |
| Gerenciar Páginas     | 8      | Editor de conteúdo, meta tags        |
| Gerenciar Usuários    | 10     | Listagem, CRUD, permissões (Master)  |
| Auditoria/Logs        | 4      | Visualização de logs                 |
| Design e UI           | 8      | Componentes, layout responsivo       |
| Testes e ajustes      | 4      | Testes manuais, correções            |
| **Total Frontend**    | **90** |                                      |

#### **INFRAESTRUTURA E DEVOPS (15 horas)**

| Tarefa                    | Horas  | Descrição                               |
| ------------------------- | ------ | --------------------------------------- |
| Configurar banco de dados | 4      | PostgreSQL cloud (RDS/Supabase/Railway) |
| Setup CI/CD               | 4      | GitHub Actions ou similar               |
| Deployment                | 4      | Deploy backend e frontend               |
| SSL/Segurança             | 2      | HTTPS, headers de segurança             |
| Documentação              | 1      | README, API docs                        |
| **Total DevOps**          | **15** |                                         |

#### **GERENCIAMENTO E COMUNICAÇÃO (10 horas)**

| Tarefa                   | Horas  | Descrição             |
| ------------------------ | ------ | --------------------- |
| Reuniões de planejamento | 2      | Kickoff, alinhamento  |
| Treinamento do cliente   | 4      | Como usar o CMS       |
| Ajustes e feedback       | 3      | Correções pós-entrega |
| Documentação do cliente  | 1      | Manual de usuário     |
| **Total Gerenciamento**  | **10** |                       |

---

### 6.2 RESUMO TOTAL DE HORAS

| Etapa          | Horas         |
| -------------- | ------------- |
| Backend        | 70            |
| Frontend       | 90            |
| Infraestrutura | 15            |
| Gerenciamento  | 10            |
| **TOTAL**      | **185 horas** |

### Cronograma Estimado

- **Duração**: 5-6 semanas (com 1 developer full-time)
- **Data de entrega**: ~6 semanas após início
- **Margem de segurança**: +20% = 222 horas (contingência)

---

## 7. ESTIMATIVA DE ORÇAMENTO

### 7.1 METODOLOGIA DE PRECIFICAÇÃO

Considerando mercado de desenvolvimento web Brasil (2026):

- **Taxa horária sênior**: R$ 120-180/hora
- **Taxa horária pleno**: R$ 80-120/hora
- **Taxa horária júnior**: R$ 50-80/hora

Vamos usar:

- **Profissional Pleno/Sênior**: R$ 150/hora

### 7.2 CÁLCULO BASE

**Proposta 1: Modelo Fixo (Recomendado)**

```
Desenvolvimento Backend     70 horas × R$ 150 = R$ 10.500
Desenvolvimento Frontend    90 horas × R$ 150 = R$ 13.500
Infraestrutura e DevOps     15 horas × R$ 150 = R$ 2.250
Gerenciamento e Treinamento 10 horas × R$ 150 = R$ 1.500
──────────────────────────────────────────────────────────
Subtotal (185 horas)                          = R$ 27.750

Contingência (+20%)                           = R$ 5.550
──────────────────────────────────────────────────────────
TOTAL DESENVOLVIMENTO                         = R$ 33.300
```

### 7.3 CUSTOS ADICIONAIS (MENSAIS/ANUAIS)

| Item                        | Valor Mensal | Valor Anual        | Notas                   |
| --------------------------- | ------------ | ------------------ | ----------------------- |
| Banco de Dados (PostgreSQL) | R$ 50-150    | R$ 600-1.800       | Supabase, Railway, AWS  |
| Storage de Arquivos         | R$ 20-50     | R$ 240-600         | S3/Blob para imagens    |
| Domínio                     | -            | R$ 50-100          | Anual                   |
| SSL Certificate             | -            | Grátis             | Let's Encrypt           |
| Monitoramento               | R$ 30-50     | R$ 360-600         | Sentry, DataDog         |
| Suporte (primeira linha)    | -            | R$ 2.000-5.000     | Opcional - por contrato |
| **SUBTOTAL ANUAL**          |              | **R$ 4.050-9.100** |                         |

### 7.4 PROPOSTAS DE PACOTES

---

#### **PACOTE BÁSICO** (Recomendado para Fase 1)

**Inclui:** Desenvolvimento completo do CMS conforme especificado

```
Desenvolvimento              R$ 33.300
Hospedagem (1º ano)         R$ 2.000
──────────────────────────
TOTAL INVESTIMENTO INICIAL  R$ 35.300

+ Custo anual recorrente    R$ 1.500-2.500/ano
```

---

#### **PACOTE PROFISSIONAL** (Com Suporte)

**Inclui:** Pacote Básico + Suporte especializado

```
Desenvolvimento              R$ 33.300
Hospedagem (1º ano)         R$ 2.000
Suporte técnico (1º ano)    R$ 4.000
──────────────────────────
TOTAL INVESTIMENTO INICIAL  R$ 39.300

+ Custo anual recorrente    R$ 5.000-6.000/ano
```

---

#### **PACOTE PREMIUM** (Com Extensões)

**Inclui:** Pacote Profissional + Módulos adicionais

```
Desenvolvimento Básico       R$ 33.300
Extensões (Fase 2):
  - Integração de formulários (4h)     + R$ 600
  - Analytics avançado (5h)            + R$ 750
  - Sistema de emails (6h)             + R$ 900
  - Agenda/Marcações (10h)             + R$ 1.500
Hospedagem (1º ano)         R$ 2.000
Suporte técnico (1º ano)    R$ 4.000
──────────────────────────
TOTAL INVESTIMENTO INICIAL  R$ 45.000

+ Custo anual recorrente    R$ 6.500-7.500/ano
```

---

### 7.5 MODELO DE PAGAMENTO SUGERIDO

**Opção 1: Parcelado (Recomendado)**

```
- 30% no início do projeto (kickoff)    = R$ 10.590
- 40% ao final da Fase 2 (Frontend)     = R$ 14.120
- 30% na entrega/deploy                 = R$ 10.590
```

**Opção 2: Dois pagamentos**

```
- 50% no início                         = R$ 17.650
- 50% na entrega                        = R$ 17.650
```

**Opção 3: Única parcela**

```
- 100% na assinatura                    = R$ 35.300
(Desconto possível: 10% = R$ 31.770)
```

---

## 8. TIMELINE RECOMENDADO

```
Semana 1-2:    Backend (70 horas)
├─ Autenticação, API base, banco de dados

Semana 3-4:    Frontend (90 horas)
├─ Painel admin, módulos CRUD

Semana 5:      Integração, Testes, Deploy
├─ Testes, ajustes, treinamento

Semana 6:      Suporte pós-lançamento
└─ Ajustes finais, feedback
```

---

## 9. TECNOLOGIAS RECOMENDADAS

### Backend

- **Framework**: Express.js ou NestJS
- **Banco de Dados**: PostgreSQL (Supabase, AWS RDS, ou Railway)
- **ORM**: Prisma ou TypeORM
- **Autenticação**: JWT + bcrypt
- **Upload**: AWS S3 ou Vercel Blob
- **Validação**: Zod ou Joi
- **Testes**: Jest

### Frontend Admin

- **Framework**: React 18 (existente)
- **State Management**: Zustand ou Context API
- **HTTP Client**: Axios ou Fetch
- **UI Components**: Shadcn/ui ou Radix
- **Tabelas**: TanStack Table
- **Forms**: React Hook Form
- **Icones**: Lucide React (já usado)
- **Build**: Vite (existente)

### Infraestrutura

- **Backend**: Vercel, Railway ou AWS Lambda
- **Banco**: Supabase, AWS RDS ou Railway
- **Storage**: Vercel Blob ou AWS S3
- **Domínio**: Mesmo registrador atual
- **CI/CD**: GitHub Actions

---

## 10. RISCOS E MITIGAÇÃO

| Risco                          | Probabilidade | Impacto | Mitigação                     |
| ------------------------------ | ------------- | ------- | ----------------------------- |
| Mudanças de escopo             | Alta          | Alto    | Documento de escopo assinado  |
| Performance com muitas imagens | Média         | Médio   | Otimização de imagens, CDN    |
| Segurança (autenticação)       | Baixa         | Crítico | Auditoria de segurança, OWASP |
| Integração com site atual      | Média         | Médio   | Testes integrados, staging    |
| Feedback do cliente            | Alta          | Médio   | Reuniões semanais             |

---

## 11. PRÓXIMOS PASSOS

1. **Validar requisitos** com o cliente
2. **Assinar contrato** com scope de trabalho
3. **Criar repositório** privado no GitHub
4. **Setup inicial** de ambiente dev
5. **Iniciar sprint 1** (Backend)

---

## 12. DOCUMENTAÇÃO ENTREGÁVEL

Ao final do projeto, o cliente receberá:

- ✅ **Manual do Usuário** (PDF/Doc): Como usar cada módulo
- ✅ **Documentação API** (Swagger/OpenAPI): Para integrações futuras
- ✅ **Documentação Técnica**: Deploy, manutenção, troubleshooting
- ✅ **Video Tutorial**: 5-10 minutos sobre funcionalidades principais
- ✅ **Suporte por 30 dias**: Dúvidas e ajustes pós-lançamento

---

**Versão**: 1.0  
**Data**: Maio 2026  
**Atualização**: Conforme feedback do cliente
