// Tipos para Google Analytics
interface GtagConfig {
  page_path?: string;
  page_title?: string;
  page_location?: string;
  send_page_view?: boolean;
  [key: string]: string | number | boolean | undefined;
}

interface GtagEventParams {
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    gtag?: ((command: "js", dateOrConfig: string | Date) => void) &
      ((command: "config", targetId: string, config?: GtagConfig) => void) &
      ((
        command: "event",
        eventName: string,
        params?: GtagEventParams,
      ) => void) &
      ((...args: unknown[]) => void);
    dataLayer?: unknown[];
  }
}

export {};
