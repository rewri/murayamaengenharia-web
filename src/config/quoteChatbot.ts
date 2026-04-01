export interface QuoteQuestionOption {
  value: string;
  label: string;
}

export interface QuoteQuestion {
  id: string;
  prompt: string;
  options: QuoteQuestionOption[];
}

export const quoteChatbotIntro =
  "Responda as perguntas abaixo para um pré-orçamento inicial. Em menos de 2 minutos você conclui e nossa equipe retornará com os próximos passos.";

export const quoteQuestions: QuoteQuestion[] = [
  {
    id: "service",
    prompt: "Qual serviço você precisa?",
    options: [
      { value: "obra_completa", label: "Obra completa" },
      { value: "projeto_arquitetonico", label: "Projeto arquitetônico" },
      {
        value: "projeto_complementar",
        label: "Projeto complementar (elétrico / sanitário)",
      },
      { value: "incendio", label: "Projetos de combate a incêndio" },
      { value: "laudo_pericia", label: "Perícia ou laudo técnico" },
      { value: "manutencao_predial", label: "Manutenção predial" },
      { value: "outro", label: "Outro" },
    ],
  },
  {
    id: "project_type",
    prompt: "Qual é o tipo do empreendimento?",
    options: [
      { value: "residencial", label: "Residencial" },
      { value: "comercial", label: "Comercial" },
      { value: "industrial", label: "Industrial" },
      { value: "institucional", label: "Institucional / governamental" },
      { value: "outro", label: "Outro" },
    ],
  },
  {
    id: "stage",
    prompt: "Em que etapa você está?",
    options: [
      { value: "ideia", label: "Ideia inicial" },
      { value: "anteprojeto", label: "Anteprojeto" },
      { value: "projeto_aprovado", label: "Projeto aprovado" },
      { value: "obra_andamento", label: "Obra em andamento" },
      { value: "reforma", label: "Reforma" },
    ],
  },
  {
    id: "goal",
    prompt: "Qual é o objetivo principal?",
    options: [
      { value: "construir", label: "Construir" },
      { value: "reformar", label: "Reformar" },
      { value: "ampliar", label: "Ampliar" },
      { value: "regularizar", label: "Regularizar" },
      { value: "vistoriar", label: "Vistoriar / laudar" },
    ],
  },
  {
    id: "location",
    prompt: "Onde fica o projeto?",
    options: [
      { value: "botucatu", label: "Botucatu" },
      { value: "regiao", label: "Região próxima" },
      { value: "outro_estado", label: "Outro estado" },
    ],
  },
  {
    id: "area_range",
    prompt: "Qual área aproximada?",
    options: [
      { value: "ate_100", label: "Até 100m²" },
      { value: "101_300", label: "101m² a 300m²" },
      { value: "301_1000", label: "301m² a 1000m²" },
      { value: "acima_1000", label: "Acima de 1000m²" },
      { value: "nao_sei", label: "Não sei informar" },
    ],
  },
  {
    id: "start_deadline",
    prompt: "Qual o prazo desejado para início?",
    options: [
      { value: "imediato", label: "Imediato" },
      { value: "1_3_meses", label: "De 1 a 3 meses" },
      { value: "3_6_meses", label: "De 3 a 6 meses" },
      { value: "mais_6_meses", label: "Acima de 6 meses" },
    ],
  },
  {
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
] as const;

export const quoteChatbotTitle = "Solicitar orçamento";
