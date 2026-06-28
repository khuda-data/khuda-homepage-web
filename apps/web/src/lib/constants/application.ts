export interface TimeUnitConfig {
  key: "days" | "hours" | "minutes";
  label: string;
  delay: string;
}

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
  residenceOptions: [
    "서울", "경기 수원/영통", "경기 성남/분당", "경기 용인", "경기 고양/의정부", "경기 기타",
    "인천", "부산", "대구", "대전", "광주", "울산", "세종",
    "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주", "해외"
  ],
  residenceDescription: "7월~8월 기준 거주 지역을 선택해주세요",

  pythonLevels: [
    {
      value: "1",
      label: "기본 문법",
      description: "변수, 연산자, 입력과 출력 등 기본 문법을 다룰 수 있다.",
    },
    {
      value: "2",
      label: "기본 프로그래밍",
      description: "조건문과 반복문, 함수로 간단한 프로그램을 만들 수 있다.",
    },
    {
      value: "3",
      label: "데이터 분석",
      description: "pandas와 numpy로 데이터를 다루고 시각화할 수 있다.",
    },
    {
      value: "4",
      label: "모델 학습",
      description: "scikit-learn이나 PyTorch로 모델을 학습시키고 결과를 해석할 수 있다.",
    },
    {
      value: "5",
      label: "프로젝트 수행",
      description: "데이터 수집부터 모델링까지 프로젝트를 직접 설계하고 이끌 수 있다.",
    },
  ],
  pythonLevelGuide: {
    title: "면접 평가 기준 안내",
    description: "각 단계는 이전 단계의 내용을 포함합니다. 더 높은 단계를 선택하고 면접에서 그에 맞는 답변을 들려주실수록 평가에 더 좋게 반영됩니다.",
  },

  dataAnalysisFields: [
    "데이터 전처리 및 분석 (Pandas, NumPy)",
    "데이터 시각화 (Matplotlib, Seaborn, Plotly)",
    "통계 분석 및 가설검정 (T-test, ANOVA, 회귀분석)",
    "머신러닝 알고리즘 (Random Forest, SVM)",
    "데이터베이스 및 SQL",
    "딥러닝 (CNN, RNN, Transformer)",
    "자연어 처리(NLP) 및 컴퓨터 비전(CV)",
  ],

  trackSelectOptions: [
    { value: "none", label: "참여 의사 없음", description: "트랙에 참여하지 않습니다" },
  ],

  privacyConsent: {
    title: "개인정보 수집·이용 동의서",
    section1: {
      title: "1. 개인정보의 수집·이용에 관한 사항",
      description: '본인은 "경희대학교 데이터 분석 동아리(KHUDA)"가 신규 회원 모집과 관련하여 아래의 내용에 따라 개인정보를 수집·이용하는 것에 동의합니다.',
      purpose: "가. 수집·이용 목적: ① 신규 회원 모집",
      items: "나. 수집하는 개인정보의 항목: ① 신청자 : 이름, 성별, 생년월일, 연락처, 이메일, 재학 상태, 학과, 학년",
    },
    section2: {
      title: "2. 개인정보의 보유 및 이용기간",
      description: "본인은 경희대학교 데이터 분석 동아리가 본 동의서에 명시된 개인정보를 본 동의서에 명시된 수집·이용 목적이 달성될 때까지(1년) 보유·이용하는 것에 동의합니다.",
    },
    section3: {
      title: "3. 개인정보 수집·이용에 대한 동의 거부 권리 및 동의 거부 시 불이익",
      description: "본인은 위 개인정보의 수집·이용에 대한 동의를 거부할 권리가 있으며, 동의를 거부할 경우 신규 회원 모집 명단에서 제외될 수 있다는 사실을 인지한 상태에서 작성한 것임을 확인합니다.",
    },
    agreeText: "상기 내용에 동의합니다.",
    disagreeText: "상기 내용에 동의하지 않습니다.",
  },

  submissionSuccess: {
    title: "지원이 완료되었습니다",
    subtitle: "지원서가\n정상적으로 접수되었습니다.",
    description: "결과는 입력하신 전화번호로\n문자로 발송해드리겠습니다.",
    backToHome: "메인으로 돌아가기",
  },

  commonTexts: {
    required: "*",
    thankYouMessage: "좋은 의견 감사합니다",
    selectRegion: "지역을 선택해주세요",
    defaultPlaceholder: "답변을 입력해주세요",
  },

  placeholderTexts: {
    name: "홍길동",
    studentId: "2024123456",
    grade: "3학년 2학기",
    major: "컴퓨터공학과",
    doubleMajor: "경영학과 또는 없음",
    email: "example@email.com",
    phone: "010-1234-5678",
  },

  questionNumbers: {
    motivation: "1",
    challenge: "2",
    project: "3",
  },

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

  applicationNotice: {
    title: "서류 접수 안내",
    description: "지원서는 제출 후 수정이 불가능하니 신중하게 작성해주세요.",
  },
  announcementNotice: {
    title: "서류 합격자 발표 안내",
    description: "결과는 발표 일정에 맞춰 웹사이트에서 확인 가능합니다.",
  },
  interviewNotice: {
    title: "면접 안내",
    description: "OB 지원자는 면접 없이 서류만 심사됩니다.",
  },

  pageTitle: "함께 성장할 KHUDA 10기 부원을 모집합니다 🏃",
  pageDescription: "아래 항목을 작성한 뒤 지원서를 제출해 주세요.",

  sections: {
    schedule: "모집 일정",
    faq: "자주 묻는 질문",
    privacy: "개인정보 수집 동의",
    basicInfo: "기본 정보",
    applicationType: "지원 유형",
    interviewSchedule: "면접 가능 일정",
  },

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

  ybCompletionRequirements: {
    title: "YB 수료 조건 안내",
    intro: "KHUDA 10기 YB 부원분들의 원활한 활동 이행과 학술적 성취를 위해 아래와 같이 수료 조건을 공지합니다. YB 부원께서는 해당 사항을 반드시 숙지하시어 활동에 참고하시기 바랍니다.",
    requirements: [
      {
        // 기초 세션 요일은 기수마다 달라질 수 있으니 모집 공지에 맞춰 수정한다. 10기는 수요일.
        title: "1. 기초 세션 이수",
        description: "방학 중 매주 수요일 진행되는 기초 세션에 참석합니다. (무단 결석·지각 시 회칙에 따라 경고가 부과됩니다)",
      },
      {
        title: "2. 토이 프로젝트 컨퍼런스 참가",
        description: "방학 중 진행되는 토이 프로젝트에 팀 단위로 참여하고, 결과물을 컨퍼런스에서 발표합니다.",
      },
      {
        title: "3. 심화 세션 이수",
        description: "학기 중 진행되는 심화 세션에 참석합니다. (무단 결석·지각 시 회칙에 따라 경고가 부과됩니다)",
      },
      {
        title: "4. 정기 학술제 참가",
        description: "학기 중 진행되는 정기 학술제에 참여하고, 수행한 연구·프로젝트 결과를 발표합니다.",
      },
    ],
    notice: "※ 위 수료 조건을 모두 충족한 회원에 한하여 수료증 발급 및 차기 학기 OB 자격이 부여됩니다. 관련 문의 사항은 회장(010-3182-3849)에게 연락해 주시기 바랍니다.",
    benefits: {
      title: "이외 혜택",
      items: [
        {
          title: "1. 스터디 그룹 지원",
          description: "다양한 분야의 스터디에 참여할 수 있으며, 교재 및 강의비를 일부 지원합니다. YB·OB·운영진이 자유롭게 스터디를 개설하고 참여할 수 있습니다.",
        },
      ],
    },
  },

  obBenefits: {
    title: "KHUDA OB 회원 대상 혜택 및 활동 안내",
    intro: "KHUDA OB 회원께는 별도의 수료 조건 없이 본 동아리만의 다양한 인프라와 혜택이 제공됩니다. 이번 학기 개편된 주요 활동 내용을 다음과 같이 안내드립니다.",
    benefits: [
      {
        title: "1. 심화 세션 참여",
        description: "학기 중 운영되는 심화 세션에 참여할 수 있습니다.",
      },
      {
        title: "2. 스터디 그룹 지원",
        description: "다양한 분야의 스터디에 참여할 수 있으며, 교재 및 강의비를 일부 지원합니다. YB·OB·운영진이 자유롭게 스터디를 개설하고 참여할 수 있습니다.",
      },
      {
        title: "3. OB 심화 활동",
        description: "OB를 대상으로 운영되는 심화 활동입니다. 논문·프로젝트를 팀 단위로 진행하며 KSC·공모전 등 대내외 대회에 출전하고, 졸업생·KHUDA 출신 석박사·교수님 멘토진이 주기적으로 피드백을 제공합니다. (OB 심화 활동 인원은 별도 선발 절차를 거쳐 모집할 예정이며, 방학 기초 세션에 팀장으로 참여하시면 선발에 긍정적으로 반영됩니다)",
      },
      {
        title: "4. 정기 학술제 참여",
        description: "학기 중 진행되는 정기 학술제에 참여하여 심화 세션에서 수행한 프로젝트 결과를 발표할 수 있습니다. (심화 세션 참여 시 필수)",
      },
    ],
  },
};

export const TIME_UNITS: TimeUnitConfig[] = [
  { key: "days", label: "일", delay: "delay-100" },
  { key: "hours", label: "시간", delay: "delay-200" },
  { key: "minutes", label: "분", delay: "delay-300" },
];

export const TIME_SEPARATOR = ":";

export const ANIMATION_CONFIG = {
  timeUnit: {
    duration: "duration-300",
    fadeInDuration: "duration-500",
  },
  button: {
    disabled: "rounded-2xl px-8 py-6 text-lg font-semibold transition-all duration-200 opacity-50 cursor-not-allowed",
    active: "rounded-2xl px-8 py-6 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95",
  },
  fadeIn: "animate-in fade-in slide-in-from-bottom-4 duration-700",
  linkDelay: "delay-500",
};

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
