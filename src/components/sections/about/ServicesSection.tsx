import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { fadeUp, stagger } from "../../../animations/motion";
import { servicesPageData } from "../../../config/services";

export default function ServicesSection() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mb-16 md:mb-24"
    >
      <div className="container mx-auto px-4">
        <motion.div variants={fadeUp} className="text-center mb-12 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-headings mb-4">
            {servicesPageData.pageTitle}
          </h2>
          <p className="text-base text-neutral-dark/70 max-w-3xl mx-auto font-body">
            {servicesPageData.pageSubtitle}
          </p>
        </motion.div>
      </div>

      {/* Services Blocks */}
      <div className="space-y-6 md:space-y-8">
        {servicesPageData.sections.map((section, index) => {
          return (
            <motion.div
              key={section.key}
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
                          src={`https://images.unsplash.com/photo-${
                            [
                              "1581092918056-0c4c3acd3789",
                              "1504384308090-c894fdcc538d",
                              "1581092918056-0c4c3acd3789",
                              "1504384308090-c894fdcc538d",
                              "1581092918056-0c4c3acd3789",
                              "1504384308090-c894fdcc538d",
                            ][index]
                          }?w=300&h=300&fit=crop`}
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
        })}
      </div>
    </motion.div>
  );
}
