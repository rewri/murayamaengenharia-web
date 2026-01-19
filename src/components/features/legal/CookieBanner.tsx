import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { useCookieConsent } from "../../../hooks/useCookieConsent";
import { Button } from "../../common/buttons/Button";
import { CookiePolicy } from "../legal/CookiePolicy";
import { PrivacyPolicy } from "../legal/PrivacyPolicy";

export function CookieBanner() {
  const { consent, acceptCookies, rejectCookies } = useCookieConsent();
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showCookiePolicy, setShowCookiePolicy] = useState(false);

  if (consent !== null) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4 w-full max-w-[420px] md:w-[420px]
                     bg-white border border-neutral-warm shadow-lg rounded-lg p-4 z-50"
        >
          <p className="text-sm text-neutral-dark mb-4 font-body">
            Utilizamos cookies para garantir o funcionamento adequado do site e
            coletar dados estatísticos. Consulte a{" "}
            <button
              onClick={() => setShowPrivacyPolicy(true)}
              className="text-secondary hover:underline"
            >
              Política de Privacidade
            </button>{" "}
            e{" "}
            <button
              onClick={() => setShowCookiePolicy(true)}
              className="text-secondary hover:underline"
            >
              Política de Cookies
            </button>
            .
          </p>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={rejectCookies}
              endIcon={X}
            >
              Recusar
            </Button>
            <Button size="sm" onClick={acceptCookies} endIcon={Check}>
              Aceitar
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>

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
