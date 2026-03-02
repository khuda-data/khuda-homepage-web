import { Instagram, Link2, Github, HelpCircle } from "lucide-react";

// ============================================================================
// 인터페이스
// ============================================================================

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface NavLink {
  label: string;
  href: string;
  subLinks?: NavLink[];
}

export interface RecruitmentInfoItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  details: string;
}

export interface ProcessStepInfo {
  step: number;
  title: string;
  date: string;
  fullDate: string;
}

export interface TimeUnitConfig {
  key: "days" | "hours" | "minutes";
  label: string;
  delay: string;
}

// ============================================================================
// API 설정
// ============================================================================

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api-khuda.gaeng02.com";

// ============================================================================
// 라우트 경로
// ============================================================================

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

// ============================================================================
// 이미지 경로
// ============================================================================

export const IMAGE_PATHS = {
  //logo: "/images/logos/khuda-logo.png",
  logo: "/images/logos/khuda-logo-white.png",
};

// ============================================================================
// 연락처 정보
// ============================================================================

export const CONTACT_EMAIL = "khuda.official.khu@gmail.com";
export const CONTACT_PHONE = {
  회장: "010-3448-4802",
  부회장: "010-2127-3406",
};

// ============================================================================
// 위치 정보
// ============================================================================

export const LOCATION = {
  address: "경기도 용인시 기흥구 덕영대로 1732",
  campus: "경희대학교 국제캠퍼스",
};

// ============================================================================
// SNS 링크
// ============================================================================

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/khu_da.official",
  linktree: "https://linktr.ee/khuda_data",
  github: "https://github.com/khuda-data",
};

export const EXTERNAL_LINK_PROPS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

export const FOOTER_INFO = {
  organization: "경희대학교 데이터분석/AI 학회 KHUDA",
  description: "데이터와 AI로 미래를 만들어가는 KHUDA와 함께하세요.",
  copyright: (year: number) => `Copyright © ${year} KHUDA. All Rights Reserved.`,
  sections: {
    location: "Location",
    contact: "Contact",
  },
  location: {
    address: "경기도 용인시 기흥구 덕영대로 1732",
    building: "경희대학교 국제캠퍼스",
  },
  socialLinks: [
    {
      id: "instagram",
      label: "@khu_da.official",
      href: SOCIAL_LINKS.instagram,
      icon: Instagram,
    },
    {
      id: "linktree",
      label: "Linktree",
      href: SOCIAL_LINKS.linktree,
      icon: Link2,
    },
    {
      id: "github",
      label: "KHUDA Github",
      href: SOCIAL_LINKS.github,
      icon: Github,
    },
  ] as SocialLink[],
};

// ============================================================================
// Header
// ============================================================================

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

// ============================================================================
// Hero Section
// ============================================================================

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

// ============================================================================
// Footer
// ============================================================================

export const FOOTER_STYLES = {
  footer: {
    base: "bg-secondary/85 border-t border-border",
    padding: "py-5 sm:py-8 md:py-12",
  },
  container: {
    base: "container mx-auto",
    padding: "px-4 sm:px-6 md:px-12",
  },
  grid: {
    base: "flex flex-col md:flex-row md:items-start md:justify-between",
    gap: "gap-5 sm:gap-6 md:gap-0",
  },
  layout: {
    flexCol: "flex flex-col",
  },
  section: {
    header: "font-semibold mb-3 sm:mb-4 md:mb-5 text-sm sm:text-base text-black",
    organization: "font-bold text-base sm:text-lg text-black",
    text: {
      base: "text-black text-xs sm:text-sm",
      small: "text-black text-[10px] sm:text-xs",
    },
    spacing: {
      marginBottom: "mb-2 sm:mb-3 md:mb-4",
      marginTop: "mt-3 sm:mt-4 md:mt-6",
      itemGap: "space-y-1.5 sm:space-y-2 md:space-y-3",
    },
  },
  middleSection: {
    container: "flex flex-col",
  },
  rightSection: {
    container: "flex flex-col",
  },
  rightGroup: {
    container: "flex flex-col gap-5 sm:gap-6 md:flex-row md:items-start md:justify-end md:gap-12 lg:gap-16",
  },
  socialLinks: {
    container: "flex items-center gap-2.5 sm:gap-3 md:gap-4",
    link: "w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-muted/30 border border-border/50 flex items-center justify-center text-foreground hover:bg-muted/50 hover:border-foreground/30 transition-all duration-200 group",
    icon: "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 stroke-[1.5] group-hover:stroke-2 transition-all",
  },
};

// ============================================================================
// 모집 정보
// ============================================================================

