export type ApplicationType = "yb" | "ob";

// 목록 요약 (GET /api/admin/applications)
export interface Application {
  id: string;
  name: string;
  phone: string;
  email: string;
  applicationType: ApplicationType;
  track: string;
  submittedAt: string; // ISO 8601
}

// 상세 답변 항목 (GET /api/admin/applications/{id})
export interface AnswerItem {
  questionId: number;
  question: string;
  fieldType: string;
  position: number;
  value: string;
}

export interface ApplicationDetail {
  id: number;
  applicationType: ApplicationType;
  status: string;
  submittedAt: string;
  updatedAt: string | null;
  updatedBy: string | null;
  answers: AnswerItem[];
}

export const APPLICATION_TYPE_LABEL: Record<ApplicationType, string> = {
  yb: "YB",
  ob: "OB",
};

// 지원 트랙 목록 (목록 필터용). 공개 폼의 트랙 제목과 같은 값으로 저장된다.
export const APPLICATION_TRACKS = [
  "데이터 분석",
  "데이터 엔지니어링",
  "자연어 처리",
  "컴퓨터 비전",
  "AI 엔지니어링",
  "금융",
] as const;
