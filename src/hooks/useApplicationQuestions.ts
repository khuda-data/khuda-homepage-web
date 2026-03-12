import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { getQuestions, type Question } from "@/lib/api";
import { filterOBQuestions } from "@/utils/questions";

const sortByPosition = (questions: Question[]): Question[] =>
  [...questions].sort((a, b) => a.position - b.position);

export const useApplicationQuestions = (applicationType: string) => {
  const { toast } = useToast();

  const {
    data: commonData,
    isLoading: isLoadingCommon,
    error: commonError,
  } = useQuery({
    queryKey: ["questions", "common"],
    queryFn: () => getQuestions("common"),
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: typeData,
    isLoading: isLoadingType,
    error: typeError,
  } = useQuery({
    queryKey: ["questions", applicationType],
    queryFn: () => getQuestions(applicationType as "yb" | "ob" | "common"),
    enabled: !!applicationType,
    staleTime: 5 * 60 * 1000,
  });

  // 에러 발생 시 토스트 알림
  useEffect(() => {
    if (commonError) {
      const message = commonError instanceof Error ? commonError.message : "질문을 가져오는데 실패했습니다.";
      toast({ title: "질문 로드 실패", description: message, variant: "destructive" });
    }
  }, [commonError, toast]);

  useEffect(() => {
    if (typeError) {
      const message = typeError instanceof Error ? typeError.message : "질문을 가져오는데 실패했습니다.";
      toast({ title: "질문 로드 실패", description: message, variant: "destructive" });
    }
  }, [typeError, toast]);

  const commonQuestions = commonData ? sortByPosition(commonData.questions) : [];

  let typeQuestions: Question[] = typeData ? sortByPosition(typeData.questions) : [];
  if (applicationType === "ob") {
    typeQuestions = filterOBQuestions(typeQuestions);
  }

  const questions = [...commonQuestions, ...typeQuestions];
  const isLoadingQuestions = isLoadingCommon || (!!applicationType && isLoadingType);

  return {
    commonQuestions,
    typeQuestions,
    questions,
    isLoadingCommon,
    isLoadingType,
    isLoadingQuestions,
  };
};
