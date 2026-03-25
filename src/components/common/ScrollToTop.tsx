import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const targetId = decodeURIComponent(hash.slice(1));

    const scrollToAnchor = () => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    // Run after paint and retry shortly after to handle delayed section mounts.
    const rafId = window.requestAnimationFrame(scrollToAnchor);
    const timeoutId = window.setTimeout(scrollToAnchor, 180);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, [pathname, hash]);

  return null;
}
