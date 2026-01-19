import { ChevronDown, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  gallery?: string[];
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

  // Usar as imagens da galeria ou repetir a imagem thumbnail
  const imageGallery =
    gallery.length > 0
      ? gallery
      : Array(6).fill(
          `/static/images/projects/webp/thumbs/${image}/thumb.webp`
        );

  return (
    <main className="flex-grow container mx-auto px-4 py-8 lg:py-12">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex flex-wrap gap-2 mb-6">
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

        {/* Hero Image */}
        <div className="mb-12">
          <div
            className="bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-[400px]"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 40%), url(/static/images/projects/webp/thumbs/${image}/thumb.webp)`,
            }}
          >
            <div className="p-8">
              <p className="text-white text-sm font-medium mb-1">
                {category} | {location}
              </p>
              <h1 className="text-white text-4xl lg:text-5xl font-bold tracking-tight">
                {title}
              </h1>
            </div>
          </div>
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
                  <div
                    onClick={() => setSelectedImage(img)}
                    key={idx}
                    className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                    style={{
                      backgroundImage: `url(${img})`,
                    }}
                  />
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

      {/* CTA Section */}
      <section className="w-full bg-gray-50 dark:bg-gray-900/50 py-16 mt-16 rounded-xl">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Conheça outros projetos
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Explore nosso portfólio e veja como transformamos desafios complexos
            em soluções de engenharia inovadoras e eficientes.
          </p>
          <button
            onClick={() => navigate("/obras")}
            className="flex items-center gap-2 min-w-[84px] max-w-[480px] cursor-pointer justify-center overflow-hidden rounded-lg h-12 px-8 bg-primary text-white text-base font-bold tracking-wide hover:bg-primary/90 transition-colors mx-auto"
          >
            <span className="truncate">Voltar ao Portfólio</span>
          </button>
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
