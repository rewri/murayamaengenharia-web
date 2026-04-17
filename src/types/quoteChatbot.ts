export type QuoteAnswers = Record<string, string>;

export interface QuoteLeadContact {
  name: string;
  phone: string;
  email?: string;
  companyEmail?: string;
}

export interface QuoteLeadPayload {
  source: "site_chatbot";
  submittedAt: string;
  honeypot?: string;
  answers: QuoteAnswers;
  contact: {
    name: string;
    phone: string;
    email?: string;
  };
}

export interface QuoteSubmitResponse {
  success: boolean;
  message?: string;
}
