import FaqSection from "../../components/sections/contact/FaqSection";
import GoogleRatingSection from "../../components/sections/contact/GoogleRatingSection";
import HeroSection from "../../components/sections/contact/HeroSection";
import InfoSection from "../../components/sections/contact/InfoSection";
import MapsSection from "../../components/sections/contact/MapsSection";
import CtaSection from "../../components/sections/home/CtaSection";

export default function ContactPage() {
  return (
    <>
      <section className="w-full py-8 pb-0 md:py-16 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 pb-0">
          <HeroSection />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16 md:mb-24">
            <div className="md:col-span-4">
              <GoogleRatingSection />
            </div>
            <div className="md:col-span-8">
              <FaqSection />
            </div>
            <div className="md:col-span-5">
              <InfoSection />
            </div>
            <div className="md:col-span-7">
              <MapsSection />
            </div>
          </div>
        </div>
      </section>
      <div style={{ marginBottom: " -80px " }}>
        <CtaSection />
      </div>
    </>
  );
}
