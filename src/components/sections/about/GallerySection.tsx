import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useMemo, useState } from "react";
import { stagger } from "../../../animations/motion";

export default function GallerySection() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [loadedImageIndices, setLoadedImageIndices] = useState<Set<number>>(
    new Set(),
  );

  const placeholderImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e5e7eb' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='16' fill='%239ca3af'%3EImagem não disponível%3C/text%3E%3C/svg%3E";

  const imageGallery = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => {
      const paddedIndex = String(i + 1).padStart(2, "0");
      return {
        thumb: `/static/images/about/gallery/thumb/${paddedIndex}-thumb.webp`,
        full: `/static/images/about/gallery/lightbox/${paddedIndex}-lightbox.webp`,
        index: i,
      };
    });
  }, []);

  const handleNextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % imageGallery.length);
    }
  };

  const handlePrevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + imageGallery.length) % imageGallery.length,
      );
    }
  };

  const currentImage =
    selectedImageIndex !== null ? imageGallery[selectedImageIndex] : null;

  return (
    <>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4 mb-16 md:mb-24"
      >
        {loadedImageIndices.size > 0 ? (
          imageGallery.map((img, idx) =>
            loadedImageIndices.has(img.index) ? (
              <motion.button
                key={img.index}
                onClick={() => setSelectedImageIndex(img.index)}
                className="w-full aspect-square rounded-lg hover:scale-110 transition-transform duration-300 cursor-pointer overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={img.thumb}
                  alt={`Galeria ${idx + 1}`}
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
            alt="Galeria expandida"
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
            {selectedImageIndex + 1} / {imageGallery.length}
          </div>
        </div>
      )}
    </>
  );
}
