import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allConstructions } from "../../../config/portfolio";
import { trackEvent } from "../../../lib/analytics";
import CtaSection from "../../sections/home/CtaSection";

// Função helper para shuffle determinístico baseado em seed (pura)
function seededShuffle<T>(array: T[], seed: string): T[] {
  const arr = [...array];
  let seedValue = 0;

  // Gera um número a partir da string (determinístico)
  for (let i = 0; i < seed.length; i++) {
    seedValue = (seedValue << 5) - seedValue + seed.charCodeAt(i);
    seedValue = seedValue & seedValue; // Convert to 32-bit integer
  }

  // Simple seeded random number generator
  const random = () => {
    seedValue = (seedValue * 9301 + 49297) % 233280;
    return seedValue / 233280;
  };

  // Fisher-Yates shuffle
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

interface PortfolioDetailProps {
  title: string;
  location: string;
  category: string;
  categorySlug?: string;
  directory: string;
  client?: string;
  completionYear?: number;
  description?: string;
  challenges?: Array<{
    title: string;
    description: string;
  }>;
  services?: string[];
}

export default function PortfolioDetail({
  title,
  location,
  category,
  categorySlug,
  directory,
  client = "Confidencial",
  completionYear = 2024,
  description = "Projeto desenvolvido com excelência técnica e atenção aos detalhes, garantindo qualidade e satisfação do cliente.",
  services = ["Gerenciamento", "Projeto Estrutural", "Consultoria"],
}: PortfolioDetailProps) {
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [loadedImageIndices, setLoadedImageIndices] = useState<Set<number>>(
    new Set(),
  );

  // Placeholder image (simple gray SVG)
  const placeholderImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e5e7eb' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='16' fill='%239ca3af'%3EImagem não disponível%3C/text%3E%3C/svg%3E";

  // Formatar ano para string
  const completionYearString = completionYear ? String(completionYear) : "2024";

  // Gerar um seed aleatório uma única vez ao montar o componente
  const [randomSeed] = useState(() => Math.random().toString(36));

  // Gerar galeria com até 50 imagens possíveis
  const imageGallery = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => {
      const paddedIndex = String(i + 1).padStart(2, "0");
      return {
        thumb: `/static/images/porfolio/${directory}/thumb/${paddedIndex}-thumb.webp`,
        full: `/static/images/porfolio/${directory}/lightbox/${paddedIndex}-lightbox.webp`,
        index: i,
      };
    });
  }, [directory]);

  const handleNextImage = () => {
    const validImages = imageGallery.filter((img) =>
      loadedImageIndices.has(img.index),
    );
    if (selectedImageIndex !== null && validImages.length > 0) {
      const currentIdx = validImages.findIndex(
        (img) => img.index === selectedImageIndex,
      );
      const nextIdx = (currentIdx + 1) % validImages.length;
      setSelectedImageIndex(validImages[nextIdx].index);
    }
  };

  const handlePrevImage = () => {
    const validImages = imageGallery.filter((img) =>
      loadedImageIndices.has(img.index),
    );
    if (selectedImageIndex !== null && validImages.length > 0) {
      const currentIdx = validImages.findIndex(
        (img) => img.index === selectedImageIndex,
      );
      const prevIdx =
        (currentIdx - 1 + validImages.length) % validImages.length;
      setSelectedImageIndex(validImages[prevIdx].index);
    }
  };

  const currentImage =
    selectedImageIndex !== null
      ? imageGallery.find((img) => img.index === selectedImageIndex)
      : null;

  // Gerar 4 projetos aleatórios excluindo o atual
  const relatedProjects = useMemo(() => {
    const filtered = allConstructions.filter(
      (proj) =>
        proj &&
        proj.directory !== directory &&
        proj.category &&
        proj.title &&
        proj.id,
    );
    // Usa o seed aleatório para gerar shuffle diferente a cada carregamento
    const shuffled = seededShuffle(filtered, directory + randomSeed);
    return shuffled.slice(0, 4).filter(Boolean);
  }, [directory, randomSeed]);

  return (
    <main className="flex-grow w-full">
      {/* Hero Image - Full Width */}
      <div className="w-full mb-0">
        <div className="relative overflow-hidden min-h-[400px] flex flex-col justify-end">
          <img
            src={`/static/images/porfolio/${directory}/hero.webp`}
            sizes="100vw"
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = placeholderImage;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="relative p-8 z-10">
            <p className="text-white text-sm font-medium mb-1">
              {category} | {location}
            </p>
            <h1 className="text-white text-4xl lg:text-5xl font-bold tracking-tight">
              {title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex flex-wrap gap-2 mb-12">
            <button
              onClick={() => navigate("/")}
              className="text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-primary dark:hover:text-primary transition-colors"
            >
              Início
            </button>
            <span className="text-gray-400 dark:text-gray-500 text-sm font-medium">
              /
            </span>
            <button
              onClick={() => navigate("/obras")}
              className="text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-primary dark:hover:text-primary transition-colors"
            >
              Obras
            </button>
            {categorySlug && (
              <>
                <span className="text-gray-400 dark:text-gray-500 text-sm font-medium">
                  /
                </span>
                <button
                  onClick={() => navigate(`/obras/${categorySlug}`)}
                  className="text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-primary dark:hover:text-primary transition-colors capitalize"
                >
                  {category}
                </button>
              </>
            )}
            <span className="text-gray-400 dark:text-gray-500 text-sm font-medium">
              /
            </span>
            <span className="text-gray-800 dark:text-gray-200 text-sm font-medium">
              {title}
            </span>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* About Section */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Sobre o Projeto
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Gallery Section */}
              <div className="mb-0">
                {loadedImageIndices.size > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {imageGallery.map((img, idx) =>
                      loadedImageIndices.has(img.index) ? (
                        <button
                          onClick={() => setSelectedImageIndex(img.index)}
                          key={img.index}
                          className="w-full aspect-[4/3] rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer overflow-hidden bg-gray-100 dark:bg-gray-800"
                        >
                          <img
                            src={img.thumb}
                            alt={`Galeria ${idx + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </button>
                      ) : null,
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                    Nenhuma imagem disponível.
                  </div>
                )}
                {/* Hidden images for detection */}
                <div style={{ display: "none" }}>
                  {imageGallery.map((img) => (
                    <img
                      key={`detect-${img.index}`}
                      src={img.thumb}
                      alt="detect"
                      onLoad={() => {
                        setLoadedImageIndices((prev) => {
                          const newSet = new Set(prev);
                          newSet.add(img.index);
                          return newSet;
                        });
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Challenges Section */}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 lg:sticky lg:top-24 h-fit mb-12 lg:mb-0">
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800/50 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Ficha Técnica
                </h3>
                <ul className="space-y-4">
                  <li className="flex justify-between items-start gap-4">
                    <span className="font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
                      Cliente:
                    </span>
                    <span className="text-gray-600 dark:text-gray-300 text-right">
                      {client}
                    </span>
                  </li>
                  <li className="flex justify-between items-start gap-4">
                    <span className="font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
                      Localização:
                    </span>
                    <span className="text-gray-600 dark:text-gray-300 text-right">
                      {location}
                    </span>
                  </li>
                  <li className="flex justify-between items-start gap-4">
                    <span className="font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
                      Conclusão:
                    </span>
                    <span className="text-gray-600 dark:text-gray-300 text-right">
                      {completionYearString}
                    </span>
                  </li>
                </ul>
                <hr className="my-6 border-gray-200 dark:border-gray-700" />
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Serviços Prestados:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {services.map((service, idx) => (
                      <span
                        key={idx}
                        className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="w-full bg-gray-50 dark:bg-gray-900/50 py-16 mt-16">
        <div className="container mx-auto px-4 mb-0">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Conheça outros projetos
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore nosso portfólio e veja como transformamos desafios
              complexos em soluções de engenharia inovadoras e eficientes.
            </p>
          </div>

          {/* Related Projects Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {relatedProjects.length > 0 ? (
              relatedProjects.map((project) => {
                if (
                  !project ||
                  !project.category ||
                  !project.title ||
                  !project.id ||
                  !project.directory
                ) {
                  return null;
                }
                const projSlug = project.title
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(/\s+/g, "-");
                const projCategorySlug = project.category
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(/\s+/g, "-");
                const projUrl = `/obras/${projCategorySlug}/${projSlug}-${project.id}`;

                return (
                  <button
                    key={project.id}
                    onClick={() => {
                      trackEvent("portfolio_project_click", {
                        project_id: project.id,
                        project_category: project.category,
                        source: "related_projects",
                      });
                      navigate(projUrl);
                    }}
                    className="relative group aspect-square rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      src={`/static/images/porfolio/${project.directory}/gallery.webp`}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = placeholderImage;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 text-white font-bold text-sm text-center px-2 transition-opacity duration-300">
                        {project.title}
                      </span>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="col-span-full text-center text-gray-400">
                Nenhum projeto encontrado.
              </div>
            )}
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                trackEvent("portfolio_view_all_click", {
                  source: "portfolio_detail",
                });
                navigate("/obras");
              }}
              className="flex items-center gap-2 min-w-[84px] max-w-[480px] cursor-pointer justify-center overflow-hidden rounded-lg h-12 px-8 bg-primary text-white text-base font-bold tracking-wide hover:bg-primary/90 transition-colors mx-auto"
            >
              <span className="truncate">Ver Todos os Projetos</span>
            </button>
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedImageIndex !== null && currentImage && (
          <div
            className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
            onClick={() => setSelectedImageIndex(null)}
          >
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Fechar"
            >
              <X size={32} />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Imagem anterior"
            >
              <ChevronLeft size={40} />
            </button>

            {/* Image */}
            <img
              src={currentImage.full}
              alt={title}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                (e.target as HTMLImageElement).src = placeholderImage;
              }}
            />

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Próxima imagem"
            >
              <ChevronRight size={40} />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium bg-black/40 px-4 py-2 rounded-lg">
              {currentImage.index + 1} / {loadedImageIndices.size}
            </div>
          </div>
        )}
      </section>
      <div style={{ marginBottom: " -80px " }}>
        <CtaSection />
      </div>
    </main>
  );
}
