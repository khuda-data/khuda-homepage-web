import { useEffect, useState } from "react";
import { type Question } from "@/lib/api";
import { getMockQuestions } from "@/lib/mock/applicationQuestions";

const sortByPosition = (questions: Question[]): Question[] =>
  [...questions].sort((a, b) => a.position - b.position);

// 백엔드 리팩토링 중이라 질문을 프론트 mock에서 가져온다.
// 백엔드 재연결 시 useQuery(getQuestions) 방식으로 되돌린다. (이전 구현 git 이력 참고)
// 유형별 문항은 실제로는 API 호출이 일어나는 지점이라, mock에서도 잠깐 로딩 상태를 흉내 낸다.
const TYPE_LOADING_MS = 700;

export const useApplicationQuestions = (applicationType: string) => {
  const commonQuestions = sortByPosition(getMockQuestions("common"));

  const isTypeSelected = applicationType === "yb" || applicationType === "ob";
  const [isLoadingType, setIsLoadingType] = useState(false);

  // 유형 선택 시 잠깐 로딩(추후 API fetch로 대체)
  useEffect(() => {
    if (!isTypeSelected) {
      setIsLoadingType(false);
      return;
    }
    setIsLoadingType(true);
    const timer = setTimeout(() => setIsLoadingType(false), TYPE_LOADING_MS);
    return () => clearTimeout(timer);
  }, [applicationType, isTypeSelected]);

  const typeQuestions: Question[] =
    isTypeSelected && !isLoadingType ? sortByPosition(getMockQuestions(applicationType as "yb" | "ob")) : [];

  const questions = [...commonQuestions, ...typeQuestions];

  return {
    commonQuestions,
    typeQuestions,
    questions,
    isLoadingCommon: false,
    isLoadingType,
    isLoadingQuestions: isLoadingType,
  };
};
