import { useState, type CSSProperties } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { getStepStatus, type ProcessStep } from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import { RECRUITMENT_INFO, RECRUITMENT_SCHEDULE, APPLICATION_FORM_CONFIG, SECTION_STYLES, SCROLL_ANIMATION_CONFIG } from "@/lib/constants";
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

// 각 원의 그라데이션 배경 스타일 (왼쪽에서 오른쪽으로 파란색 → 보라색 → 빨간색, 파란색 비율 3:1)
// 어두운 색상 사용, 각 원 내부에 그라데이션 적용
const getStepGradient = (index: number): string => {
  const gradients = [
    "linear-gradient(to right, rgb(30 64 175), rgb(30 64 175))", // 첫 번째: 어두운 파란색 (blue-800, 단색)
    "linear-gradient(to right, rgb(30 64 175), rgb(88 28 135))", // 두 번째: 어두운 파란색 → 어두운 보라색
    "linear-gradient(to right, rgb(88 28 135), rgb(127 29 29))", // 세 번째: 어두운 보라색 → 어두운 붉은색
    "linear-gradient(to right, rgb(127 29 29), rgb(185 28 28))", // 네 번째: 어두운 붉은색 → 어두운 빨간색
  ];
  return gradients[index] || gradients[gradients.length - 1];
};

// 날짜 포맷 압축 (원 안에서 보기 좋게, 통일된 형식)
const formatDateForCircle = (fullDate: string): string[] => {
  const result: string[] = [];
  
  // 날짜 범위 처리: "2025년 12월 31일 (수) ~ 2026년 1월 4일 (일) 23:59"
  if (fullDate.includes(" ~ ")) {
    const [startPart, endPart] = fullDate.split(" ~ ");
    
    // 시작 날짜 파싱
    const startMatch = startPart.match(/(\d{4})년 (\d{1,2})월 (\d{1,2})일 \(([^)]+)\)/);
    if (startMatch) {
      const [, year, month, day, weekday] = startMatch;
      const startDate = `${year}.${month}.${day} (${weekday})`;
      
      // 종료 날짜 파싱
      const endMatch = endPart.match(/(\d{4})년 (\d{1,2})월 (\d{1,2})일 \(([^)]+)\)/) || 
                       endPart.match(/(\d{1,2})월 (\d{1,2})일 \(([^)]+)\)/);
      
      if (endMatch) {
        let endDate: string;
        if (endMatch.length === 5) {
          // 연도 포함
          const [, year, month, day, weekday] = endMatch;
          endDate = `${year}.${month}.${day} (${weekday})`;
        } else {
          // 연도 없음 (같은 연도)
          const [, month, day, weekday] = endMatch;
          const year = startMatch[1]; // 시작 연도 사용
          endDate = `${year}.${month}.${day} (${weekday})`;
        }
        
        result.push(`${startDate} ~ ${endDate}`);
        
        // 시간 정보 추출
        const timeMatch = endPart.match(/(\d{1,2}:\d{2})/);
        if (timeMatch) {
          result.push(timeMatch[1]);
        }
        
        // 추가 정보 (온라인 비대면 등)
        if (endPart.includes("온라인 비대면")) {
          result.push("온라인 비대면");
        }
      }
    }
    
    if (result.length > 0) return result;
  }
  
  // 단일 날짜 처리
  const dateMatch = fullDate.match(/(\d{4})년 (\d{1,2})월 (\d{1,2})일 \(([^)]+)\)/);
  if (dateMatch) {
    const [, year, month, day, weekday] = dateMatch;
    const dateStr = `${year}.${month}.${day} (${weekday})`;
    result.push(dateStr);
    
    // 시간 정보 추출
    const timeMatch = fullDate.match(/(\d{1,2}:\d{2})/);
    if (timeMatch) {
      result.push(timeMatch[1]);
    }
    
    // 추가 정보 처리
    if (fullDate.includes("개별 안내")) {
      result.push("개별 안내");
    } else if (fullDate.includes("온라인 비대면")) {
      result.push("온라인 비대면");
    }
    
    return result;
  }
  
  // 파싱 실패 시 원본 반환
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
  const dateParts = formatDateForCircle(step.fullDate);
  const gradientBg = getStepGradient(index);
  const ringColor = index < 3 ? "ring-blue-800/45" : "ring-red-700/45";

  return (
    <button
      onClick={onToggle}
      className={cn(
        // 원은 항상 불투명하게 둔다. 반투명이면 뒤의 연결선이 비쳐 원을 관통한 것처럼 보인다.
        "rounded-full flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden",
        isOpen && `ring-4 ${ringColor}`
      )}
      style={{ 
        width: "var(--circle-size)", 
        height: "var(--circle-size)",
        background: gradientBg
      }}
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
      <SectionHeader label="Step" title="지원 절차" labelClassName="text-blue-600" />

      {/* 데스크톱 버전 */}
      <div className="hidden md:block max-w-7xl mx-auto">
        <div className="relative" style={circleStyle}>
          {/* 연결선 - 그라데이션 (어두운 파란색 → 어두운 빨간색, 파란색 비율 3:1) */}
          <div
            className="absolute h-0.5 -z-10"
            style={{
              top: "calc(var(--circle-size) / 2)",
              left: "calc(var(--circle-size) / 2)",
              right: "calc(var(--circle-size) / 2)",
              background: "linear-gradient(to right, rgb(30 64 175 / 0.45) 0%, rgb(30 64 175 / 0.45) 33%, rgb(88 28 135 / 0.45) 66%, rgb(127 29 29 / 0.45) 100%)",
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
                <div 
                  className="w-0.5 h-8 mt-4"
                  style={{
                    background: index === 0 
                      ? "linear-gradient(to bottom, rgb(30 64 175 / 0.45), rgb(30 64 175 / 0.45))"
                      : index === 1
                      ? "linear-gradient(to bottom, rgb(30 64 175 / 0.45), rgb(88 28 135 / 0.45))"
                      : "linear-gradient(to bottom, rgb(88 28 135 / 0.45), rgb(127 29 29 / 0.45))"
                  }}
                />
                  )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RecruitmentProcess;
