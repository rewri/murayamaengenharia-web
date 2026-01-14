import { motion } from "framer-motion";
import { fadeUp, stagger } from "../../../animations/motion";

export default function FaqSection() {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="h-full flex flex-col"
    >
      <motion.div
        variants={fadeUp}
        className="border border-gray-200/80 dark:border-gray-700/80 rounded-xl p-3 sm:p-4 mb-3 bg-white dark:bg-background-dark hover:shadow-sm transition-all duration-300"
      >
        <h3 className="font-semibold text-primary font-body mb-2">
          Vocês atendem apenas Botucatu?
        </h3>
        <p className="text-[0.95rem] text-neutral-dark/70 leading-relaxed font-body">
          Atendemos Botucatu e região. Também avaliamos projetos em outras
          localidades, conforme a complexidade, escopo e viabilidade técnica.
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="border border-gray-200/80 dark:border-gray-700/80 rounded-xl p-3 sm:p-4 mb-3 last:mb-0 bg-white dark:bg-background-dark hover:shadow-sm transition-all duration-300"
      >
        <h3 className="font-semibold text-primary font-body mb-2">
          Como garantem a qualidade e a segurança da obra?
        </h3>
        <p className="text-[0.95rem] text-neutral-dark/70 leading-relaxed font-body">
          Trabalhamos com acompanhamento técnico, planejamento e controle de
          execução, assegurando qualidade, segurança e conformidade normativa em
          todas as etapas.
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="border border-gray-200/80 dark:border-gray-700/80 rounded-xl p-3 sm:p-4 mb-3 last:mb-0 bg-white dark:bg-background-dark hover:shadow-sm transition-all duration-300"
      >
        <h3 className="font-semibold text-primary font-body mb-2">
          Posso solicitar um orçamento sem compromisso?
        </h3>
        <p className="text-[0.95rem] text-neutral-dark/70 leading-relaxed font-body">
          Sim! O orçamento inicial é gratuito e serve para entendermos melhor
          seu projeto antes de avançarmos para as próximas etapas.
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="border border-gray-200/80 dark:border-gray-700/80 rounded-xl p-3 sm:p-4 bg-white dark:bg-background-dark hover:shadow-sm transition-all duration-300"
      >
        <h3 className="font-semibold text-primary font-body mb-2">
          Vocês executam a obra ou apenas o projeto?
        </h3>
        <p className="text-[0.95rem] text-neutral-dark/70 leading-relaxed font-body">
          Atuamos tanto no desenvolvimento de projetos quanto na execução e
          gestão de obras. Nossos serviços incluem projeto arquitetônico,
          estrutural, hidrossanitário, elétrico, projeto de combate a incêndio e
          gestão de obras, de acordo com a necessidade de cada cliente.
        </p>
      </motion.div>
    </motion.section>
  );
}
