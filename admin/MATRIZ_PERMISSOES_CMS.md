# MATRIZ DE PERMISSÕES E FUNCIONALIDADES

## CMS Murayama Engenharia

---

## 1. MATRIZ DE ACESSO POR PERFIL

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       MASTER (Proprietário/CEO)                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ ✅ ACESSO TOTAL a todos os módulos                                          │
│ ✅ Criar/Editar/Deletar usuários                                            │
│ ✅ Alterar permissões de outros usuários                                    │
│ ✅ Visualizar logs de auditoria completos                                   │
│ ✅ Fazer backup e restore                                                   │
│ ✅ Configurações avançadas do sistema                                       │
│ ✅ Tudo que o ADMIN faz                                                     │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│              ADMIN (Gestor de Conteúdo / Community Manager)                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ ✅ Gerenciar Obras (Portfólio)                                              │
│ ✅ Gerenciar Serviços                                                       │
│ ✅ Gerenciar Depoimentos                                                    │
│ ✅ Gerenciar Parceiros                                                      │
│ ✅ Editar Contatos e Informações Gerais                                    │
│ ✅ Editar Conteúdo de Páginas                                              │
│ ✅ Visualizar Logs de Auditoria (leitura)                                   │
│                                                                              │
│ ❌ Não pode: Deletar permanentemente                                        │
│ ❌ Não pode: Gerenciar usuários                                            │
│ ❌ Não pode: Acessar configurações de sistema                              │
│ ❌ Não pode: Ver dados sensíveis (senhas, etc)                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. TABELA DETALHADA DE PERMISSÕES

### Legenda:

- ✅ **Permitido**
- ❌ **Não Permitido**
- 👀 **Visualização Apenas**

---

### PORTFÓLIO (OBRAS)

| Ação                          | MASTER | ADMIN |
| ----------------------------- | ------ | ----- |
| Visualizar lista de obras     | ✅     | ✅    |
| Ver detalhes da obra          | ✅     | ✅    |
| Criar nova obra               | ✅     | ✅    |
| Editar obra existente         | ✅     | ✅    |
| Deletar obra permanentemente  | ✅     | ❌    |
| Publicar/Despublicar          | ✅     | ✅    |
| Upload de imagens             | ✅     | ✅    |
| Reordenar obras (drag & drop) | ✅     | ✅    |
| Editar categoria da obra      | ✅     | ✅    |
| Restaurar obra deletada       | ✅     | ❌    |

---

### SERVIÇOS

| Ação                     | MASTER | ADMIN |
| ------------------------ | ------ | ----- |
| Visualizar serviços      | ✅     | ✅    |
| Editar descrição         | ✅     | ✅    |
| Editar ícone             | ✅     | ✅    |
| Ativar/Desativar serviço | ✅     | ✅    |
| Reordenar serviços       | ✅     | ✅    |
| Criar novo serviço       | ✅     | ❌    |
| Deletar serviço          | ✅     | ❌    |

---

### DEPOIMENTOS

| Ação                      | MASTER | ADMIN |
| ------------------------- | ------ | ----- |
| Visualizar depoimentos    | ✅     | ✅    |
| Adicionar novo depoimento | ✅     | ✅    |
| Editar depoimento         | ✅     | ✅    |
| Deletar depoimento        | ✅     | ✅    |
| Ativar/Desativar exibição | ✅     | ✅    |
| Reordenar depoimentos     | ✅     | ✅    |

---

### PARCEIROS

| Ação                  | MASTER | ADMIN |
| --------------------- | ------ | ----- |
| Visualizar parceiros  | ✅     | ✅    |
| Adicionar parceiro    | ✅     | ✅    |
| Editar informações    | ✅     | ✅    |
| Upload/Atualizar logo | ✅     | ✅    |
| Deletar parceiro      | ✅     | ❌    |
| Ativar/Desativar      | ✅     | ✅    |
| Reordenar             | ✅     | ✅    |

---

### CONTATOS E INFORMAÇÕES GERAIS

