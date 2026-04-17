// Google Analytics inicialização

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

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
  window.gtag("config", GA_ID, {
    send_page_view: false,
  });
}

export function trackPageView(path: string, title?: string) {
  if (!window.gtag) return;

  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  });
}

export function trackEvent(eventName: string, params?: AnalyticsParams) {
  if (!window.gtag) return;

  window.gtag("event", eventName, params);
}
