import { ZoomIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PortfolioCardProps {
  id: string;
  title: string;
  location: string;
  image: string;
  category: string;
}

export default function PortfolioCard({
  id,
  title,
  location,
  image,
  category,
}: PortfolioCardProps) {
  const navigate = useNavigate();
  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
  const url = `/obras/${slug}-${id}`;
  return (
    <a
      onClick={() => navigate(url)}
      className="flex h-full flex-1 flex-col gap-4 rounded-xl bg-white dark:bg-gray-800/50 shadow-sm border border-gray-200 dark:border-gray-800 transition-all duration-500 hover:shadow-lg hover:shadow-primary/15 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer no-underline"
      tabIndex={0}
      aria-label={`Ver detalhes do projeto ${title}`}
    >
      <div className="w-full aspect-video rounded-t-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-stretch justify-center relative group">
        <span
          className="absolute uppercase top-3 left-3 z-10 px-3 py-1 rounded-md backdrop-blur bg-white/70 border-1 dark:bg-gray-900/60 text-xs font-normal text-secondary dark:text-gray-100 "
          style={{ pointerEvents: "none" }}
        >
          {category}
        </span>
        <picture className="w-full h-full block">
          <source
            srcSet={`/static/images/projects/webp/thumbs/${image}/thumb.webp`}
            type="image/webp"
          />
          <img
            src={`/static/images/projects/fallback/thumbs/${image}/thumb.jpg`}
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
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center rounded-t-xl">
          <ZoomIn
            size={60}
            className="text-white opacity-0 group-hover:opacity-50 transition-opacity duration-300"
            strokeWidth={2}
          />
        </div>
      </div>
      <div className="flex flex-col flex-1 justify-between p-6 pt-0 gap-4 text-left">
        <div>
          <p className="text-[#111418] dark:text-white text-base font-bold leading-normal">
            {title}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
            {location}
          </p>
        </div>
        <span
          className="flex w-full min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-gray-700 text-[#111418] dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
          onClick={() => navigate(url)}
        >
          <span className="truncate uppercase">Ver Detalhes</span>
        </span>
      </div>
    </a>
  );
}