export const RECRUITMENT_INFO = {
  target: "경희대학교 재학생 및 휴학생",
  targetDetails: "전공 무관, 데이터분석/AI에 관심 있는 모든 분",
  trackCapacity: 8,
  totalCapacity: 50,
  trackCapacityText: "트랙별 6~8명",
  totalCapacityText: "총 40명 내외",
  generation: "9기",
  sectionLabel: "Target",
  sectionTitle: "모집 대상",
  sectionSubtitle: (generation: string) => `KHUDA와 함께 성장할 ${generation} 멤버를 모집합니다.`,
  processTitle: "지원 절차",
  deadlineLabel: "서류 마감:",
  targetCards: [
    {
      icon: "BookOpen",
      description: "데이터 및 AI 분야에\n관심이 많은 분",
    },
    {
      icon: "CalendarCheck",
      description: "방학 중 매주 목요일 대면 및\n학기 중 주 1회 세션 정기 참여 가능한 분",
    },
    {
      icon: "Flame",
      description: "활동 기간 동안 학회 활동에\n적극적으로 참여 가능한 분",
    },
  ],
  infoItems: {
    target: {
      title: "모집 대상",
    },
    schedule: {
      title: "모집 일정",
    },
    capacity: {
      title: "모집 인원",
    },
  },
  processSteps: {
    application: "서류 접수",
    announcement: "서류 합격자 발표",
    interview: "면접",
    final: "최종 합격자 발표",
  },
};

export const RECRUITMENT_SCHEDULE = {
  application: {
    start: "2025년 12월 31일 (수)",
    end: "2026년 1월 4일 (일)",
    deadline: "2026년 1월 4일 23:59",
    deadlineISO: "2026-01-04T23:59:59",
    short: "12.31~1.4",
    full: "2025년 12월 31일 (수) ~ 2026년 1월 4일 (일) 23:59",
    dateRange: (start: string, end: string) => `${start} ~ ${end}`,
    deadlineWithLabel: (label: string, deadline: string) => `${label} ${deadline}`,
  },
  announcement: {
    date: "2026년 1월 7일 (수) 18:00",
    short: "1.7",
    full: "2026년 1월 7일 (수) 18:00",
  },
  interview: {
    start: "2026년 1월 9일 (금)",
    end: "2026년 1월 11일 (일)",
    method: "온라인 비대면",
    short: "1.9~1.11",
    full: "2026년 1월 9일 (금) ~ 1월 11일 (일) 온라인 비대면",
    dates: [
      { value: "1월 9일 (금)", label: "1월 9일", subLabel: "금요일" },
      { value: "1월 10일 (토)", label: "1월 10일", subLabel: "토요일" },
      { value: "1월 11일 (일)", label: "1월 11일", subLabel: "일요일" },
    ],
  },
  final: {
    date: "2026년 1월 12일 (월) 18:00 이후 개별 안내",
    short: "1.12",
    full: "2026년 1월 12일 (월) 18:00 이후 개별 안내",
    ot: "합격자 대상으로 1월 15일에 오리엔테이션을 진행합니다.",
  },
};

export const RECRUITMENT_STYLES = {
  sectionId: "recruiting",
  section: {
    header: {
      container: "text-center mb-20",
      title: "text-2xl font-bold text-center mb-16 text-foreground",
    },
  },
  infoCard: {
    base: "group relative text-center rounded-2xl sm:rounded-3xl bg-gray-100 border border-border hover:border-blue-600/30 transition-all duration-300 overflow-hidden",
    padding: "p-5 sm:p-6 md:p-8 lg:p-10",
    gradient: "absolute inset-0 bg-gradient-to-br from-blue-600/8 via-transparent to-blue-600/5 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
    icon: {
      container: "inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 bg-blue-100 text-blue-600 transition-all duration-300 group-hover:bg-blue-200 group-hover:scale-105",
      size: "w-6 h-6 sm:w-7 sm:h-7",
    },
    title: "text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 text-gray-900",
    description: "text-sm sm:text-base md:text-lg font-medium mb-2 text-gray-900 leading-relaxed",
    details: "text-xs sm:text-sm text-gray-700 leading-relaxed",
  },
  process: {
    container: "mb-20",
    grid: {
      desktop: "grid md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-12 md:mb-16",
    },
    stepCard: {
      base: "rounded-2xl sm:rounded-3xl border transition-all duration-300 shadow-sm min-h-[180px] sm:h-[200px] md:h-[220px] flex flex-col relative overflow-hidden",
      active: "bg-card border-primary/30 shadow-lg shadow-primary/10 hover:border-primary/40",
      inactive: "bg-card border-border hover:border-primary/20",
      padding: {
        desktop: "p-4 sm:p-6 md:p-8",
        mobile: "p-4 sm:p-6",
      },
      gradient: "absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-3xl opacity-0 transition-opacity duration-300",
      gradientActive: "opacity-100",
    },
    indicator: {
      base: {
        desktop: "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
        mobile: "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
      },
      completed: "bg-primary border-2 border-primary",
      active: "bg-primary border-2 border-primary shadow-lg shadow-primary/30",
      inactive: "bg-muted border-2 border-border",
      icon: {
        desktop: "w-5 h-5",
        mobile: "w-4 h-4",
      },
      dot: {
        mobile: "w-3 h-3 rounded-full",
      },
    },
    line: {
      desktop: {
        horizontal: "absolute top-10 left-0 right-0 h-0.5 bg-border/30",
        connector: "absolute top-10 left-[60%] right-0 h-0.5 z-10",
      },
      mobile: {
        vertical: "w-0.5 h-full min-h-[100px] transition-all duration-300",
      },
      active: "bg-primary/50",
      inactive: "bg-border/30",
    },
    content: {
      header: {
        container: "flex items-center justify-between mb-2 sm:mb-3 gap-2 sm:gap-3",
        title: {
          base: "text-sm sm:text-base md:text-lg font-semibold",
          active: "text-primary",
          inactive: "text-foreground",
        },
        date: {
          base: "text-xs sm:text-sm font-medium whitespace-nowrap",
          active: "text-primary/80",
          inactive: "text-muted-foreground",
        },
      },
      fullDate: {
        base: "text-xs sm:text-sm leading-relaxed mt-auto",
        active: "text-foreground",
        inactive: "text-muted-foreground",
      },
      mobile: {
        title: "text-sm sm:text-base font-semibold",
        fullDate: "text-xs leading-relaxed mt-auto",
      },
    },
  },
  spacing: {
    large: "mb-20",
    medium: "mb-16",
    small: "mb-3",
    gap: {
      large: "gap-8",
      medium: "gap-4 md:gap-6",
      small: "gap-3",
      mobile: "gap-4",
    },
  },
  layout: {
    relativeZ10: "relative z-10",
    relative: "relative",
    container: "container mx-auto",
    fullWidth: "w-full",
    desktopProcess: {
      wrapper: "hidden md:block max-w-6xl mx-auto",
      inner: "relative pb-12",
      steps: "relative flex items-start justify-between px-4",
      stepCard: "flex-1 flex flex-col items-center relative",
      indicatorWrapper: "relative z-10 mb-8",
      contentWrapper: "relative z-10",
      connector: "h-full transition-all duration-300",
    },
    mobileProcess: {
      wrapper: "md:hidden space-y-6",
      stepContainer: "flex flex-col items-center",
      indicatorWrapper: "mb-2",
      stepCard: "flex-1",
      contentWrapper: "relative z-10",
    },
    infoCardContent: "relative z-10",
  },
  text: {
    stepNumber: "text-xs font-semibold",
    stepNumberActive: "text-primary-foreground",
    stepNumberInactive: "text-foreground",
  },
  colors: {
    primaryForeground: "text-primary-foreground",
    foreground: "text-foreground",
    bgPrimaryForeground: "bg-primary-foreground",
    bgMutedForeground: "bg-muted-foreground/30",
    bgBorder: "bg-border",
  },
};

