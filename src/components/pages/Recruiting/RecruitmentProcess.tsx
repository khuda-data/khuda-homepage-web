import { useState, type CSSProperties } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { getStepStatus, type ProcessStep } from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import { RECRUITMENT_INFO, RECRUITMENT_SCHEDULE, APPLICATION_FORM_CONFIG, SECTION_STYLES, SCROLL_ANIMATION_CONFIG } from "@/lib/constants";
import { Info } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

// 프로세스 스텝 배열 (상수)
const PROCESS_STEPS: ProcessStep[] = [
  { 
    step: 1, 
    title: RECRUITMENT_INFO.processSteps.application, 
    date: RECRUITMENT_SCHEDULE.application.short,
    fullDate: RECRUITMENT_SCHEDULE.application.full,
  },
  { 
    step: 2, 
    title: RECRUITMENT_INFO.processSteps.announcement, 
    date: RECRUITMENT_SCHEDULE.announcement.short,
    fullDate: RECRUITMENT_SCHEDULE.announcement.full,
  },
  { 
    step: 3, 
    title: RECRUITMENT_INFO.processSteps.interview, 
    date: RECRUITMENT_SCHEDULE.interview.short,
    fullDate: RECRUITMENT_SCHEDULE.interview.full,
  },
  { 
    step: 4, 
    title: RECRUITMENT_INFO.processSteps.final, 
    date: RECRUITMENT_SCHEDULE.final.short,
    fullDate: RECRUITMENT_SCHEDULE.final.full,
  },
];

// 단일 색상
const STEP_COLOR = "bg-blue-500";

// 안내 메시지 가져오기
const getNoticeMessage = (step: ProcessStep): string | null => {
  const noticeMap: Record<number, string> = {
    1: APPLICATION_FORM_CONFIG.applicationNotice.description,
    2: APPLICATION_FORM_CONFIG.announcementNotice.description,
    3: APPLICATION_FORM_CONFIG.interviewNotice.description,
    4: RECRUITMENT_SCHEDULE.final.ot,
  };
  return noticeMap[step.step] || null;
};

// 날짜 포맷 압축 (원 안에서 보기 좋게)
const formatDateForCircle = (fullDate: string): string[] => {
  // 날짜 범위 처리: "2025년 12월 31일 (수) ~ 2026년 1월 4일 (일) 23:59"
  if (fullDate.includes(" ~ ")) {
    const [startPart, endPart] = fullDate.split(" ~ ");
    const startDate = startPart
      .replace(/년/g, ".")
      .replace(/월/g, ".")
      .replace(/일.*$/, "");
    const endDate = endPart
      .replace(/년/g, ".")
      .replace(/월/g, ".")
      .replace(/일.*$/, "")
      .trim();
    const timePart = endPart.match(/\d{1,2}:\d{2}/)?.[0];
    if (timePart) {
      return [`${startDate} ~ ${endDate}`, timePart];
    }
    return [`${startDate} ~ ${endDate}`];
  }
  
  // 단일 날짜 처리
  const dateMatch = fullDate.match(/(\d{4})년 (\d{1,2})월 (\d{1,2})일 \(([^)]+)\)/);
  if (dateMatch) {
    const [, year, month, day, weekday] = dateMatch;
    const dateStr = `${year}.${month}.${day} (${weekday})`;
    const timeMatch = fullDate.match(/(\d{1,2}:\d{2})/);
    const extraInfo = fullDate.includes("개별 안내") 
      ? fullDate.match(/18:00 이후 개별 안내/)?.[0] || "개별 안내"
      : fullDate.includes("온라인") 
      ? "온라인 비대면"
      : "";
    
    if (timeMatch && extraInfo) {
      return [dateStr, extraInfo];
    }
    if (timeMatch) {
      return [dateStr, timeMatch[1]];
    }
    if (extraInfo) {
      return [dateStr, extraInfo];
    }
    return [dateStr];
  }
  
  return [fullDate];
};

interface StepCircleProps {
  step: ProcessStep;
  index: number;
  isOpen: boolean;
  isActive: boolean;
  isCompleted: boolean;
  onToggle: () => void;
}

