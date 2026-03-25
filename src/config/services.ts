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
      details:
        "No serviço de Gestão de Obras e Planejamento, estruturamos o empreendimento desde a fase inicial com definição de escopo, metas, cronograma físico-financeiro e estratégia de execução. Acompanhamos cada etapa com controle de orçamento, medição de produtividade e fiscalização técnica em campo, reduzindo riscos de retrabalho e desvios de prazo. Também organizamos a documentação técnica e contratual, com relatórios periódicos e indicadores de desempenho para apoiar decisões rápidas e seguras ao longo de toda a obra.",
      items: [
        "Planejamento e Cronograma",
        "Controle de Orçamento",
        "Fiscalização Técnica",
        "Gestão de Documentação",
        "Relatórios e Indicadores",
      ],
      icon: HardHat,
      image: "/static/images/services/gestao_de_obras.webp",
      buttonText: "Saiba Mais",
    },
    {
      key: "arquitetonico",
      category: "Concepção",
      title: "Projeto Arquitetônico e Maquete Eletrônica 3D",
      description:
        "Criamos projetos arquitetônicos que unem estética, funcionalidade e viabilidade técnica. Trabalhamos lado a lado com você, desde os primeiros esboços até a aprovação legal, para garantir que o resultado final seja exatamente como você sonhou.",
      details:
        "Desenvolvemos o Projeto Arquitetônico com foco em desempenho do espaço, conforto e identidade visual, considerando normas técnicas, legislação local e viabilidade construtiva. A partir do estudo de viabilidade, evoluímos para soluções de layout, volumetria e definição de materiais até o projeto executivo detalhado. Complementamos esse processo com maquete eletrônica 3D para facilitar a visualização realista do resultado final, validar escolhas com antecedência e dar mais segurança antes do início da obra.",
      items: [
        "Estudo de Viabilidade",
        "Projeto Executivo Detalhado",
        "Maquete Eletrônica 3D para visualização realista",
      ],
      icon: DraftingCompass,
      image: "/static/images/services/projeto_arquitetonico.webp",
      buttonText: "Saiba Mais",
    },
    {
      key: "complementares",
      category: "Infraestrutura",
      title: "Projetos Complementares Integrados",
      description:
        "Desenvolvemos os projetos essenciais que dão vida e funcionalidade à sua edificação. Nossas soluções de engenharia (estrutural, hidrossanitária e elétrica) são totalmente integradas, garantindo segurança, eficiência e conformidade com as normas técnicas.",
      details:
        "Nos Projetos Complementares Integrados, coordenamos disciplinas de engenharia para que estrutura, instalações hidrossanitárias e sistema elétrico funcionem de forma compatível e eficiente. Elaboramos cada projeto com base em cálculos técnicos, critérios de segurança e normas vigentes, evitando conflitos entre sistemas durante a execução. Esse trabalho integrado melhora o desempenho da edificação, otimiza custos de implantação e manutenção e reduz imprevistos no canteiro.",
      items: [
        "Projeto Estrutural",
        "Projeto Hidrossanitário",
        "Projeto Elétrico",
      ],
      icon: HousePlus,
      image: "/static/images/services/projetos_complementares.webp",
      buttonText: "Saiba Mais",
    },
    {
      key: "laudos",
      category: "Diagnóstico Técnico",
      title: "Perícias e Laudos Técnicos de Engenharia",
      description:
        "Oferecemos suporte técnico especializado para questões judiciais, extrajudiciais e patrimoniais. Nossos laudos e perícias são elaborados com precisão e imparcialidade, fornecendo a fundamentação técnica necessária para suas decisões, negociações e processos.",
      details:
        "Em Perícias e Laudos Técnicos de Engenharia, realizamos análise criteriosa de fatos, patologias e condições construtivas para produzir documentos claros, objetivos e tecnicamente fundamentados. Atuamos em processos judiciais e extrajudiciais, inspeções prediais, vistorias e assistência técnica, sempre com metodologia adequada e registro consistente de evidências. O resultado é um parecer confiável para apoiar negociações, tomada de decisão e defesa técnica em diferentes contextos.",
      items: [
        "Laudos para Processos Judiciais e Extrajudiciais",
        "Perícias de Engenharia",
        "Inspeção Predial e Laudo de Vistoria",
        "Assistência Técnica em Processos",
      ],
      icon: PencilRuler,
      image: "/static/images/services/inspecao_e_laudos.webp",
      buttonText: "Saiba Mais",
    },
    {
      key: "incendio",
      category: "Segurança e Normas",
      title: "Segurança Contra Incêndio e Regularizações (AVCB/CLCB)",
      description:
        "Garantimos a segurança e a regularização completa do seu imóvel. Oferecemos uma solução ponta a ponta, desde a elaboração do projeto até a execução das instalações e a obtenção ou renovação do seu AVCB (Auto de Vistoria do Corpo de Bombeiros) e CLCB.",
      details:
        "No serviço de Segurança Contra Incêndio e Regularizações, conduzimos todas as etapas para adequar a edificação às exigências do Corpo de Bombeiros e da legislação aplicável. Elaboramos projetos de prevenção e combate a incêndio (PPCI), especificamos e acompanhamos a instalação dos sistemas de proteção, além de orientar ajustes operacionais e documentais. Dessa forma, viabilizamos a emissão ou renovação de AVCB e CLCB com mais previsibilidade, segurança e conformidade.",
      items: [
        "Emissão e Renovação de AVCB e CLCB",
        "Projetos de Prevenção e Combate a Incêndio (PPCI)",
        "Execução e Instalação dos Sistemas de Segurança",
      ],
      icon: Flame,
      image: "/static/images/services/combate_incendio.webp",
      buttonText: "Saiba Mais",
    },
    {
      key: "manutencao",
      category: "Gestão de Ativos",
      title: "Manutenção e Conservação Predial",
      description:
        "Serviços contínuos de manutenção predial voltados à preservação, segurança e bom funcionamento das instalações. Atuamos de forma preventiva e corretiva para manter sistemas, estruturas e equipamentos em condições adequadas, garantindo eficiência operacional, maior durabilidade dos componentes e conservação do patrimônio.",
      details:
        "Em Manutenção e Conservação Predial, estruturamos rotinas técnicas para preservar o desempenho da edificação e reduzir ocorrências críticas. Desenvolvemos plano de manutenção (PMOC), executamos ações preventivas e corretivas e acompanhamos contratos e indicadores para manter o controle do ciclo de vida dos ativos. Com relatórios técnicos e acompanhamento contínuo, garantimos mais confiabilidade operacional, maior durabilidade dos sistemas e melhor conservação do patrimônio ao longo do tempo.",
      items: [
        "Plano de Manutenção (PMOC)",
        "Manutenção Preventiva",
        "Manutenção Corretiva",
        "Relatórios Técnicos",
        "Gestão de Contratos",
        "Acompanhamento Técnico",
      ],
      icon: Wrench,
      image: "/static/images/services/manutencao_predial.webp",
      buttonText: "Saiba Mais",
    },
  ],
};

// Manter compatibilidade com ServicesList da home
export const servicesList = servicesPageData.sections.map((section) => ({
  key: section.key,
  category: section.category,
  title: section.title,
  description: section.description,
  icon: section.icon,
  highlights: section.items.slice(0, 3), // Usar os 3 primeiros items como highlights
}));
