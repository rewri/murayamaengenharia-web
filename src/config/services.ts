import {
  DraftingCompass,
  Flame,
  HardHat,
  HousePlus,
  PencilRuler,
  Wrench,
} from "lucide-react";

export const servicesPageData = {
  pageTitle: "Nossos Serviços",
  pageSubtitle:
    "Oferecemos soluções completas em engenharia, construção, projetos técnicos, inspeções e manutenção predial.",
  sections: [
    {
      key: "gestao",
      category: "Execução e Controle",
      title: "Gestão de Obras",
      description:
        "Gerenciamento de obras com planejamento estratégico, controle de custos e acompanhamento técnico completo, garantindo qualidade, cumprimento de prazos e eficiência operacional.",
      items: [
        "Planejamento e Cronograma",
        "Controle de Orçamento",
        "Fiscalização Técnica",
        "Gestão de Documentação",
        "Relatórios e Indicadores",
        "Diário de Obra Digital",
      ],
      icon: HardHat,
      image: "/static/images/services/gestao_de_obras.jpg",
      buttonText: "Saiba Mais",
    },
    {
      key: "laudos",
      category: "Diagnóstico Técnico",
      title: "Inspeções e Laudos",
      description:
        "Realizamos perícias detalhadas para avaliar a saúde estrutural das edificações, identificando patologias, irregularidades e necessidades preventivas.",
      items: [
        "Laudo Técnico de Vistoria",
        "Inspeção Predial",
        "Perícias de Engenharia",
        "Diagnóstico de Patologias",
        "Análise Estrutural",
        "ART e Responsabilidade Técnica",
      ],
      icon: PencilRuler,
      image: "/static/images/services/inspecao_e_laudos.jpg",
      buttonText: "Saiba Mais",
    },
    {
      key: "complementares",
      category: "Infraestrutura",
      title: "Projetos Complementares",
      description:
        "Desenvolvemos projetos técnicos complementares alinhados às normas vigentes, assegurando segurança, desempenho e compatibilidade entre sistemas.",
      items: [
        "Projeto Estrutural",
        "Projeto Hidrossanitário",
        "Projeto Elétrico",
        "Projeto de Prevenção e Combate a Incêndio",
        "Projeto Luminotécnico",
        "Automação Predial",
      ],
      icon: HousePlus,
      image: "/static/images/services/projetos_complementares.png",
      buttonText: "Saiba Mais",
    },
    {
      key: "arquitetonico",
      category: "Concepção",
      title: "Projeto Arquitetônico",
      description:
        "Desenvolvemos projetos arquitetônicos completos, com soluções funcionais, técnicas e estéticas, desde o estudo preliminar até a aprovação legal.",
      items: [
        "Estudo de Viabilidade",
        "Projeto Executivo",
        "Maquete Eletrônica 3D",
        "Projeto Humanizado",
        "Regularização e Aprovação Legal",
      ],
      icon: DraftingCompass,
      image: "/static/images/services/projeto_arquitetonico.jpg",
      buttonText: "Saiba Mais",
    },
    {
      key: "incendio",
      category: "Segurança e Normas",
      title: "Combate a Incêndio",
      description:
        "Desenvolvimento e regularização de projetos contra incêndio (PPCI), atendendo às exigências do Corpo de Bombeiros e normas técnicas vigentes.",
      items: [
        "Rede de Hidrantes",
        "Sistema de Sprinklers",
        "Alarme e Detecção",
        "Sinalização de Emergência",
        "Rota de Fuga e Iluminação",
        "Obtenção de AVCB / CLCB",
      ],
      icon: Flame,
      image: "/static/images/services/combate_incendio.jpg",
      buttonText: "Saiba Mais",
    },
    {
      key: "manutencao",
      category: "Gestão de Ativos",
      title: "Manutenção e Conservação",
      description:
        "Serviços contínuos de manutenção predial com foco em eficiência operacional, segurança e conservação das instalações.",
      items: [
        "Plano de Manutenção (PMOC)",
        "Manutenção Preventiva",
        "Manutenção Corretiva",
        "Relatórios Técnicos",
        "Gestão de Contratos",
        "Acompanhamento Técnico",
      ],
      icon: Wrench,
      image: "/static/images/services/manutencao_predial.png",
      buttonText: "Saiba Mais",
    },
  ],
};

// Manter compatibilidade com ServicesList da home
export const servicesList = servicesPageData.sections.map((section) => ({
  key: section.key,
  title: section.title,
  description: section.description,
  icon: section.icon,
  highlights: section.items.slice(0, 3), // Usar os 3 primeiros items como highlights
}));
