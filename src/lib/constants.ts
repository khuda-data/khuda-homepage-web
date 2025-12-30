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

export interface FAQ {
  question: string;
  answer: string;
}

// ============================================================================
// API 설정
// ============================================================================

export const API_BASE_URL = import.meta.env.PROD 
  ? (import.meta.env.VITE_API_BASE_URL || "https://api-khuda.gaeng02.com")
  : (import.meta.env.VITE_API_BASE_URL || "");

// ============================================================================
// 라우트 경로
// ============================================================================

export const ROUTES = {
  home: "/",
  apply: "/apply",
  admin: "/admin",
} as const;

// ============================================================================
// 이미지 경로
// ============================================================================

export const IMAGE_PATHS = {
  logo: "/images/khuda-logo.png",
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
  organization: "경희대학교 데이터분석/AI 학회",
  description: "데이터와 AI로 미래를 만들어가는 KHUDA와 함께하세요.",
  copyright: (year: number) => `Copyright © ${year} KHUDA. All Rights Reserved.`,
  sections: {
    contact: "Contact Us",
    location: "Location",
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
    { label: "Activities", href: "#curriculum" },
    { label: "Recruiting", href: "#recruiting" },
    { label: "FAQ", href: "#faq" },
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
    scrolled: "bg-background/98 backdrop-blur-2xl border-b border-border/40 shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
    transparent: "bg-transparent",
  },
  container: {
    base: "container mx-auto",
    padding: "px-6 md:px-12 lg:px-16",
  },
  wrapper: {
    base: "flex items-center justify-between",
  },
  logo: {
    container: "flex items-center justify-center transition-all duration-300 ease-out hover:scale-[1.02] hover:opacity-90 -ml-6 md:-ml-8",
    height: "h-[100px] md:h-[120px]",
    width: "w-auto",
    image: "object-contain object-center max-h-full max-w-[320px] md:max-w-[380px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]",
  },
  height: {
    base: "h-28 md:h-32",
    mobileMenuOffset: "top-28 md:top-32",
  },
  nav: {
    desktop: {
      container: "hidden md:flex items-center gap-6 lg:gap-10",
      link: "nav-link text-[15px] font-medium tracking-[-0.01em] px-3 py-2 rounded-xl transition-all duration-300 ease-out hover:bg-gradient-to-b hover:from-foreground/8 hover:to-foreground/4 hover:scale-[1.02] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]",
    },
    mobile: {
      container: "md:hidden absolute left-0 right-0 bg-background/98 backdrop-blur-2xl border-b border-border/40 animate-fade-in shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
      menu: "flex flex-col py-6 px-6 gap-1",
      link: "text-left py-3.5 px-4 text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-foreground/8 hover:to-foreground/4 rounded-xl transition-all duration-300 ease-out font-medium",
      applyLink: "mt-2",
    },
  },
  button: {
    desktop: {
      container: "hidden md:flex items-center gap-4",
      apply: "rounded-full px-8 py-3.5 font-semibold text-[15px] tracking-[-0.01em] bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_2px_8px_rgba(0,100%,25%,0.2)] hover:shadow-[0_4px_16px_rgba(0,100%,25%,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out",
    },
    mobile: {
      menuToggle: "md:hidden p-2.5 rounded-xl hover:bg-foreground/8 transition-all duration-300 ease-out active:scale-95",
      apply: "text-left py-3.5 px-4 text-foreground hover:bg-foreground/8 rounded-xl transition-all duration-200 ease-out w-full font-semibold",
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
  words: ["Data Skills", "AI Skills"] as const,
  wordRotationInterval: 2000, // ms
  title: {
    prefix: "Build Your",
    dot: ".",
  },
  subtitle: "Since 2021",
  description: {
    main: "KHUDA는 경희대학교 데이터분석/AI 학회입니다.",
    sub: "함께 성장하고, 함께 도전하며, 새로운 가능성을 만들어갑니다.",
    lineBreak: true,
  },
  buttons: {
    apply: "지원하기",
    viewActivities: "활동 보기",
  },
  scrollIndicator: "Scroll",
  colorBends: {
    colors: ["#0066cc", "#0099ff", "#cc0000"],
    rotation: 45,
    speed: 0.2,
    scale: 1,
    frequency: 1,
    warpStrength: 1,
    mouseInfluence: 1.5,
    parallax: 0.8,
    noise: 0.1,
    transparent: true,
  },
};

export const HERO_STYLES = {
  section: {
    base: "relative min-h-screen flex items-center overflow-hidden",
  },
  container: {
    base: "container mx-auto relative z-10",
    padding: "px-6 md:px-12",
    maxWidth: "max-w-3xl",
  },
  colorBendsWrapper: {
    base: "absolute inset-0 z-0 w-full h-full",
  },
  colorBends: {
    base: "absolute inset-0 w-full h-full",
  },
  title: {
    base: "text-4xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4 md:mb-6 opacity-0 animate-fade-up",
    prefix: "block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent",
    wordContainer: "block mt-2",
    wordWrapper: "inline-block min-w-[240px] md:min-w-[320px] relative",
    word: "inline-block bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent border-b-4 border-white/50 pb-2 transition-all duration-700",
    dot: "text-white/60 ml-2",
  },
  subtitle: {
    base: "text-base md:text-xl text-white mb-3 md:mb-4 opacity-0 animate-fade-up animation-delay-200",
  },
  description: {
    base: "text-sm md:text-lg text-white/90 max-w-xl mb-8 md:mb-12 opacity-0 animate-fade-up animation-delay-400 leading-relaxed",
    sub: "text-white/70",
  },
  buttons: {
    container: "flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up animation-delay-600",
    base: "w-full sm:w-auto rounded-md",
  },
  scrollIndicator: {
    container: "absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in animation-delay-600 z-10",
    text: "text-xs text-muted-foreground tracking-widest uppercase",
    line: "w-px h-12 bg-gradient-to-b from-foreground/50 to-transparent",
  },
  gradient: {
    overlay: "absolute inset-0 bg-gradient-to-b from-background via-background/99 to-background/98 pointer-events-none",
    bottom: "absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-20",
  },
};

// ============================================================================
// Footer
// ============================================================================

export const FOOTER_STYLES = {
  footer: {
    base: "bg-secondary/50 border-t border-border",
    padding: "py-12 md:py-16",
  },
  container: {
    base: "container mx-auto",
    padding: "px-6 md:px-12",
  },
  grid: {
    base: "grid md:grid-cols-3",
    gap: "gap-8 md:gap-12",
  },
  layout: {
    flexCol: "flex flex-col",
  },
  section: {
    header: "font-semibold mb-4 text-sm uppercase tracking-wider text-foreground",
    text: {
      base: "text-muted-foreground text-sm",
      small: "text-muted-foreground/60 text-xs",
    },
    spacing: {
      marginBottom: "mb-4",
      marginTop: "mt-6",
      itemGap: "space-y-3",
    },
  },
  socialLink: {
    base: "flex items-center gap-3 text-muted-foreground hover:text-foreground transition-all duration-200 group",
    iconContainer: "w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors",
    icon: "w-4 h-4 group-hover:text-primary transition-colors",
    label: "text-sm",
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
  sectionTitle: "모집 안내",
  sectionSubtitle: (generation: string) => `KHUDA와 함께 성장할 ${generation} 멤버를 모집합니다.`,
  processTitle: "지원 절차",
  deadlineLabel: "서류 마감:",
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
    date: "2026년 1월 7일 (수) 18:00 이후 개별 안내",
    short: "1.7",
    full: "2026년 1월 7일 (수) 18:00 이후 개별 안내",
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
    base: "group relative text-center rounded-3xl bg-black/70 backdrop-blur-2xl border border-white/10 hover:border-white/30 transition-all duration-300 overflow-hidden",
    padding: "p-8 md:p-10",
    gradient: "absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-primary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
    icon: {
      container: "inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/15 group-hover:scale-105",
      size: "w-7 h-7",
    },
    title: "text-xl md:text-2xl font-semibold mb-3 text-foreground",
    description: "text-base md:text-lg font-medium mb-2 text-foreground leading-relaxed",
    details: "text-sm text-muted-foreground leading-relaxed",
  },
  process: {
    container: "mb-20",
    grid: {
      desktop: "grid md:grid-cols-3 gap-4 md:gap-6 mb-16",
    },
    stepCard: {
      base: "rounded-3xl border transition-all duration-300 shadow-sm h-[220px] flex flex-col relative overflow-hidden",
      active: "bg-black/80 backdrop-blur-2xl border-primary/30 shadow-lg shadow-primary/10 hover:border-primary/40",
      inactive: "bg-black/70 backdrop-blur-2xl border-white/10 hover:border-white/20",
      padding: {
        desktop: "p-6 md:p-8",
        mobile: "p-6",
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
      inactive: "bg-card border-2 border-border",
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
        container: "flex items-center justify-between mb-3 gap-3",
        title: {
          base: "text-base md:text-lg font-semibold",
          active: "text-primary",
          inactive: "text-foreground",
        },
        date: {
          base: "text-sm font-medium whitespace-nowrap",
          active: "text-primary/80",
          inactive: "text-muted-foreground",
        },
      },
      fullDate: {
        base: "text-xs md:text-sm leading-relaxed mt-auto",
        active: "text-foreground/90",
        inactive: "text-muted-foreground",
      },
      mobile: {
        title: "text-base font-semibold",
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
  advancedSessionDescription: (trackCount: number) => `각 심화트랙의 트랙장들과 함께 한 학기 동안 선택한 분야를 깊이 있게 탐구해요.
자연어처리, 컴퓨터비전, 데이터분석 등 ${trackCount}가지 트랙에서 전문 지식을 쌓고 실전 프로젝트까지 완성합니다.`,
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
      label: "DA",
      title: "데이터분석",
      description: "데이터에서 인사이트를 도출하고 비즈니스 문제를 해결하는 방법을 학습합니다. 탐색적 데이터 분석, 통계적 분석, 시각화, 머신러닝 기반 예측 모델링까지 데이터 분석의 전 과정을 다룹니다.",
      topics: [
        { title: "EDA", color: "primary" as const },
        { title: "시각화", color: "secondary" as const },
        { title: "예측 모델링", color: "tertiary" as const },
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
};

export const CURRICULUM_STYLES = {
  section: {
    padding: "py-12 md:py-20 px-6 md:px-12",
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
    base: "bg-white/10 backdrop-blur-sm rounded-xl border border-white/10",
    hover: "hover:bg-white/15 transition-all duration-200",
    padding: {
      small: "p-5",
      medium: "p-6",
    },
    // 자주 사용되는 조합
    withHover: {
      medium: "bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/15 transition-all duration-200 p-6",
      small: "bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/15 transition-all duration-200 p-5",
    },
  },
  container: {
    base: "rounded-3xl bg-black/98 backdrop-blur-2xl border border-white/10 overflow-hidden",
    padding: "p-8 md:p-10",
  },
  tag: {
    base: "px-2 py-0.5 rounded text-xs bg-white/5 text-white/70 border border-white/10",
  },
  button: {
    base: "px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300",
    active: "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105",
    inactive: "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-105 active:scale-95",
    track: {
      base: "px-4 md:px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300",
      active: "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105",
      inactive: "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-105 active:scale-95 border border-border/50",
    },
  },
  spacing: {
    sectionGap: "mb-8",
    contentGap: "mb-6",
    titleGap: "mb-3 md:mb-4",
    gridGap: "gap-4",
    buttonGap: "gap-3",
    trackGap: "gap-2",
    largeGap: "mb-10",
    smallGap: "mb-2",
    mediumGap: "mb-4",
    tagGap: "gap-1.5",
  },
  text: {
    title: {
      large: "text-2xl md:text-3xl lg:text-4xl font-bold text-white",
      medium: "text-lg font-semibold text-white",
      small: "text-base font-semibold text-white",
    },
    body: {
      large: "text-white/90 text-base md:text-lg leading-relaxed",
      medium: "text-white/80 text-base md:text-lg leading-relaxed max-w-3xl",
      small: "text-sm text-white/80 leading-relaxed",
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
    grid2: "grid md:grid-cols-2",
    grid3: "grid md:grid-cols-3",
    relativeFlex: "relative flex items-center gap-4",
    relativeFlex1: "relative flex-1",
    mobileNav: "md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20",
    desktopNav: "hidden md:flex w-12 h-12 flex-shrink-0 hover:scale-110",
    mobileNavButton: "w-10 h-10",
  },
  badge: {
    base: "inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-3",
  },
  topicCard: {
    base: "px-6 py-4 rounded-2xl text-left font-semibold text-sm shadow-xl backdrop-blur-sm",
  },
  icon: {
    white: "text-white",
  },
  header: {
    title: "text-3xl md:text-5xl lg:text-6xl font-bold text-foreground",
    subtitle: "text-sm md:text-lg text-foreground max-w-3xl",
  },
  sectionId: "curriculum",
  index: {
    first: 0,
  },
};

// ============================================================================
// FAQ
// ============================================================================

export const FAQ_DATA: FAQ[] = [
  {
    question: "비전공자도 지원이 가능한가요?",
    answer: "네, 가능합니다. 데이터 분석 및 인공지능 역량은 이제 모든 직무에서 필수적인 소양으로 자리 잡고 있습니다. 전공에 관계없이 해당 분야의 전문성을 기르고자 하는 열정을 가진 분이라면 누구든 환영합니다.",
  },
  {
    question: "활동 기간 및 시간은 어떻게 되나요?",
    answer: "2026년 1월 15일 최종 선발 시점부터 2026학년도 1학기 정기학술제 종료 시까지 약 6개월간 활동합니다. 수료 이후에는 KHUDA OB로서 지속적인 네트워크 참여 및 활동이 가능합니다.",
  },
  {
    question: "트랙 배정은 어떤 방식으로 이루어지나요?",
    answer: "방학 기간 내 학습한 역량을 바탕으로 본인의 희망 트랙을 우선적으로 반영하여 배정합니다. 다만, 특정 트랙에 지원 인원이 집중될 경우 부득이하게 지망 순위에 따라 조정될 수 있음을 양해 부탁드립니다.",
  },
  {
    question: "활동비는 얼마인가요?",
    answer: "9기 YB는 45,000원, 9기 OB는 5,000원입니다. 납부하신 활동비는 동아리 운영, 행사 기획 및 회원분들께 제공되는 교재비 등으로 투명하게 사용될 예정입니다.",
  },
  {
    question: "타 동아리와 병행이 가능한가요?",
    answer: "가능합니다. 다만, KHUDA의 커리큘럼은 심도 있는 학습과 다양한 실전 경험을 포함하고 있어 학습량이 다소 많을 수 있습니다. 따라서 타 학술 동아리와의 병행은 신중히 결정하시길 권장해 드립니다.",
  },
];

export const FAQ_MESSAGES = {
  title: "자주 묻는 질문",
  subtitle: "궁금한 점이 있으신가요?",
};

export const FAQ_STYLES = {
  sectionId: "faq",
  accordion: {
    type: "single" as const,
    collapsible: true,
    container: "w-full space-y-3",
    item: {
      base: "border-0 rounded-2xl bg-card border border-border/50 overflow-hidden transition-all duration-200 hover:border-border",
    },
    trigger: {
      base: "text-left hover:no-underline px-6 py-5 text-foreground font-medium transition-colors",
      iconContainer: "flex items-center gap-2",
      icon: "w-4 h-4 text-primary flex-shrink-0",
      iconComponent: HelpCircle,
    },
    content: {
      base: "px-6 pb-5 text-muted-foreground leading-relaxed",
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
    required: "필수",
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
    padding: "py-12 md:py-20 px-6 md:px-12",
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
        base: "text-2xl md:text-4xl lg:text-5xl font-bold text-primary mb-0.5 md:mb-1 transition-all duration-300 animate-in zoom-in-95 fade-in",
      },
      label: "text-xs text-muted-foreground font-medium",
    },
    separator: "text-xl md:text-3xl font-bold text-muted-foreground pb-3 md:pb-4 animate-pulse",
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
    container: "text-center mb-10",
    title: "text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6",
    subtitle: "text-base md:text-lg text-muted-foreground",
  },
  maxWidth: {
    narrow: "max-w-3xl mx-auto",
  },
  container: {
    base: "container mx-auto relative z-10",
  },
  section: {
    base: "section-padding relative transition-all duration-1000",
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
  cardGradient: "absolute inset-0 bg-gradient-to-br from-blue-950/50 via-blue-950/40 to-primary/25 rounded-lg opacity-50",
  cardBase: "relative border border-white/10 shadow-lg bg-black/70 backdrop-blur-2xl overflow-hidden",
} as const;

// ============================================================================
// 유틸리티 함수
// ============================================================================

export const scrollToSection = (href: string) => {
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export const filterOBQuestions = <T extends { position: number }>(questions: T[]): T[] => {
  return questions.filter(q => q.position < 9 || q.position > 21);
};
