// 유형별 문항을 불러오는 동안 보여주는 3-dot 로딩 인터랙션
export const QuestionLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-14 animate-in fade-in duration-200">
      <div className="flex items-end gap-1.5">
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="h-2.5 w-2.5 rounded-full bg-[#191F28] animate-bounce"
            style={{ animationDelay: `${delay}ms`, animationDuration: "0.9s" }}
          />
        ))}
      </div>
      <p className="text-sm text-[#8B95A1]">질문을 불러오는 중</p>
    </div>
  );
};
