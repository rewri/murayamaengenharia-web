// Portfolio Configuration Index
// Importa todas as categorias e as combina em uma única lista

import { comercial } from "./portfolio/comercial/config";
import { governamental } from "./portfolio/governamental/config";
import { industrial } from "./portfolio/industrial/config";
import { momentum } from "./portfolio/momentum/config";
import { parqueDasCascatas } from "./portfolio/parque_das_cascatas/config";
import { reserva } from "./portfolio/reserva/config";
import { spazioVerde } from "./portfolio/spazio_verde/config";
import { terrasAltas } from "./portfolio/terras_altas/config";
import { valeDolSol } from "./portfolio/vale_do_sol/config";

// Combinando todas as categorias
export const allConstructions = [
  ...comercial,
  ...industrial,
  ...governamental,
  ...momentum,
  ...parqueDasCascatas,
  ...spazioVerde,
  ...terrasAltas,
  ...valeDolSol,
  ...reserva,
];

// Exportando as categorias individuais para uso específico
export type ConstructionItem = (typeof allConstructions)[0];

export const portfolioCategories = [
  { id: "comercial", label: "Comercial", items: comercial },
  { id: "industrial", label: "Industrial", items: industrial },
  { id: "governamental", label: "Governamental", items: governamental },
  { id: "momentum", label: "Momentum", items: momentum },
  {
    id: "parque-das-cascatas",
    label: "Parque das Cascatas",
    items: parqueDasCascatas,
  },
  { id: "spazio-verde", label: "Spazio Verde", items: spazioVerde },
  { id: "terras-altas", label: "Terras Altas", items: terrasAltas },
  { id: "vale-do-sol", label: "Vale do Sol", items: valeDolSol },
  { id: "reserva", label: "Reserva", items: reserva },
];

// Função auxiliar para obter uma categoria específica
export function getPortfolioCategory(categoryId: string) {
  return portfolioCategories.find((cat) => cat.id === categoryId);
}

// Função auxiliar para obter um projeto por ID
export function getConstructionById(id: string) {
  return allConstructions.find((construction) => construction.id === id);
}

// Função auxiliar para gerar slug (apenas a partir do title)
export function generateConstructionSlug(title: string) {
  const normalizedTitle = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return normalizedTitle;
}

// Função auxiliar para encontrar por slug
export function getConstructionBySlug(slug: string) {
  return allConstructions.find((construction) => {
    const constructionSlug = generateConstructionSlug(construction.title);
    return constructionSlug === slug;
  });
}
