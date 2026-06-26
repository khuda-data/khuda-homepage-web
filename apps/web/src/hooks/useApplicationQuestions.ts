import { useEffect, useState } from "react";
import { getQuestions, type Question } from "@/lib/api";

const sortByPosition = (questions: Question[]): Question[] =>
  [...questions].sort((a, b) => a.position - b.position);

// 공통 문항은 마운트 시 한 번, 유형 문항은 유형 선택 시 백엔드에서 조회한다.
export const useApplicationQuestions = (applicationType: string) => {
  const [commonQuestions, setCommonQuestions] = useState<Question[]>([]);
  const [typeQuestions, setTypeQuestions] = useState<Question[]>([]);
  const [isLoadingCommon, setIsLoadingCommon] = useState(true);
  const [isLoadingType, setIsLoadingType] = useState(false);

  const isTypeSelected = applicationType === "yb" || applicationType === "ob";

  // 공통 문항 (마운트 시 1회)
  useEffect(() => {
    let active = true;
    setIsLoadingCommon(true);
    getQuestions("common")
      .then((res) => {
        if (active) setCommonQuestions(sortByPosition(res.questions));
      })
      .catch((error) => {
        console.error("공통 문항 조회 실패", error);
        if (active) setCommonQuestions([]);
      })
      .finally(() => {
        if (active) setIsLoadingCommon(false);
      });
    return () => {
      active = false;
    };
  }, []);

  // 유형 문항 (유형 선택 시)
  useEffect(() => {
    if (!isTypeSelected) {
      setTypeQuestions([]);
      setIsLoadingType(false);
      return;
    }
    let active = true;
    setIsLoadingType(true);
    getQuestions(applicationType as "yb" | "ob")
      .then((res) => {
        if (active) setTypeQuestions(sortByPosition(res.questions));
      })
      .catch((error) => {
        console.error("유형 문항 조회 실패", error);
        if (active) setTypeQuestions([]);
      })
      .finally(() => {
        if (active) setIsLoadingType(false);
      });
    return () => {
      active = false;
    };
  }, [applicationType, isTypeSelected]);

  const questions = [...commonQuestions, ...typeQuestions];

  return {
    commonQuestions,
    typeQuestions,
    questions,
    isLoadingCommon,
    isLoadingType,
    isLoadingQuestions: isLoadingCommon || isLoadingType,
  };
};
