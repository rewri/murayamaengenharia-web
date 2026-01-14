import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { fadeUp, stagger } from "../../../animations/motion";

export default function GoogleRatingSection() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      // className="h-full"
    >
      <div className="bg-white dark:bg-background-dark p-4 sm:p-6 md:p-8 rounded-xl shadow-sm border border-gray-200/80 dark:border-gray-700/80 h-full flex flex-col justify-center items-center hover:shadow-md transition-all duration-300">
        <motion.div
          variants={fadeUp}
          className="flex justify-center items-center gap-2 mb-2"
        >
          <div className="flex text-amber-500 text-xl">
            <Star className="size-5 fill-current" />
            <Star className="size-5 fill-current" />
            <Star className="size-5 fill-current" />
            <Star className="size-5 fill-current" />
            <Star className="size-5 fill-current opacity-50" />
          </div>
          <span className="text-2xl font-bold text-primary">4,2</span>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="text-sm text-slate-600 dark:text-neutral-dark/70 mb-3 font-body"
        >
          Avaliação média no Google
          <br />
          baseada em <strong>58 avaliações</strong>
        </motion.p>

        <motion.a
          variants={fadeUp}
          href="https://share.google/824IGaTABhdoDURS1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2.5 bg-accent hover:bg-sky-600 text-white rounded-full text-sm font-semibold transition-colors duration-200"
        >
          Ver avaliações no Google
        </motion.a>
      </div>

      <motion.div
        variants={fadeUp}
        className="bg-white dark:bg-background-dark rounded-xl shadow-sm border border-gray-200/80 dark:border-gray-700/80 p-4 sm:p-6 md:p-8 mt-6 hover:shadow-md transition-all duration-300"
      >
        <h3 className="text-xl font-bold text-primary mb-6 font-headings">
          Por que escolher a Murayama Engenharia?
        </h3>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">
              <Check />
            </span>
            <p className="text-base text-neutral-dark/80 font-body">
              Projetos e execução integrados
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">
              <Check />
            </span>
            <p className="text-base text-neutral-dark/80 font-body">
              Atuação técnica completa (arquitetura + engenharia)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">
              <Check />
            </span>
            <p className="text-base text-neutral-dark/80 font-body">
              Acompanhamento técnico e responsabilidade em todas as etapas
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
