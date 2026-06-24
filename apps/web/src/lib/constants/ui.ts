export const SCROLL_ANIMATION_CONFIG = {
  threshold: 0.1,
};

export const SCROLL_REVEAL_OPTIONS = {
  threshold: SCROLL_ANIMATION_CONFIG.threshold,
  rootMargin: "0px 0px -80px 0px",
};

export const TRACK_ACCENT_CLASS = "text-blue-600";

export const SECTION_STYLES = {
  header: {
    container: "text-center mb-6 sm:mb-8 md:mb-10",
    title: "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6",
    subtitle: "text-sm sm:text-base md:text-lg text-muted-foreground",
  },
  maxWidth: {
    narrow: "max-w-3xl mx-auto",
  },
  container: {
    base: "container mx-auto relative z-10",
  },
  section: {
    base: "section-padding relative transition-all duration-1000 ease-out",
  },
  visibility: {
    visible: "opacity-100 translate-y-0",
    hidden: "opacity-0 translate-y-10",
  },
  textCenter: "text-center",
};

export const BUTTON_CONFIG = {
  variant: {
    hero: "hero" as const,
  },
  size: {
    xl: "xl" as const,
  },
};

export const COMMON_STYLES = {
  cardGradient: "hidden",
  cardBase: "relative rounded-2xl border border-[#E8EBED] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden",
} as const;
