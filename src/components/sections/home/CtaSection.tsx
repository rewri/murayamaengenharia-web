import { ChevronRight, Handshake } from "lucide-react";

export default function CtaSection() {
  return (
    <div className="w-full bg-white py-8 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center w-24 h-24 bg-accent rounded-full">
              <Handshake className="w-14 h-14 text-white pt-2" />
            </div>
          </div>

          <div className="flex-grow flex items-center">
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Orçamento rápido e inteligente
              </h2>
              <p className="text-gray-600 text-base">
                Precisa de um orçamento para seu projeto?
                <br />
                Use nosso chat e receba uma estimativa de forma rápida e sem
                complicação.
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 w-full md:w-auto">
            <button className="w-full md:w-auto bg-accent hover:bg-secondary text-white py-3 px-6 rounded-lg transition-colors duration-200 whitespace-nowrap font-bold flex items-center justify-center md:justify-start gap-2">
              SOLICITAR ORÇAMENTO
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
