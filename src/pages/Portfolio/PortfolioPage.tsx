import CtaSection from "../../components/sections/home/CtaSection";
import HeroSection from "../../components/sections/portfolio/HeroSection";
import PortfolioListSection from "../../components/sections/portfolio/PortfolioListSection";

export default function PortfolioPage() {
  return (
    <>
      <section className="w-full py-8 pb-0 md:py-16 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <HeroSection />
          <PortfolioListSection />
        </div>
      </section>
      <div style={{ marginBottom: " -80px " }}>
        <CtaSection />
      </div>
    </>
  );
}
