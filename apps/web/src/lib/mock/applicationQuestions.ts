import type { Question, ApplicationResponse } from "@/lib/api";

// ============================================================================
// 지원서 mock 데이터
// 백엔드 리팩토링 중이라 질문/제출을 프론트 mock으로 처리한다.
// 백엔드 재연결 시 useApplicationQuestions / useApplicationForm 의 mock 분기를 제거하고
// lib/api.ts 의 getQuestions / submitApplication 으로 되돌린다.
//
// 서술형(자기소개, 지원 동기 등) 문항은 운영진이 확정한 리스트로 교체할 placeholder다.
// "[문항 확정 후 교체]" 주석이 붙은 항목을 실제 문항으로 바꾸면 된다.
// ============================================================================

// 기본 인적사항 (공통). 개인정보 동의는 별도 카드로 렌더되므로 마지막에 둔다.
const COMMON_QUESTIONS: Question[] = [
  { id: 1, question: "이름", applicant_type: "common", field_type: "text", required: true, max_len: 20, position: 1 },
  { id: 2, question: "성별", applicant_type: "common", field_type: "select", required: true, max_len: null, position: 2, options: ["남", "여"] },
  { id: 3, question: "생년월일", applicant_type: "common", field_type: "date", required: true, max_len: null, position: 3 },
  { id: 4, question: "연락처", applicant_type: "common", field_type: "text", required: true, max_len: 20, position: 4 },
  { id: 5, question: "이메일", applicant_type: "common", field_type: "text", required: true, max_len: 60, position: 5 },
  { id: 7, question: "재학 상태", applicant_type: "common", field_type: "select", required: true, max_len: null, position: 7, options: ["재학", "휴학", "졸업유예"] },
  { id: 8, question: "학과", applicant_type: "common", field_type: "department", required: true, max_len: null, position: 8 },
  { id: 9, question: "학년", applicant_type: "common", field_type: "select", required: true, max_len: null, position: 9, options: ["1학년", "2학년", "3학년", "4학년", "5학년 이상"] },
  // 개인정보 수집·이용 동의 (PrivacyConsentCard로 렌더)
  { id: 100, question: "개인정보 수집 및 이용 동의", applicant_type: "common", field_type: "consent", required: true, max_len: null, position: 100 },
];

// YB 전용 문항
const YB_QUESTIONS: Question[] = [
  { id: 201, question: "파이썬(Python) 활용 단계를 선택해주세요.", applicant_type: "yb", field_type: "python", required: true, max_len: null, position: 201 },
  { id: 202, question: "데이터·AI 분야와 관련해 들었던 이론 강의나 수업을 한 개 이상 작성해주세요.", applicant_type: "yb", field_type: "course_experience", required: true, max_len: null, position: 202 },
  { id: 203, question: "관심 있는 심화 트랙을 선택해주세요.", applicant_type: "yb", field_type: "select", required: true, max_len: null, position: 203 },
  // 자기소개서 (YB)
  { id: 204, question: "1. KHUDA에 지원하게 된 계기와 학회 활동을 통해 이루고 싶은 목표는 무엇인가요?", applicant_type: "yb", field_type: "textarea", required: true, max_len: 500, position: 204 },
  { id: 205, question: "2. 본인이 세운 목표를 달성하기 위해 어려운 상황 속에서도 끝까지 포기하지 않았던 경험에 대해 서술해주세요.", applicant_type: "yb", field_type: "textarea", required: true, max_len: 500, position: 205 },
  { id: 206, question: "3. 데이터·AI 관련 프로젝트나 관련 지식을 탐구해본 경험이 있다면, 그 과정과 배운 점을 함께 서술해주세요.", applicant_type: "yb", field_type: "textarea", required: true, max_len: 500, position: 206 },
  // 면접 일정/시간 (InterviewDateSelector에서 함께 처리, 시간 문항은 화면에 숨김)
  { id: 290, question: "면접 가능 일정", applicant_type: "yb", field_type: "interview_date", required: true, max_len: null, position: 290 },
  { id: 291, question: "면접 가능 시간", applicant_type: "yb", field_type: "interview_time", required: true, max_len: null, position: 291 },
  // 확인 체크리스트 (지원 유형 바로 아래에 노출, 모든 항목 체크 필수)
  {
    id: 295,
    question: "지원서 작성 전 아래 내용을 모두 확인해주세요.",
    applicant_type: "yb",
    field_type: "checklist",
    required: true,
    max_len: null,
    position: 200,
    options: [
      "YB는 수료 조건을 반드시 이행하여야 함을 확인했습니다.",
      "지원하기 탭에서 수료 조건 내용을 확인했습니다.",
      "OT는 7월 13일에 진행되며, 필수로 참여해야 함을 확인했습니다.",
    ],
  },
];

// OB 전용 문항 (OB는 면접 없음)
const OB_QUESTIONS: Question[] = [
  { id: 301, question: "참여를 희망하는 심화 트랙을 선택해주세요.", applicant_type: "ob", field_type: "select", required: true, max_len: null, position: 301 },
  { id: 302, question: "스터디 개설 의향이 있으신가요?", applicant_type: "ob", field_type: "select", required: true, max_len: null, position: 302 },
  { id: 303, question: "개설하고 싶은 스터디 또는 소모임이 있다면 작성해주세요.", applicant_type: "ob", field_type: "text", required: false, max_len: 120, position: 303 },
  // 자기소개서 (OB) - 1번 문항만 사용
  { id: 304, question: "1. KHUDA에 지원하게 된 계기와 학회 활동을 통해 이루고 싶은 목표는 무엇인가요?", applicant_type: "ob", field_type: "textarea", required: true, max_len: 500, position: 304 },
  // 확인 체크리스트 (지원 유형 바로 아래에 노출, 모든 항목 체크 필수)
  {
    id: 307,
    question: "지원서 작성 전 아래 내용을 모두 확인해주세요.",
    applicant_type: "ob",
    field_type: "checklist",
    required: true,
    max_len: null,
    position: 300,
    options: [
      "OB는 별도의 수료 조건이 없음을 인지했습니다.",
      "지원하기 탭에서 혜택에 대한 내용을 확인했습니다.",
      "OT는 7월 13일에 진행되며, 필수로 참여해야 함을 확인했습니다.",
    ],
  },
];

export const getMockQuestions = (applicantType: "yb" | "ob" | "common"): Question[] => {
  if (applicantType === "common") return COMMON_QUESTIONS;
  if (applicantType === "yb") return YB_QUESTIONS;
  if (applicantType === "ob") return OB_QUESTIONS;
  return [];
};

let mockApplicationId = 1000;

// 제출 mock: 짧은 지연 후 성공 응답을 돌려준다.
export const mockSubmitApplication = (
  _applicantType: "yb" | "ob",
  _answers: Record<string, string>,
): Promise<ApplicationResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockApplicationId += 1;
      resolve({ application_id: mockApplicationId, status: "submitted" });
    }, 600);
  });
};
