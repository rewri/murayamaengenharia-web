# Documentação de Fluxo do Chatbot de Orçamento

**Última atualização:** April 17, 2026  
**Versão:** 1.0  
**Propósito:** Documentação completa da árvore de perguntas e respostas do chatbot de orçamento por serviço.

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Fluxo Base (Pregunta Inicial)](#fluxo-base-pergunta-inicial)
3. [Árvores por Serviço](#árvores-por-serviço)
4. [Fluxo Universal (Perguntas Finais)](#fluxo-universal-perguntas-finais)
5. [Notas e Considerações](#notas-e-considerações)

---

## Visão Geral

O chatbot de orçamento é um fluxo condicional que se divide em ramos específicos baseado no serviço selecionado na primeira pergunta. Cada ramo pode ter perguntas intermediárias únicas antes de convergir para um conjunto de perguntas universais no final.

**Estrutura Geral:**

- **Primeiro nó:** `service` (seleção de serviço)
- **Ramos intermediários:** Específicos por serviço
- **Ramos universais:** `area_range` → `location` → `start_deadline` → `budget_range`

---

## Fluxo Base: Pergunta Inicial

### 1. `service`

**Pergunta:** "Qual serviço você precisa?"

**Opções e Próximas Perguntas:**

| Valor                   | Rótulo                        | Próximo Nó                 |
| ----------------------- | ----------------------------- | -------------------------- |
| `obra_completa`         | Obra completa                 | `obra_tipo`                |
| `projeto_arquitetonico` | Projeto arquitetônico         | `arq_objetivo`             |
| `projeto_estrutural`    | Projeto estrutural            | `estrutural_tipo`          |
| `projeto_complementar`  | Projeto elétrico / hidráulico | `complementar_tipo`        |
| `incendio`              | Projeto de combate a incêndio | `incendio_tipo`            |
| `laudo_pericia`         | Perícia ou laudo técnico      | `pericia_tipo`             |
| `manutencao_predial`    | Manutenção predial            | `manutencao_periodicidade` |
| `outro`                 | Outro                         | `project_type_generic`     |

---

## Árvores por Serviço

### 📐 1. OBRA COMPLETA

**Entrada:** `service` = "obra_completa"

```
obra_completa
    ↓
obra_tipo (Qual é o tipo do empreendimento?)
    ├─ residencial
    ├─ comercial
    ├─ industrial
    ├─ institucional
    └─ outro
        ↓
obra_stage (Em que etapa a obra se encontra?)
    ├─ ideia (Ideia inicial / terreno)
    ├─ anteprojeto (Anteprojeto desenvolvimento)
    ├─ projeto_aprovado (Projeto aprovado, iniciar obra)
    ├─ obra_andamento (Obra já em andamento)
    ├─ reforma (Reforma de edificação existente)
    └─ outro
        ↓
area_range [UNIVERSAL]
```

**Nós do Ramo:**

#### `obra_tipo`

**Pergunta:** "Qual é o tipo do empreendimento?"  
**Próximo Nó Padrão:** `obra_stage`

| Valor           | Rótulo                        |
| --------------- | ----------------------------- |
| `residencial`   | Residencial                   |
| `comercial`     | Comercial                     |
| `industrial`    | Industrial                    |
| `institucional` | Institucional / governamental |
| `outro`         | Outro                         |

#### `obra_stage`

**Pergunta:** "Em que etapa a obra se encontra?"  
**Próximo Nó Padrão:** `area_range`

| Valor              | Rótulo                          |
| ------------------ | ------------------------------- |
| `ideia`            | Ideia inicial / terreno         |
| `anteprojeto`      | Anteprojeto desenvolvimento     |
| `projeto_aprovado` | Projeto aprovado, iniciar obra  |
| `obra_andamento`   | Obra já em andamento            |
| `reforma`          | Reforma de edificação existente |
| `outro`            | Outro                           |

---

### 🏗️ 2. PROJETO ARQUITETÔNICO

**Entrada:** `service` = "projeto_arquitetonico"

```
projeto_arquitetonico
    ↓
arq_objetivo (Qual é o objetivo do projeto arquitetônico?)
    ├─ novo (Criar novo projeto do zero)
    ├─ atualizar_planta (Atualizar ou revisar planta existente)
    ├─ regularizar (Regularizar junto à prefeitura)
    ├─ reforma (Projeto para reforma / ampliação)
    └─ outro
        ↓
arq_projeto_tipo (Qual é o tipo do empreendimento?)
    ├─ residencial
    ├─ comercial
    ├─ industrial
    ├─ institucional
    └─ outro
        ↓
area_range [UNIVERSAL]
```

**Nós do Ramo:**

#### `arq_objetivo`

**Pergunta:** "Qual é o objetivo do projeto arquitetônico?"  
**Próximo Nó Padrão:** `arq_projeto_tipo`

| Valor              | Rótulo                                |
| ------------------ | ------------------------------------- |
| `novo`             | Criar novo projeto do zero            |
| `atualizar_planta` | Atualizar ou revisar planta existente |
| `regularizar`      | Regularizar junto à prefeitura        |
| `reforma`          | Projeto para reforma / ampliação      |
| `outro`            | Outro                                 |

#### `arq_projeto_tipo`

**Pergunta:** "Qual é o tipo do empreendimento?"  
**Próximo Nó Padrão:** `area_range`

| Valor           | Rótulo                        |
| --------------- | ----------------------------- |
| `residencial`   | Residencial                   |
| `comercial`     | Comercial                     |
| `industrial`    | Industrial                    |
| `institucional` | Institucional / governamental |
| `outro`         | Outro                         |

---

### 🏢 3. PROJETO ESTRUTURAL

**Entrada:** `service` = "projeto_estrutural"

```
projeto_estrutural
    ↓
estrutural_tipo (Qual é a situação do projeto estrutural?)
    ├─ novo (Estrutura nova)
    ├─ reforma_ampliacao (Reforma ou ampliação)
    ├─ calculo_revisao (Revisão / recalculo de estrutura)
    ├─ laudo_estrutural (Laudo de avaliação estrutural)
    └─ outro
        ↓
estrutural_empreendimento (Qual é o tipo do empreendimento?)
    ├─ residencial
    ├─ comercial
    ├─ industrial
    ├─ institucional
    └─ outro
        ↓
area_range [UNIVERSAL]
```

**Nós do Ramo:**

#### `estrutural_tipo`

**Pergunta:** "Qual é a situação do projeto estrutural?"  
**Próximo Nó Padrão:** `estrutural_empreendimento`

| Valor               | Rótulo                          |
| ------------------- | ------------------------------- |
| `novo`              | Estrutura nova                  |
| `reforma_ampliacao` | Reforma ou ampliação            |
| `calculo_revisao`   | Revisão / recalulo de estrutura |
| `laudo_estrutural`  | Laudo de avaliação estrutural   |
| `outro`             | Outro                           |

#### `estrutural_empreendimento`

**Pergunta:** "Qual é o tipo do empreendimento?"  
**Próximo Nó Padrão:** `area_range`

| Valor           | Rótulo                        |
| --------------- | ----------------------------- |
| `residencial`   | Residencial                   |
| `comercial`     | Comercial                     |
| `industrial`    | Industrial                    |
| `institucional` | Institucional / governamental |
| `outro`         | Outro                         |

---

### ⚡ 4. PROJETO COMPLEMENTAR (Elétrico / Hidráulico)

**Entrada:** `service` = "projeto_complementar"

```
projeto_complementar
    ↓
complementar_tipo (Qual projeto complementar você precisa?)
    ├─ eletrico (Elétrico)
    ├─ hidraulico (Hidráulico / sanitário)
    ├─ eletrico_hidraulico (Elétrico e hidráulico)
    ├─ ar_condicionado (Ar-condicionado / climatização)
    └─ outro
        ↓
complementar_empreendimento (Qual é o tipo do empreendimento?)
    ├─ residencial
    ├─ comercial
    ├─ industrial
    ├─ institucional
    └─ outro
        ↓
area_range [UNIVERSAL]
```

**Nós do Ramo:**

#### `complementar_tipo`

**Pergunta:** "Qual projeto complementar você precisa?"  
**Próximo Nó Padrão:** `complementar_empreendimento`

| Valor                 | Rótulo                         |
| --------------------- | ------------------------------ |
| `eletrico`            | Elétrico                       |
| `hidraulico`          | Hidráulico / sanitário         |
| `eletrico_hidraulico` | Elétrico e hidráulico          |
| `ar_condicionado`     | Ar-condicionado / climatização |
| `outro`               | Outro                          |

#### `complementar_empreendimento`

**Pergunta:** "Qual é o tipo do empreendimento?"  
**Próximo Nó Padrão:** `area_range`

| Valor           | Rótulo                        |
| --------------- | ----------------------------- |
| `residencial`   | Residencial                   |
| `comercial`     | Comercial                     |
| `industrial`    | Industrial                    |
| `institucional` | Institucional / governamental |
| `outro`         | Outro                         |

---

### 🚒 5. PROJETO DE COMBATE A INCÊNDIO

**Entrada:** `service` = "incendio"

```
incendio
    ↓
incendio_tipo (Qual é o tipo de demanda no combate a incêndio?)
    ├─ avcb (AVCB - Auto de Vistoria do Corpo de Bombeiros)
    ├─ clcb (CLCB - Certificado de Licença do Corpo de Bombeiros)
    ├─ adequacao (Adequação de sistema existente)
    ├─ analise_conformidade (Análise de conformidade)
    ├─ laudo_tecnico (Laudo técnico)
    ├─ orcamento (Apenas orçamento)
    └─ outro
        ↓
incendio_sistema (Qual sistema de combate a incêndio está envolvido?)
    ├─ sprinklers (Sprinklers / chuveiros automáticos)
    ├─ hidrante (Hidrante e mangotinho)
    ├─ extintores (Extintores)
    ├─ alarme_deteccao (Alarme e detecção de fumaça)
    ├─ sistema_completo (Sistema completo integrado)
    └─ outro
        ↓
area_range [UNIVERSAL]
```

**Nós do Ramo:**

#### `incendio_tipo`

**Pergunta:** "Qual é o tipo de demanda no combate a incêndio?"  
**Próximo Nó Padrão:** `incendio_sistema`

| Valor                  | Rótulo                                              |
| ---------------------- | --------------------------------------------------- |
| `avcb`                 | AVCB (Auto de Vistoria do Corpo de Bombeiros)       |
| `clcb`                 | CLCB (Certificado de Licença do Corpo de Bombeiros) |
| `adequacao`            | Adequação de sistema existente                      |
| `analise_conformidade` | Análise de conformidade                             |
| `laudo_tecnico`        | Laudo técnico                                       |
| `orcamento`            | Apenas orçamento                                    |
| `outro`                | Outro                                               |

#### `incendio_sistema`

**Pergunta:** "Qual sistema de combate a incêndio está envolvido?"  
**Próximo Nó Padrão:** `area_range`

| Valor              | Rótulo                             |
| ------------------ | ---------------------------------- |
| `sprinklers`       | Sprinklers / chuveiros automáticos |
| `hidrante`         | Hidrante e mangotinho              |
| `extintores`       | Extintores                         |
| `alarme_deteccao`  | Alarme e detecção de fumaça        |
| `sistema_completo` | Sistema completo integrado         |
| `outro`            | Outro                              |

---

### 📋 6. PERÍCIA OU LAUDO TÉCNICO

**Entrada:** `service` = "laudo_pericia"

```
laudo_pericia
    ↓
pericia_tipo (Qual tipo de perícia ou laudo você precisa?)
    ├─ patologia (Diagnóstico de patologia)
    ├─ vistoria_pre_compra (Vistoria pré-compra de imóvel)
    ├─ avaliacao_estrutural (Avaliação de estrutura)
    ├─ parecer_tecnico (Parecer técnico)
    ├─ pericia_judicial (Perícia judicial)
    └─ outro
        ↓
pericia_profundidade (Qual nível de detalhamento você precisa?)
    ├─ parecer_simples (Somente parecer técnico)
    ├─ laudo_detalhado (Laudo detalhado com medições e ensaios)
    └─ outro
        ↓
area_range [UNIVERSAL]
```

**Nós do Ramo:**

#### `pericia_tipo`

**Pergunta:** "Qual tipo de perícia ou laudo você precisa?"  
**Próximo Nó Padrão:** `pericia_profundidade`

| Valor                  | Rótulo                                                   |
| ---------------------- | -------------------------------------------------------- |
| `patologia`            | Diagnóstico de patologia (rachaduras, infiltrações etc.) |
| `vistoria_pre_compra`  | Vistoria pré-compra de imóvel                            |
| `avaliacao_estrutural` | Avaliação de estrutura (resistência, vida útil)          |
| `parecer_tecnico`      | Parecer técnico                                          |
| `pericia_judicial`     | Perícia judicial                                         |
| `outro`                | Outro                                                    |

#### `pericia_profundidade`

**Pergunta:** "Qual nível de detalhamento você precisa?"  
**Próximo Nó Padrão:** `area_range`

| Valor             | Rótulo                                                                |
| ----------------- | --------------------------------------------------------------------- |
| `parecer_simples` | Somente parecer técnico (análise visual e conclusão)                  |
| `laudo_detalhado` | Laudo detalhado com medições, ensaios e registro fotográfico completo |
| `outro`           | Outro                                                                 |

---

### 🔧 7. MANUTENÇÃO PREDIAL

**Entrada:** `service` = "manutencao_predial"

```
manutencao_predial
    ↓
manutencao_periodicidade (Como será o regime de manutenção?)
    ├─ pontual (Pontual - serviço específico)
    ├─ contrato_periodo (Contrato por período determinado)
    ├─ permanente (Manutenção permanente / contínua)
    └─ outro
        ↓
manutencao_tipo (Qual é o tipo do empreendimento a manter?)
    ├─ residencial
    ├─ comercial
    ├─ industrial
    ├─ institucional
    └─ outro
        ↓
area_range [UNIVERSAL]
```

**Nós do Ramo:**

#### `manutencao_periodicidade`

**Pergunta:** "Como será o regime de manutenção?"  
**Próximo Nó Padrão:** `manutencao_tipo`

| Valor              | Rótulo                                              |
| ------------------ | --------------------------------------------------- |
| `pontual`          | Pontual (serviço específico, sem contrato contínuo) |
| `contrato_periodo` | Contrato por período determinado                    |
| `permanente`       | Manutenção permanente / contínua                    |
| `outro`            | Outro                                               |

#### `manutencao_tipo`

**Pergunta:** "Qual é o tipo do empreendimento a manter?"  
**Próximo Nó Padrão:** `area_range`

| Valor           | Rótulo                        |
| --------------- | ----------------------------- |
| `residencial`   | Residencial                   |
| `comercial`     | Comercial                     |
| `industrial`    | Industrial                    |
| `institucional` | Institucional / governamental |
| `outro`         | Outro                         |

---

### ❓ 8. OUTRO SERVIÇO

**Entrada:** `service` = "outro"

```
outro
    ↓
project_type_generic (Qual é o tipo do empreendimento?)
    ├─ residencial
    ├─ comercial
    ├─ industrial
    ├─ institucional
    └─ outro
        ↓
area_range [UNIVERSAL]
```

**Nós do Ramo:**

#### `project_type_generic`

**Pergunta:** "Qual é o tipo do empreendimento?"  
**Próximo Nó Padrão:** `area_range`

| Valor           | Rótulo                        |
| --------------- | ----------------------------- |
| `residencial`   | Residencial                   |
| `comercial`     | Comercial                     |
| `industrial`    | Industrial                    |
| `institucional` | Institucional / governamental |
| `outro`         | Outro                         |

---

## Fluxo Universal: Perguntas Finais

Todas as árvores convergem para estas perguntas no final do fluxo:

### `area_range`

**Pergunta:** "Qual é a área aproximada do projeto?"  
**Próximo Nó Padrão:** `location`

| Valor        | Rótulo           |
| ------------ | ---------------- |
| `ate_100`    | Até 100m²        |
| `101_300`    | 101m² a 300m²    |
| `301_1000`   | 301m² a 1000m²   |
| `acima_1000` | Acima de 1000m²  |
| `nao_sei`    | Não sei informar |

---

### `location`

**Pergunta:** "Onde fica o projeto?"  
**Próximo Nó Padrão:** `start_deadline`

| Valor          | Rótulo                          |
| -------------- | ------------------------------- |
| `botucatu`     | Botucatu                        |
| `regiao`       | Região próxima (interior de SP) |
| `outro_estado` | Outro estado                    |

---

### `start_deadline`

**Pergunta:** "Qual o prazo desejado para início?"  
**Próximo Nó Padrão:** `budget_range`

| Valor          | Rótulo           |
| -------------- | ---------------- |
| `imediato`     | Imediato         |
| `1_3_meses`    | De 1 a 3 meses   |
| `3_6_meses`    | De 3 a 6 meses   |
| `mais_6_meses` | Acima de 6 meses |

---

### `budget_range`

**Pergunta:** "Qual faixa de investimento prevista?"  
**Próximo Nó Padrão:** Fim do fluxo (formulário de contato)

| Valor                  | Rótulo                   |
| ---------------------- | ------------------------ |
| `ate_100k`             | Até R$ 100 mil           |
| `100_300k`             | R$ 100 mil a R$ 300 mil  |
| `300k_1m`              | R$ 300 mil a R$ 1 milhão |
| `acima_1m`             | Acima de R$ 1 milhão     |
| `prefiro_nao_informar` | Prefiro não informar     |

---

## Notas e Considerações

### Estrutura Técnica

- **Arquivo de Configuração:** `src/config/quoteChatbot.ts`
- **Tipos TypeScript:** `src/types/quoteChatbot.ts`
- **Componente Principal:** `src/components/features/contact/QuoteChatbotModal.tsx`

### Convenções de Valor (Value)

- Valores são em **snake_case** e em **inglês**
- Rótulos (labels) são em **português** com **primeira letra minúscula**
- Não há espaços nos valores; use underscores para separação

### Fluxo de Dados

1. Usuário seleciona opção
2. A resposta é armazenada em `answers` com chave = `id` da pergunta
3. O valor é o `value` da opção selecionada
4. Próxima pergunta é determinada por `nextId` (sequencial) ou `defaultNextId` (fallback)
5. Ao fim, dados são submetidos com nome, telefone, email e respostas

### Alterações Futuras

Para adicionar/remover/modificar opções:

1. Localize o nó específico nesta documentação
2. Faça a alteração em `src/config/quoteChatbot.ts`
3. Atualize esta documentação para manter sincronismo
4. Execute `npm run lint` para validar TypeScript
5. Execute `npm run dev` para testar no chatbot

### Exemplo de Payload Submetido

```json
{
  "source": "site_chatbot",
  "submittedAt": "2024-04-17T14:30:00Z",
  "answers": {
    "service": "projeto_arquitetonico",
    "arq_objetivo": "novo",
    "arq_projeto_tipo": "residencial",
    "area_range": "101_300",
    "location": "botucatu",
    "start_deadline": "1_3_meses",
    "budget_range": "100_300k"
  },
  "contact": {
    "name": "João Silva",
    "phone": "+55 14 99999-9999",
    "email": "joao@email.com"
  }
}
```

---

**Status:** ✅ Completo e Sincronizado  
**Próxima Revisão:** Quando houver alterações no fluxo de perguntas ou serviços
