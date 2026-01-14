import { useEffect, useRef } from "react";
import { partners } from "../../../config/partners";
import PartnersLogo from "./PartnersLogo";

export default function PartnersCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    // Calcular a metade do scroll width para reset suave
    const halfScrollWidth = scrollContainer.scrollWidth / 2;

    const interval = setInterval(() => {
      scrollPosition += scrollSpeed;

      // Reset quando atingir a metade (onde os logos se repetem)
      if (scrollPosition >= halfScrollWidth) {
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-transparent py-8 md:py-16 pb-8 md:pb-4">
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-2xl font-light text-neutral-dark mb-20">
          Nossos clientes e parceiros
        </h2>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-36 bg-gradient-to-r from-background-light to-transparent z-10 pointer-events-none" />
        <div
          ref={scrollContainerRef}
          className="flex gap-32 overflow-x-hidden px-4 sm:px-6 lg:px-8 scroll-smooth"
          style={{ scrollBehavior: "auto" }}
        >
          {[...partners, ...partners].map((partner, index) => (
            <PartnersLogo
              key={`${partner.name}-${index}`}
              partner={partner}
              index={index}
            />
          ))}
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-36 bg-gradient-to-l from-background-light to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
