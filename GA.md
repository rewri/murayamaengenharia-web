# Guia de Configuração GA4 - Murayama Engenharia

Este documento descreve tudo que precisa ser configurado no Google Analytics 4 para refletir os eventos implementados no site.

## 1. Pré-requisitos

1. Ter uma propriedade GA4 criada.
2. Ter um fluxo Web criado para o domínio do site.
3. Copiar o Measurement ID do GA4 (formato G-XXXXXXXXXX).
4. Garantir que a variável de ambiente do projeto esteja preenchida:

```bash
VITE_GA_ID=G-XXXXXXXXXX
```

5. Publicar o site com essa variável configurada no ambiente de produção.

## 2. Como o tracking foi implementado

O site envia eventos diretamente via gtag (sem GTM), respeitando consentimento de cookies.

- O GA só inicializa quando o usuário aceita cookies.
- O page_view é enviado manualmente em cada mudança de rota (SPA), evitando duplicidade.
- Eventos de conversão e engajamento foram adicionados para contato e portfólio.

## 3. Eventos enviados pelo site

### Eventos de navegação

1. page_view

- Quando dispara: a cada mudança de rota.
- Parâmetros enviados:
  - page_path
  - page_title
  - page_location

### Funil de orçamento (chatbot)

1. quote_chatbot_open

- Quando dispara: ao abrir o chatbot.
- Parâmetros:
  - source (ex.: header_desktop, header_mobile, home_hero, home_cta_section)

2. quote_chatbot_submit_attempt

- Quando dispara: ao clicar para enviar solicitação no formulário.
- Parâmetros:
  - answered_questions (número)
  - has_email (boolean)

3. quote_chatbot_submit_error

- Quando dispara: em qualquer validação/erro no envio.
- Parâmetros:
  - error_type (name_missing, phone_invalid, email_invalid, honeypot_filled, rate_limit, questions_incomplete, submission_rejected, network_error)

4. quote_chatbot_submit_success

- Quando dispara: envio realizado com sucesso.
- Parâmetros:
  - answered_questions (número)

5. generate_lead (evento recomendado GA4)

- Quando dispara: junto com sucesso do envio.
- Parâmetros:
  - lead_source (site_chatbot)
  - lead_type (orçamento)

### Eventos de contato

1. contact_whatsapp_click

- Quando dispara: clique no botão flutuante de WhatsApp.
- Parâmetros:
  - source (floating_button)
  - device_type (mobile ou desktop)

2. contact_phone_click

- Quando dispara: clique em link de telefone (tel:).
- Parâmetros:
  - source (button ou text)

### Eventos de portfólio

1. portfolio_project_click

- Quando dispara: clique em projeto no card/lista ou em relacionados.
- Parâmetros:
  - project_id
  - project_category
  - source (portfolio_card ou related_projects)

2. portfolio_view_all_click

- Quando dispara: clique no botão Ver Todos os Projetos.
- Parâmetros:
  - source (portfolio_detail)

## 4. Configurações obrigatórias no GA4

## 4.1 Marcar conversões

No GA4:
Admin > Data display > Events

Marcar como conversão:

1. generate_lead (obrigatório)

Opcional (se quiser acompanhar em paralelo):

1. quote_chatbot_submit_success

Observação: usar apenas generate_lead como conversão principal evita contagem dupla.

## 4.2 Criar dimensões personalizadas (Custom definitions)

No GA4:
Admin > Data display > Custom definitions > Create custom dimensions

Criar como escopo Event:

1. source
2. device_type
3. error_type
4. project_category
5. lead_source
6. lead_type

Opcional:

1. project_id

Observação importante: project_id pode ter alta cardinalidade. Use apenas se realmente precisar analisar por projeto individual.

## 4.3 Criar métricas personalizadas (se necessário)

No GA4:
Admin > Data display > Custom definitions > Create custom metrics

1. answered_questions

- Escopo: Event
- Parâmetro: answered_questions
- Unidade sugerida: Standard

## 5. Validação (passo a passo)

1. Abrir o site com cookies aceitos.
2. Abrir GA4 em Reports > Realtime.
3. Navegar por 2 ou 3 páginas e confirmar page_view.
4. Abrir chatbot em pontos diferentes (header e home) e validar quote_chatbot_open com source.
5. Forçar um erro de envio (ex.: telefone inválido) e validar quote_chatbot_submit_error.
6. Fazer um envio completo e validar:

- quote_chatbot_submit_success
- generate_lead

7. Clicar no WhatsApp flutuante e no telefone para validar eventos de contato.
8. Clicar em cards/projetos relacionados para validar portfolio_project_click.

