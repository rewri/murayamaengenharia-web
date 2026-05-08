# CHECKLIST: IMPLEMENTAÇÃO CMS MURAYAMA

## Documento de Alinhamento com Cliente

---

## 📝 INFORMAÇÕES DO PROJETO

```
Cliente:                    Murayama Engenharia
Projeto:                    CMS - Painel Administrativo
Data da Proposta:           Maio de 2026
Duração Estimada:           5-6 semanas
Investimento:               R$ 35.300 (Pacote Básico)
```

---

## ✅ FUNCIONALIDADES CONFIRMADAS

### PORTFÓLIO DE OBRAS

- [ ] Adicionar/editar/remover projetos
- [ ] Upload de múltiplas imagens com preview
- [ ] Reordenar obras dentro da categoria
- [ ] Categorizar por tipo (Comercial, Industrial, etc)
- [ ] Editar descrição, cliente, ano, área
- [ ] Publicar/Despublicar
- [ ] Slug automático (gerado do título)

### SERVIÇOS

- [ ] Editar descrição de serviços
- [ ] Reordenar apresentação
- [ ] Ativar/desativar serviços
- [ ] Gerenciar itens dentro de cada serviço

### DEPOIMENTOS

- [ ] Adicionar novo depoimento
- [ ] Editar existentes
- [ ] Ativar/desativar exibição
- [ ] Reordenar por relevância

### PARCEIROS

- [ ] Adicionar novo parceiro
- [ ] Upload de logo
- [ ] Editar informações
- [ ] Remover parceiro
- [ ] Reordenar lista

### CONTATOS E INFORMAÇÕES

- [ ] Editar telefone principal
- [ ] Editar WhatsApp
- [ ] Editar email
- [ ] Gerenciar endereço
- [ ] Editar redes sociais
- [ ] Editar mensagem padrão WhatsApp

### CONTEÚDO DE PÁGINAS

- [ ] Editar "Sobre a Empresa"
- [ ] Gerenciar FAQ
- [ ] Atualizar termos e políticas
- [ ] Editar meta tags (SEO)

### AUTENTICAÇÃO E SEGURANÇA

- [ ] Login com email e senha
- [ ] Recuperação de senha por email
- [ ] Dois perfis diferentes (Master e Admin)
- [ ] Histórico de login
- [ ] Senha criptografada

### GERENCIAR USUÁRIOS (Master Only)

- [ ] Criar novo usuário via convite
- [ ] Editar permissões
- [ ] Redefinir senha de usuário
- [ ] Desativar/Ativar usuário
- [ ] Ver atividades de cada usuário

### AUDITORIA E LOGS

- [ ] Rastrear quem fez alterações
- [ ] Quando foram feitas
- [ ] O que foi modificado
- [ ] Filtrar logs por usuário/data
- [ ] Exportar relatório de auditoria

### DASHBOARD

- [ ] Overview de estatísticas
- [ ] Últimas atividades
- [ ] Gráficos de obras por categoria
- [ ] Resumo de depoimentos
- [ ] Notificações de eventos

---

## 🔐 PERMISSÕES CONFIRMADAS

### PERFIL: MASTER

```
✅ Acesso total a todos os módulos
✅ Criar/Editar/Deletar usuários
✅ Alterar permissões
✅ Ver logs completos
✅ Fazer backup
✅ Configurações de sistema
```

### PERFIL: ADMIN

```
✅ Gerenciar obras, serviços, depoimentos
✅ Adicionar/editar parceiros
✅ Editar contatos
✅ Editar conteúdo de páginas
❌ Não pode deletar permanentemente
❌ Não pode gerenciar usuários
❌ Não pode acessar configurações
```

---

## 💾 DADOS QUE SERÃO MIGRADOS

- [ ] Obras/Portfólio existentes
- [ ] Serviços atuais
- [ ] Depoimentos
- [ ] Parceiros
- [ ] Dados de contato

**Responsável pela migração:** ☐ Desenvolvedor ☐ Cliente ☐ Ambos

---

## 🎨 INTERFACE ESPERADA

- [ ] Painel amigável e intuitivo (sem necessidade de código)
- [ ] Interface responsiva (funciona em celular)
- [ ] Design consistente com identidade Murayama
- [ ] Menu organizado por seções
- [ ] Formulários claros e com validação
- [ ] Preview de mudanças antes de publicar
- [ ] Confirmação antes de deletar

