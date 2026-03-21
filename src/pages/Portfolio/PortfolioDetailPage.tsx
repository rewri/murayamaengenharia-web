import { Navigate, useParams } from "react-router-dom";
import PortfolioDetail from "../../components/features/portfolio/PortfolioDetail";
import {
  getConstructionBySlug,
  portfolioCategories,
} from "../../config/portfolio";

export default function PortfolioDetailPage() {
  const { category, slug } = useParams<{ category: string; slug: string }>();

  // Encontrar o projeto usando a função helper
  const project = getConstructionBySlug(slug || "");

  // Validar se a categoria existe e corresponde ao projeto
  const categoryConfig = portfolioCategories.find(
    (cat) => cat.label === project?.category,
  );
  const categorySlug = categoryConfig?.id || "";

  // Validar se a categoria da URL corresponde com a categoria do projeto
  if (!project || !category || category !== categorySlug) {
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