Para depuração detalhada:

- Admin > DebugView
- Se necessário, usar extensão Google Analytics Debugger no navegador.

## 6. Relatórios recomendados

## 6.1 Exploração de funil

Explore > Funnel exploration

Etapas sugeridas:

1. quote_chatbot_open
2. quote_chatbot_submit_attempt
3. quote_chatbot_submit_success
4. generate_lead

Quebras recomendadas:

1. source
2. device category

## 6.2 Qualidade de lead

Explore > Free form

Dimensões:

1. error_type
2. source

Métricas:

1. Event count
2. Users

Objetivo:

- identificar onde o usuário trava no envio.

## 6.3 Engajamento de portfólio

Explore > Free form

Dimensões:

1. project_category
2. source

Métricas:

1. Event count de portfolio_project_click

Objetivo:

- entender quais categorias geram mais interesse.

## 7. Checklist operacional (copiar e marcar)

Preencha os campos antes da execução:

- Data da configuração: \_**\_/\_\_**/**\_\_**
- Responsável: ************\_\_************
- Propriedade GA4: **********\_\_**********
- Ambiente validado: ( ) Produção ( ) Homologação

### 7.1 Setup técnico

- [ ] O Measurement ID (G-XXXXXXXXXX) foi configurado no ambiente correto.
- [ ] A variável VITE_GA_ID está publicada no deploy.
- [ ] O banner de cookies aparece normalmente para novos usuários.
- [ ] Ao aceitar cookies, o GA inicializa sem erro no console.

### 7.2 Eventos base

- [ ] page_view chega no Realtime ao trocar de rota.
- [ ] quote_chatbot_open chega com parâmetro source.
- [ ] quote_chatbot_submit_attempt chega com answered_questions e has_email.
- [ ] quote_chatbot_submit_error chega com error_type ao forçar erro.
- [ ] quote_chatbot_submit_success chega após envio válido.
- [ ] generate_lead chega no envio válido.
- [ ] contact_whatsapp_click chega com source e device_type.
- [ ] contact_phone_click chega com source.
- [ ] portfolio_project_click chega com project_category e source.
- [ ] portfolio_view_all_click chega com source.

### 7.3 Conversões e definições personalizadas

- [ ] generate_lead marcada como conversão.
- [ ] quote_chatbot_submit_success NÃO marcada como conversão (evitar duplicidade) ou marcada conscientemente.
- [ ] Dimensão customizada criada: source.
- [ ] Dimensão customizada criada: device_type.
- [ ] Dimensão customizada criada: error_type.
- [ ] Dimensão customizada criada: project_category.
- [ ] Dimensão customizada criada: lead_source.
- [ ] Dimensão customizada criada: lead_type.
- [ ] (Opcional) Dimensão customizada criada: project_id.
- [ ] (Opcional) Métrica customizada criada: answered_questions.

### 7.4 Validação funcional (teste guiado)

- [ ] Abrir chatbot pelo header desktop e conferir source=header_desktop.
- [ ] Abrir chatbot pelo header mobile e conferir source=header_mobile.
- [ ] Abrir chatbot pelo hero e conferir source=home_hero.
- [ ] Abrir chatbot pelo CTA e conferir source=home_cta_section.
- [ ] Simular telefone inválido e validar error_type=phone_invalid.
- [ ] Simular envio válido e validar generate_lead.
- [ ] Clicar no WhatsApp em mobile e validar device_type=mobile.
- [ ] Clicar no WhatsApp em desktop e validar device_type=desktop.

### 7.5 Explorações e relatórios

- [ ] Funil criado: quote_chatbot_open -> quote_chatbot_submit_attempt -> quote_chatbot_submit_success -> generate_lead.
- [ ] Exploração de erros criada por error_type e source.
- [ ] Exploração de portfólio criada por project_category e source.

### 7.6 Go-live

- [ ] Todos os itens obrigatórios foram concluídos.
- [ ] Evidências salvas (prints do Realtime/DebugView).
- [ ] Time alinhado sobre métrica oficial de conversão (generate_lead).
- [ ] Data de revisão agendada para 15 dias após go-live.

## 8. Observações de governança

1. Padrão de nomes atual está consistente com GA4.
2. Evite renomear eventos já publicados para não quebrar histórico.
3. Para novos eventos, manter prefixos por contexto:

- quote*chatbot*
- contact\_
- portfolio\_

4. Se no futuro migrar para GTM, manter os mesmos nomes de eventos para preservar continuidade histórica.
