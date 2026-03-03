import { ChevronDown, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allConstructions } from "../../../config/portfolio";

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
  image: string;
  client?: string;
  completionYear?: string;
  area?: string;
  description?: string;
  challenges?: Array<{
    title: string;
    description: string;
  }>;
  services?: string[];
  gallery?: Array<{
    thumb: string;
    full: string;
  }>;
}

export default function PortfolioDetail({
  title,
  location,
  category,
  image,
  client = "Confidencial",
  completionYear = "2024",
  area = "N/A",
  description = "Projeto desenvolvido com excelência técnica e atenção aos detalhes, garantindo qualidade e satisfação do cliente.",
  challenges = [
    {
      title: "Fundações Especiais",
      description:
        "Implementação de soluções técnicas avançadas para garantir a estabilidade e durabilidade da estrutura.",
    },
    {
      title: "Gestão de Prazos",
      description:
        "Coordenação eficiente de todas as etapas da obra, assegurando entregas dentro do cronograma estabelecido.",
    },
  ],
  services = ["Gerenciamento", "Projeto Estrutural", "Consultoria"],
  gallery = [],
}: PortfolioDetailProps) {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Gerar um seed aleatório uma única vez ao montar o componente
  const [randomSeed] = useState(() => Math.random().toString(36));

  // Gerar 4 projetos aleatórios excluindo o atual
  const relatedProjects = useMemo(() => {
    const filtered = allConstructions.filter(
      (proj) =>
        proj && proj.image !== image && proj.category && proj.title && proj.id,
    );
    // Usa o seed aleatório para gerar shuffle diferente a cada carregamento
    const shuffled = seededShuffle(filtered, image + randomSeed);
    return shuffled.slice(0, 4).filter(Boolean);
  }, [image, randomSeed]);

  // Map category names to directory names
  const categoryMap: Record<string, string> = {
    Comercial: "COMERCIAIS",
    Residencial: "RESIDENCIAIS",
    Industrial: "INDUSTRIAIS",
    Governamental: "GOVERNAMENTAIS",
    Momentum: "MOMENTUM",
    "Projetos 3D": "PROJETOS_3D",
  };

  const categoryDir = categoryMap[category] || category.toUpperCase();

  // Gerar galeria com padrão: basename-slideshow-{1-6}
  const generateGallery = () => {
    return Array.from({ length: 6 }, (_, i) => ({
      thumb: `/static/images/porfolio/${categoryDir}/${image}/${image}-slideshow-${i + 1}-gallery-800.webp`,
      full: `/static/images/porfolio/${categoryDir}/${image}/${image}-slideshow-${i + 1}-lightbox-1600.webp`,
    }));
  };

  const imageGallery = gallery.length > 0 ? gallery : generateGallery();

  return (
    <main className="flex-grow w-full">
      {/* Hero Image - Full Width */}
      <div className="w-full mb-0">
        <div className="relative overflow-hidden min-h-[400px] flex flex-col justify-end">
          <img
            src={`/static/images/porfolio/${categoryDir}/${image}/${image}-1600.webp`}
            srcSet={`
              /static/images/porfolio/${categoryDir}/${image}/${image}-800.webp 800w,
              /static/images/porfolio/${categoryDir}/${image}/${image}-1200.webp 1200w,
              /static/images/porfolio/${categoryDir}/${image}/${image}-1600.webp 1600w
            `}
            sizes="100vw"
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
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
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Galeria do Projeto
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {imageGallery.slice(0, 6).map((img, idx) => (
                    <button
                      onClick={() => setSelectedImage(img.full)}
                      key={idx}
                      className="w-full aspect-[4/3] rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer overflow-hidden bg-gray-100 dark:bg-gray-800"
                    >
                      <img
                        src={img.thumb}
                        alt={`Galeria ${idx + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Challenges Section */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Desafios e Soluções
                </h2>
                <div className="space-y-4">
                  {challenges.map((challenge, idx) => (
                    <details
                      key={idx}
                      className="group bg-white dark:bg-gray-800/50 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                    >
                      <summary className="flex cursor-pointer items-center justify-between text-lg font-semibold text-gray-800 dark:text-gray-100">
                        {challenge.title}
                        <ChevronDown
                          size={24}
                          className="transition-transform duration-300 group-open:rotate-180"
                        />
                      </summary>
                      <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                        {challenge.description}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
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
                      {completionYear}
                    </span>
                  </li>
                  <li className="flex justify-between items-start gap-4">
                    <span className="font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
                      Área:
                    </span>
                    <span className="text-gray-600 dark:text-gray-300 text-right">
                      {area}
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
        <div className="container mx-auto px-4">
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
                  !project.image
                ) {
                  return null;
                }
                const projectCategoryMap: Record<string, string> = {
                  Comercial: "COMERCIAIS",
                  Residencial: "RESIDENCIAIS",
                  Industrial: "INDUSTRIAIS",
                  Governamental: "GOVERNAMENTAIS",
                  Momentum: "MOMENTUM",
                  "Projetos 3D": "PROJETOS_3D",
                };
                const projCategoryDir =
                  projectCategoryMap[project.category] ||
                  project.category.toUpperCase();
                const projSlug = project.title
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(/\s+/g, "-");
                const projUrl = `/obras/${projSlug}-${project.id}`;

                return (
                  <button
                    key={project.id}
                    onClick={() => navigate(projUrl)}
                    className="relative group aspect-square rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      src={`/static/images/porfolio/${projCategoryDir}/${project.image}/${project.image}-thumb.webp`}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
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
              onClick={() => navigate("/obras")}
              className="flex items-center gap-2 min-w-[84px] max-w-[480px] cursor-pointer justify-center overflow-hidden rounded-lg h-12 px-8 bg-primary text-white text-base font-bold tracking-wide hover:bg-primary/90 transition-colors mx-auto"
            >
              <span className="truncate">Ver Todos os Projetos</span>
            </button>
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Fechar"
            >
              <X size={32} />
            </button>
            <img
              src={selectedImage}
              alt={title}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </section>
    </main>
  );
}
