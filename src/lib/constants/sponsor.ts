export type IndexSponsor = { name: string; logo: string; website?: string; logoSmall?: boolean } | null;

export const INDEX_SPONSORS: IndexSponsor[] = [
  { name: "몬스터 에너지", logo: "/images/sponsors/monster-color.png", website: "https://www.monsterenergy.com" },
  { name: "Perplexity", logo: "/images/sponsors/perplexity-color.png", website: "https://www.perplexity.ai", logoSmall: true },
  { name: "Lovable", logo: "/images/sponsors/lovable-color.png", website: "https://lovable.dev", logoSmall: true },
  { name: "한빛앤", logo: "/images/sponsors/hanbit-color.png", website: "https://www.hanbitn.com" },
  { name: "현대모비스", logo: "/images/sponsors/mobis-color.png", website: "https://www.mobis.co.kr" },
  { name: "경희대학교 총동아리연합회", logo: "/images/sponsors/univ-color.png", website: "https://www.khu.ac.kr" },
];

export const SPONSOR_PAGE_CONFIG = {
  title: "후원사",
  subtitle: "KHUDA를 후원해주시는 기업 및 기관을 소개합니다.",
  description: [],
  googleFormButton: {
    text: "후원 문의",
    href: "#", // TODO: 구글폼 링크로 교체 필요
    disabled: false,
    disabledText: "준비 중입니다",
  },
  noSponsorsMessage: "해당 기수에는 후원사 정보가 없습니다.",
};

export const SPONSOR_PAGE_STYLES = {
  section: {
    base: "py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-12",
    container: "container mx-auto max-w-6xl",
  },
  header: {
    container: "text-center mb-8 sm:mb-12",
    title: "text-2xl sm:text-3xl md:text-4xl font-bold mb-3",
    subtitle: "text-sm sm:text-base text-muted-foreground",
  },
  generationSection: {
    container: "mb-12 sm:mb-16 last:mb-0",
    title: "text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-foreground",
    grid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6",
  },
  sponsorCard: {
    base: "group relative rounded-xl sm:rounded-2xl bg-card border border-border/50 hover:border-border transition-all duration-300 overflow-hidden",
    padding: "p-6 sm:p-8",
    hover: "hover:shadow-lg hover:scale-[1.02]",
    logo: {
      container: "flex items-center justify-center mb-4 h-20 sm:h-24",
      image: "max-h-full max-w-full object-contain",
      placeholder: "w-full h-20 sm:h-24 bg-muted/30 rounded-lg flex items-center justify-center",
    },
    name: "text-center text-base sm:text-lg font-semibold mb-2 text-foreground",
    description: "text-center text-xs sm:text-sm text-muted-foreground line-clamp-2",
    link: "absolute inset-0 z-10",
  },
  ctaSection: {
    container: "mt-16 sm:mt-20 text-center",
    title: "text-xl sm:text-2xl font-bold mb-4 text-foreground",
    description: "text-sm sm:text-base text-muted-foreground mb-8",
    button: {
      base: "inline-flex items-center justify-center rounded-lg px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-300 min-h-[44px]",
      active: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95",
      disabled: "bg-muted text-muted-foreground cursor-not-allowed opacity-60",
    },
  },
};