---

## 📱 COMPATIBILIDADE

- [ ] Desktop (Chrome, Firefox, Safari, Edge)
- [ ] Tablet (iPad, Android tablets)
- [ ] Mobile (iPhone, Android)
- [ ] Integrado ao site React existente

---

## 🚀 HOSPEDAGEM E INFRAESTRUTURA

### Backend

- [ ] Node.js + Express
- [ ] Banco PostgreSQL (em nuvem)
- [ ] Deploy em Vercel ou AWS

### Storage

- [ ] AWS S3 ou Vercel Blob para imagens
- [ ] Otimização automática de imagens
- [ ] Backup automático de dados

### Domínio

- [ ] Subdomínio painel.murayamaengenharia.com.br (proposto)
- [ ] SSL/HTTPS incluído

---

## 📊 HORAS ESTIMADAS

| Tarefa         | Horas   | Status      |
| -------------- | ------- | ----------- |
| Backend        | 70      | 🔵 Estimado |
| Frontend       | 90      | 🔵 Estimado |
| Infraestrutura | 15      | 🔵 Estimado |
| Gerenciamento  | 10      | 🔵 Estimado |
| **TOTAL**      | **185** |             |

**Margem de segurança:** +20% (para contingências)

---

## 💰 INVESTIMENTO CONFIRMADO

### Pacote Escolhido:

☐ **BÁSICO** - R$ 35.300

- Desenvolvimento completo
- Hospedagem 1º ano
- Treinamento 4h
- Suporte 30 dias

☐ **PROFISSIONAL** - R$ 39.300

- Tudo do Básico
- Suporte técnico 1º ano
- Menos 4h de suporte pós-lançamento

☐ **PREMIUM** - R$ 45.000

- Tudo do Profissional
- Módulos extras
- Integração de formulários
- Analytics avançado

### Forma de Pagamento Escolhida:

☐ **Parcelado em 3x**

- 30% no início: R$ 10.590
- 40% na Fase 2: R$ 14.120
- 30% na entrega: R$ 10.590

☐ **2 pagamentos**

- 50% no início: R$ 17.650
- 50% na entrega: R$ 17.650

☐ **À vista**

- 100%: R$ 31.770 (com desconto 10%)

---

## 📅 CRONOGRAMA CONFIRMADO

```
Semana 1-2:   Backend
              ├─ Setup inicial
              ├─ Autenticação e JWT
              ├─ API endpoints
              └─ Banco de dados

Semana 3-4:   Frontend
              ├─ Painel admin
              ├─ Interfaces CRUD
              ├─ Upload de imagens
              └─ Integração com backend

Semana 5:     Integração e Deploy
              ├─ Testes
              ├─ Correções
              ├─ Deploy
              └─ Configurações finais

Semana 6:     Treinamento
              ├─ Treinar equipe
              ├─ Documentação
              └─ Suporte pós-lançamento
```

---

## 📚 DOCUMENTAÇÃO QUE SERÁ ENTREGUE

- [ ] **Manual do Usuário** (PDF em Português)
  - Como acessar o painel
  - Como adicionar/editar obras
  - Como gerenciar outros conteúdos
  - Troubleshooting comum

- [ ] **Documentação Técnica** (API)
  - Endpoints disponíveis
  - Estrutura do banco de dados
  - Como integrar com sistemas terceiros (se necessário)

- [ ] **Vídeo Tutorial** (5-10 minutos)
  - Walkthrough do painel
  - Casos de uso comuns

- [ ] **Suporte por 30 dias**
  - Dúvidas sobre uso
  - Correções de bugs
  - Ajustes menores

---

## 👥 PESSOAS ENVOLVIDAS

### Seu Time:

- [ ] Nome responsável pelas informações: ******\_\_\_\_******
- [ ] Email para contato: ******\_\_\_\_******
- [ ] Telefone: ******\_\_\_\_******
- [ ] Quem fará uso do CMS? ******\_\_\_\_******
- [ ] Quantas pessoas usar? ☐ 1 ☐ 2-3 ☐ 4+

### Equipe de Desenvolvimento:

