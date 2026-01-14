import { motion } from "framer-motion";
import type { ReactElement } from "react";
import { cloneElement } from "react";
import { fadeUp } from "../../../animations/motion";
interface MissionCardProps {
  title: string;
  description: string;
  icon: ReactElement;
}

export default function MissionCard({
  title,
  description,
  icon,
}: MissionCardProps) {
  const styledIcon = cloneElement(icon, {
    className: "text-primary",
    size: 24,
  } as never);
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col gap-4 p-8 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden"
    >
      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg relative z-10">
        {styledIcon}
      </div>
      <h3 className="text-xl font-bold text-secondary font-headings">
        {title}
      </h3>
      <p className="text-sm text-neutral-dark/70 leading-relaxed font-body">
        {description}
      </p>
    </motion.div>
  );
}
