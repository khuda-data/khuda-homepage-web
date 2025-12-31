declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "";

const isValidGAId = (id: string): boolean => {
  return id.startsWith("G-") && id.length > 2;
};

export const initGA = (): void => {
  if (typeof window === "undefined") return;
  if (!isValidGAId(GA_MEASUREMENT_ID)) return;

  window.dataLayer = window.dataLayer || [];
  const gtag = (...args: unknown[]) => {
    window.dataLayer.push(args);
  };
  window.gtag = gtag as typeof window.gtag;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });
};

export const trackPageView = (path: string): void => {
  if (typeof window === "undefined" || !window.gtag) return;
  if (!isValidGAId(GA_MEASUREMENT_ID)) return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: path,
  });
};

export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
): void => {
  if (typeof window === "undefined" || !window.gtag) return;
  if (!isValidGAId(GA_MEASUREMENT_ID)) return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const trackGTMPageView = (path: string): void => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "page_view",
    page_path: path,
    page_location: window.location.href,
  });
};

