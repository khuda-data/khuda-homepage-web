import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { getInterviewTimeButtonClass } from "@/lib/form-utils";
import type { FormData } from "@/hooks/useApplicationForm";
import type { Question, InterviewSchedule } from "@/lib/api";

interface InterviewDateSelectorProps {
  question: Question;
  interviewSchedule: InterviewSchedule | null;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const InterviewDateSelector = ({
  question,
  interviewSchedule,
  formData,
  setFormData,
}: InterviewDateSelectorProps) => {
  return (
    <Card key={question.id} className="relative border border-white/10 shadow-lg bg-black/70 backdrop-blur-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-blue-950/40 to-blue-600/25 rounded-lg opacity-50 pointer-events-none"></div>
      <CardHeader className="relative z-10">
        <CardTitle className="text-xl flex items-center gap-3">
          <Clock className="w-5 h-5 text-blue-600" />
          {question.question}
          {question.required && <span className="text-destructive">*</span>}
        </CardTitle>
        <CardDescription>
          면접 가능한 날짜와 시간을 모두 선택해주세요. 여러 날짜와 시간을 선택할 수 있습니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 relative z-10">
        {!interviewSchedule ? (
          <div className="p-6 rounded-xl bg-secondary/20 border border-border/40 text-center">
            <p className="text-sm text-muted-foreground">
              면접 일정을 불러올 수 없습니다.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-blue-600 rounded-full" />
                <h3 className="text-sm font-semibold text-foreground">면접 가능 날짜</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                {interviewSchedule.dates.map((date) => {
                  const handleDateClick = (e: React.MouseEvent) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const isSelected = formData.interviewDates.includes(date.value);
                    setFormData((prev) => ({
                      ...prev,
                      interviewDates: isSelected
                        ? prev.interviewDates.filter((d) => d !== date.value)
                        : [...prev.interviewDates, date.value],
                      selectedInterviewDate: !isSelected ? date.value : prev.selectedInterviewDate === date.value ? "" : prev.selectedInterviewDate,
                    }));
                  };
                  
                  return (
                    <div
                      key={date.value}
                      data-interview-select="true"
                      role="button"
                      tabIndex={0}
                      className={`group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all duration-200 min-h-[80px] sm:min-h-[100px] select-none ${
                        formData.interviewDates.includes(date.value)
                          ? "border-blue-600 bg-blue-600/10 shadow-md shadow-blue-600/10"
                          : "border-border/40 bg-secondary/10 hover:border-blue-600/40 hover:bg-secondary/20 active:scale-[0.98]"
                      }`}
                      onClick={handleDateClick}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleDateClick(e as any);
                        }
                      }}
                    >
                      <div className="pointer-events-none w-full flex flex-col items-center gap-1 sm:gap-1.5">
                        <span className={`text-sm sm:text-base font-semibold ${
                          formData.interviewDates.includes(date.value) ? "text-blue-600" : "text-foreground"
                        }`}>
                          {date.label}
                        </span>
                        <span className="text-[10px] sm:text-xs text-muted-foreground">{date.subLabel}</span>
                        {formData.interviewDates.includes(date.value) && (
                          <div className="mt-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-600 flex items-center justify-center animate-in fade-in zoom-in-95 duration-200">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {formData.selectedInterviewDate ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-blue-600 rounded-full" />
                  <h3 className="text-sm font-semibold text-foreground">
                    면접 가능 시간
                    <span className="text-xs text-muted-foreground ml-2">
                      ({formData.selectedInterviewDate} 선택 중)
                    </span>
                  </h3>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 sm:gap-2.5">
                  {interviewSchedule.times.map((time) => {
                    const currentTimes = formData.interviewTimesByDate[formData.selectedInterviewDate] || [];
                    const isSelected = currentTimes.includes(time);
                    return (
                      <div
                        key={time}
                        data-interview-select="true"
                        className={cn(getInterviewTimeButtonClass(isSelected), "min-h-[44px] sm:min-h-[48px]")}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const selectedDate = formData.selectedInterviewDate;
                          const currentTimes = formData.interviewTimesByDate[selectedDate] || [];
                          setFormData((prev) => ({
                            ...prev,
                            interviewTimesByDate: {
                              ...prev.interviewTimesByDate,
                              [selectedDate]: isSelected
                                ? currentTimes.filter((t) => t !== time)
                                : [...currentTimes, time],
                            },
                          }));
                        }}
                      >
                        <div className="pointer-events-none w-full flex flex-col items-center gap-1">
                          <span className={`text-sm font-medium ${
                            isSelected ? "text-blue-600" : "text-foreground"
                          }`}>
                            {time}
                          </span>
                          {isSelected && (
                            <CheckCircle className="w-3.5 h-3.5 text-blue-600 animate-in fade-in zoom-in-95 duration-200" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-secondary/20 border border-border/40 text-center">
                <p className="text-sm text-muted-foreground">
                  날짜를 먼저 선택해주세요
                </p>
              </div>
            )}

            {formData.interviewDates.length > 0 && Object.keys(formData.interviewTimesByDate).length > 0 && (
              <div className="pt-4 border-t border-border/50 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-start gap-2 p-4 rounded-xl bg-blue-600/5 border border-blue-600/20 transition-all duration-200 ease-out hover:bg-blue-600/10">
                  <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <div className="flex-1 space-y-3">
                    <p className="text-xs font-semibold text-foreground">선택된 일정</p>
                    <div className="space-y-2.5">
                      {formData.interviewDates.map((date, idx) => {
                        const times = formData.interviewTimesByDate[date] || [];
                        if (times.length === 0) return null;
                        return (
                          <div key={date} className="space-y-1.5 animate-in fade-in slide-in-from-left-2 duration-200" style={{ animationDelay: `${idx * 50}ms` }}>
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-4 bg-blue-600 rounded-full" />
                              <span className="text-sm font-medium text-foreground">{date}</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 pl-3">
                              {times.map((time, timeIdx) => (
                                <Badge 
                                  key={`${date}-${time}`} 
                                  variant="default" 
                                  className="text-[10px] px-2 py-0.5 rounded-md animate-in fade-in zoom-in-95 duration-200 transition-all duration-200 ease-out hover:scale-105"
                                  style={{ animationDelay: `${(idx * 50) + (timeIdx * 30)}ms` }}
                                >
                                  {time}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
