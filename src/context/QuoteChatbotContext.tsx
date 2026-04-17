import type { ReactNode } from "react";
import { createContext, useContext, useMemo, useState } from "react";
import { trackEvent } from "../lib/analytics";

interface QuoteChatbotContextValue {
  isOpen: boolean;
  openChatbot: (source?: string) => void;
  closeChatbot: () => void;
}

const QuoteChatbotContext = createContext<QuoteChatbotContextValue | undefined>(
  undefined,
);

interface QuoteChatbotProviderProps {
  children: ReactNode;
}

export function QuoteChatbotProvider({ children }: QuoteChatbotProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  function openChatbot(source = "unknown") {
    setIsOpen(true);
    trackEvent("quote_chatbot_open", {
      source,
    });
  }

  const value = useMemo(
    () => ({
      isOpen,
      openChatbot,
      closeChatbot: () => setIsOpen(false),
    }),
    [isOpen],
  );

  return (
    <QuoteChatbotContext.Provider value={value}>
      {children}
    </QuoteChatbotContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useQuoteChatbot() {
  const context = useContext(QuoteChatbotContext);

  if (!context) {
    throw new Error(
      "useQuoteChatbot must be used inside a QuoteChatbotProvider.",
    );
  }

  return context;
}
