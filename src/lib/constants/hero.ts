export const HERO_CONFIG = {
  words: ["Data", "AI"] as const,
  wordRotationInterval: 2000, // ms
  title: {
    prefix: "Dive into",
    dot: ".",
  },
  subtitle: "KHUDA 9th",
  tagline: "경희대학교 데이터·AI 학회",
  taglineSub: " | KHUDA",
  buttons: {
    apply: "지원하기",
    viewActivities: "활동 보기",
  },
  scrollIndicator: "Scroll",
};

export const HERO_STYLES = {
  section: {
    base: "relative min-h-[100svh] min-h-screen flex items-end overflow-hidden",
  },
  container: {
    base: "relative z-10 w-full",
    padding: "px-5 sm:px-8 md:px-16 lg:px-20 pb-20 sm:pb-32 md:pb-36 lg:pb-40",
  },
  topRow: "flex items-start justify-between mb-2 sm:mb-3 md:mb-4 opacity-0 animate-fade-up",
  title: {
    base: "text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none opacity-0 animate-fade-up animation-delay-200",
    prefix: "block text-white tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl drop-shadow-lg",
    wordContainer: "inline-block",
    wordWrapper: "inline-block min-w-[72px] sm:min-w-[100px] md:min-w-[160px] relative",
    word: "inline-block text-white border-b-2 sm:border-b-4 border-white/40 pb-1 sm:pb-2 transition-all duration-700 text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl drop-shadow-lg",
    dot: "text-white/60 ml-0.5 sm:ml-1 text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
  },
  subtitle: {
    base: "text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ml-0 sm:ml-0.5 md:ml-1 text-white drop-shadow-lg",
  },
  tagline: "text-xs sm:text-sm md:text-base text-white/80 tracking-wide mt-4 sm:mt-5 md:mt-6 -ml-1 sm:ml-0 md:ml-1 opacity-0 animate-fade-up animation-delay-400 drop-shadow-md",
  taglineSub: "text-white/60",
  buttons: {
    container: "flex flex-col sm:flex-row gap-3 sm:gap-4 opacity-0 animate-fade-up animation-delay-600",
    base: "w-full sm:w-auto rounded-md text-sm sm:text-base min-h-[44px]",
  },
  scrollIndicator: {
    container: "absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2 opacity-0 animate-fade-in animation-delay-600 z-30",
    text: "text-xs sm:text-sm text-white font-semibold tracking-widest uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.5),0_0_30px_rgba(255,255,255,0.3)]",
    line: "w-px h-6 sm:h-12 bg-gradient-to-b from-white/50 to-transparent",
  },
  gradient: {
    overlay: "absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/35 pointer-events-none",
    bottom: "absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none z-20",
  },
};
