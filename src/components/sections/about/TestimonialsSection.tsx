import { motion } from "framer-motion";
import { fadeUp, stagger } from "../../../animations/motion";
import { testimonials } from "../../../config/testimonials";
import TestimonialsCard from "../../features/about/TestimonialsCard";

export default function TestimonialsSection() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div variants={fadeUp} className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary font-headings mb-4">
          O que nossos clientes dizem
        </h2>
        <p className="text-base text-neutral-dark/70 max-w-2xl mx-auto font-body">
          A confiança e a satisfação de quem contrata nossos serviços são nosso
          maior ativo.
        </p>
      </motion.div>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialsCard
            testimonial={testimonial}
            index={index}
            key={index}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
