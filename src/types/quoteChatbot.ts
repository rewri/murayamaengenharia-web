import { quoteQuestions } from "../config/quoteChatbot";

export type QuoteQuestionId = (typeof quoteQuestions)[number]["id"];

export type QuoteAnswers = Record<QuoteQuestionId, string>;

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
