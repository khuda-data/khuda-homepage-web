export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api-khuda.gaeng02.com";

export const REQUEST_TIMEOUT = 30000; // 30초

export const API_ENDPOINTS = {
  QUESTIONS: (type: string) => `/api/questions/${type}`,
  APPLICATIONS: "/api/applications",
  APPLICATION_RESULT: "/api/application_result",
} as const;

export const ROUTES = {
  home: "/",
  about: "/about",
  activities: "/activities",
  projects: "/projects",
  sponsor: "/sponsor",
  recruiting: "/recruiting",
  faq: "/faq",
  apply: "/apply",
  applicationResult: "/application-result",
} as const;

export const IMAGE_PATHS = {
  //logo: "/images/logos/khuda-logo.png",
  logo: "/images/logos/khuda-logo-white.png",
};

export const EXTERNAL_LINK_PROPS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
