import {
  Droplets,
  Flame,
  HousePlus,
  PencilRuler,
  Wind,
  Zap,
} from "lucide-react";

export const servicesList = [
  {
    key: "gestao",
    title: "Gestão de Obras",
    description:
      "Planejamento, acompanhamento e controle da execução para garantir prazo, custo e qualidade",
    icon: HousePlus,
  },
  {
    key: "arquitetonico",
    title: "Projeto Arquitetônico",
    description:
      "Plantas baixas, cortes, fachadas e detalhamentos completos para sua edificação",
    icon: PencilRuler,
  },
  {
    key: "estrutural",
    title: "Projeto Estrutural",
    description:
      "Dimensionamento e detalhamento da estrutura para garantir segurança, estabilidade e desempenho",
    icon: Wind,
  },
  {
    key: "hidrossanitario",
    title: "Projeto Hidrossanitário",
    description:
      "Soluções de água, esgoto e drenagem, assegurando funcionamento eficiente e conforme normas",
    icon: Droplets,
  },
  {
    key: "eletrico",
    title: "Projeto Elétrico",
    description:
      "Distribuição de energia, iluminação e pontos elétricos com segurança, eficiência e conformidade técnica",
    icon: Zap,
  },
  {
    key: "incendio",
    title: "Projeto de Combate a Incêndio",
    description:
      "Medidas de prevenção e proteção contra incêndio, atendendo às exigências legais e de segurança",
    icon: Flame,
  },
];
