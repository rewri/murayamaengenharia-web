import { useParams } from "react-router-dom";
import CtaSection from "../../components/sections/home/CtaSection";
import HeroSection from "../../components/sections/portfolio/HeroSection";
import PortfolioListSection from "../../components/sections/portfolio/PortfolioListSection";
import ProjectsArchitectureSection from "../../components/sections/portfolio/ProjectsArchitectureSection";

export default function PortfolioPage() {
  const { category } = useParams();

  return (
    <>
      <section className="w-full py-8 pb-0 md:py-16 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <HeroSection />
          <PortfolioListSection initialCategory={category} />
          <ProjectsArchitectureSection />
        </div>
      </section>
      <div style={{ marginBottom: " -80px " }}>
        <CtaSection />
      </div>
    </>
  );
}
