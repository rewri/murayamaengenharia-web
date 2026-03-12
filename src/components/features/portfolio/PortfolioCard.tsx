import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PortfolioCardProps {
  id: string;
  title: string;
  location: string;
  directory: string;
  category: string;
}

export default function PortfolioCard({
  id,
  title,
  location,
  directory,
  category,
}: PortfolioCardProps) {
  const navigate = useNavigate();
  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
  const categorySlug = category
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
  const url = `/obras/${categorySlug}/${slug}-${id}`;
  return (
    <div
      onClick={() => navigate(url)}
      className="flex h-full flex-1 flex-col rounded-xl overflow-hidden bg-white dark:bg-gray-800/50 shadow-sm border border-gray-200 dark:border-gray-800 transition-all duration-500 hover:shadow-lg hover:shadow-primary/15 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer group"
      tabIndex={0}
      role="button"
      aria-label={`Ver detalhes do projeto ${title}`}
    >
      <div className="w-full aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-stretch justify-center">
        <span
          className="absolute uppercase top-3 left-3 z-20 px-3 py-1 rounded-md bg-primary text-white font-bold border-1 dark:bg-gray-900/60 text-xs dark:text-gray-100"
          style={{ pointerEvents: "none" }}
        >
          {category}
        </span>
        <picture className="w-full h-full block group-hover:scale-105 transition-transform duration-300">
          <source
            srcSet={`/static/images/porfolio/${directory}/gallery.webp`}
            type="image/webp"
          />
          <img
            src={`/static/images/porfolio/${directory}/gallery.webp`}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover block"
            style={{
              width: "100%",
              height: "100%",
              minHeight: 0,
              minWidth: 0,
              aspectRatio: "16/9",
            }}
          />
        </picture>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative p-4 flex items-end justify-between">
            <div className="flex-1">
              <p className="text-white font-bold leading-tight text-left text-xl">
                {title}
              </p>
              <p className="text-gray-100 text-sm leading-tight flex items-center gap-1 mt-2">
                <MapPin size={16} /> {location}
              </p>
            </div>
            <span
              className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5 bg-white hover:bg-gray-100 text-secondary font-bold text-xs rounded-md whitespace-nowrap flex-shrink-0"
              style={{ pointerEvents: "none" }}
            >
              VER DETALHES
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
