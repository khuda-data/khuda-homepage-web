// 합격자 조회 오픈 시간: RECRUITMENT_SCHEDULE.final과 동일 날짜 (1월 12일 18:00 KST)
export const RESULT_OPEN_TIME = new Date("2026-01-12T18:00:00+09:00");

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

export const RECRUITMENT_INFO = {
  target: "경희대학교 재학생 및 휴학생",
  targetDetails: "전공 무관, 데이터분석/AI에 관심 있는 모든 분",
  trackCapacity: 8,
  totalCapacity: 50,
  trackCapacityText: "트랙별 6~8명",
  totalCapacityText: "총 40명 내외",
  generation: "10기",
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
      // 정기 세션 요일은 기수마다 달라질 수 있으니 모집 공지를 보고 맞춰서 수정한다. 10기는 수요일.
      icon: "CalendarCheck",
      description: "방학 중 매주 수요일 대면 및\n학기 중 주 1회 세션 정기 참여 가능한 분",
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
    start: "2026년 6월 29일 (월)",
    end: "2026년 7월 5일 (일)",
    deadline: "2026년 7월 5일 23:59",
    deadlineISO: "2026-07-05T23:59:59",
    short: "6.29~7.5",
    full: "2026년 6월 29일 (월) ~ 7월 5일 (일) 23:59",
    dateRange: (start: string, end: string) => `${start} ~ ${end}`,
    deadlineWithLabel: (label: string, deadline: string) => `${label} ${deadline}`,
  },
  announcement: {
    date: "2026년 7월 7일 (화)",
    short: "7.7",
    full: "2026년 7월 7일 (화)",
  },
  interview: {
    start: "2026년 7월 8일 (수)",
    end: "2026년 7월 9일 (목)",
    method: "온라인 비대면",
    short: "7.8~7.9",
    full: "2026년 7월 8일 (수) ~ 7월 9일 (목) 온라인 비대면",
    dates: [
      { value: "7월 8일 (수)", label: "7월 8일", subLabel: "수요일" },
      { value: "7월 9일 (목)", label: "7월 9일", subLabel: "목요일" },
    ],
  },
  final: {
    date: "2026년 7월 10일 (금) 이후 개별 안내",
    short: "7.10",
    full: "2026년 7월 10일 (금) 이후 개별 안내",
    ot: "최종 합격자 대상으로 7월 13일에 오리엔테이션을 진행하며, YB 세션은 7월 15일에 시작합니다.",
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
