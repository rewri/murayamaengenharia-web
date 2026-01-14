import { X } from "lucide-react";

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicy({ isOpen, onClose }: PrivacyPolicyProps) {
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
              Política de Privacidade
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
                <h3 className="font-semibold mb-2">1. Coleta de dados</h3>
                <p>
                  A Murayama Engenharia coleta dados pessoais de forma limitada,
                  exclusivamente para fins estatísticos, por meio do Google
                  Analytics.
                </p>
                <p className="mt-2">
                  Os dados coletados podem incluir endereço IP anonimizado, tipo
                  de dispositivo, navegador, páginas acessadas e tempo de
                  permanência no site.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">2. Finalidade</h3>
                <p>Os dados são utilizados para:</p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>Analisar o uso do site;</li>
                  <li>Melhorar a experiência de navegação;</li>
                  <li>Aperfeiçoar conteúdos e funcionalidades.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">3. Base legal</h3>
                <p>
                  O tratamento de dados ocorre com base no consentimento do
                  titular, conforme a Lei nº 13.709/2018 (LGPD).
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">4. Compartilhamento</h3>
                <p>
                  Os dados podem ser compartilhados com o Google, fornecedor da
                  ferramenta Google Analytics, respeitando as normas de proteção
                  de dados aplicáveis.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">5. Direitos do titular</h3>
                <p>
                  O titular pode, a qualquer momento, solicitar acesso,
                  correção, exclusão dos dados ou revogar o consentimento.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">6. Atualizações</h3>
                <p>
                  Esta Política de Privacidade poderá ser atualizada
                  periodicamente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
