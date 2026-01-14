import { motion } from "framer-motion";
import { fadeUp, stagger } from "../../../animations/motion";

export default function ServicesTitle() {
  return (
    <motion.div
      variants={stagger}
      whileInView="visible"
      viewport={{ once: true }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      <motion.div variants={fadeUp}>
        <div className="w-full space-y-6 pb-2 md:pb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary font-headings uppercase">
            Murayama Engenharia
          </h1>
          <h2 className="text-2xl text-neutral-dark max-w-4xl mx-auto font-semibold">
            Engenharia de Precisão. Soluções de Confiança.
          </h2>
        </div>
      </motion.div>
    </motion.div>
  );
}