| Ação                      | MASTER | ADMIN |
| ------------------------- | ------ | ----- |
| Editar telefone           | ✅     | ✅    |
| Editar email              | ✅     | ✅    |
| Editar endereço           | ✅     | ✅    |
| Editar redes sociais      | ✅     | ✅    |
| Editar horários           | ✅     | ✅    |
| Editar mensagem WhatsApp  | ✅     | ✅    |
| Ver histórico de mudanças | ✅     | 👀    |

---

### PÁGINAS E CONTEÚDO

| Ação                      | MASTER | ADMIN |
| ------------------------- | ------ | ----- |
| Editar página "Sobre"     | ✅     | ✅    |
| Editar FAQ                | ✅     | ✅    |
| Editar termos e políticas | ✅     | ✅    |
| Gerenciar meta tags (SEO) | ✅     | ✅    |
| Criar nova página         | ✅     | ❌    |
| Deletar página            | ✅     | ❌    |

---

### USUÁRIOS (Apenas MASTER)

| Ação                            | MASTER | ADMIN |
| ------------------------------- | ------ | ----- |
| Visualizar usuários             | ✅     | ❌    |
| Criar novo usuário              | ✅     | ❌    |
| Editar usuário                  | ✅     | ❌    |
| Deletar usuário                 | ✅     | ❌    |
| Alterar perfil (Master ↔ Admin) | ✅     | ❌    |
| Resetar senha de usuário        | ✅     | ❌    |
| Desativar usuário               | ✅     | ❌    |
| Ver login history               | ✅     | ❌    |

---

### AUDITORIA E LOGS

| Ação                         | MASTER | ADMIN |
| ---------------------------- | ------ | ----- |
| Ver logs de auditoria        | ✅     | 👀    |
| Filtrar por usuário          | ✅     | ✅    |
| Filtrar por data             | ✅     | ✅    |
| Filtrar por tipo de ação     | ✅     | ✅    |
| Exportar logs                | ✅     | ❌    |
| Deletar logs                 | ✅     | ❌    |
| Ver dados sensíveis nos logs | ✅     | ❌    |

---

### CONFIGURAÇÕES DO SISTEMA

| Ação                                   | MASTER | ADMIN |
| -------------------------------------- | ------ | ----- |
| Fazer backup manual                    | ✅     | ❌    |
| Fazer restore de backup                | ✅     | ❌    |
| Alterar configurações de email         | ✅     | ❌    |
| Alterar chaves de API                  | ✅     | ❌    |
| Configurar integração Google Analytics | ✅     | ❌    |
| Ver logs de sistema                    | ✅     | ❌    |
| Gerenciar storage (S3/Blob)            | ✅     | ❌    |

---

## 3. FLUXO DE ACESSO

```
USUÁRIO ACESSA O CMS
        ↓
    LOGIN (email + senha)
        ↓
    VERIFICA CREDENCIAIS
        ↓
    VALIDA PERFIL
        ↓
    ┌─────────────────────┬──────────────────────┐
    ↓                     ↓                      ↓
 MASTER                 ADMIN              NÃO AUTORIZADO
 (Acesso Total)    (Acesso Limitado)      (Acesso Negado)
    ↓                     ↓
 Dashboard          Dashboard (simplificado)
    ↓                     ↓
 [Todos os módulos] [Módulos permitidos]
```

---

## 4. CENÁRIOS DE USO

### Cenário 1: Atualizar Portfólio

**Ator:** Admin  
**Passo a passo:**

1. Acessa seção "Gerenciar Obras"
2. Clica em "Adicionar Nova Obra"
3. Preenche formulário (título, localização, descrição, etc.)
4. Faz upload de imagens
5. Seleciona categoria
6. Clica "Publicar"
7. ✅ Obra aparece no site em minutos

**Se fosse para deletar:**

- Admin pode mudar status para "Rascunho" (Soft Delete)
- Apenas Master pode deletar definitivamente

---

### Cenário 2: Receber Depoimento de Cliente

**Ator:** Admin  
**Passo a passo:**

1. Recebe depoimento por email
2. Acessa "Gerenciar Depoimentos"
3. Clica "Adicionar Depoimento"
4. Copia nome do cliente e texto
5. Clica "Publicar"
6. ✅ Depoimento aparece no site

