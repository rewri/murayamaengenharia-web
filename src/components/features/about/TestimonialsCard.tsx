import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { fadeUp } from "../../../animations/motion";

interface TestimonialsCardProps {
  testimonial: { author: string; testimonial: string };
  index: number;
}

export default function TestimonialsCard({
  testimonial,
  index,
}: TestimonialsCardProps) {
  return (
    <motion.div
      key={index}
      variants={fadeUp}
      className="flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-8 hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={20}
            className={"fill-yellow-400 text-yellow-400"}
          />
        ))}
      </div>
      <blockquote className="text-base text-neutral-dark leading-relaxed font-body">
        "{testimonial.testimonial}"
      </blockquote>
      <div className="flex items-center gap-4 mt-auto">
        <h4 className="text-base font-bold leading-tight text-secondary font-headings">
          {testimonial.author}
        </h4>
      </div>
    </motion.div>
  );
}
