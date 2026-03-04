import { ROUTES } from "./app";

export interface NavLink {
  label: string;
  href: string;
  subLinks?: NavLink[];
}

export const HEADER_CONFIG = {
  logo: {
    alt: "KHUDA",
  },
  navLinks: [
    { label: "소개", href: ROUTES.about },
    { label: "활동", href: ROUTES.activities },
    { label: "프로젝트", href: ROUTES.projects },
    { label: "후원", href: ROUTES.sponsor },
  ] as NavLink[],
  applyButton: {
    desktop: "지원하기",
    mobile: "Apply",
  },
  scrollThreshold: 50,
};

export const HEADER_STYLES = {
  header: {
    base: "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
    scrolled: "bg-white border-b border-border/40 shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
    transparent: "bg-transparent",
  },
  container: {
    base: "container mx-auto",
    padding: "px-6 md:px-12 lg:px-16",
  },
  wrapper: {
    base: "flex items-center justify-between py-0",
  },
  logo: {
    container: "flex items-center justify-center transition-all duration-300 ease-out hover:scale-[1.02] hover:opacity-90 -ml-2 sm:-ml-4 md:-ml-6 lg:-ml-8",
    height: "h-[70px] sm:h-[85px] md:h-[100px] lg:h-[120px]",
    width: "w-auto",
    image: "object-contain object-center max-h-full max-w-[200px] sm:max-w-[260px] md:max-w-[320px] lg:max-w-[380px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]",
  },
  height: {
    base: "h-12 sm:h-16 md:h-18 lg:h-20",
    mobileMenuOffset: "top-12 sm:top-16 md:top-18 lg:top-20",
  },
  nav: {
    desktop: {
      container: "hidden md:flex items-center gap-4 lg:gap-6 xl:gap-10",
      link: "nav-link text-base md:text-base font-medium tracking-[-0.01em] text-black px-3 py-2 transition-all duration-300 ease-out",
    },
    mobile: {
      container: "md:hidden absolute left-0 right-0 bg-background/98 backdrop-blur-2xl border-b border-border/40 animate-fade-in shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
      menu: "flex flex-col py-4 sm:py-6 px-4 sm:px-6 gap-1",
      link: "text-left py-3 sm:py-3.5 px-3 sm:px-4 text-sm sm:text-base text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-foreground/8 hover:to-foreground/4 rounded-xl transition-all duration-300 ease-out font-medium min-h-[44px] flex items-center",
      applyLink: "mt-2",
    },
  },
  button: {
    desktop: {
      container: "hidden md:flex items-center gap-4",
      apply: "relative rounded-md px-6 lg:px-8 py-1.5 lg:py-2 font-bold text-base lg:text-base tracking-[-0.01em] bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 ease-out group",
    },
    mobile: {
      menuToggle: "md:hidden p-2.5 sm:p-3 rounded-xl hover:bg-foreground/8 transition-all duration-300 ease-out active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center",
      apply: "text-left py-3 sm:py-3.5 px-3 sm:px-4 text-sm sm:text-base text-foreground hover:bg-foreground/8 rounded-xl transition-all duration-200 ease-out w-full font-semibold min-h-[44px] flex items-center justify-center",
    },
  },
  icon: {
    size: 24,
  },
};
