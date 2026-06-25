export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api-khuda.gaeng02.com";

export const REQUEST_TIMEOUT = 30000; // 30초

export const API_ENDPOINTS = {
  QUESTIONS: (type: string) => `/api/questions/${type}`,
  APPLICATIONS: "/api/applications",
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
  rules: "/rules",
} as const;

export const IMAGE_PATHS = {
  //logo: "/images/logos/khuda-logo.png",
  logo: "/images/logos/khuda-logo-white.png",
  icon: "/images/logos/khuda-icon.png",
};

export const EXTERNAL_LINK_PROPS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
