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

export const getQuestionIcon = (_questionText: string): null => {
  return null;
};

export const getQuestionNumber = (questionText: string): string | null => {
  if (questionText.includes("지원 동기") || questionText.includes("역량")) return APPLICATION_FORM_CONFIG.questionNumbers.motivation;
  if (questionText.includes("도전") || questionText.includes("끈기")) return APPLICATION_FORM_CONFIG.questionNumbers.challenge;
  if (questionText.includes("프로젝트") || questionText.includes("탐구")) return APPLICATION_FORM_CONFIG.questionNumbers.project;
  return null;
};

export const getLongTextDescription = (questionText: string): string => {
  if (questionText.includes("지원 동기") || questionText.includes("역량")) {
    return "KHUDA에 지원한 이유와 자기가 가지고 있는 역량을 바탕으로 쿠다에서 어떠한 장점을 발휘할 수 있는지 서술해주세요.";
  }
  if (questionText.includes("도전") || questionText.includes("끈기")) {
    return "힘들었거나 끈기있게 무언가를 수행해 본 경험이 있다면 서술해주세요.";
  }
  if (questionText.includes("프로젝트") || questionText.includes("탐구")) {
    return "자신이 했던 프로젝트나, 탐구했던 경험이 있다면 서술해주세요.";
  }
  return "";
};
