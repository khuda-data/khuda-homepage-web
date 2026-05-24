export interface KhudaValue {
  title: string;
  subtitle: string;
  description: string;
}

export interface FeatureInfo {
  title: string;
  label: string;
  description: string;
  details: string;
  image?: string;
}

export interface AchievementInfo {
  value: number;
  label: string;
  suffix: string;
  from?: number;
  isStatic?: boolean;
  staticText?: string;
  emoji?: string;
  variant?: "primary" | "white" | "accent";
}

export const KHUDA_VALUES: KhudaValue[] = [
  {
    title: "연결",
    subtitle: "지식과 경험의 선순환",
    description: "신규 회원과 수료생을 잇는 유기적인 네트워크를 지향합니다. 적극적인 재참여를 통해 심화 트랙과 스터디의 깊이를 더하고, 지식과 경험이 기수 간에 흐르는 선순환적 학습 생태계를 구축합니다.",
  },
  {
    title: "열정",
    subtitle: "한계를 넘는 몰입",
    description: "이론부터 실무까지 이어지는 고강도 학습으로 견고한 토대를 다집니다. 방학 세션과 심화 트랙을 거치며 스스로 설정한 한계를 뛰어넘고, 이전과는 다른 차원의 데이터 분석 역량을 확보하는 성취를 경험합니다.",
  },
  {
    title: "가치",
    subtitle: "세상으로 향하는 실전",
    description: "학습을 넘어 현실의 문제를 해결하는 데이터 및 인공지능 전문가로 거듭납니다. 정기학술제와 산학협력 프로젝트를 경험하며 데이터 속에서 가치를 발견하고, 실질적인 솔루션을 제안하는 실전 중심의 가치 창출을 추구합니다.",
  },
];

export const KHUDA_FEATURES: FeatureInfo[] = [
  {
    title: "기초 세션 & 토이 프로젝트",
    label: "학습",
    description: "머신러닝 기초부터 토이 프로젝트까지, 실전 경험의 기반을 함께 마련합니다.",
    details: "ML 핵심 개념 학습, 파이썬 실습, 그리고 팀 단위 토이 프로젝트를 통해 이론과 실전을 동시에 경험합니다.",
    image: "/images/activities/ml-session-3.jpg",
  },
  {
    title: "심화 세션",
    label: "성장",
    description: "심화 이론부터 실전 프로젝트까지, 전문 역량의 기반을 함께 마련합니다.",
    details: "6개의 트랙에서 관심 분야를 선택하여 체계적인 커리큘럼을 통해 전문성을 기르고, 트랙원들과 함께 프로젝트를 진행합니다.",
    image: "/images/activities/track-session-1.jpg",
  },
  {
    title: "정기 학술제",
    label: "성과",
    description: "한 학기 동안 완성한 프로젝트를 발표하는 KHUDA의 대표 학술 행사입니다.",
    details: "포스터 발표와 최종 발표를 통해 심사위원분들의 피드백을 받으며 프로젝트의 완성도를 높입니다.",
    image: "/images/activities/conference-1.png",
  },
  {
    title: "네트워킹",
    label: "교류",
    description: "학회원들과의 유대감을 형성하고 새로운 인연을 만드는 시간입니다.",
    details: "파티룸, 레크레이션 등 다양한 네트워킹 활동을 통해 함께 성장하는 커뮤니티를 만들어갑니다.",
    image: "/images/activities/networking.jpg",
  },
];

export const KHUDA_ACHIEVEMENTS: AchievementInfo[] = [
  {
    value: 9,
    label: "기수",
    suffix: "기",
    from: 1,
  },
  {
    value: 0,
    label: "경희대학교 총동아리연합회 선정",
    suffix: "",
    isStatic: true,
    staticText: "경희대학교\n2025 최우수 동아리",
  },
  {
    value: 400,
    label: "수료생",
    suffix: "+",
  },
  {
    value: 150,
    label: "아이디어 제출",
    suffix: "+",
  },
];
