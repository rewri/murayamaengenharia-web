import { Handshake } from "lucide-react";
import { useEffect, useState } from "react";

export function FloatingBudgetButton() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Não mostrar em desktop
  if (!isMobile) return null;

  const scrollToChatbot = () => {
    const chatbotSection = document.querySelector("#chatbot");
    if (chatbotSection) {
      chatbotSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed left-6 z-50" style={{ bottom: "80px" }}>
      <button
        className="bg-accent-600 hover:bg-accent-700 text-white rounded-full p-2 md:p-3 opacity-80 hover:opacity-100 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
        aria-label="Solicitar Orçamento"
        onClick={scrollToChatbot}
      >
        <Handshake className="w-8 h-8 md:w-10 md:h-10" />
      </button>
    </div>
  );
}
