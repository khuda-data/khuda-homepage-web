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

// KHUDA_GENERATION = "지금 모집 중이거나, 바로 다음에 모집할 기수".
// 유지보수 규칙: 한 기수 모집이 끝나면 이 값을 다음 기수로 +1 한다.
//   - 예) 지금은 10기 모집 전/중 → 10. 10기 모집이 끝나면 11로 올린다.
// 기수는 6개월 주기이며, 짝수 기수는 7월(7~12월 활동) / 홀수 기수는 1월(1~6월 활동)에 모집한다.
export const KHUDA_GENERATION = 10;

// 모집 대상 기수의 활동 기간 (짝수=하반기 7~12월 / 홀수=상반기 1~6월)
export const ACTIVITY_PERIOD = KHUDA_GENERATION % 2 === 0 ? "7월부터 12월까지" : "1월부터 6월까지";

// 다음 모집 월: 모집 대상 기수(KHUDA_GENERATION)의 홀짝으로 결정 (짝수=7월 / 홀수=1월)
//   - 지금 10기(짝수) 기준이면 다음 모집은 7월. 10기 종료 후 11로 올리면 자동으로 1월이 된다.
export const NEXT_RECRUITMENT_MONTH = KHUDA_GENERATION % 2 === 0 ? "7월" : "1월";

// 기술 면접 참고 자료. 유의사항 섹션 가장 아래 카드로 보여준다.
// 서류 접수 기간(RECRUITMENT_SCHEDULE.application.startISO ~ deadlineISO)에만 노출하며,
// 노출 여부 판단은 InterviewReferenceCard 컴포넌트가 담당한다.
// url은 운영진이 공유하는 노션 링크로, 기수마다 갱신한다.
export const INTERVIEW_REFERENCE = {
  badge: "지원 기간 한정",
  title: "기술 면접 참고 자료",
  description: "기술 면접은 아래 자료를 바탕으로 진행돼요. 지원 전에 미리 살펴보시면 도움이 돼요.",
  linkLabel: "노션에서 참고 자료 보기",
  // TODO: 정식 노션 링크로 교체 예정 (현재는 임시 URL)
  url: "https://recondite-dry-2f7.notion.site/38de55358a8d80999b91fa0b8c82c0db?source=copy_link",
};

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
    startISO: "2026-06-29T00:00:00+09:00",
    deadlineISO: "2026-07-05T23:59:59+09:00",
    short: "6.29~7.5",
    compact: "6.29 (월) ~ 7.5 (일)",
    full: "2026년 6월 29일 (월) ~ 7월 5일 (일) 23:59",
    dateRange: (start: string, end: string) => `${start} ~ ${end}`,
    deadlineWithLabel: (label: string, deadline: string) => `${label} ${deadline}`,
  },
  announcement: {
    date: "2026년 7월 7일 (화)",
    short: "7.7",
    full: "2026년 7월 7일 (화) 이후 개별 안내",
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

// 상단 모집 배너. 카운트다운 기준은 RECRUITMENT_SCHEDULE.application.deadlineISO(서류 마감).
// showFromISO: 배너를 띄우기 시작하는 시점. 서류 모집 시작일에 맞춘다.
// (10기 모집 시작일은 2026년 6월 29일. 다음 기수에는 그 기수 모집 시작일로 갱신한다.)
export const RECRUITMENT_BANNER = {
  message: "KHUDA 10기 모집중 🔥",
  ctaLabel: "지원하러 가기",
  showFromISO: "2026-06-29T00:00:00+09:00",
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
