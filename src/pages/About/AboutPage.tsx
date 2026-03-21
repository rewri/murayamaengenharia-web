import AboutHeroSection from "../../components/sections/about/AboutHeroSection";
import MissionSection from "../../components/sections/about/MissionSection";
import ServicesSection from "../../components/sections/about/ServicesSection";
import TestimonialsSection from "../../components/sections/about/TestimonialsSection";
import CtaSection from "../../components/sections/home/CtaSection";

export default function AboutPage() {
  return (
    <>
      <section className="w-full py-8 pb-0 md:py-16 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <AboutHeroSection />
          <MissionSection />
          <ServicesSection />
          <TestimonialsSection />
        </div>
      </section>
      <div style={{ marginBottom: " -80px " }}>
        <CtaSection />
      </div>
    </>
  );
}
