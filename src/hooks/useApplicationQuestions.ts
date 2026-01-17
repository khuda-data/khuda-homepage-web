import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { getQuestions, type Question } from "@/lib/api";
import { filterOBQuestions } from "@/lib/constants";

export const useApplicationQuestions = (applicationType: string) => {
  const { toast } = useToast();
  const [commonQuestions, setCommonQuestions] = useState<Question[]>([]);
  const [typeQuestions, setTypeQuestions] = useState<Question[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  useEffect(() => {
    const fetchCommonQuestions = async () => {
      setIsLoadingQuestions(true);
      try {
        const response = await getQuestions("common");
        const sortedQuestions = response.questions.sort((a, b) => a.position - b.position);
        setCommonQuestions(sortedQuestions);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "질문을 가져오는데 실패했습니다.";
        toast({
          title: "질문 로드 실패",
          description: errorMessage,
          variant: "destructive",
        });
        setCommonQuestions([]);
      } finally {
        setIsLoadingQuestions(false);
      }
    };

    fetchCommonQuestions();
  }, [toast]);

  useEffect(() => {
    const fetchTypeQuestions = async () => {
      if (!applicationType) {
        setTypeQuestions([]);
        return;
      }

      setIsLoadingQuestions(true);
      try {
        const response = await getQuestions(applicationType as "yb" | "ob" | "common");
        let sortedQuestions = response.questions.sort((a, b) => a.position - b.position);
        
        if (applicationType === "ob") {
          sortedQuestions = filterOBQuestions(sortedQuestions);
        }
        
        setTypeQuestions(sortedQuestions);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "질문을 가져오는데 실패했습니다.";
        toast({
          title: "질문 로드 실패",
          description: errorMessage,
          variant: "destructive",
        });
        setTypeQuestions([]);
      } finally {
        setIsLoadingQuestions(false);
      }
    };

    fetchTypeQuestions();
  }, [applicationType, toast]);

  const questions = [...commonQuestions, ...typeQuestions];

  return {
    commonQuestions,
    typeQuestions,
    questions,
    isLoadingQuestions,
  };
};
