import { motion } from "framer-motion";
import { EyeIcon, Flag, GemIcon } from "lucide-react";
import { stagger } from "../../../animations/motion";
import MissionCard from "../../features/about/MissionCard";

export default function MissionSection() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 md:mb-24"
    >
      <MissionCard
        title="Missão"
        description="Prover soluções de engenharia com excelência técnica, segurança e
          sustentabilidade, superando as expectativas e transformando sonhos em
          realidade construída."
        icon={<Flag />}
      />
      <MissionCard
        title="Visão"
        description="Ser a empresa de engenharia líder em inovação e confiabilidade no
          mercado nacional até 2030, reconhecida pela qualidade ímpar de seus
          projetos."
        icon={<EyeIcon />}
      />
      <MissionCard
        title="Valores"
        description="Ética em todas as relações, Transparência, Compromisso com a
          Segurança, Inovação constante e Respeito ao Meio Ambiente."
        icon={<GemIcon />}
      />
    </motion.div>
  );
}
