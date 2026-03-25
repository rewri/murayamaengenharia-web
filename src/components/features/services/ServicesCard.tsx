import { Check } from "lucide-react";
import { useState } from "react";
import ServiceDetailsDialog from "./ServiceDetailsDialog";

interface ServiceCardProps {
  index: number;
  serviceKey: string;
  title: string;
  description: string;
  highlights: string[];
}

export default function ServiceCard({
  index,
  serviceKey,
  title,
  description,
  highlights,
}: ServiceCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div
      className="p-0 group relative bg-white border border-border rounded-lg overflow-hidden card-hover animate-fade-in-up h-full flex flex-col"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="relative p-5 flex flex-col flex-1 border-t-[3px] border-t-[#a5a5a5]">
        <div className="min-h-16 flex items-start">
          <h3 className="font-bold text-2xl text-secondary text-left">
            {title}
          </h3>
        </div>

        <div className="flex-1 flex flex-col pt-2">
          <p className="text-sm text-muted-foreground leading-relaxed text-left mb-4">
            {description}
          </p>
          <ul className="list-none p-0 m-0 space-y-2">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2 text-sm text-secondary"
              >
                <span className="text-accent font-bold flex-shrink-0 flex items-center justify-center">
                  <Check size={22} />
                </span>
                <span className="text-left font-semibold">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto min-h-12 flex items-center justify-start pt-8">
          <button
            type="button"
            onClick={() => setIsDialogOpen(true)}
            className="inline-block text-sm font-medium text-primary cursor-pointer transition-all duration-200 hover:underline hover:text-primary/80 active:scale-95 py-2 px-3 pb-0 rounded touch-target underline"
          >
            SAIBA MAIS →
          </button>
        </div>
      </div>

      <ServiceDetailsDialog
        isOpen={isDialogOpen}
        serviceKey={serviceKey}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
}