// ============================================================================
// 커리큘럼 정보
// ============================================================================

export const CURRICULUM_INFO = {
  trackInfoWeeks: "4-5주차",
  basicSessionTitle: "방학세션으로 시작해요",
  advancedSessionTitle: (trackCount: number) => `${trackCount}가지 심화트랙 중에서 선택할 수 있어요`,
  basicSessionDescription: `방학 동안 파이썬 실습과 머신러닝 기초를 함께 배워요.
개인 랜덤 발제, 퀴즈, 팀별 토의를 통해 기초를 탄탄히 다지고, 팀 단위로 토이프로젝트를 진행합니다.`,
  advancedSessionDescription: (trackCount: number) => `각 심화트랙의 트랙장들과 함께 한 학기 동안 선택한 분야를 깊이 있게 탐구합니다.
자연어처리, 컴퓨터비전, 데이터엔지니어링 등 ${trackCount}가지 트랙에서 전문 지식을 쌓고, 학기 말 정기 학술제를 진행합니다.`,
  basicTrackTitle: "기초 세션",
  basicTrackDescription: `방학 기간 동안 머신러닝의 기본 개념부터 주요 알고리즘까지 체계적으로 학습합니다.
이론과 실습을 통해 단계별로 실력을 쌓아갑니다.`,
  weeklySessionTitle: "주차별 세션 구성",
  mlSession: {
    title: "머신러닝 기초",
    duration: "약 2시간",
    description: "머신러닝의 기본 개념부터 주요 알고리즘까지, 이론과 실습을 통해 체계적으로 학습합니다. 방학 기간 매주 목요일 저녁 6시부터 8시까지 진행됩니다.",
    topics: ["지도학습", "비지도학습", "회귀/분류", "평가 지표", "실습 프로젝트"],
  },
  get weeklySessions() {
    return [this.mlSession];
  },
  detailActivitiesTitle: "세부 활동",
  activities: [
    {
      title: "개인 랜덤 발제",
      description: "매주 랜덤으로 선택된 부원이 주제에 대해 발제하며, 발표 능력과 이해도를 향상시킵니다.",
    },
    {
      title: "퀴즈 및 해설",
      description: "학습한 내용을 퀴즈로 점검하고, 해설을 통해 복습하며 이해도를 높입니다.",
    },
    {
      title: "팀별 토의",
      description: "팀 단위로 주제를 토의하며 다양한 관점을 공유하고 협업 능력을 기릅니다.",
    },
  ],
  toyProject: {
    title: "토이프로젝트",
    description: `방학세션 기간 동안 팀 단위로 진행하는 실전 프로젝트입니다.
학습한 파이썬 프로그래밍과 머신러닝 기초 지식을 활용하여 프로젝트를 기획하고 구현합니다.`,
    tags: ["팀 프로젝트", "파이썬 활용", "머신러닝 모델", "발표"],
  },
  trackBriefing: {
    title: "트랙 설명회",
    description: (trackInfoWeeks: string, trackLabels: string) => `${trackInfoWeeks}에 각 심화트랙(${trackLabels})의 트랙장들이
직접 설명회를 진행합니다. 본격적인 트랙 선택을 위한 정보를 얻을 수 있습니다.`,
    tags: (trackCount: number) => [`${trackCount}개 트랙`, "트랙장 소개", "커리큘럼 안내", "Q&A"],
  },
  // 트랙 색상 클래스
  topicColors: {
    primary: "bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 text-gray-900 shadow-[0_4px_20px_rgba(255,255,255,0.15)]",
    secondary: "bg-gradient-to-br from-blue-600 via-blue-700 to-blue-600 text-white shadow-[0_4px_20px_rgba(37,99,235,0.3)]",
    tertiary: "bg-gradient-to-br from-red-600 via-red-700 to-red-600 text-white shadow-[0_4px_20px_rgba(220,38,38,0.3)]",
  } as const,
  // 트랙 정보
  tracks: [
    {
      id: "nlp",
      label: "NLP",
      title: "자연어처리",
      description: "텍스트 데이터를 컴퓨터가 이해하고 활용하도록 만드는 기술을 다루는 트랙입니다. 뉴스/댓글/문서 같은 실제 데이터를 기반으로 분류·요약·검색·챗봇 등 실전 과제를 직접 구현하며 NLP 파이프라인을 경험합니다.",
      topics: [
        { title: "분류/요약", color: "primary" as const },
        { title: "검색/챗봇", color: "secondary" as const },
        { title: "NLP 파이프라인", color: "tertiary" as const },
      ],
    },
    {
      id: "cv",
      label: "CV",
      title: "컴퓨터비전",
      description: "Computer Vision은 기계로 하여금 이미지와 비디오에서 의미 있는 데이터를 해석하고 분석하며 추출할 수 있게 합니다. 딥러닝과 신경망 등 다양한 기술이 사용되며, 이를 통해 기계가 사물을 인식하거나, 상황을 인지하고, 심지어 새로운 이미지를 생성하기도 합니다. 다시 말해, Computer Vision이란 인간의 시각과 시각 데이터를 해석하는 인지 능력을 복제하는 것입니다.",
      topics: [
        { title: "사물 인식", color: "primary" as const },
        { title: "상황 인지", color: "secondary" as const },
        { title: "이미지 생성", color: "tertiary" as const },
      ],
    },
    {
      id: "de",
      label: "DE",
      title: "데이터엔지니어링",
      description: "대규모 데이터를 효율적으로 수집, 저장, 처리하는 인프라를 구축하는 기술을 학습합니다. ETL 파이프라인, 분산 처리 시스템, 클라우드 서비스를 활용한 데이터 플랫폼 구축을 다룹니다.",
      topics: [
        { title: "데이터 파이프라인", color: "primary" as const },
        { title: "분산 처리", color: "secondary" as const },
        { title: "클라우드 인프라", color: "tertiary" as const },
      ],
    },
    {
      id: "da",
      label: "DB",
      title: "데이터비즈니스",
      description: "데이터에서 인사이트를 도출하고 비즈니스 문제를 해결하는 방법을 학습합니다. ML/DL 모델의 예측 근거를 XAI로 해석하여 인공지능의 투명성과 신뢰성을 확보하는 기술을 학습합니다.",
      topics: [
        { title: "비즈니스 인사이트", color: "primary" as const },
        { title: "XAI", color: "secondary" as const },
        { title: "신뢰성 확보", color: "tertiary" as const },
      ],
    },
    {
      id: "aie",
      label: "AIE",
      title: "AI엔지니어링",
      description: "파운데이션 모델을 실제 애플리케이션에 작용하기 위한 AI 엔지니어링 과정을 다룹니다. 모델 이해와 평가에서 출발하여 프롬프트 설계와 컨텍스트 관리, RAG와 에이전트 설계, 파인튜닝과 데이터 추론, 성능 최적화와 피드백 루프까지 이어지는 전 과정을 통해 운영 환경에서 마주하는 실제 개발 과제를 안정적으로 해결하기 위한 판단 기준과 설계 원리를 학습합니다.",
      topics: [
        { title: "프롬프트 설계", color: "primary" as const },
        { title: "RAG/에이전트", color: "secondary" as const },
        { title: "파인튜닝/최적화", color: "tertiary" as const },
      ],
    },
    {
      id: "fin",
      label: "FIN",
      title: "금융",
      description: "검증된 오픈소스를 활용하여 기업 부도 예측(ML), 주가 수익률 예측(DL), 뉴스 감성 분석(NLP) 등 3가지 미니프로젝트를 수행하며 실전 데이터 파이프라인을 직접 구축합니다. 이를 통해 축적된 경험을 바탕으로 실제 시장에 적용 가능한 AI 모델을 최종 완성하는 인터랙티브한 커리큘럼으로 운영됩니다.",
      topics: [
        { title: "부도 예측(ML)", color: "primary" as const },
        { title: "주가 예측(DL)", color: "secondary" as const },
        { title: "감성 분석(NLP)", color: "tertiary" as const },
      ],
    },
  ],
  // 정기 학술제 정보
  academicFestival: {
    title: "정기 학술제",
    subtitle: "심화 트랙의 마지막을 장식하는 프로젝트 데모데이",
    description: "한 학기 동안 심화 트랙에서 쌓은 지식과 경험을 바탕으로 완성한 프로젝트를 발표하는 자리입니다. 포스터 발표와 정식 발표를 통해 동료들과 전문가들로부터 피드백을 받으며, 프로젝트의 완성도를 높여갑니다.",
    participation: {
      title: "참여 인원",
      description: "각 트랙별 4-6명 기준 한 팀 (트랙당 최대 2팀)",
    },
    posterPresentation: {
      title: "포스터 발표",
      description: "참가 팀이 자신의 프로젝트를 포스터로 만들어 이를 발표하는 자리입니다. KHUDA 부원들 간의 상호 평가를 통해 피드백을 받습니다.",
      purpose: "부원들 간 프로젝트 피드백을 받기 어려웠다는 점을 개선하기 위해 도입되었습니다.",
    },
    formalPresentation: {
      title: "정식 발표",
      description: "심사위원분들을 모셔서 진행하는 기존과 동일한 프로젝트 발표입니다.",
      purpose: "심사위원분들은 교수님을 비롯해 현직자 섭외 예정입니다.",
    },
  },
};

