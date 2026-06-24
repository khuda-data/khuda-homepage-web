import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RequiredMark } from "@/components/pages/Apply/RequiredMark";
import { cn } from "@/lib/utils";
import { getInterviewTimeButtonClass } from "@/lib/form-utils";
import type { Question, InterviewSchedule } from "@/lib/api";

interface InterviewDateSelectorProps {
  question: Question;
  interviewSchedule: InterviewSchedule | null;
  interviewDates: string[];
  selectedInterviewDate: string;
  interviewTimesByDate: Record<string, string[]>;
  onDateToggle: (dateValue: string) => void;
  onTimeToggle: (date: string, time: string) => void;
}

export const InterviewDateSelector = ({
  question,
  interviewSchedule,
  interviewDates,
  interviewTimesByDate,
  onDateToggle,
  onTimeToggle,
}: InterviewDateSelectorProps) => {
  const selectedDates = interviewSchedule
    ? interviewSchedule.dates.filter((d) => interviewDates.includes(d.value))
    : [];

  return (
    <Card key={question.id} className="relative rounded-2xl border border-[#E8EBED] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg font-bold text-[#191F28] flex items-center gap-2">
          {question.question}
          {question.required && <RequiredMark />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!interviewSchedule ? (
          <div className="p-6 rounded-2xl bg-[#F2F4F6] text-center">
            <p className="text-sm text-[#8B95A1]">면접 일정을 불러올 수 없습니다.</p>
          </div>
        ) : (
          <>
            {/* 날짜 선택 (토글 칩, 여러 개 선택 가능) */}
            <div className="space-y-2.5">
              <p className="text-sm font-semibold text-[#191F28]">면접 가능 날짜</p>
              <div className="flex flex-wrap gap-2">
                {interviewSchedule.dates.map((date) => {
                  const selected = interviewDates.includes(date.value);
                  return (
                    <button
                      key={date.value}
                      type="button"
                      data-interview-select="true"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onDateToggle(date.value);
                      }}
                      className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors duration-200 ${
                        selected
                          ? "border-[#3182F6] bg-[#EBF3FF] text-[#3182F6]"
                          : "border-[#E8EBED] bg-white text-[#4E5968] hover:bg-[#F9FAFB]"
                      }`}
                    >
                      {date.value}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 선택한 날짜별 시간 (날짜를 고르면 아래에 펼쳐짐) */}
            {selectedDates.length > 0 && (
              <div className="space-y-5">
                {selectedDates.map((date) => {
                  const times = interviewTimesByDate[date.value] || [];
                  return (
                    <div key={date.value} className="space-y-2.5">
                      <p className="text-sm font-semibold text-[#191F28]">
                        {date.value}
                        <span className="ml-1.5 text-xs font-medium text-[#8B95A1]">가능 시간</span>
                      </p>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                        {interviewSchedule.times.map((time) => {
                          const selected = times.includes(time);
                          return (
                            <div
                              key={time}
                              data-interview-select="true"
                              className={cn(getInterviewTimeButtonClass(selected), "min-h-[44px]")}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onTimeToggle(date.value, time);
                              }}
                            >
                              {time}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
