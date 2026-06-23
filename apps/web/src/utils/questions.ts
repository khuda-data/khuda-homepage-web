// OB 지원자에게 표시하지 않을 position 범위의 질문을 필터링
export const filterOBQuestions = <T extends { position: number }>(questions: T[]): T[] => {
  return questions.filter(q => q.position < 9 || q.position > 21);
};
