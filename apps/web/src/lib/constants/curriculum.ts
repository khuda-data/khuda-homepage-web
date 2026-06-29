// 인덱스 페이지 TrackShowcase용 트랙 데이터
export interface IndexTrackInfo {
  id: string;
  label: string;
  title: string;
  // 파이프라인 흐름을 보여주기 위한 단계 라벨 (분석 → 모델링 → 서비스화, 금융은 응용)
  stage: string;
  description: string;
  // 프로젝트 페이지 트랙 필터 값 (data/projects.ts의 track 값과 일치)
  projectTrack: string;
}

export const INDEX_TRACKS: IndexTrackInfo[] = [
  {
    id: "da",
    label: "Data Analytics",
    title: "데이터 분석",
    stage: "분석",
    description:
      "데이터에서 인사이트를 찾는 출발점입니다. 무엇을 살펴볼지 정하고 데이터를 해석해 의미 있는 결론을 끌어냅니다.",
    projectTrack: "데이터 분석",
  },
  {
    id: "de",
    label: "Data Engineering",
    title: "데이터 엔지니어링",
    stage: "전처리",
    description:
      "분석할 데이터를 모으고 다듬는 단계입니다. 수집한 데이터를 정제하여 모델이 학습할 수 있는 형태로 구조화합니다.",
    projectTrack: "데이터 엔지니어링",
  },
  {
    // 10기부터 NLP에서 LLM으로 리브랜딩. 내부 id는 nlp로 유지(과거 OB 저장값과 호환).
    id: "nlp",
    label: "LLM",
    title: "LLM",
    stage: "모델링",
    description:
      "모델링 단계에서 텍스트와 언어를 다룹니다. 문장의 의미를 이해하고 새로운 문장을 생성하는 모델을 설계합니다.",
    // projectTrack은 과거 8기 NLP 프로젝트 필터 연결을 위해 유지한다.
    projectTrack: "NLP",
  },
  {
    id: "cv",
    label: "CV",
    title: "컴퓨터 비전",
    stage: "모델링",
    description:
      "모델링 단계에서 이미지와 영상을 다룹니다. 장면의 의미를 인식하고 새로운 이미지를 생성하는 모델을 설계합니다.",
    projectTrack: "CV",
  },
  {
    id: "aie",
    label: "AI Engineering",
    title: "AI 엔지니어링",
    stage: "서비스 배포",
    description:
      "완성한 모델을 실제 서비스로 연결하는 단계입니다. 모델이 프로덕트 환경에서 안정적으로 작동하도록 설계합니다.",
    projectTrack: "AI 엔지니어링",
  },
  {
    id: "fin",
    label: "Finance",
    title: "금융",
    stage: "응용",
    description:
      "분석부터 모델링까지의 흐름을 금융에 적용합니다. 예측과 분석으로 실제 금융 데이터를 다룹니다.",
    projectTrack: "금융",
  },
];

export const CURRICULUM_INFO = {
  trackInfoWeeks: "4-5주차",
  basicSessionTitle: "방학세션으로 시작해요",
  advancedSessionTitle: (trackCount: number) => `${trackCount}가지 심화트랙 중에서 선택할 수 있어요`,
  basicSessionDescription: `방학 동안 파이썬 실습과 머신러닝 기초를 함께 배워요.
개인 랜덤 발제, 퀴즈, 팀별 토의를 통해 기초를 탄탄히 다지고, 팀 단위로 토이프로젝트를 진행합니다.`,
  advancedSessionDescription: (trackCount: number) => `각 심화트랙의 트랙장들과 함께 한 학기 동안 선택한 분야를 깊이 있게 탐구합니다.
LLM, 컴퓨터 비전, 데이터 엔지니어링 등 ${trackCount}가지 트랙에서 전문 지식을 쌓고, 학기 말 정기 학술제를 진행합니다.`,
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
  tracks: [
    {
      id: "da",
      label: "DA",
      title: "데이터 분석",
      description: "데이터에서 인사이트를 도출하고 비즈니스 문제를 해결하는 방법을 학습합니다. ML/DL 모델의 예측 근거를 XAI로 해석하여 인공지능의 투명성과 신뢰성을 확보하는 기술을 학습합니다.",
    },
    {
      id: "nlp",
      label: "LLM",
      title: "LLM",
      description: "텍스트 데이터를 컴퓨터가 이해하고 활용하도록 만드는 기술을 다루는 트랙입니다. 뉴스/댓글/문서 같은 실제 데이터를 기반으로 분류·요약·검색·챗봇 등 실전 과제를 직접 구현하며 LLM 파이프라인을 경험합니다.",
    },
    {
      id: "cv",
      label: "CV",
      title: "컴퓨터 비전",
      description: "Computer Vision은 기계로 하여금 이미지와 비디오에서 의미 있는 데이터를 해석하고 분석하며 추출할 수 있게 합니다. 딥러닝과 신경망 등 다양한 기술이 사용되며, 이를 통해 기계가 사물을 인식하거나, 상황을 인지하고, 심지어 새로운 이미지를 생성하기도 합니다. 다시 말해, Computer Vision이란 인간의 시각과 시각 데이터를 해석하는 인지 능력을 복제하는 것입니다.",
    },
    {
      id: "aie",
      label: "AIE",
      title: "AI 엔지니어링",
      description: "파운데이션 모델을 실제 애플리케이션에 작용하기 위한 AI 엔지니어링 과정을 다룹니다. 모델 이해와 평가에서 출발하여 프롬프트 설계와 컨텍스트 관리, RAG와 에이전트 설계, 파인튜닝과 데이터 추론, 성능 최적화와 피드백 루프까지 이어지는 전 과정을 통해 운영 환경에서 마주하는 실제 개발 과제를 안정적으로 해결하기 위한 판단 기준과 설계 원리를 학습합니다.",
    },
    {
      id: "fin",
      label: "FIN",
      title: "금융",
      description: "검증된 오픈소스를 활용하여 기업 부도 예측(ML), 주가 수익률 예측(DL), 뉴스 감성 분석(NLP) 등 3가지 미니프로젝트를 수행하며 실전 데이터 파이프라인을 직접 구축합니다. 이를 통해 축적된 경험을 바탕으로 실제 시장에 적용 가능한 AI 모델을 최종 완성하는 인터랙티브한 커리큘럼으로 운영됩니다.",
    },
  ],
  academicFestival: {
    title: "정기 학술제",
    subtitle: "심화 트랙의 마지막을 장식하는 프로젝트 데모데이",
    // 포스터 발표 세션은 폐지되어 별도 발표 구분 없이 프로젝트 발표로 통합한다.
    description: "트랙별 1-2팀을 구성해 팀 단위 프로젝트를 수행하고, 프로젝트 발표를 진행합니다. 프로젝트를 공유하고 설명하는 경험을 통해 사고의 깊이와 표현력을 함께 성장시킵니다. 교수님을 비롯해 현직자 분들이 심사위원으로 참여합니다.",
    participation: {
      title: "참여 인원",
      description: "각 트랙별 4-6명 기준 한 팀 (트랙당 최대 2팀)",
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
