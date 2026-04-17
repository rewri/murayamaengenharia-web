import { Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  FIRST_QUESTION_ID,
  quoteChatbotIntro,
  quoteChatbotTitle,
  quoteQuestionsMap,
} from "../../../config/quoteChatbot";
import { useQuoteChatbot } from "../../../context/QuoteChatbotContext";
import { trackEvent } from "../../../lib/analytics";
import { submitQuoteLead } from "../../../lib/quoteSubmission";
import type { QuoteAnswers } from "../../../types/quoteChatbot";

const MAX_ATTEMPTS = 3;
const WINDOW_MS = 60 * 1000;
const RATE_LIMIT_KEY = "quote-chatbot-attempts";

function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

function canSubmitNow() {
  const now = Date.now();
  const attemptsRaw = localStorage.getItem(RATE_LIMIT_KEY);
  const attempts = attemptsRaw ? (JSON.parse(attemptsRaw) as number[]) : [];
  const recentAttempts = attempts.filter((item) => now - item < WINDOW_MS);

  if (recentAttempts.length >= MAX_ATTEMPTS) {
    return false;
  }

  recentAttempts.push(now);
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recentAttempts));
  return true;
}

export function QuoteChatbotModal() {
  const { isOpen, closeChatbot } = useQuoteChatbot();
  const [stepStack, setStepStack] = useState<string[]>([FIRST_QUESTION_ID]);
  const [contactStage, setContactStage] = useState<"summary" | "form">(
    "summary",
  );
  const [answers, setAnswers] = useState<QuoteAnswers>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isContactStep, setIsContactStep] = useState(false);

  const currentQuestionId = stepStack[stepStack.length - 1];
  const currentQuestion = quoteQuestionsMap[currentQuestionId];
  const currentStepIndex = stepStack.length - 1;

  const ESTIMATED_TOTAL_STEPS = 5;

  const progressPercent = useMemo(() => {
    if (isContactStep) return 100;
    return Math.min(
      Math.round((currentStepIndex / ESTIMATED_TOTAL_STEPS) * 100),
      95,
    );
  }, [currentStepIndex, isContactStep]);

  const selectedServiceLabel = useMemo(() => {
    const serviceAnswer = answers[FIRST_QUESTION_ID];
    if (!serviceAnswer) return null;
    const serviceQuestion = quoteQuestionsMap[FIRST_QUESTION_ID];
    if (!serviceQuestion) return null;
    const option = serviceQuestion.options.find(
      (opt) => opt.value === serviceAnswer,
    );
    return option?.label || null;
  }, [answers]);

  const answersSummary = useMemo(
    () =>
      stepStack
        .map((questionId) => {
          const question = quoteQuestionsMap[questionId];
          if (!question) return null;
          const selectedValue = answers[questionId];
          if (!selectedValue) return null;
          const selectedOption = question.options.find(
            (option) => option.value === selectedValue,
          );
          if (!selectedOption) return null;
          return {
            questionId,
            prompt: question.prompt,
            answerLabel: selectedOption.label,
          };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null),
    [stepStack, answers],
  );

  function isDesktopViewport() {
    return window.matchMedia("(min-width: 768px)").matches;
  }

  function handleBackdropClick() {
    if (isDesktopViewport()) {
      return;
    }

    closeChatbot();
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isDesktopViewport()) {
        closeChatbot();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeChatbot]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setStepStack([FIRST_QUESTION_ID]);
    setContactStage("summary");
    setAnswers({});
    setName("");
    setPhone("");
    setEmail("");
    setCompanyEmail("");
    setIsSubmitting(false);
    setSubmitError(null);
    setIsSuccess(false);
    setIsContactStep(false);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  function handleAnswer(questionId: string, value: string) {
    setAnswers((previous) => ({ ...previous, [questionId]: value }));
    setSubmitError(null);

    const question = quoteQuestionsMap[questionId];
    if (!question) return;

    const selectedOption = question.options.find(
      (option) => option.value === value,
    );

    if (!selectedOption) return;

    const nextQuestionId = selectedOption.nextId || question.defaultNextId;

    if (nextQuestionId) {
      setStepStack((previous) => [...previous, nextQuestionId]);
    } else {
      setIsContactStep(true);
      setContactStage("summary");
    }
  }

  function handleBackStep() {
    setStepStack((previous) => {
      if (previous.length <= 1) return previous;
      return previous.slice(0, -1);
    });
    setIsContactStep(false);
    setSubmitError(null);
  }

  function isPhoneValid(rawPhone: string) {
    const digits = normalizePhone(rawPhone);
    return digits.length >= 10 && digits.length <= 11;
  }

  async function handleSubmit() {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    trackEvent("quote_chatbot_submit_attempt", {
      answered_questions: answersSummary.length,
      has_email: Boolean(trimmedEmail),
    });

    if (!trimmedName) {
      setSubmitError("Informe seu nome para continuar.");
      trackEvent("quote_chatbot_submit_error", {
        error_type: "name_missing",
      });
      return;
    }

    if (!isPhoneValid(phone)) {
      setSubmitError("Informe um telefone válido com DDD.");
      trackEvent("quote_chatbot_submit_error", {
        error_type: "phone_invalid",
      });
      return;
    }

    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setSubmitError("Informe um e-mail válido ou deixe em branco.");
      trackEvent("quote_chatbot_submit_error", {
        error_type: "email_invalid",
      });
      return;
    }

    if (companyEmail.trim()) {
      setSubmitError(
        "Não foi possível enviar sua solicitação. Tente novamente em instantes.",
      );
      trackEvent("quote_chatbot_submit_error", {
        error_type: "honeypot_filled",
      });
      return;
    }

    if (!canSubmitNow()) {
      setSubmitError(
        "Você excedeu o limite de tentativas. Aguarde e tente novamente.",
      );
      trackEvent("quote_chatbot_submit_error", {
        error_type: "rate_limit",
      });
      return;
    }

    const allAnswered = stepStack.every((questionId) => answers[questionId]);

    if (!allAnswered) {
      setSubmitError("Responda todas as perguntas antes de enviar.");
      trackEvent("quote_chatbot_submit_error", {
        error_type: "questions_incomplete",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      source: "site_chatbot" as const,
      submittedAt: new Date().toISOString(),
      honeypot: companyEmail.trim(),
      answers: answers as QuoteAnswers,
      contact: {
        name: trimmedName,
        phone: normalizePhone(phone),
        email: trimmedEmail || undefined,
      },
    };

    try {
      const response = await submitQuoteLead(payload);

      if (!response.success) {
        setSubmitError(
          response.message ??
            "Não foi possível enviar seu pedido agora. Tente novamente em instantes.",
        );
        trackEvent("quote_chatbot_submit_error", {
          error_type: "submission_rejected",
        });
        return;
      }

      trackEvent("quote_chatbot_submit_success", {
        answered_questions: answersSummary.length,
      });
      trackEvent("generate_lead", {
        lead_source: "site_chatbot",
        lead_type: "orcamento",
      });

      setIsSuccess(true);
    } catch {
      setSubmitError("Falha de conexão. Tente novamente em instantes.");
      trackEvent("quote_chatbot_submit_error", {
        error_type: "network_error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden md:overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={quoteChatbotTitle}
    >
      <button
        type="button"
        aria-label="Fechar chatbot de orcamento"
        onClick={handleBackdropClick}
        className="fixed inset-0 bg-black/60"
      />

      <div className="flex min-h-full items-stretch justify-center p-0 md:items-center md:p-6">
        <div className="relative flex h-[100dvh] w-full max-w-none flex-col bg-white rounded-none shadow-xl border-0 overflow-hidden md:h-auto md:max-w-md md:rounded-2xl md:border md:border-border">
          <div className="bg-primary px-4 py-4 text-white">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold font-headings">
                  SOLICITAR ORÇAMENTO
                </h3>
                <p className="text-sm text-white/90 font-body">
                  Rápido e sem complicação!
                </p>
              </div>
              <button
                type="button"
                className="p-2 rounded-full hover:bg-white/15 transition-colors"
                onClick={closeChatbot}
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-3 space-y-2">
              <div className="h-1.5 bg-white/25 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              {selectedServiceLabel && (
                <p className="text-xs text-white/80 font-body">
                  Serviço:{" "}
                  <span className="font-semibold text-white">
                    {selectedServiceLabel}
                  </span>
                </p>
              )}
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto bg-neutral-warm/40 p-4 md:max-h-[70vh] md:flex-initial md:p-5 space-y-4">
            {isSuccess ? (
              <div className="bg-white border border-border rounded-xl p-4 text-left">
                <p className="text-base font-semibold text-secondary">
                  Obrigado! Recebemos sua solicitação.
                </p>
                <p className="text-sm text-neutral-dark mt-2">
                  Nossa equipe entrará em contato em breve para seguir com seu
                  orçamento.
                </p>
                <button
                  type="button"
                  onClick={closeChatbot}
                  className="mt-4 w-full bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <>
                {stepStack.length === 1 && (
                  <div className="bg-white border border-border rounded-xl p-3 text-sm text-neutral-dark leading-relaxed">
                    {quoteChatbotIntro}
                  </div>
                )}

                {!isContactStep && currentQuestion && (
                  <div className="space-y-3">
                    <div className="bg-neutral-200/70 border border-neutral-300 rounded-xl p-3">
                      <p className="text-xs uppercase tracking-wide text-accent font-semibold">
                        Pergunta {currentStepIndex + 1}
                      </p>
                      <p className="mt-1 text-sm md:text-base font-semibold text-secondary">
                        {currentQuestion.prompt}
                      </p>
                    </div>

                    <div className="space-y-2">
                      {currentQuestion.options.map((option, optionIndex) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() =>
                            handleAnswer(currentQuestionId, option.value)
                          }
                          className="w-full text-left bg-white border border-border hover:border-accent hover:bg-cyan-50 rounded-xl px-3 py-3 text-sm text-neutral-dark transition-colors"
                        >
                          <span className="font-semibold text-secondary mr-1">
                            {optionIndex + 1}.
                          </span>
                          <span>{option.label}</span>
                        </button>
                      ))}
                    </div>

                    {stepStack.length > 1 && (
                      <button
                        type="button"
                        onClick={handleBackStep}
                        className="w-full rounded-lg border border-border py-2.5 text-sm font-semibold text-secondary hover:bg-neutral-warm transition-colors"
                      >
                        <ChevronLeft size={16} className="inline-block mr-1" />
                        Voltar para pergunta anterior
                      </button>
                    )}
                  </div>
                )}

                {isContactStep && contactStage === "summary" && (
                  <div className="space-y-3">
                    {answersSummary.length > 0 && (
                      <div className="bg-white border border-border rounded-xl p-3 space-y-2">
                        <p className="text-sm font-semibold text-secondary">
                          Revise suas respostas
                        </p>
                        <div className="space-y-2">
                          {answersSummary.map((item) => (
                            <div
                              key={item.questionId}
                              className="text-xs text-neutral-dark border border-neutral-200 rounded-lg px-2 py-1.5"
                            >
                              <p className="font-semibold text-secondary">
                                {item.prompt}
                              </p>
                              <p className="mt-0.5 flex items-center gap-2">
                                <span
                                  aria-hidden="true"
                                  className="inline-block h-1.5 w-1.5 rounded-full bg-neutral-dark"
                                />
                                <span>{item.answerLabel}</span>
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setContactStage("summary");
                          handleBackStep();
                        }}
                        className="w-1/3 rounded-lg border border-border py-2.5 text-sm font-semibold text-secondary hover:bg-neutral-warm transition-colors"
                      >
                        <ChevronLeft size={16} className="inline-block mr-1" />
                        Voltar
                      </button>

                      <button
                        type="button"
                        onClick={() => setContactStage("form")}
                        className="w-2/3 rounded-lg bg-accent text-white py-2.5 text-sm font-semibold hover:bg-sky-700 transition-colors"
                      >
                        Continuar
                        <ChevronRight size={16} className="inline-block ml-1" />
                      </button>
                    </div>
                  </div>
                )}

                {isContactStep && contactStage === "form" && (
                  <div className="space-y-3">
                    <div className="bg-white border border-border rounded-xl p-3">
                      <p className="text-sm font-semibold text-secondary">
                        Quase pronto! Informe seus dados para contato.
                      </p>
                      <p className="text-xs text-neutral-dark mt-1">
                        Nome e telefone são obrigatórios.
                      </p>
                    </div>

                    <div className="bg-white border border-border rounded-xl p-3 space-y-3">
                      <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Seu nome"
                        className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        autoComplete="name"
                      />

                      <input
                        type="tel"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        placeholder="Telefone com DDD"
                        className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        autoComplete="tel"
                      />

                      <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="E-mail (opcional)"
                        className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        autoComplete="email"
                      />

                      <input
                        type="email"
                        value={companyEmail}
                        onChange={(event) =>
                          setCompanyEmail(event.target.value)
                        }
                        className="hidden"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                      />

                      {submitError && (
                        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-2 py-1.5">
                          {submitError}
                        </p>
                      )}

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setContactStage("summary")}
                          className="w-1/3 rounded-lg border border-border py-2.5 text-sm font-semibold text-secondary hover:bg-neutral-warm transition-colors"
                          disabled={isSubmitting}
                        >
                          <ChevronLeft
                            size={16}
                            className="inline-block mr-1"
                          />
                          Voltar
                        </button>

                        <button
                          type="button"
                          onClick={handleSubmit}
                          className="w-2/3 rounded-lg bg-accent text-white py-2.5 text-sm font-semibold hover:bg-sky-700 transition-colors disabled:opacity-70"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            "Enviando..."
                          ) : (
                            <span className="inline-flex items-center gap-1">
                              Enviar solicitação
                              <Check size={16} aria-hidden="true" />
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
