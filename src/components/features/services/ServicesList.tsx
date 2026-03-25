import { motion } from "framer-motion";
import { fadeUp, stagger } from "../../../animations/motion";
import { servicesList } from "../../../config/services";
import ServiceCard from "./ServicesCard";

export default function ServicesList() {
  return (
    <section className="mt-6 md:mt-20 w-full grid gap-6 mb-12 md:mb-4">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {servicesList.map((service, index) => (
          <motion.div key={service.title} variants={fadeUp}>
            <ServiceCard
              index={index}
              serviceKey={service.key}
              title={service.title}
              description={service.description}
              highlights={service.highlights}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