---

### Cenário 3: Novo Funcionário Precisa de Acesso

**Ator:** Master  
**Passo a passo:**

1. Acessa "Gerenciar Usuários"
2. Clica "Novo Usuário"
3. Insere email do novo funcionário
4. Define perfil (Admin)
5. Clica "Enviar Convite"
6. ✅ Funcionário recebe email com link para criar senha

---

### Cenário 4: Auditar Quem Fez Mudanças

**Ator:** Master  
**Passo a passo:**

1. Acessa "Logs de Auditoria"
2. Filtra por data (últimos 7 dias)
3. Vê: "João (Admin) alterou 'Obra XYZ' em 05/05/2026 às 14:30"
4. Clica em log para ver detalhes da mudança
5. ✅ Histórico completo de alterações

---

## 5. CASOS DE RESTRIÇÃO

### Por que ADMIN não pode deletar?

- **Segurança:** Evita exclusão acidental
- **Auditoria:** Master precisa revisar antes de remover
- **Integridade:** Dados permanentes deixam rastro

### Por que ADMIN não pode gerenciar usuários?

- **Segurança:** Apenas proprietário cria contas
- **Permissões:** Risco de criar usuários com acesso excessivo
- **Compliance:** Controle de acesso centralizado

### Por que ADMIN não pode ver configurações?

- **Privacidade:** Não deve ter acesso a senhas/tokens
- **Segurança:** Chaves de API não devem ser compartilhadas
- **Compliance:** Dados sensíveis restritos

---

## 6. POLÍTICA DE SENHAS

### Primeiro Login

1. Usuário recebe convite por email
2. Clica em link único (válido 24h)
3. Cria sua própria senha

### Requisitos de Senha

- ✅ Mínimo 8 caracteres
- ✅ Pelo menos 1 letra maiúscula
- ✅ Pelo menos 1 número
- ✅ Pelo menos 1 caractere especial

### Recuperação de Senha

1. Clica "Esqueci minha senha"
2. Insere email
3. Recebe link de reset por email
4. Cria nova senha
5. Faz login normalmente

### Expiração

- ✅ Sessão expira após 60 minutos de inatividade
- ✅ Pode se reconectar sem perder dados em edição

---

## 7. MATRIZ DE AUDITORIA

O sistema registra TODAS as seguintes ações:

| Ação         | Quem       | Quando      | O Quê              | Detalhes                   |
| ------------ | ---------- | ----------- | ------------------ | -------------------------- |
| Login        | Email/User | Data + Hora | Login bem-sucedido | IP, navegador              |
| Create       | User       | Data + Hora | Novo registro      | Todos os valores           |
| Update       | User       | Data + Hora | Campos alterados   | Valores anterior/novo      |
| Delete       | User       | Data + Hora | Registro deletado  | ID do registro             |
| Publish      | User       | Data + Hora | Publicado          | Tipo de conteúdo           |
| User Change  | Master     | Data + Hora | Permissão alterada | Antes/depois               |
| Failed Login | Email      | Data + Hora | Login falhou       | Motivo (senha errada, etc) |

---

## 8. TEMPO DE RESPOSTA ESPERADO

```
Ação                          Tempo Esperado
─────────────────────────────────────────────
Carregar painel                 < 2s
Buscar obra                     < 1s
Upload de imagem                3-10s (depende tamanho)
Publicar mudanças               < 1s
Salvar formulário               < 1s
Atualizar no site               < 5min (cache)
```

---

## 9. SUPORTE E TREINAMENTO

### O que está incluído?

✅ **4 horas de treinamento**

- 1h: Acesso ao painel, autenticação, dashboard
- 1h: Gerenciar obras e upload de imagens
- 1h: Gerenciar outros conteúdos
- 1h: Q&A e casos de uso

✅ **30 dias de suporte**

- Dúvidas sobre uso
- Correções de bugs
- Ajustes menores

❌ **Não incluído:**

- Treinamento pós-30 dias (suporte pago)
- Desenvolvimento de funcionalidades extras

---

**Versão:** 1.0  
**Última atualização:** Maio 2026
