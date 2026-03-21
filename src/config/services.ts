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
      title: "Gestão de Obras e Planejamento",
      description:
        "Gerenciamento de obras com planejamento estratégico, controle de custos e acompanhamento técnico em todas as etapas do projeto. Nosso trabalho garante qualidade na execução, cumprimento de prazos e melhor organização dos recursos, assegurando eficiência e segurança no desenvolvimento do empreendimento.",
      items: [
        "Planejamento e Cronograma",
        "Controle de Orçamento",
        "Fiscalização Técnica",
        "Gestão de Documentação",
        "Relatórios e Indicadores",
      ],
      icon: HardHat,
      image: "/static/images/services/gestao_de_obras.jpg",
      buttonText: "Saiba Mais",
    },
    {
      key: "arquitetonico",
      category: "Concepção",
      title: "Projeto Arquitetônico e Maquete Eletrônica 3D",
      description:
        "Criamos projetos arquitetônicos que unem estética, funcionalidade e viabilidade técnica. Trabalhamos lado a lado com você, desde os primeiros esboços até a aprovação legal, para garantir que o resultado final seja exatamente como você sonhou.",
      items: [
        "Estudo de Viabilidade",
        "Projeto Executivo Detalhado",
        "Maquete Eletrônica 3D para visualização realista",
      ],
      icon: DraftingCompass,
      image: "/static/images/services/projeto_arquitetonico.jpg",
      buttonText: "Saiba Mais",
    },
    {
      key: "complementares",
      category: "Infraestrutura",
      title: "Projetos Complementares Integrados",
      description:
        "Desenvolvemos os projetos essenciais que dão vida e funcionalidade à sua edificação. Nossas soluções de engenharia (estrutural, hidrossanitária e elétrica) são totalmente integradas, garantindo segurança, eficiência e conformidade com as normas técnicas.",
      items: [
        "Projeto Estrutural",
        "Projeto Hidrossanitário",
        "Projeto Elétrico",
      ],
      icon: HousePlus,
      image: "/static/images/services/projetos_complementares.png",
      buttonText: "Saiba Mais",
    },
    {
      key: "laudos",
      category: "Diagnóstico Técnico",
      title: "Perícias e Laudos Técnicos de Engenharia",
      description:
        "Oferecemos suporte técnico especializado para questões judiciais, extrajudiciais e patrimoniais. Nossos laudos e perícias são elaborados com precisão e imparcialidade, fornecendo a fundamentação técnica necessária para suas decisões, negociações e processos.",
      items: [
        "Laudos para Processos Judiciais e Extrajudiciais",
        "Perícias de Engenharia",
        "Inspeção Predial e Laudo de Vistoria",
        "Assistência Técnica em Processos",
      ],
      icon: PencilRuler,
      image: "/static/images/services/inspecao_e_laudos.jpg",
      buttonText: "Saiba Mais",
    },
    {
      key: "incendio",
      category: "Segurança e Normas",
      title: "Segurança Contra Incêndio e Regularizações (AVCB/CLCB)",
      description:
        "Garantimos a segurança e a regularização completa do seu imóvel. Oferecemos uma solução ponta a ponta, desde a elaboração do projeto até a execução das instalações e a obtenção ou renovação do seu AVCB (Auto de Vistoria do Corpo de Bombeiros) e CLCB.",
      items: [
        "Emissão e Renovação de AVCB e CLCB",
        "Projetos de Prevenção e Combate a Incêndio (PPCI)",
        "Execução e Instalação dos Sistemas de Segurança",
      ],
      icon: Flame,
      image: "/static/images/services/combate_incendio.jpg",
      buttonText: "Saiba Mais",
    },
    {
      key: "manutencao",
      category: "Gestão de Ativos",
      title: "Manutenção e Conservação Predial",
      description:
        "Serviços contínuos de manutenção predial voltados à preservação, segurança e bom funcionamento das instalações. Atuamos de forma preventiva e corretiva para manter sistemas, estruturas e equipamentos em condições adequadas, garantindo eficiência operacional, maior durabilidade dos componentes e conservação do patrimônio.",
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
