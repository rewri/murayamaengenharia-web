import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fadeUp, stagger } from "../../../animations/motion";
import { allConstructions } from "../../../config/portfolio";
import PortfolioCard from "./PortfolioCard";

export default function PortfolioList() {
  const [projectsMock, setProjectsMock] = useState<typeof allConstructions>([]);

  useEffect(() => {
    const arr = [...allConstructions];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProjectsMock(arr.slice(0, 6));
  }, []);

  const navigate = useNavigate();

  return (
    <section className="mt-6 md:mt-20 w-full grid gap-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center pb-4 gap-4">
        <h2 className="dark:text-white text-2xl md:text-3xl font-bold tracking-[-0.015em] mb-0 pb-0 text-secondary text-center md:text-left whitespace-nowrap">
          Obras em Destaque
        </h2>
        <button
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors w-full md:w-auto"
          onClick={() => navigate("/obras")}
        >
          <span className="truncate uppercase">Ver Todas</span>
        </button>
      </div>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {Array.isArray(projectsMock) && projectsMock.length > 0 ? (
          projectsMock.map((project, idx) => {
            if (
              !project ||
              !project.title ||
              !project.location ||
              !project.image
            )
              return null;
            return (
              <motion.div key={project.image + idx} variants={fadeUp}>
                <PortfolioCard
                  id={project.id}
                  title={project.title}
                  location={project.location}
                  image={project.image}
                  category={project.category || "Residencial"}
                />
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-full text-center text-gray-400">
            Nenhum projeto encontrado.
          </div>
        )}
      </motion.div>
    </section>
  );
}
