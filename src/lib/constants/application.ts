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

  dataAnalysisFields: [
    "데이터 전처리 및 분석 (Pandas, NumPy)",
    "데이터 시각화 (Matplotlib, Seaborn, Plotly)",
    "통계 분석 및 가설검정 (T-test, ANOVA, 회귀분석)",
    "머신러닝 알고리즘 (Random Forest, SVM)",
    "데이터베이스 및 SQL",
    "딥러닝 (CNN, RNN, Transformer)",
    "자연어처리(NLP) 및 컴퓨터비전(CV)",
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

  pageTitle: "함께 성장하며\n한계를 뛰어넘는 경험을 만들어가요",
  pageDescription: "KHUDA는 데이터 분석과 인공지능(AI)에 열정을 가진 경희인이 함께 모여 체계적인 학습과 실무 프로젝트 경험을 통해 성장하는 학회입니다.",

  sections: {
    schedule: "모집 일정",
    faq: "자주 묻는 질문",
    privacy: "개인정보 수집 동의",
    basicInfo: "기본 정보",
    applicationType: "지원 분야",
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
        description: "방학 중 매주 수요일 진행되는 기초 세션 참석 (벌점제도가 존재합니다)",
      },
      {
        title: "2. 토이 프로젝트 컨퍼런스 참가",
        period: "2026년 여름 방학",
        description: "해당 기간 내 운영되는 토이 프로젝트 필수 참여 및 결과물 제출",
      },
      {
        title: "3. 심화 세션 이수",
        period: "2026년 2학기",
        description: "학기 중 운영되는 심화 트랙 수강 필수 참여",
      },
      {
        title: "4. 정기 학술제 참가",
        period: "2026년 2학기",
        description: "KHUDA 정기 학술제 필수 참여",
      },
    ],
    notice: "※ 위 수료 조건을 모두 충족한 회원에 한하여 수료증 발급 및 차기 학기 OB 자격이 부여됩니다. 관련 문의 사항은 운영진에게 연락해 주시기 바랍니다.",
    benefits: {
      title: "이외 혜택",
      items: [
        {
          title: "1. 스터디 그룹 지원",
          description: "SQL, 공모전, 어학 등 다양한 분야의 스터디 참여",
          benefit: "스터디 교재 및 강의비 일부 지원",
          operation: "운영진 & OB & YB의 자유로운 스터디 개설 및 참여 독려",
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
        description: "학기 중 운영되는 심화 트랙 수강 가능",
        feature: "필요 역량에 최적화된 학습 환경 제공",
      },
      {
        title: "2. 스터디 그룹 지원",
        description: "SQL, 공모전, 어학 등 다양한 분야의 스터디 참여",
        benefit: "스터디 교재 및 강의비 일부 지원",
        operation: "운영진 & OB & YB의 자유로운 스터디 개설 및 참여 독려",
      },
      {
        title: "3. OB 심화 활동",
        description: "논문, 프로젝트 등 OB 대상 추가 심화 활동, 트랙 단위 팀 구성",
        feature: "KSDC, 공모전 등 대외 대회 출전",
        benefit: "졸업생 및 KHUDA 출신 석박사, 교수님 멘토진 구성",
        operation: "10기 최종 선발 직후 OB 심화 대상 공지 예정",
      },
      {
        title: "4. 정기 학술제 참여",
        description: "구성: 프로젝트 발표회 (트랙 참여 인원에 한해)",
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
