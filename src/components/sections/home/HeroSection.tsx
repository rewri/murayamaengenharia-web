import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PhoneLink } from "../../features/contact/PhoneLink";

interface HeroContent {
  title: string;
  titleHighlight: string;
  subtitle: string;
  subtitleHighlight?: string;
}

const heroOptions: HeroContent[] = [
  {
    title: "Construindo seus",
    titleHighlight: "sonhos",
    subtitle: "Transformamos ",
    subtitleHighlight: "ideias complexas",
  },
  {
    title: "Da concepção à",
    titleHighlight: "conclusão",
    subtitle: "Unimos ",
    subtitleHighlight: "engenharia de precisão",
  },
  {
    title: "Engenharia que",
    titleHighlight: "transforma ideias",
    subtitle: "Projetos pensados com ",
    subtitleHighlight: "técnica, inovação e compromisso",
  },
];

const subtitleTexts = [
  "em realidade, com inovação e excelência em cada projeto",
  "a soluções confiáveis em todas as etapas",
  "do início ao fim",
];

const statsData = [
  { value: 150, label: "Obras" },
  { value: 10, label: "Anos" },
  { value: 100, label: "Satisfação", suffix: "%" },
];

interface CounterProps {
  value: number;
  suffix?: string;
  animationDelay?: number;
}

const Counter: React.FC<CounterProps> = ({
  value,
  suffix = "+",
  animationDelay = 1.4,
}) => {
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useMotionValueEvent(motionValue, "change", (latest) => {
    setDisplayValue(Math.round(latest));
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const animation = animate(motionValue, value, {
        duration: 2,
        ease: "easeOut",
      });

      return () => animation.stop();
    }, animationDelay * 1000);

    return () => clearTimeout(timer);
  }, [motionValue, value, animationDelay]);

  return (
    <motion.span>
      {displayValue}
      {suffix}
    </motion.span>
  );
};

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  const [selectedOption] = useState<number>(() =>
    Math.floor(Math.random() * heroOptions.length)
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video && !isMobile) {
      const handleLoadedData = () => {
        setVideoLoaded(true);
        video.play().catch((error) => {
          console.error("Erro ao reproduzir vídeo:", error);
        });
      };
      video.addEventListener("loadeddata", handleLoadedData);
      return () => {
        video.removeEventListener("loadeddata", handleLoadedData);
      };
    }
  }, [isMobile]);

  const scrollToChatbot = (): void => {
    const chatbotSection = document.querySelector("#chatbot");
    if (chatbotSection) {
      chatbotSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleVideoError = (
    event: React.SyntheticEvent<HTMLVideoElement, Event>
  ): void => {
    console.warn("Erro ao carregar vídeo:", event);
    setVideoLoaded(false);
  };

  return (
    <section
      id="home"
      className={`relative w-full overflow-hidden flex items-center bg-gradient-to-br from-primary-600 to-accent-500 ${
        isMobile ? "h-[65vh] pt-30" : "h-[60vh]"
      }`}
    >
      <div className="absolute inset-0 z-10">
        <div
          className="absolute inset-0 z-20 bg-black bg-opacity-60"
          style={{
            backgroundImage: `
                 linear-gradient(
                   45deg,
                   rgba(0, 0, 0, 0.2) 1px,
                   transparent 1px,
                   transparent 50%,
                   rgba(0, 0, 0, 0.2) 50%,
                   rgba(0, 0, 0, 0.2) calc(50% + 1px),
                   transparent calc(50% + 1px),
                   transparent
                 )
               `,
            backgroundSize: "8px 8px",
          }}
        />
        {!isMobile && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'%3E%3Cpath fill='%230A2B42' d='M0 0h1200v600H0z'/%3E%3C/svg%3E"
            className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
              videoLoaded ? "opacity-100" : "opacity-0"
            }`}
            onError={handleVideoError}
          >
            <source
              src="/static/videos/video-optimized-720p.mp4"
              type="video/mp4"
            />
            <source src="/static/videos/video-optimized.mp4" type="video/mp4" />
            Seu navegador não suporta reprodução de vídeo.
          </video>
        )}
        {/* Fallback background se o vídeo não carregar ou em mobile */}
        {(!videoLoaded || isMobile) && (
          <div
            className="absolute inset-0 z-10 bg-gradient-to-br from-primary-600 to-accent-500"
            style={{
              backgroundImage: `url('/static/images/bg/hero.png'), linear-gradient(to bottom right, var(--tw-gradient-stops))`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        )}
      </div>

      <div className="relative z-30 w-full px-4 sm:px-6 lg:px-8 text-center md:text-center pb-20 sm:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className={`text-3xl sm:text-4xl md:text-4xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 font-headings leading-tight px-2 ${
              isMobile ? "pt-16" : "pt-0"
            }`}
            style={{
              textShadow:
                "3px 3px 8px rgba(0,0,0,0.2), 1px 1px 3px rgba(0,0,0,0.2)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {heroOptions[selectedOption].title}{" "}
            <span className="text-accent">
              {heroOptions[selectedOption].titleHighlight}
            </span>
          </motion.h1>

          <motion.h2
            className="text-base sm:text-lg md:text-2xl lg:text-2xl text-white/100 mb-8 sm:mb-10 max-w-full font-body leading-relaxed px-2"
            style={{
              textShadow:
                "2px 2px 6px rgba(0,0,0,0.3), 1px 1px 3px rgba(0,0,0,0.3)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {heroOptions[selectedOption].subtitle}
            <span className="text-accent-400">
              {heroOptions[selectedOption].subtitleHighlight}
            </span>
            {" " + subtitleTexts[selectedOption]}
          </motion.h2>

          <motion.div
            className="flex flex-col md:flex-row gap-3 sm:gap-4 items-center justify-center md:justify-center mb-3 sm:mb-8 py-2 sm:py-4 px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              onClick={scrollToChatbot}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-full md:w-80 text-white border-2 border-white/80 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-body
                       backdrop-blur-sm bg-white/10 hover:bg-accent-400/15 hover:text-white hover:border-accent 
                       transition-all duration-300 ease-out flex items-center gap-2 justify-center"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
              Solicite um Orçamento
            </motion.button>

            <PhoneLink displayText="(14) 99775-4442" variant="button" />
          </motion.div>

          <motion.div
            className="flex flex-row gap-6 sm:gap-8 md:gap-16 justify-center items-center mt-6 sm:mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {statsData.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-5xl md:text-6xl lg:text-5xl font-black text-accent-300 font-headings mb-1 sm:mb-1 leading-none">
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    animationDelay={1}
                  />
                </div>
                <div className="text-sm sm:text-base md:text-lg text-white/90 font-semibold font-body tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      {/* <motion.div
        className="absolute bottom-8 left-0 right-0 z-30 flex justify-center pointer-events-none"
        animate={{
          y: [0, -10, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-8 h-12 border-2 border-white/80 rounded-full relative">
          <motion.div
            className="w-1.5 h-1.5 bg-white/80 rounded-full absolute top-2 left-1/2 -translate-x-1/2"
            animate={{
              y: [0, 20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div> */}
    </section>
  );
};

export default HeroSection;
