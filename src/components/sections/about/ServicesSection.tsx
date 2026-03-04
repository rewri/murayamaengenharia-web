import { motion } from "framer-motion";
import { fadeUp, stagger } from "../../../animations/motion";
import { servicesPageData } from "../../../config/services";
import ServicesCard from "./ServicesCard";

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
      <div className="space-y-6 md:space-y-8">
        {servicesPageData.sections.map((section) => (
          <ServicesCard key={section.key} section={section} />
        ))}
      </div>
    </motion.div>
  );
}
