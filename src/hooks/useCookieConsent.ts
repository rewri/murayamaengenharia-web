import { useEffect, useState } from "react";
import { initGA } from "../lib/analytics";

const COOKIE_KEY = "cookie-consent";

export function useCookieConsent() {
  const [consent, setConsent] = useState<boolean | null>(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    return stored ? stored === "accepted" : null;
  });

  useEffect(() => {
    // Inicializar Google Analytics se já houver consentimento
    if (consent === true) {
      initGA();
    }
  }, [consent]);

  function acceptCookies() {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setConsent(true);
    initGA();
  }

  function rejectCookies() {
    localStorage.setItem(COOKIE_KEY, "rejected");
    setConsent(false);
  }

  return {
    consent,
    acceptCookies,
    rejectCookies,
  };
}