export const CURRICULUM_STYLES = {
  section: {
    padding: "py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-12",
    base: "relative bg-background transition-all duration-1000",
  },
  gradient: {
    overlay: "absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-10",
    background: {
      layer1: "absolute inset-0 bg-gradient-to-br from-blue-950/30 via-blue-950/25 to-primary/15 rounded-3xl",
      layer2: "absolute inset-0 bg-gradient-to-tl from-primary/12 via-transparent to-transparent rounded-3xl",
    },
  },
  navigation: {
    direction: {
      prev: "prev" as const,
      next: "next" as const,
    },
    button: {
      base: "rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/10",
      icon: {
        small: "w-5 h-5",
        medium: "w-6 h-6",
      },
    },
  },
  separator: {
    trackLabels: ", ",
  },
  transition: {
    active: "opacity-100 translate-x-0",
    inactive: "opacity-0 translate-x-4",
    delay: {
      change: 150, // ms
      reset: 50, // ms
    },
  },
  sessionTypes: ["basic", "advanced"] as const,
  sessionLabels: {
    basic: "기초 세션 (방학)",
    advanced: "심화 세션 (학기)",
  },
  card: {
    base: "bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/10",
    hover: "hover:bg-white/15 transition-all duration-200",
    padding: {
      small: "p-3 sm:p-4 md:p-5",
      medium: "p-4 sm:p-5 md:p-6",
    },
    // 자주 사용되는 조합
    withHover: {
      medium: "bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/10 hover:bg-white/15 transition-all duration-200 p-4 sm:p-5 md:p-6",
      small: "bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/10 hover:bg-white/15 transition-all duration-200 p-3 sm:p-4 md:p-5",
    },
  },
  container: {
    base: "rounded-2xl sm:rounded-3xl bg-black/98 backdrop-blur-2xl border border-white/10 overflow-hidden",
    padding: "p-4 sm:p-6 md:p-8 lg:p-10",
  },
  tag: {
    base: "px-2 py-0.5 rounded text-xs bg-white/5 text-white/70 border border-white/10",
  },
  button: {
    base: "px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 min-h-[44px] flex items-center justify-center",
    active: "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105",
    inactive: "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-105 active:scale-95",
    track: {
      base: "px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 min-h-[40px] sm:min-h-[44px] flex items-center justify-center",
      active: "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105",
      inactive: "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-105 active:scale-95 border border-border/50",
    },
  },
  spacing: {
    sectionGap: "mb-6 sm:mb-8",
    contentGap: "mb-4 sm:mb-6",
    titleGap: "mb-2 sm:mb-3 md:mb-4",
    gridGap: "gap-3 sm:gap-4",
    buttonGap: "gap-2 sm:gap-3",
    trackGap: "gap-1.5 sm:gap-2",
    largeGap: "mb-8 sm:mb-10",
    smallGap: "mb-1.5 sm:mb-2",
    mediumGap: "mb-3 sm:mb-4",
    tagGap: "gap-1 sm:gap-1.5",
  },
  text: {
    title: {
      large: "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white",
      medium: "text-base sm:text-lg font-semibold text-white",
      small: "text-sm sm:text-base font-semibold text-white",
    },
    body: {
      large: "text-white/90 text-sm sm:text-base md:text-lg leading-relaxed",
      medium: "text-white/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl",
      small: "text-xs sm:text-sm text-white/80 leading-relaxed",
      tiny: "text-xs text-white/70 leading-relaxed",
      duration: "text-xs text-white/60 ml-auto",
    },
  },
  layout: {
    relativeZ10: "relative z-10",
    tagContainer: "flex flex-wrap gap-1.5",
    borderWhite20: "border-white/20",
    relative: "relative",
    flex: "flex",
    flexWrap: "flex flex-wrap",
    flexCol: "flex flex-col",
    flexColCenter: "flex flex-col gap-3 justify-center",
    flexItemsCenter: "flex items-center gap-2",
    flexRow: "flex flex-col md:flex-row gap-8 md:gap-10 transition-all duration-300",
    flex1: "flex-1 flex flex-col justify-center",
    grid2: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4",
    grid3: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4",
    relativeFlex: "relative flex items-center gap-4",
    relativeFlex1: "relative flex-1",
    mobileNav: "md:hidden absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-20",
    desktopNav: "hidden md:flex w-10 h-10 md:w-12 md:h-12 flex-shrink-0 hover:scale-110 min-h-[44px]",
    mobileNavButton: "w-9 h-9 sm:w-10 sm:h-10 min-h-[44px] min-w-[44px]",
  },
  badge: {
    base: "inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/20 text-white text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2 sm:mb-3",
  },
  topicCard: {
    base: "px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl text-left font-semibold text-xs sm:text-sm shadow-xl backdrop-blur-sm",
  },
  icon: {
    white: "text-white",
  },
  header: {
    title: "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground",
    subtitle: "text-xs sm:text-sm md:text-base lg:text-lg text-foreground",
  },
  sectionId: "curriculum",
  index: {
    first: 0,
  },
};

