// Google Analytics inicialização

export function initGA() {
  const GA_ID = import.meta.env.VITE_GA_ID;
  if (!GA_ID || typeof window.gtag === "function") return;

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];

  window.gtag = function (...args: unknown[]) {
    window.dataLayer?.push(args);
  };

  window.gtag("js", new Date().toISOString());
  window.gtag("config", GA_ID);
}
