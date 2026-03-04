import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { fadeUp } from "../../../animations/motion";

interface ServiceItem {
  key: string;
  category: string;
  title: string;
  description: string;
  items: string[];
  icon: React.ComponentType;
  image: string;
  buttonText: string;
}

interface ServicesCardProps {
  section: ServiceItem;
}

export default function ServicesCard({ section }: ServicesCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className="w-full bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div className="container mx-auto pl-8">
        <div className="py-6 md:py-8">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
            {/* Image */}
            <div className="flex-shrink-0 hidden md:block">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-sm h-fit w-48 md:w-56">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider font-body">
                  {section.category}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 font-headings">
                {section.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm md:text-base leading-relaxed font-body">
                {section.description}
              </p>

              {/* Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-0">
                {section.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2
                      className="w-4 h-4 text-primary flex-shrink-0 mt-1"
                      strokeWidth={2.5}
                    />
                    <span className="text-gray-700 dark:text-gray-300 text-sm font-body">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
