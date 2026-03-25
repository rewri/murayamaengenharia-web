import { Check, X } from "lucide-react";
import { useEffect, useMemo } from "react";
import { servicesPageData } from "../../../config/services";

interface ServiceDetailsDialogProps {
  isOpen: boolean;
  serviceKey: string;
  onClose: () => void;
}

export default function ServiceDetailsDialog({
  isOpen,
  serviceKey,
  onClose,
}: ServiceDetailsDialogProps) {
  const serviceDetails = useMemo(
    () =>
      servicesPageData.sections.find((section) => section.key === serviceKey),
    [serviceKey],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !serviceDetails) {
    return null;
  }

  const showArchitectureProjectsButton = serviceKey === "arquitetonico";

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={serviceDetails.title}
    >
      <button
        type="button"
        aria-label="Fechar detalhes do serviço"
        onClick={onClose}
        className="fixed inset-0 bg-black/60"
      />

      <div className="flex min-h-full items-center justify-center p-4 md:p-6">
        <div className="relative w-full max-w-6xl bg-white rounded-xl shadow-xl border border-border overflow-hidden">
          <div className="flex items-start justify-between gap-4 p-5 md:p-7 border-b border-border">
            <h3 className="text-2xl md:text-3xl font-bold text-secondary text-left pr-6">
              {serviceDetails.title}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-secondary hover:bg-neutral-warm transition-colors"
              aria-label="Fechar"
            >
              <X size={22} />
            </button>
          </div>

          <div className="p-5 md:p-7 space-y-8 max-h-[85vh] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
              <div>
                <h4 className="text-left text-xl font-bold text-secondary pb-2">
                  {serviceDetails.category}
                </h4>
                <p className="text-muted-foreground leading-relaxed text-left pb-8">
                  {serviceDetails.details}
                </p>
                <ul className="list-none p-0 m-0 grid grid-cols-1 gap-3">
                  {serviceDetails.items.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-sm md:text-base text-secondary"
                    >
                      <span className="text-accent font-bold flex-shrink-0 flex items-center justify-center mt-0.5">
                        <Check size={20} />
                      </span>
                      <span className="text-left font-semibold">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-full">
                <div className="relative rounded-lg overflow-hidden border border-border aspect-[16/10] md:aspect-[4/3]">
                  <img
                    src={serviceDetails.image}
                    alt={serviceDetails.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {showArchitectureProjectsButton && (
              <div className="pt-2">
                <a
                  href="/obras#projetos-arquitetonicos"
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                >
                  Ver Projetos Arquitetônicos
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
