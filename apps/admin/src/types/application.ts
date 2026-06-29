export type ApplicationType = "yb" | "ob";

// 상세 답변 항목 (목록, 상세 공통)
export interface AnswerItem {
  questionId: number;
  question: string;
  fieldType: string;
  position: number;
  value: string;
}

// 목록 요약 (GET /api/admin/applications). CSV 내보내기를 위해 답변 전체도 포함한다.
export interface Application {
  id: string;
  name: string;
  phone: string;
  email: string;
  applicationType: ApplicationType;
  track: string;
  submittedAt: string; // ISO 8601
  answers: AnswerItem[];
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

// 트랙 id(영문)를 제목(한글)으로 잇는 표.
// 공개 폼에서 YB는 제목으로, OB는 id로 저장돼 표기가 갈린다. 이를 한쪽으로 맞추기 위함.
const TRACK_ID_TO_LABEL: Record<string, string> = {
  da: "데이터 분석",
  de: "데이터 엔지니어링",
  nlp: "자연어 처리",
  cv: "컴퓨터 비전",
  aie: "AI 엔지니어링",
  fin: "금융",
};

// 저장된 트랙 값을 한글 제목으로 정규화한다. id로 저장된 값은 제목으로 바꾸고, 모르는 값은 그대로 둔다.
export function normalizeTrack(track: string | null | undefined): string {
  if (!track) return "";
  return TRACK_ID_TO_LABEL[track.trim().toLowerCase()] ?? track;
}
