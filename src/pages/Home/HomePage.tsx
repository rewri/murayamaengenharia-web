import CtaSection from "../../components/sections/home/CtaSection";
import HeroSection from "../../components/sections/home/HeroSection";
import PartnersSection from "../../components/sections/home/PartnersSection";
import PortfolioSection from "../../components/sections/home/PortfolioSection";
import ServicesSection from "../../components/sections/home/ServicesSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <section className="w-full py-8 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <ServicesSection />
          <PortfolioSection />
        </div>
      </section>
      <CtaSection />
      <PartnersSection />
    </>
  );
}
