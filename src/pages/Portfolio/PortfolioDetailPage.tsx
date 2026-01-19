import { Navigate, useParams } from "react-router-dom";
import PortfolioDetail from "../../components/features/portfolio/PortfolioDetail";
import { allConstructions } from "../../config/portfolio";

export default function PortfolioDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  // Extrair o ID do slug (formato: titulo-da-obra-123)
  const id = slug?.split("-").pop();

  // Encontrar a obra pelo ID
  const project = allConstructions.find(
    (construction) => construction.id === id
  );

  // Se não encontrar o projeto, redirecionar para a página de obras
  if (!project) {
    return <Navigate to="/obras" replace />;
  }

  return (
    <PortfolioDetail
      title={project.title}
      location={project.location}
      category={project.category}
      image={project.image}
    />
  );
}