const StepCircle = ({ step, index, isOpen, isActive, isCompleted, onToggle }: StepCircleProps) => {
  const noticeMessage = getNoticeMessage(step);
  const dateParts = formatDateForCircle(step.fullDate);

  return (
    <button
      onClick={onToggle}
      className={cn(
        "rounded-full flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden",
        STEP_COLOR,
        isActive || isCompleted ? "shadow-lg shadow-blue-500/20" : "opacity-90",
        isOpen && "ring-4 ring-blue-500/30"
      )}
      style={{ width: "var(--circle-size)", height: "var(--circle-size)" }}
      aria-expanded={isOpen}
    >
      {/* 닫힌 상태 */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center text-center px-3 z-10 transition-all duration-300",
          isOpen ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
        )}
      >
        <p className="text-sm sm:text-base md:text-lg font-bold text-white leading-tight">
          {step.title}
        </p>
        <p className="text-xs sm:text-sm text-white/90 mt-1.5 leading-tight">
          {step.date}
        </p>
        <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* 열린 상태 */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center text-center px-3 py-2 z-10 transition-all duration-300",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        <div className="space-y-1">
          {dateParts.map((part, i) => (
            <p
              key={i}
              className={cn(
                "text-[10px] sm:text-xs text-white/90 leading-tight transition-all duration-300",
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              )}
              style={{ transitionDelay: isOpen ? `${i * 50}ms` : "0ms" }}
            >
              {part}
            </p>
          ))}
        </div>
        {noticeMessage && (
          <div
            className={cn(
              "pt-2.5 mt-2.5 border-t border-white/30 transition-all duration-300",
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            )}
            style={{ transitionDelay: isOpen ? `${dateParts.length * 50}ms` : "0ms" }}
          >
            <div className="flex items-start gap-1.5 justify-center">
              <Info className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/80 mt-0.5 shrink-0" />
              <p className="text-[9px] sm:text-[10px] text-white/80 leading-tight text-center">
                {noticeMessage}
              </p>
            </div>
          </div>
        )}
      </div>
    </button>
  );
};

const RecruitmentProcess = () => {
  const [openSteps, setOpenSteps] = useState<Set<number>>(new Set());
  const { ref, isVisible } = useScrollAnimation({ threshold: SCROLL_ANIMATION_CONFIG.threshold });

  const toggleStep = (stepNumber: number) => {
    setOpenSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepNumber)) {
        newSet.delete(stepNumber);
      } else {
        newSet.add(stepNumber);
      }
      return newSet;
    });
  };

  const getStepStatuses = (index: number) => {
    const status = getStepStatus(PROCESS_STEPS[index]);
    const isCompleted = status === 'completed';
    const isActive = status === 'active' || status === 'completed';
    return { isCompleted, isActive };
  };

  const circleStyle = {
    "--circle-size": "clamp(9.5rem, 13vw, 12.5rem)",
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={cn(
        "w-full py-12 sm:py-16 md:py-20 lg:py-24 transition-all duration-1000 ease-out",
        isVisible ? SECTION_STYLES.visibility.visible : SECTION_STYLES.visibility.hidden
      )}
    >
      {/* 헤더 */}
      <SectionHeader label="Step" title="지원 절차" />

      {/* 데스크톱 버전 */}
      <div className="hidden md:block max-w-7xl mx-auto">
        <div className="relative" style={circleStyle}>
          {/* 연결선 */}
          <div
            className="absolute h-0.5 bg-blue-500/30 -z-10"
            style={{
              top: "calc(var(--circle-size) / 2)",
              left: "calc(var(--circle-size) / 2)",
              right: "calc(var(--circle-size) / 2)",
            }}
          />

          {/* 스텝들 */}
          <div className="relative flex items-start justify-between gap-6">
              {PROCESS_STEPS.map((step, index) => {
              const { isCompleted, isActive } = getStepStatuses(index);
                return (
                <div key={index} className="flex-1 flex flex-col items-center relative z-10">
                  <StepCircle
                    step={step}
                    index={index}
                    isOpen={openSteps.has(step.step)}
                    isActive={isActive}
                    isCompleted={isCompleted}
                    onToggle={() => toggleStep(step.step)}
                  />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
      {/* 모바일 버전 */}
      <div className="md:hidden space-y-6" style={circleStyle}>
          {PROCESS_STEPS.map((step, index) => {
          const { isCompleted, isActive } = getStepStatuses(index);
            return (
            <div key={index} className="flex flex-col items-center">
              <StepCircle
                step={step}
                index={index}
                isOpen={openSteps.has(step.step)}
                isActive={isActive}
                isCompleted={isCompleted}
                onToggle={() => toggleStep(step.step)}
              />
                  {index < PROCESS_STEPS.length - 1 && (
                <div className="w-0.5 h-8 bg-blue-500/30 mt-4" />
                  )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RecruitmentProcess;
