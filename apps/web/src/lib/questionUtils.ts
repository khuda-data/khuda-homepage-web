import { APPLICATION_FORM_CONFIG } from "./constants";

export const getPlaceholder = (questionText: string): string => {
  if (questionText.includes("이름")) return APPLICATION_FORM_CONFIG.placeholderTexts.name;
  if (questionText.includes("학번")) return APPLICATION_FORM_CONFIG.placeholderTexts.studentId;
  if (questionText.includes("학년") || questionText.includes("학기")) return APPLICATION_FORM_CONFIG.placeholderTexts.grade;
  if (questionText.includes("주전공")) return APPLICATION_FORM_CONFIG.placeholderTexts.major;
  if (questionText.includes("다전공") || questionText.includes("부전공")) return APPLICATION_FORM_CONFIG.placeholderTexts.doubleMajor;
  if (questionText.includes("이메일")) return APPLICATION_FORM_CONFIG.placeholderTexts.email;
  if (questionText.includes("휴대폰") || questionText.includes("전화번호")) return APPLICATION_FORM_CONFIG.placeholderTexts.phone;
  return APPLICATION_FORM_CONFIG.commonTexts.defaultPlaceholder;
};

export const getQuestionNumber = (questionText: string): string | null => {
  // "1. ..." 처럼 선행 번호가 있으면 그 번호를 사용 (자기소개서 문항)
  const leadingNumber = questionText.trim().match(/^(\d+)\./);
  if (leadingNumber) return leadingNumber[1];
  if (questionText.includes("지원 동기") || questionText.includes("역량")) return APPLICATION_FORM_CONFIG.questionNumbers.motivation;
  if (questionText.includes("도전") || questionText.includes("끈기")) return APPLICATION_FORM_CONFIG.questionNumbers.challenge;
  if (questionText.includes("프로젝트") || questionText.includes("탐구")) return APPLICATION_FORM_CONFIG.questionNumbers.project;
  return null;
};

// 질문 텍스트 자체가 전체 안내 문장이므로 별도 설명은 두지 않는다.
export const getLongTextDescription = (_questionText: string): string => "";
