import type { ReactElement } from "react";
import { cloneElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface ServiceCardProps {
  index: number;
  title: string;
  description: string;
  icon: ReactElement;
}

export default function ServicesCard({
  index,
  title,
  description,
  icon,
}: ServiceCardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isAboutPage = location.pathname === "/sobre";
  const styledIcon = cloneElement(icon, {
    className: "text-primary",
    size: 24,
  } as never);

  return (
    <div
      key={"ok"}
      className="p-0 group relative bg-white border border-border rounded-lg overflow-hidden card-hover animate-fade-in-up h-full flex flex-col"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="relative p-5 flex flex-col flex-1 justify-center">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
            {styledIcon}
          </div>
        </div>
        <h3 className="font-bold text-lg text-secondary mb-3 text-center">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed text-center">
          {description}
        </p>
        <div className="mt-4 text-center">
          {!isAboutPage && (
            <a
              onClick={() => navigate("/sobre")}
              className="inline-block text-sm font-medium text-primary cursor-pointer transition-all duration-200 hover:underline hover:text-primary/80 active:scale-95 py-2 px-3 pb-0 rounded touch-target"
            >
              Saiba mais
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