// ============================================================================
// FAQ
// ============================================================================

export const FAQ_MESSAGES = {
  title: "자주 묻는 질문",
  subtitle: "궁금한 점이 있으신가요?",
};

export const FAQ_STYLES = {
  sectionId: "faq",
  accordion: {
    type: "single" as const,
    collapsible: true,
    container: "w-full space-y-2 sm:space-y-3 md:space-y-4",
    item: {
      base: "border-0 rounded-lg sm:rounded-xl md:rounded-2xl bg-gray-100 border border-border/50 overflow-hidden transition-all duration-200 hover:border-border",
    },
    trigger: {
      base: "text-left hover:no-underline px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 text-xs sm:text-sm md:text-base text-gray-900 font-medium transition-colors min-h-[44px] sm:min-h-[48px] flex items-center",
      iconContainer: "flex items-center gap-1.5 sm:gap-2",
      icon: "w-4 h-4 text-blue-600 flex-shrink-0",
      iconComponent: HelpCircle,
    },
    content: {
      base: "px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-5 text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed",
    },
  },
};

// ============================================================================
// 지원 관련
// ============================================================================

export const APPLICATION_CTA_MESSAGES = {
  deadlineExpired: {
    title: "서류 접수가 마감되었습니다.",
    subtitle: "다음 기수에 지원해보세요. 기다리고 있을게요! 😊",
  },
  deadlineActive: {
    title: "서류 마감까지",
  },
  buttonText: "지원하기",
};

