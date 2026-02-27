import {
  DraftingCompass,
  Flame,
  HardHat,
  HousePlus,
  PencilRuler,
  Wrench,
} from "lucide-react";

export const servicesList = [
  {
    key: "gestao",
    title: "Gestão de Obras",
    description:
      "Planejamento estratégico e acompanhamento rigoroso para garantir a melhor execução",
    icon: HardHat,
    highlights: [
      "Controle de Prazos e Custos",
      "Garantia de Qualidade",
      "Conformidade ABNT",
    ],
  },
  {
    key: "laudos",
    title: "Inspeções e Laudos",
    description:
      "Avaliações técnicas detalhadas para garantir segurança e conformidade legal",
    icon: PencilRuler,
    highlights: [
      "Laudos Periciais e Normativos",
      "Vistorias Cautelares",
      "Inspeção e Classificação de Risco",
    ],
  },
  {
    key: "complementares",
    title: "Projetos Complementares",
    description:
      "Soluções integradas de arquitetura e engenharia para obras complexas",
    icon: HousePlus,
    highlights: [
      "Projeto Estrutural",
      "Projeto Elétrico",
      "Projeto Hidrossanitário",
    ],
  },
  {
    key: "arquitetonico",
    title: "Projeto Arquitetônico",
    description:
      "Soluções arquitetônicas funcionais, estéticas e alinhadas às normas técnicas e legislação vigente",
    icon: DraftingCompass,
    highlights: [
      "Estudo Preliminar e Anteprojeto",
      "Projeto Legal para Aprovação",
      "Compatibilização com Projetos Complementares",
    ],
  },
  {
    key: "incendio",
    title: "Projeto de Combate a Incêndio",
    description:
      "Desenvolvimento de sistemas preventivos e de proteção contra incêndio conforme normas técnicas",
    icon: Flame,
    highlights: [
      "Adequação às Exigências do Corpo de Bombeiros",
      "Dimensionamento de Hidrantes e Extintores",
      "Sinalização e Rotas de Fuga",
    ],
  },
  {
    key: "manutencao",
    title: "Manutenção e Conservação Predial",
    description:
      "Disponibilização de profissionais especializados para atuar diretamente na empresa contratante",
    icon: Wrench,
    highlights: [
      "Alocação de Profissionais Especializados",
      "Manutenção Preventiva e Corretiva",
      "Execução Contínua de Serviços Prediais",
    ],
  },
];
