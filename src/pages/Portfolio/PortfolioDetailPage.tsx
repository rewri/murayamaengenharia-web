import { Navigate, useParams } from "react-router-dom";
import PortfolioDetail from "../../components/features/portfolio/PortfolioDetail";
import { allConstructions } from "../../config/portfolio";

// Mapa de slug para categoria (inverso do mapa em PortfolioListSection)
const categorySlugMap: Record<string, string> = {
  comercial: "Comercial",
  residencial: "Residencial",
  industrial: "Industrial",
  governamental: "Governamental",
  momentum: "Momentum",
};

export default function PortfolioDetailPage() {
  const { category, slug } = useParams<{ category: string; slug: string }>();

  // Extrair o ID do slug (formato: titulo-da-obra-123)
  const id = slug?.split("-").pop();

  // Encontrar a obra pelo ID
  const project = allConstructions.find(
    (construction) => construction.id === id,
  );

  // Validar se categoria da URL corresponde com categoria do projeto
  const categoryName = category ? categorySlugMap[category] || "" : "";
  if (!project || !categoryName || project.category !== categoryName) {
    return <Navigate to="/obras" replace />;
  }

  return (
    <PortfolioDetail
      title={project.title}
      location={project.location}
      category={project.category}
      categorySlug={category}
      directory={project.directory}
      description={project.description}
      client={project.client}
      completionYear={project.conclusion_year}
      services={project.services}
    />
  );
}
