import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fadeUp, stagger } from "../../../animations/motion";
import {
  allConstructions,
  portfolioCategories,
} from "../../../config/portfolio";
import PortfolioCard from "../../features/portfolio/PortfolioCard";

const ITEMS_PER_PAGE = 10;

// Função para embaralhar array (Fisher-Yates shuffle)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Gerar lista dinâmica de categorias a partir da configuração
function getCategories(): string[] {
  return [
    "Todos",
    ...portfolioCategories
      .filter((cat) => cat.items.length > 0) // Apenas categorias com projetos
      .map((cat) => cat.label),
    "Projetos 3D",
  ];
}

// Mapear slug para categoria (gerado dinamicamente)
function getCategoryMap(): Record<string, string> {
  const map: Record<string, string> = {};
  portfolioCategories.forEach((cat) => {
    const slug = cat.label
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");
    map[slug] = cat.label;
  });
  return map;
}

interface PortfolioListSectionProps {
  initialCategory?: string;
}

export default function PortfolioListSection({
  initialCategory,
}: PortfolioListSectionProps) {
  const navigate = useNavigate();
  const categories = getCategories();
  const categoryMap = getCategoryMap();

  const mappedCategory = initialCategory
    ? categoryMap[initialCategory] || "Todos"
    : "Todos";
  const selectedCategory = mappedCategory;
  const [currentPage, setCurrentPage] = useState(1);
  // Reverter a ordem para mostrar as mais recentes (últimas inseridas) primeiro
  const [orderedConstructions] = useState([...allConstructions].reverse());

  // Resetar página quando a categoria da URL mudar
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [initialCategory]);

  // Filtrar obras por categoria (na ordem de inserção, mais recentes primeiro)
  // Para "Todos", embaralhar aleatoriamente
  const filteredConstructions = useMemo(() => {
    if (selectedCategory === "Todos") {
      return shuffleArray(orderedConstructions);
    }

    return orderedConstructions.filter(
      (construction) => construction.category === selectedCategory,
    );
  }, [selectedCategory, orderedConstructions]);

  // Calcular total de páginas
  const totalPages = Math.ceil(filteredConstructions.length / ITEMS_PER_PAGE);

  // Obter obras da página atual
  const currentConstructions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredConstructions.slice(startIndex, endIndex);
  }, [filteredConstructions, currentPage]);

  // Resetar para página 1 quando trocar de categoria e navegar para URL
  const handleCategoryChange = (category: string) => {
    // Se for Projetos 3D, navegar para /obras e depois fazer scroll
    if (category === "Projetos 3D") {
      navigate("/obras");
      setTimeout(() => {
        const element = document.getElementById(
          "projects-architecture-section",
        );
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return;
    }

    // Navegar para nova URL (o useEffect vai resetar a página)
    if (category === "Todos") {
      navigate("/obras");
    } else {
      const slug = category
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");
      navigate(`/obras/${slug}`);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="w-full">
      {/* Filtros de Categoria */}
      <div className="flex gap-3 flex-wrap border-b border-[#f0f2f4] dark:border-gray-800 pb-6 mb-8">
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`flex h-9 items-center justify-center gap-x-2 rounded-full px-5 transition-all duration-200 ${
                isActive
                  ? "bg-primary text-white shadow-sm hover:scale-105 active:scale-95"
                  : "bg-white dark:bg-surface-dark border border-[#e5e7eb] dark:border-gray-700 text-[#111418] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              {category === "Todos" ? (
                <Home size={16} />
              ) : (
                <span
                  className={`text-sm leading-normal ${
                    isActive ? "font-bold" : "font-medium"
                  }`}
                >
                  {category}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Listagem de Obras */}
      {currentConstructions.length > 0 ? (
        <>
          <motion.div
            key={`${selectedCategory}-${currentPage}`}
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 mb-8"
          >
            {currentConstructions.map((project, idx) => (
              <motion.div key={project.directory + idx} variants={fadeUp}>
                <PortfolioCard
                  id={project.id}
                  title={project.title}
                  location={project.location}
                  directory={project.directory}
                  category={project.category || "Residencial"}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`flex h-10 w-10 items-center justify-center rounded-lg transition-all ${
                  currentPage === 1
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                    : "bg-white dark:bg-surface-dark border border-[#e5e7eb] dark:border-gray-700 text-[#111418] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:scale-105 active:scale-95"
                }`}
                aria-label="Página anterior"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg transition-all ${
                        currentPage === page
                          ? "bg-primary text-white shadow-sm"
                          : "bg-white dark:bg-surface-dark border border-[#e5e7eb] dark:border-gray-700 text-[#111418] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:scale-105"
                      }`}
                      aria-label={`Página ${page}`}
                      aria-current={currentPage === page ? "page" : undefined}
                    >
                      <span className="text-sm font-medium">{page}</span>
                    </button>
                  ),
                )}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`flex h-10 w-10 items-center justify-center rounded-lg transition-all ${
                  currentPage === totalPages
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                    : "bg-white dark:bg-surface-dark border border-[#e5e7eb] dark:border-gray-700 text-[#111418] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:scale-105 active:scale-95"
                }`}
                aria-label="Próxima página"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-gray-400 dark:text-gray-500 text-lg">
            Nenhuma obra encontrada nesta categoria.
          </p>
        </div>
      )}
    </section>
  );
}