- [ ] 1 Desenvolvedor Full-Stack (Node.js + React)
- [ ] Tempo integral por 5-6 semanas
- [ ] Suporte pós-lançamento conforme contrato

---

## 🔒 REQUISITOS DE SEGURANÇA

- [ ] Senha forte obrigatória (8+ caracteres, números, especiais)
- [ ] Criptografia de dados sensíveis
- [ ] Backup automático do banco de dados
- [ ] HTTPS/SSL em todo o painel
- [ ] Proteção contra SQL injection
- [ ] Autenticação via JWT (tokens seguros)
- [ ] Rate limiting (proteção contra força bruta)
- [ ] Auditoria completa de todas as alterações
- [ ] Sessão com timeout de 60 minutos

---

## 🆘 SUPORTE E MANUTENÇÃO

### Suporte Incluído (30 dias):

- ✅ Dúvidas sobre como usar
- ✅ Correção de bugs
- ✅ Ajustes menores
- ✅ Treinamento adicional (se necessário)

### Suporte Pago (após 30 dias):

- ☐ Plano Básico: R$ 500/mês (até 10h)
- ☐ Plano Profissional: R$ 1.000/mês (até 25h)
- ☐ Plano Premium: R$ 2.000/mês (sem limite)

### Manutenção Recorrente:

- **Hospedagem**: R$ 150-200/mês
- **Storage**: R$ 20-50/mês
- **Monitoramento**: R$ 50/mês
- **Backup**: Incluído

---

## ✔️ CHECKLIST PRÉ-INÍCIO

Antes de começar, confirmar:

- [ ] Contrato assinado
- [ ] Primeira parcela recebida (se aplicável)
- [ ] Repositório GitHub criado (privado)
- [ ] Acesso ao banco de dados gerenciado
- [ ] Credenciais de S3/Blob preparadas
- [ ] Email SMTP configurado (para password reset)
- [ ] Domain/Subdomínio disponível (painel.murayamaengenharia.com.br)
- [ ] Cliente confirmou primeiros usuários (Master + Admins)
- [ ] Dados para migração organizados

---

## 🎯 EXPECTATIVAS PÓS-LANÇAMENTO

### Você conseguirá fazer:

✅ Adicionar novas obras em 5 minutos  
✅ Editar serviços sem contato técnico  
✅ Publicar depoimentos de clientes  
✅ Atualizar dados de contato  
✅ Gerenciar parceiros  
✅ Treinar novos funcionários

### Você NÃO precisará fazer:

❌ Editar código  
❌ Fazer deploy  
❌ Configurar servidor  
❌ Gerenciar banco de dados manualmente

---

## 📋 ASSINATURA DE ACORDO

**Cliente/Responsável:**  
Nome: **************\_\_\_\_**************  
Assinatura: ************\_\_\_\_************  
Data: **************\_\_\_\_**************

**Desenvolvedor/Representante:**  
Nome: **************\_\_\_\_**************  
Assinatura: ************\_\_\_\_************  
Data: **************\_\_\_\_**************

---

## 📞 PRÓXIMOS PASSOS

1. ☐ Cliente revisa esta proposta
2. ☐ Alinhar qualquer dúvida
3. ☐ Ambos assinam este checklist
4. ☐ Cliente faz primeiro pagamento
5. ☐ Kickoff meeting (30 min)
6. ☐ Início do desenvolvimento

---

## 📧 CONTATO

**Dúvidas sobre a proposta?**  
Entre em contato em até 2 dias úteis.

**Email:** dev@example.com  
**Telefone:** (14) 99999-9999  
**Resposta em:** Até 24h

---

**Versão:** 1.0  
**Validade da Proposta:** 30 dias  
**Última atualização:** Maio 2026

---

## ANEXOS

### A. Estrutura de Dados Detalhada

→ Ver arquivo: ESPECIFICACAO_TECNICA_CMS.md

### B. Matriz de Permissões Completa

→ Ver arquivo: MATRIZ_PERMISSOES_CMS.md

### C. Planejamento Técnico Completo

→ Ver arquivo: PLANEJAMENTO_CMS.md

### D. Proposta Comercial Resumida

→ Ver arquivo: PROPOSTA_CMS_COMERCIAL.md
