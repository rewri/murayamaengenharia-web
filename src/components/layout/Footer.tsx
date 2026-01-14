import {
  AtSign,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { navigationItems } from "../../config/navigation";
import { PhoneLink } from "../features/contact/PhoneLink";
import { CookiePolicy } from "../features/legal/CookiePolicy";
import { PrivacyPolicy } from "../features/legal/PrivacyPolicy";

export function Footer() {
  const navigate = useNavigate();
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showCookiePolicy, setShowCookiePolicy] = useState(false);
  const menuItems = navigationItems;

  return (
    <>
      <footer className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-primary text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Empresa */}
          <div className="w-full">
            <img
              src="/static/images/logo/logo_branco_1.png"
              alt="Murayama Engenharia Logo"
              className="h-24 w-auto mb-6"
            />
            <p className="text-sm text-neutral-warm font-body">
              Engenharia e construção com foco em qualidade, segurança e
              eficiência. Desenvolvemos projetos e executamos obras com
              responsabilidade técnica, atenção aos detalhes e compromisso com
              resultados de alto desempenho.
            </p>
          </div>

          {/* Navegação */}
          <div className="w-full md:pl-8">
            <h4 className="font-semibold mb-6 font-headings">Navegação</h4>
            <ul className="space-y-3 text-sm font-body">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <a
                    onClick={() => navigate(item.href)}
                    className="hover:underline cursor-pointer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setShowPrivacyPolicy(true)}
                  className="hover:underline text-left"
                >
                  Política de Privacidade
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShowCookiePolicy(true)}
                  className="hover:underline text-left"
                >
                  Política de Cookies
                </button>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="w-full">
            <h4 className="font-semibold mb-6 font-headings">Contato</h4>
            <div className="space-y-4 text-sm text-neutral-warm font-body">
              {/* Endereço */}
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
                <span>
                  Largo São José
                  <br />
                  Centro, Botucatu - SP
                  <br />
                  CEP: 18602-113
                </span>
              </div>

              {/* Telefone */}
              <div className="flex items-center gap-2 group">
                <PhoneLink displayText="(14) 99775-4442" variant="text" />
              </div>

              {/* Email com proteção antispam */}
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="flex items-center">
                  contato
                  <AtSign className="h-3 w-3" />
                  murayamaengenharia.com.br
                </span>
              </div>

              {/* Redes Sociais */}
              <div className="pt-4">
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com/murayamaengenharia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-300 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-8 h-8" />
                  </a>
                  <a
                    href="https://facebook.com/murayamaengenharia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-300 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-8 h-8" />
                  </a>
                  <a
                    href="https://linkedin.com/company/murayama-engenharia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-300 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-8 h-8" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-primary border-t border-secondary">
          <div className="max-w-7xl mx-auto px-4 text-center py-6 text-sm text-neutral-warm font-body">
            © {new Date().getFullYear()} Murayama Engenharia. Todos os direitos
            reservados.
          </div>
        </div>
      </footer>

      {/* Modais */}
      <PrivacyPolicy
        isOpen={showPrivacyPolicy}
        onClose={() => setShowPrivacyPolicy(false)}
      />
      <CookiePolicy
        isOpen={showCookiePolicy}
        onClose={() => setShowCookiePolicy(false)}
      />
    </>
  );
}
