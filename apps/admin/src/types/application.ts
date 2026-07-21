export type ApplicationType = "yb" | "ob";

// 상세 답변 항목 (목록, 상세 공통)
export interface AnswerItem {
  questionId: number;
  question: string;
  fieldType: string;
  position: number;
  // 문항 최대 글자수. 제한 없는 문항은 null. 답변 분량 평가에 쓴다.
  maxLen: number | null;
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

// 목록 필터에 표시할 트랙 이름이다.
// 저장된 트랙 ID를 `normalizeTrack`으로 표시 이름으로 변환한 뒤 이 값과 비교한다.
export const APPLICATION_TRACKS = [
  "데이터 분석",
  "데이터 엔지니어링",
  "LLM",
  "컴퓨터 비전",
  "AI 엔지니어링",
  "금융",
] as const;

// 저장된 트랙 ID인 영문 코드를 화면에 표시할 한글 제목으로 변환하는 매핑이다.
// 공개 지원 폼과 기존 데이터 모두 트랙 ID를 저장하므로, 화면에 표시할 때 이 매핑을 통해 제목으로 변환한다.
// `nlp` 트랙은 10기부터 `LLM`으로 이름이 변경되었다.
const TRACK_ID_TO_LABEL: Record<string, string> = {
  da: "데이터 분석",
  de: "데이터 엔지니어링",
  nlp: "LLM",
  cv: "컴퓨터 비전",
  aie: "AI 엔지니어링",
  fin: "금융",
};

// 저장된 트랙 값을 화면 표시용 제목으로 변환한다.
// 트랙 ID는 매핑된 제목으로 바꾸고, 매핑에 정의되지 않은 값은 그대로 반환한다.
export function normalizeTrack(track: string | null | undefined): string {
  if (!track) return "";
  return TRACK_ID_TO_LABEL[track.trim().toLowerCase()] ?? track;
}
