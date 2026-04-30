import { Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface VideoCardProps {
  video: string | null;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Desabilita scroll quando modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!video) {
    return null;
  }

  // Extrai o video ID de diferentes formatos de URL do YouTube
  const extractVideoId = (urlString: string): string | null => {
    // Formato: iframe embed - src="https://www.youtube.com/embed/VIDEO_ID"
    let match = urlString.match(
      /src="https:\/\/www\.youtube\.com\/embed\/([^?"]+)/,
    );
    if (match) return match[1];

    // Formato: URL de compartilhamento - https://www.youtube.com/watch?v=VIDEO_ID
    match = urlString.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    );
    if (match) return match[1];

    // Formato: embed direto - https://www.youtube.com/embed/VIDEO_ID
    match = urlString.match(/youtube\.com\/embed\/([^?"&\n]+)/);
    if (match) return match[1];

    return null;
  };

  const videoId = extractVideoId(video);

  if (!videoId) {
    return null;
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <>
      <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800/50 shadow-sm mb-6">
        <div className="relative aspect-video bg-gray-900 group cursor-pointer overflow-hidden">
          <img
            src={thumbnailUrl}
            alt="Vídeo"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Fallback para SDdefault se maxresdefault não existir
              (e.target as HTMLImageElement).src =
                `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
            }}
          />

          {/* Play Icon Overlay */}
          <button
            onClick={() => setIsOpen(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors duration-300"
            aria-label="Reproduzir vídeo"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Play size={32} fill="currentColor" />
            </div>
          </button>
        </div>
      </div>

      {/* Video Modal - Renderizado via Portal */}
      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center p-4"
            style={{ zIndex: 999999 }}
            onClick={() => setIsOpen(false)}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors p-2 rounded-lg hover:bg-black/50"
              aria-label="Fechar"
              type="button"
              style={{ zIndex: 1000000 }}
            >
              <X size={32} />
            </button>

            <div
              className="w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full pt-[56.25%]">
                <iframe
                  className="absolute inset-0 w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
