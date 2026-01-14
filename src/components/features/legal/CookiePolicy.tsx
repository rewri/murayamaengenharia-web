import { X } from "lucide-react";

interface CookiePolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CookiePolicy({ isOpen, onClose }: CookiePolicyProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-primary font-headings">
              Política de Cookies
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-warm rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="space-y-4 text-sm text-neutral-dark font-body">
              <div>
                <h3 className="font-semibold mb-2">1. O que são cookies</h3>
                <p>
                  Cookies são pequenos arquivos armazenados no seu dispositivo
                  para garantir o funcionamento adequado do site e coletar
                  informações sobre a navegação.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">2. Cookies utilizados</h3>
                <p>
                  A Murayama Engenharia utiliza exclusivamente cookies
                  analíticos, por meio do Google Analytics, para fins
                  estatísticos e de melhoria da experiência do usuário.
                </p>
                <p>
                  As informações são coletadas de forma anonimizada, não
                  permitindo a identificação direta do visitante.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">3. Finalidade</h3>
                <p>Os cookies são utilizados para:</p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>Analisar estatísticas de acesso e navegação;</li>
                  <li>Avaliar desempenho e usabilidade do site;</li>
                  <li>Aprimorar conteúdos e serviços.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">4. Consentimento</h3>
                <p>
                  O uso de cookies analíticos ocorre somente mediante o
                  consentimento do usuário, que pode ser aceito, recusado ou
                  gerenciado a qualquer momento.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">5. Atualizações</h3>
                <p>
                  Esta Política de Cookies poderá ser atualizada a qualquer
                  tempo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
