import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { fadeUp, stagger } from "../../../animations/motion";

export default function AboutHeroSection() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <>
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
              acreditamos que um trabalho realizado com afinco torna-se muito
              mais que um trabalho e a{" "}
              <span className="text-secondary font-semibold">
                Murayama Engenharia
              </span>{" "}
              se orgulha do que faz e faz com amor e dedicação.
            </p>
          </div>
        </motion.div>
        <motion.div variants={fadeUp} className="flex-1 w-full">
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
            aria-label="Expandir imagem"
          >
            <img
              src="/static/images/about/murayama.webp"
              alt="Murayama Engenharia"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </button>
        </motion.div>
      </motion.div>
      {isLightboxOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Fechar"
          >
            <X size={32} />
          </button>
          <img
            src="/static/images/about/murayama-big.webp"
            alt="Murayama Engenharia expandida"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
