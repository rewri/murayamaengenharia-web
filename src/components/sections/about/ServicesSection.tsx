import { motion } from "framer-motion";
import { fadeUp, stagger } from "../../../animations/motion";
import ServiceList from "../../../components/features/services/ServicesList";

export default function ServicesSection() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mb-16 md:mb-24"
    >
      <motion.div variants={fadeUp} className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary font-headings mb-4">
          Nossos Serviços
        </h2>
        <p className="text-base text-neutral-dark/70 max-w-2xl mx-auto font-body">
          Oferecemos uma gama completa de serviços de engenharia para atender às
          necessidades de cada projeto, desde o planejamento inicial até a
          entrega final.
        </p>
      </motion.div>
      <ServiceList />
    </motion.div>
  );
}