export const APPLICATION_FORM_CONFIG = {
  // 거주지역 옵션
  residenceOptions: [
    "서울", "경기 수원/영통", "경기 성남/분당", "경기 용인", "경기 고양/의정부", "경기 기타",
    "인천", "부산", "대구", "대전", "광주", "울산", "세종",
    "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주", "해외"
  ],
  residenceDescription: "1월~2월 기준 거주 지역을 선택해주세요",
  
  // 파이썬 레벨 옵션
  pythonLevels: [
    { 
      value: "1", 
      label: "1단계: 기초 문법",
      description: "input/print, 변수, 연산자",
    },
    { 
      value: "2", 
      label: "2단계: 기본 프로그래밍",
      description: "반복문, 조건문, 자료형, 파일 입출력",
    },
    { 
      value: "3", 
      label: "3단계: 데이터 분석 라이브러리 활용",
      description: "numpy, pandas, scikit-learn, 시각화",
    },
    { 
      value: "4", 
      label: "4단계: 딥러닝 프레임워크로 모델 구현",
      description: "PyTorch/TensorFlow",
    },
    { 
      value: "5", 
      label: "5단계: 프로젝트 관리",
      description: "아키텍처 설계, 성능 최적화, 모듈화, 테스트/배포, 협업",
    },
  ],
  pythonLevelGuide: {
    title: "평가 기준 안내",
    description: "각 단계는 이전 단계의 내용을 포함합니다. 예를 들어, 3단계를 선택하시면 1-2단계 내용도 할 수 있다는 의미입니다.",
    note: "현재 본인이 실제로 할 수 있는 수준을 선택해주세요.",
  },
  
  // 데이터 분석 필드 옵션
  dataAnalysisFields: [
    "데이터 전처리 및 분석 (Pandas, NumPy)",
    "데이터 시각화 (Matplotlib, Seaborn, Plotly)",
    "통계 분석 및 가설검정 (T-test, ANOVA, 회귀분석)",
    "머신러닝 알고리즘 (Random Forest, SVM)",
    "데이터베이스 및 SQL",
    "딥러닝 (CNN, RNN, Transformer)",
    "자연어처리(NLP) 및 컴퓨터비전(CV)",
  ],
  
  // 트랙 선택 옵션 (OB용)
  trackSelectOptions: [
    { value: "none", label: "참여 의사 없음", description: "트랙에 참여하지 않습니다" },
  ],
  
  // 개인정보 동의서
  privacyConsent: {
    title: "개인정보 수집·이용 동의서",
    section1: {
      title: "1. 개인정보의 수집·이용에 관한 사항",
      description: '본인은 "경희대학교 데이터 분석 동아리(KHUDA)"가 신규 회원 모집과 관련하여 아래의 내용에 따라 개인정보를 수집·이용하는 것에 동의합니다.',
      purpose: "가. 수집·이용 목적: ① 신규 회원 모집",
      items: "나. 수집하는 개인정보의 항목: ① 신청자 : 성명, 성별, 생년월일, 이메일, 전화번호, 전공 등",
    },
    section2: {
      title: "2. 개인정보의 보유 및 이용기간",
      description: "본인은 경희대학교 데이터 분석 동아리가 본 동의서에 명시된 개인정보를 본 동의서에 명시된 수집·이용 목적이 달성될 때까지(9개월) 보유·이용하는 것에 동의합니다.",
    },
    section3: {
      title: "3. 개인정보 수집·이용에 대한 동의 거부 권리 및 동의 거부 시 불이익",
      description: "본인은 위 개인정보의 수집·이용에 대한 동의를 거부할 권리가 있으며, 동의를 거부할 경우 신규 회원 모집 명단에서 제외될 수 있다는 사실을 인지한 상태에서 작성한 것임을 확인합니다.",
    },
    agreeText: "상기 내용에 동의합니다.",
    disagreeText: "상기 내용에 동의하지 않습니다.",
  },
  
  // 지원 완료 메시지
  submissionSuccess: {
    title: "지원이 완료되었습니다",
    subtitle: "지원서가\n정상적으로 접수되었습니다.",
    description: "결과는 입력하신 전화번호로\n문자로 발송해드리겠습니다.",
    backToHome: "메인으로 돌아가기",
  },
  
  // 공통 텍스트
  commonTexts: {
    required: "*",
    thankYouMessage: "좋은 의견 감사합니다",
    selectRegion: "지역을 선택해주세요",
    defaultPlaceholder: "답변을 입력해주세요",
  },
  
  // Placeholder 텍스트 매핑
  placeholderTexts: {
    name: "홍길동",
    studentId: "2024123456",
    grade: "3학년 2학기",
    major: "컴퓨터공학과",
    doubleMajor: "경영학과 또는 없음",
    email: "example@email.com",
    phone: "010-1234-5678",
  },
  
  // 질문 번호 매핑
  questionNumbers: {
    motivation: "1",
    challenge: "2",
    project: "3",
  },
  
  // 에러 메시지
  errorMessages: {
    selectApplicationType: {
      title: "지원 분야를 선택해주세요",
      description: (generation: string) => `${generation} YB 또는 ${generation} OB를 선택해주세요.`,
    },
    selectInterviewDate: {
      title: "면접 일정을 선택해주세요",
      description: "면접 가능한 날짜를 선택해주세요.",
    },
    selectInterviewTime: {
      title: "면접 시간을 선택해주세요",
      description: "면접 가능한 시간을 선택해주세요.",
    },
    requiredFields: {
      title: "필수 항목을 작성해주세요",
      description: (count: number) => `${count}개의 필수 질문에 답변해주세요.`,
    },
  },
  
  // 서류 접수 안내 메시지
  applicationNotice: {
    title: "서류 접수 안내",
    description: "지원서는 제출 후 수정이 불가능하니 신중하게 작성해주세요.",
  },
  // 서류 합격자 발표 안내 메시지
  announcementNotice: {
    title: "서류 합격자 발표 안내",
    description: "결과는 발표 일정에 맞춰 웹사이트에서 확인 가능합니다.",
  },
  // 면접 안내 메시지
  interviewNotice: {
    title: "면접 안내",
    description: "OB 지원자는 면접 없이 서류만 심사됩니다.",
  },
  
  // 페이지 제목 및 설명
  pageTitle: "함께 성장하며\n한계를 뛰어넘는 경험을 만들어가요",
  pageDescription: "KHUDA는 데이터 분석과 인공지능(AI)에 열정을 가진 경희인이 함께 모여 체계적인 학습과 실무 프로젝트 경험을 통해 성장하는 학회입니다.",
  
  // 섹션 제목
  sections: {
    schedule: "모집 일정",
    faq: "자주 묻는 질문",
    privacy: "개인정보 수집 동의",
    basicInfo: "기본 정보",
    applicationType: "지원 분야",
    interviewSchedule: "면접 가능 일정",
  },
  
  // 지원 분야 설명
  applicationTypes: {
    yb: {
      label: (generation: string) => `${generation} YB`,
      description: "머신러닝과 딥러닝 공부를 시작하시거나, 발전해 나가고 싶은 학우",
    },
    ob: {
      label: (generation: string) => `${generation} OB`,
      description: "KHUDA 활동을 수료하고 계속 참여하고자 하는 기존 부원",
    },
  },
  
  // YB 수료 조건 안내
  ybCompletionRequirements: {
    title: "YB 수료 조건 안내",
    intro: "KHUDA 9기 YB 부원분들의 원활한 활동 이행과 학술적 성취를 위해 아래와 같이 수료 조건을 공지합니다. YB 부원께서는 해당 사항을 반드시 숙지하시어 활동에 참고하시기 바랍니다.",
    requirements: [
      {
        title: "1. 방학 정기 세션 이수",
        description: "방학 중 매주 목요일 진행되는 기초 세션 참석 (벌점제도가 존재합니다)",
      },
      {
        title: "2. 방학 토이 프로젝트 완수",
        period: "2026년 겨울 방학",
        description: "해당 기간 내 운영되는 토이 프로젝트 필수 참여 및 결과물 제출",
      },
      {
        title: "3. 정규 학기 활동 이행",
        period: "2026년 1학기",
        description: "학기 중 운영되는 정규 심화 트랙 수강 참여",
      },
      {
        title: "4. 정기 학술제 참가",
        description: "KHUDA 정기 학술제 필수 참여",
        obligation: "연구 성과 발표(포스터 또는 구두 발표) 및 전 과정 참석",
      },
    ],
    notice: "※ 위 수료 조건을 모두 충족한 회원에 한하여 수료증 발급 및 차기 학기 OB 자격이 부여됩니다. 관련 문의 사항은 운영진에게 연락해 주시기 바랍니다.",
    benefits: {
      title: "이외 혜택",
      items: [
        {
          title: "1. 스터디 그룹 지원",
          description: "분야: SQL, 공모전, 어학, 기술 블로그 등 다양한 커리큘럼 운영 예정",
          benefit: "스터디 교재 및 강의료 일부 지원",
          operation: "운영진 & OB & YB의 자유로운 스터디 개설 및 참여 독려",
        },
        {
          title: "2. 산학협력 프로젝트",
          description: "대외협력부 주관 산학협력 과제 추진",
          operation: "과제 발생 시 별도 트랙 형태로 집중 운영 예정",
        },
      ],
    },
  },
  
  // OB 혜택 안내
  obBenefits: {
    title: "KHUDA OB 회원 대상 혜택 및 활동 안내",
    intro: "KHUDA OB 회원께는 별도의 수료 조건 없이 본 동아리만의 다양한 인프라와 혜택이 제공됩니다. 이번 학기 개편된 주요 활동 내용을 다음과 같이 안내드립니다.",
    notice: "OB는 공식 신청 기간 외에도 토이 프로젝트 발표일 전까지 상시 모집합니다.\n해당 경우에는 운영진에게 따로 연락 바랍니다.",
    benefits: [
      {
        title: "1. 심화 트랙 참여",
        description: "학기 중 운영되는 심화 트랙 수강 가능",
        feature: "역량 강화 중심의 전면 개편을 통해 필요 역량에 최적화된 학습 환경 제공",
      },
      {
        title: "2. 스터디 그룹 지원",
        description: "분야: SQL, 공모전, 어학, 기술 블로그 등 다양한 커리큘럼 운영 예정",
        benefit: "스터디 교재 및 강의료 일부 지원",
        operation: "회원 중심의 자유로운 스터디 개설 및 참여 독려",
      },
      {
        title: "3. 산학협력 프로젝트",
        description: "대외협력부 주관 산학협력 과제 추진",
        operation: "과제 발생 시 별도 트랙 형태로 집중 운영 예정",
      },
      {
        title: "4. 정기 학술제 개최",
        description: "구성: 포스터 세션 및 최종 발표회 (트랙 참여 인원의 한해서)",
        purpose: "한 학기 동안의 연구 성과를 대외적으로 공유하는 장으로, 확대된 규모에 걸맞은 수준 높은 학술 교류의 기회 제공",
      },
    ],
  },
};

