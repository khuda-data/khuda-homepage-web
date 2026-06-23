import type { Application } from "@/types/application";
import { SECTIONS } from "@/types/application";

// 백엔드 미준비 상태에서 화면 구동용 mock 데이터.
// 실제 연동 시 src/features/applications/api.ts 의 fetch 함수만 교체한다.

const basic = (major: string, grade: string) => [
  { questionId: 1, section: SECTIONS.basic, question: "학과", answer: major },
  { questionId: 2, section: SECTIONS.basic, question: "학년", answer: grade },
];

const common = (motivation: string, intro: string) => [
  { questionId: 10, section: SECTIONS.common, question: "지원 동기를 작성해주세요.", answer: motivation },
  { questionId: 11, section: SECTIONS.common, question: "자신을 자유롭게 소개해주세요.", answer: intro },
];

const ybType = (exp: string, plan: string) => [
  { questionId: 20, section: SECTIONS.type, question: "프로그래밍 또는 데이터 분석 경험이 있나요?", answer: exp },
  { questionId: 21, section: SECTIONS.type, question: "활동 기간 동안의 학습 계획을 알려주세요.", answer: plan },
];

const obType = (project: string, contribution: string) => [
  { questionId: 30, section: SECTIONS.type, question: "이전 프로젝트 경험을 설명해주세요.", answer: project },
  { questionId: 31, section: SECTIONS.type, question: "트랙에서 어떤 기여를 할 수 있나요?", answer: contribution },
];

export const mockApplications: Application[] = [
  {
    id: "app-001",
    name: "김도현",
    phone: "010-1234-5678",
    applicationType: "yb",
    track: "NLP",
    submittedAt: "2026-06-20T14:22:00+09:00",
    answers: [
      ...basic("컴퓨터공학과", "2학년"),
      ...common("자연어 처리에 관심이 많아 기초부터 제대로 배우고 싶어 지원했습니다.", "새로운 것을 배우는 데 거리낌이 없고 꾸준함이 강점입니다."),
      ...ybType("파이썬 기초와 간단한 크롤링 경험이 있습니다.", "방학 세션을 성실히 따라가며 토이 프로젝트까지 완주하는 것이 목표입니다."),
    ],
    interviewTimes: ["2026-06-28 14:00", "2026-06-28 14:20"],
  },
  {
    id: "app-002",
    name: "이서연",
    phone: "010-2345-6789",
    applicationType: "ob",
    track: "CV",
    submittedAt: "2026-06-21T09:05:00+09:00",
    answers: [
      ...basic("산업경영공학과", "3학년"),
      ...common("실전 프로젝트로 컴퓨터 비전 역량을 키우고 싶어 지원했습니다.", "협업 경험이 많고 일정 관리를 잘합니다."),
      ...obType("객체 탐지 모델로 주차 위반 탐지 프로젝트를 진행했습니다.", "프로젝트 리딩과 모델 학습 파이프라인 구성을 도울 수 있습니다."),
    ],
    interviewTimes: ["2026-06-29 16:00"],
  },
  {
    id: "app-003",
    name: "박지훈",
    phone: "010-3456-7890",
    applicationType: "yb",
    track: "데이터 엔지니어링",
    submittedAt: "2026-06-21T18:47:00+09:00",
    answers: [
      ...basic("소프트웨어융합학과", "1학년"),
      ...common("데이터 파이프라인을 다뤄보고 싶어 지원했습니다.", "끈기 있게 문제를 파고드는 편입니다."),
      ...ybType("SQL 기초를 독학했습니다.", "기초 세션을 따라가며 데이터 적재 흐름을 이해하는 것이 목표입니다."),
    ],
    interviewTimes: ["2026-06-28 18:00", "2026-06-28 18:20"],
  },
  {
    id: "app-004",
    name: "최유진",
    phone: "010-4567-8901",
    applicationType: "ob",
    track: "금융 AI",
    submittedAt: "2026-06-22T11:30:00+09:00",
    answers: [
      ...basic("경제학과", "4학년"),
      ...common("금융 데이터 분석 경험을 심화하고 싶어 지원했습니다.", "통계와 도메인 지식을 함께 갖추고 있습니다."),
      ...obType("주가 예측 모델링 캐글 대회에 참여했습니다.", "금융 도메인 해석과 피처 엔지니어링에 기여할 수 있습니다."),
    ],
    interviewTimes: ["2026-06-30 10:00"],
  },
  {
    id: "app-005",
    name: "정민서",
    phone: "010-5678-9012",
    applicationType: "yb",
    track: "AI 엔지니어링",
    submittedAt: "2026-06-22T20:15:00+09:00",
    answers: [
      ...basic("전자공학과", "2학년"),
      ...common("모델을 직접 배포해보는 경험을 쌓고 싶어 지원했습니다.", "손으로 만들어보는 것을 좋아합니다."),
      ...ybType("아두이노와 파이썬을 다뤄봤습니다.", "세션 내용을 작은 서비스로 구현해보고 싶습니다."),
    ],
    interviewTimes: ["2026-06-29 13:00", "2026-06-29 13:20", "2026-06-29 13:40"],
  },
  {
    id: "app-006",
    name: "한예린",
    phone: "010-6789-0123",
    applicationType: "ob",
    track: "데이터베이스",
    submittedAt: "2026-06-23T08:40:00+09:00",
    answers: [
      ...basic("응용수학과", "3학년"),
      ...common("대규모 데이터 모델링을 경험하고 싶어 지원했습니다.", "꼼꼼하게 설계하는 것을 선호합니다."),
      ...obType("학내 동아리 관리 시스템 DB를 설계했습니다.", "스키마 설계와 쿼리 최적화를 도울 수 있습니다."),
    ],
    interviewTimes: ["2026-06-30 15:00"],
  },
  {
    id: "app-007",
    name: "오준영",
    phone: "010-7890-1234",
    applicationType: "yb",
    track: "CV",
    submittedAt: "2026-06-23T22:05:00+09:00",
    answers: [
      ...basic("기계공학과", "1학년"),
      ...common("이미지 인식 기술을 배우고 싶어 지원했습니다.", "성실하게 출석하고 과제를 빠뜨리지 않습니다."),
      ...ybType("코딩 입문 강의를 수강한 정도입니다.", "기초부터 차근차근 따라가 첫 모델을 학습시켜보고 싶습니다."),
    ],
    interviewTimes: ["2026-06-28 15:00"],
  },
  {
    id: "app-008",
    name: "장하늘",
    phone: "010-8901-2345",
    applicationType: "ob",
    track: "NLP",
    submittedAt: "2026-06-24T07:12:00+09:00",
    answers: [
      ...basic("국어국문학과", "4학년"),
      ...common("언어 데이터와 모델을 함께 다루고 싶어 지원했습니다.", "텍스트 데이터 전처리에 강점이 있습니다."),
      ...obType("뉴스 댓글 감성 분석 프로젝트를 진행했습니다.", "데이터 라벨링 기준 수립과 전처리에 기여할 수 있습니다."),
    ],
    interviewTimes: ["2026-06-30 11:00", "2026-06-30 11:20"],
  },
];
