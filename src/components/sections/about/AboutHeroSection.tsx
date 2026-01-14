import { motion } from "framer-motion";
import { fadeUp, stagger } from "../../../animations/motion";

export default function AboutHeroSection() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-col md:flex-row items-start gap-8 md:gap-12 mb-16 md:mb-24"
    >
      <motion.div variants={fadeUp} className="flex-1">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-primary font-headings mb-8">
            Construindo o futuro com precisão e inovação
          </h1>
          <p className="text-lg text-neutral-dark/70 leading-relaxed font-body">
            Na{" "}
            <span className="text-secondary font-semibold">
              Murayama Engenharia
            </span>{" "}
            combinamos décadas de experiência com tecnologia de ponta para
            entregar projetos que superam as expectativas. <br /> Nós
            acreditamos que um trabalho realizado com afinco torna-se muito mais
            que um trabalho e a{" "}
            <span className="text-secondary font-semibold">
              Murayama Engenharia
            </span>{" "}
            se orgulha do que faz e faz com amor e dedicação.
          </p>
        </div>
      </motion.div>
      <motion.div variants={fadeUp} className="flex-1 w-full">
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
          <div
            className="absolute inset-0 bg-center bg-cover bg-no-repeat"
            style={{
              backgroundImage: 'url("/static/images/about/empresa.png")',
            }}
          ></div>
        </div>
      </motion.div>
    </motion.div>
  );
}