// ============================================================================
// 타이머 관련
// ============================================================================

export const TIME_UNITS: TimeUnitConfig[] = [
  { key: "days", label: "일", delay: "delay-100" },
  { key: "hours", label: "시간", delay: "delay-200" },
  { key: "minutes", label: "분", delay: "delay-300" },
];

export const TIME_SEPARATOR = ":";

// ============================================================================
// 애니메이션 설정
// ============================================================================

export const ANIMATION_CONFIG = {
  timeUnit: {
    duration: "duration-300", // Tailwind 클래스로 변경
    fadeInDuration: "duration-500",
  },
  button: {
    disabled: "rounded-2xl px-8 py-6 text-lg font-semibold transition-all duration-200 opacity-50 cursor-not-allowed",
    active: "rounded-2xl px-8 py-6 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95",
  },
  fadeIn: "animate-in fade-in slide-in-from-bottom-4 duration-700",
  linkDelay: "delay-500",
};

export const SCROLL_ANIMATION_CONFIG = {
  threshold: 0.1,
};

// ============================================================================
// 스타일 상수
// ============================================================================

export const CTA_STYLES = {
  section: {
    padding: "py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-12",
    base: "relative bg-background transition-all duration-1000 overflow-hidden",
  },
  contentWrapper: {
    marginBottom: "mb-10",
  },
  timerContainer: {
    gap: "gap-1.5 md:gap-4",
    marginBottom: "mb-6 md:mb-8",
    flex: "flex justify-center items-center",
    item: "flex items-center",
  },
  title: {
    base: "text-base text-muted-foreground font-medium mb-2",
    active: "text-sm text-muted-foreground mb-4 animate-pulse",
  },
  subtitle: "text-sm text-muted-foreground",
  timer: {
    unit: {
      container: "flex flex-col items-center animate-in fade-in zoom-in-95",
      value: {
        base: "text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary mb-0.5 sm:mb-1 transition-all duration-300 animate-in zoom-in-95 fade-in",
      },
      label: "text-[10px] sm:text-xs text-muted-foreground font-medium",
    },
    separator: "text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-muted-foreground pb-2 sm:pb-3 md:pb-4 animate-pulse",
  },
  gradient: {
    vertical: "absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none",
    horizontal: "absolute inset-0 bg-gradient-to-r from-transparent via-primary/3 to-transparent pointer-events-none",
  },
  padding: {
    padStartLength: 2,
    padStartChar: "0",
  },
  link: {
    wrapper: "inline-block",
  },
};

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
  cardGradient: "absolute inset-0 bg-gradient-to-br from-blue-950/50 via-blue-950/40 to-blue-500/25 rounded-lg opacity-50",
  cardBase: "relative border border-border shadow-lg bg-card overflow-hidden",
} as const;

// ============================================================================
// 후원사 정보
// ============================================================================

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

