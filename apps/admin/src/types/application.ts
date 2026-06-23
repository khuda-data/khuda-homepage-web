export type ApplicationType = "yb" | "ob";

export interface ApplicationAnswer {
  questionId: number;
  section: string;
  question: string;
  answer: string;
}

export interface Application {
  id: string;
  name: string;
  phone: string;
  email: string;
  applicationType: ApplicationType;
  track: string;
  submittedAt: string; // ISO 8601
  answers: ApplicationAnswer[];
  interviewTimes?: string[];
}

export const APPLICATION_TYPE_LABEL: Record<ApplicationType, string> = {
  yb: "YB",
  ob: "OB",
};

// 지원 트랙 목록 (백엔드 연동 시 서버 값으로 대체)
export const APPLICATION_TRACKS = [
  "NLP",
  "CV",
  "데이터 엔지니어링",
  "데이터베이스",
  "AI 엔지니어링",
  "금융 AI",
] as const;

// 상세 답변 섹션
export const SECTIONS = {
  basic: "기본정보",
  common: "공통문항",
  type: "유형별 문항",
} as const;
