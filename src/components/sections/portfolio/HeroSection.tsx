import { motion } from "framer-motion";
import { fadeUp, stagger } from "../../../animations/motion";

export default function HeroSection() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-col md:flex-row items-start gap-8 md:gap-12 mb-16 md:mb-16"
    >
      <motion.div variants={fadeUp} className="flex-1">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-primary font-headings mb-4">
            Nossas obras
          </h1>
          <p className="text-lg text-neutral-dark/70 leading-relaxed font-body">
            Conheça a excelência da{" "}
            <span className="text-secondary font-semibold">
              Murayama Engenharia
            </span>{" "}
            através dos nossos principais projetos entregues.
            <br />
            Soluções inovadoras para desafios complexos.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
