import { motion } from "framer-motion";
import { fadeUp, stagger } from "../../../animations/motion";

export default function HeroSection() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-col md:flex-row items-start gap-8 md:gap-12 mb-8 md:mb-8"
    >
      <motion.div variants={fadeUp} className="flex-1">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-primary font-headings mb-4">
            Estamos prontos para entender seu projeto
          </h1>
          <p className="text-lg text-neutral-dark/70 leading-relaxed font-body">
            Entre em contato conosco pelos nossos canais ou agende uma visita.
            Teremos prazer em conversar sobre sua obra, reforma ou projeto
            técnico.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
