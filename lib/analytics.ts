export type AnalyticsEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

function isBrowser() {
  return typeof window !== "undefined";
}

function sanitizeParams(params?: AnalyticsEventParams) {
  if (!params) {
    return {};
  }

  const clean: Record<string, string | number | boolean> = {};

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      clean[key] = value;
    }
  }

  return clean;
}

export function trackEvent(eventName: string, params?: AnalyticsEventParams) {
  if (!isBrowser()) {
    return;
  }

  const cleanParams = sanitizeParams(params);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...cleanParams });

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, cleanParams);
  }
}

export function trackCallClick(context: string) {
  trackEvent("phone_call_click", {
    interaction_type: "phone",
    context
  });
}

export function trackQuoteFormEvent(status: "attempt" | "success" | "error", context?: AnalyticsEventParams) {
  trackEvent("quote_form_submit", {
    status,
    ...context
  });

  if (status === "success") {
    trackEvent("generate_lead", {
      lead_type: "quote_form"
    });
  }
}
