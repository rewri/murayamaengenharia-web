import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (!window.gtag) return;

    window.gtag("config", import.meta.env.VITE_GA_ID, {
      page_path: location.pathname,
    });
  }, [location]);
}
