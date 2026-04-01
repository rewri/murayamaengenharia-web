import type {
  QuoteLeadPayload,
  QuoteSubmitResponse,
} from "../types/quoteChatbot";

const QUOTE_ENDPOINT = "/api/orcamento.php";

export async function submitQuoteLead(
  payload: QuoteLeadPayload,
): Promise<QuoteSubmitResponse> {
  const response = await fetch(QUOTE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: JSON.stringify(payload),
  });

  let responseData: QuoteSubmitResponse | null = null;

  try {
    responseData = (await response.json()) as QuoteSubmitResponse;
  } catch {
    responseData = null;
  }

  if (!response.ok) {
    return {
      success: false,
      message:
        responseData?.message ??
        "Nao foi possivel enviar seu pedido agora. Tente novamente.",
    };
  }

  return {
    success: responseData?.success ?? true,
    message: responseData?.message,
  };
}
