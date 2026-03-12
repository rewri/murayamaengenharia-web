import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useMemo, useState } from "react";
import { stagger } from "../../../animations/motion";

export default function ProjectsArchitectureSection() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [loadedImageIndices, setLoadedImageIndices] = useState<Set<number>>(
    new Set(),
  );

  const placeholderImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e5e7eb' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='16' fill='%239ca3af'%3EImagem não disponível%3C/text%3E%3C/svg%3E";

  // Gerar galeria com imagens numeradas de 1 a 24 (24 imagens total)
  const imageGallery = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => {
      const paddedIndex = String(i + 1).padStart(2, "0");
      return {
        thumb: `/static/images/3d/thumb/${paddedIndex}-thumb.webp`,
        full: `/static/images/3d/lightbox/${paddedIndex}-lightbox.webp`,
        index: i,
      };
    });
  }, []);

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

  return (
    <section className="w-full py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Título e Descrição */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-[-0.015em]">
            Projetos Arquitetônicos
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg mx-auto leading-relaxed">
            Criamos projetos arquitetônicos que unem estética, funcionalidade e
            viabilidade técnica.
            <br />
            Trabalhamos lado a lado com você, desde os primeiros esboços até a
            aprovação legal, para garantir que o resultado final seja exatamente
            como você sonhou.
          </p>
        </div>

        {/* Galeria */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {loadedImageIndices.size > 0 ? (
            imageGallery.map((img, idx) =>
              loadedImageIndices.has(img.index) ? (
                <motion.button
                  key={img.index}
                  onClick={() => setSelectedImageIndex(img.index)}
                  className="w-full aspect-square rounded-lg hover:scale-110 transition-transform duration-300 cursor-pointer overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm border border-gray-200"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={img.thumb}
                    alt={`Arquitetura ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.button>
              ) : null,
            )
          ) : (
            <div className="col-span-full text-center py-12 text-gray-400 dark:text-gray-500">
              Carregando galeria...
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
        </motion.div>
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
            alt="Projeto arquitetônico"
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
            {selectedImageIndex + 1} / {loadedImageIndices.size}
          </div>
        </div>
      )}
    </section>
  );
}
