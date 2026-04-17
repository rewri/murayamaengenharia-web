export interface QuoteQuestionOption {
  value: string;
  label: string;
  nextId?: string;
}

export interface QuoteQuestion {
  id: string;
  prompt: string;
  options: QuoteQuestionOption[];
  defaultNextId?: string;
}

export const quoteChatbotIntro =
  "Responda as perguntas abaixo para um pré-orçamento inicial. Em menos de 2 minutos você conclui e nossa equipe retornará com os próximos passos.";

export const quoteQuestionsMap: Record<string, QuoteQuestion> = {
  service: {
    id: "service",
    prompt: "Qual serviço você precisa?",
    options: [
      { value: "obra_completa", label: "Obra completa", nextId: "obra_tipo" },
      {
        value: "projeto_arquitetonico",
        label: "Projeto arquitetônico",
        nextId: "arq_objetivo",
      },
      {
        value: "projeto_estrutural",
        label: "Projeto estrutural",
        nextId: "estrutural_tipo",
      },
      {
        value: "projeto_complementar",
        label: "Projeto elétrico / hidráulico",
        nextId: "complementar_tipo",
      },
      {
        value: "incendio",
        label: "Projeto de combate a incêndio",
        nextId: "incendio_tipo",
      },
      {
        value: "laudo_pericia",
        label: "Perícia ou laudo técnico",
        nextId: "pericia_tipo",
      },
      {
        value: "manutencao_predial",
        label: "Manutenção predial",
        nextId: "manutencao_periodicidade",
      },
      { value: "outro", label: "Outro", nextId: "project_type_generic" },
    ],
  },

  obra_tipo: {
    id: "obra_tipo",
    prompt: "Qual é o tipo do empreendimento?",
    defaultNextId: "obra_stage",
    options: [
      { value: "residencial", label: "Residencial" },
      { value: "comercial", label: "Comercial" },
      { value: "industrial", label: "Industrial" },
      { value: "institucional", label: "Institucional / governamental" },
      { value: "outro", label: "Outro" },
    ],
  },
  obra_stage: {
    id: "obra_stage",
    prompt: "Em que etapa a obra se encontra?",
    defaultNextId: "area_range",
    options: [
      { value: "ideia", label: "Ideia inicial / terreno" },
      { value: "anteprojeto", label: "Anteprojeto desenvolvimento" },
      { value: "projeto_aprovado", label: "Projeto aprovado, iniciar obra" },
      { value: "obra_andamento", label: "Obra já em andamento" },
      { value: "reforma", label: "Reforma de edificação existente" },
      { value: "outro", label: "Outro" },
    ],
  },

  arq_objetivo: {
    id: "arq_objetivo",
    prompt: "Qual é o objetivo do projeto arquitetônico?",
    defaultNextId: "arq_projeto_tipo",
    options: [
      { value: "novo", label: "Criar novo projeto do zero" },
      {
        value: "atualizar_planta",
        label: "Atualizar ou revisar planta existente",
      },
      { value: "regularizar", label: "Regularizar junto à prefeitura" },
      { value: "reforma", label: "Projeto para reforma / ampliação" },
      { value: "outro", label: "Outro" },
    ],
  },
  arq_projeto_tipo: {
    id: "arq_projeto_tipo",
    prompt: "Qual é o tipo do empreendimento?",
    defaultNextId: "area_range",
    options: [
      { value: "residencial", label: "Residencial" },
      { value: "comercial", label: "Comercial" },
      { value: "industrial", label: "Industrial" },
      { value: "institucional", label: "Institucional / governamental" },
      { value: "outro", label: "Outro" },
    ],
  },

  estrutural_tipo: {
    id: "estrutural_tipo",
    prompt: "Qual é a situação do projeto estrutural?",
    defaultNextId: "estrutural_empreendimento",
    options: [
      { value: "novo", label: "Estrutura nova" },
      { value: "reforma_ampliacao", label: "Reforma ou ampliação" },
      { value: "calculo_revisao", label: "Revisão / recalculo de estrutura" },
      { value: "laudo_estrutural", label: "Laudo de avaliação estrutural" },
      { value: "outro", label: "Outro" },
    ],
  },
  estrutural_empreendimento: {
    id: "estrutural_empreendimento",
    prompt: "Qual é o tipo do empreendimento?",
    defaultNextId: "area_range",
    options: [
      { value: "residencial", label: "Residencial" },
      { value: "comercial", label: "Comercial" },
      { value: "industrial", label: "Industrial" },
      { value: "institucional", label: "Institucional / governamental" },
      { value: "outro", label: "Outro" },
    ],
  },

  complementar_tipo: {
    id: "complementar_tipo",
    prompt: "Qual projeto complementar você precisa?",
    defaultNextId: "complementar_empreendimento",
    options: [
      { value: "eletrico", label: "Elétrico" },
      { value: "hidraulico", label: "Hidráulico / sanitário" },
      { value: "eletrico_hidraulico", label: "Elétrico e hidráulico" },
      { value: "ar_condicionado", label: "Ar-condicionado / climatização" },
      { value: "outro", label: "Outro" },
    ],
  },
  complementar_empreendimento: {
    id: "complementar_empreendimento",
    prompt: "Qual é o tipo do empreendimento?",
    defaultNextId: "area_range",
    options: [
      { value: "residencial", label: "Residencial" },
      { value: "comercial", label: "Comercial" },
      { value: "industrial", label: "Industrial" },
      { value: "institucional", label: "Institucional / governamental" },
      { value: "outro", label: "Outro" },
    ],
  },

  incendio_tipo: {
    id: "incendio_tipo",
    prompt: "Qual é o tipo de demanda no combate a incêndio?",
    defaultNextId: "incendio_sistema",
    options: [
      { value: "avcb", label: "AVCB (Auto de Vistoria do Corpo de Bombeiros)" },
      {
        value: "clcb",
        label: "CLCB (Certificado de Licença do Corpo de Bombeiros)",
      },
      { value: "adequacao", label: "Adequação de sistema existente" },
      { value: "analise_conformidade", label: "Análise de conformidade" },
      { value: "laudo_tecnico", label: "Laudo técnico" },
      { value: "orcamento", label: "Apenas orçamento" },
      { value: "outro", label: "Outro" },
    ],
  },
  incendio_sistema: {
    id: "incendio_sistema",
    prompt: "Qual sistema de combate a incêndio está envolvido?",
    defaultNextId: "area_range",
    options: [
      { value: "sprinklers", label: "Sprinklers / chuveiros automáticos" },
      { value: "hidrante", label: "Hidrante e mangotinho" },
      { value: "extintores", label: "Extintores" },
      { value: "alarme_deteccao", label: "Alarme e detecção de fumaça" },
      { value: "sistema_completo", label: "Sistema completo integrado" },
      { value: "outro", label: "Outro" },
    ],
  },

  pericia_tipo: {
    id: "pericia_tipo",
    prompt: "Qual tipo de perícia ou laudo você precisa?",
    defaultNextId: "pericia_profundidade",
    options: [
      {
        value: "patologia",
        label: "Diagnóstico de patologia (rachaduras, infiltrações etc.)",
      },
      { value: "vistoria_pre_compra", label: "Vistoria pré-compra de imóvel" },
      {
        value: "avaliacao_estrutural",
        label: "Avaliação de estrutura (resistência, vida útil)",
      },
      { value: "parecer_tecnico", label: "Parecer técnico" },
      { value: "pericia_judicial", label: "Perícia judicial" },
      { value: "outro", label: "Outro" },
    ],
  },
  pericia_profundidade: {
    id: "pericia_profundidade",
    prompt: "Qual nível de detalhamento você precisa?",
    defaultNextId: "area_range",
    options: [
      {
        value: "parecer_simples",
        label: "Somente parecer técnico (análise visual e conclusão)",
      },
      {
        value: "laudo_detalhado",
        label:
          "Laudo detalhado com medições, ensaios e registro fotográfico completo",
      },
      { value: "outro", label: "Outro" },
    ],
  },

  manutencao_periodicidade: {
    id: "manutencao_periodicidade",
    prompt: "Como será o regime de manutenção?",
    defaultNextId: "manutencao_tipo",
    options: [
      {
        value: "pontual",
        label: "Pontual (serviço específico, sem contrato contínuo)",
      },
      {
        value: "contrato_periodo",
        label: "Contrato por período determinado",
      },
      { value: "permanente", label: "Manutenção permanente / contínua" },
      { value: "outro", label: "Outro" },
    ],
  },
  manutencao_tipo: {
    id: "manutencao_tipo",
    prompt: "Qual é o tipo do empreendimento a manter?",
    defaultNextId: "area_range",
    options: [
      { value: "residencial", label: "Residencial" },
      { value: "comercial", label: "Comercial" },
      { value: "industrial", label: "Industrial" },
      { value: "institucional", label: "Institucional / governamental" },
      { value: "outro", label: "Outro" },
    ],
  },

  project_type_generic: {
    id: "project_type_generic",
    prompt: "Qual é o tipo do empreendimento?",
    defaultNextId: "area_range",
    options: [
      { value: "residencial", label: "Residencial" },
      { value: "comercial", label: "Comercial" },
      { value: "industrial", label: "Industrial" },
      { value: "institucional", label: "Institucional / governamental" },
      { value: "outro", label: "Outro" },
    ],
  },

  area_range: {
    id: "area_range",
    prompt: "Qual é a área aproximada do projeto?",
    defaultNextId: "location",
    options: [
      { value: "ate_100", label: "Até 100m²" },
      { value: "101_300", label: "101m² a 300m²" },
      { value: "301_1000", label: "301m² a 1000m²" },
      { value: "acima_1000", label: "Acima de 1000m²" },
      { value: "nao_sei", label: "Não sei informar" },
    ],
  },
  location: {
    id: "location",
    prompt: "Onde fica o projeto?",
    defaultNextId: "start_deadline",
    options: [
      { value: "botucatu", label: "Botucatu" },
      { value: "regiao", label: "Região próxima (interior de SP)" },
      { value: "outro_estado", label: "Outro estado" },
    ],
  },
  start_deadline: {
    id: "start_deadline",
    prompt: "Qual o prazo desejado para início?",
    defaultNextId: "budget_range",
    options: [
      { value: "imediato", label: "Imediato" },
      { value: "1_3_meses", label: "De 1 a 3 meses" },
      { value: "3_6_meses", label: "De 3 a 6 meses" },
      { value: "mais_6_meses", label: "Acima de 6 meses" },
    ],
  },
  budget_range: {
    id: "budget_range",
    prompt: "Qual faixa de investimento prevista?",
    options: [
      { value: "ate_100k", label: "Até R$ 100 mil" },
      { value: "100_300k", label: "R$ 100 mil a R$ 300 mil" },
      { value: "300k_1m", label: "R$ 300 mil a R$ 1 milhão" },
      { value: "acima_1m", label: "Acima de R$ 1 milhão" },
      { value: "prefiro_nao_informar", label: "Prefiro não informar" },
    ],
  },
};

export const FIRST_QUESTION_ID = "service";

export const quoteChatbotTitle = "Solicitar orçamento";
