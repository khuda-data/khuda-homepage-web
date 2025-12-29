import { CheckCircle, Calendar, Users, UserPlus, Info } from "lucide-react";
import { getStepStatus, type ProcessStep } from "@/lib/date-utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { RECRUITMENT_INFO, RECRUITMENT_SCHEDULE, SECTION_STYLES, RECRUITMENT_STYLES, SCROLL_ANIMATION_CONFIG, APPLICATION_FORM_CONFIG } from "@/lib/constants";

// 모집 정보 배열 (상수)
const RECRUITMENT_INFO_ITEMS = [
  {
    icon: Users,
    title: RECRUITMENT_INFO.infoItems.target.title,
    description: RECRUITMENT_INFO.target,
    details: RECRUITMENT_INFO.targetDetails,
  },
  {
    icon: Calendar,
    title: RECRUITMENT_INFO.infoItems.schedule.title,
    description: RECRUITMENT_SCHEDULE.application.dateRange(RECRUITMENT_SCHEDULE.application.start, RECRUITMENT_SCHEDULE.application.end),
    details: RECRUITMENT_SCHEDULE.application.deadlineWithLabel(RECRUITMENT_INFO.deadlineLabel, RECRUITMENT_SCHEDULE.application.deadline),
  },
  {
    icon: UserPlus,
    title: RECRUITMENT_INFO.infoItems.capacity.title,
    description: RECRUITMENT_INFO.trackCapacityText,
    details: RECRUITMENT_INFO.totalCapacityText,
  },
] as const;

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

const RecruitingSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: SCROLL_ANIMATION_CONFIG.threshold });

  // 공통 그라데이션 배경 컴포넌트
  const GradientBackground = () => (
    <div className={RECRUITMENT_STYLES.process.stepCard.gradient} />
  );

  // 스텝 카드 스타일 클래스 생성 함수
  const getStepCardClass = (status: ReturnType<typeof getStepStatus>) => {
    const baseClass = RECRUITMENT_STYLES.process.stepCard.base;
    if (status === 'active' || status === 'completed') {
      return cn(baseClass, RECRUITMENT_STYLES.process.stepCard.active);
    }
    return cn(baseClass, RECRUITMENT_STYLES.process.stepCard.inactive);
  };

  // 스텝 인디케이터 스타일 클래스 생성 함수
  const getStepIndicatorClass = (status: ReturnType<typeof getStepStatus>, isMobile = false) => {
    const baseClass = isMobile 
      ? RECRUITMENT_STYLES.process.indicator.base.mobile
      : RECRUITMENT_STYLES.process.indicator.base.desktop;
    
    if (status === 'completed') {
      return cn(baseClass, RECRUITMENT_STYLES.process.indicator.completed);
    } else if (status === 'active') {
      return cn(baseClass, RECRUITMENT_STYLES.process.indicator.active);
    }
    return cn(baseClass, RECRUITMENT_STYLES.process.indicator.inactive);
  };

  // 스텝 상태 계산 함수 (중복 제거)
  const getStepStatuses = (index: number) => {
    const status = getStepStatus(PROCESS_STEPS[index]);
    const nextStatus = index < PROCESS_STEPS.length - 1 ? getStepStatus(PROCESS_STEPS[index + 1]) : null;
    const isCompleted = status === 'completed' || nextStatus === 'completed';
    const isActive = status === 'active' || status === 'completed';
    return { status, nextStatus, isCompleted, isActive };
  };

  // 스텝 인디케이터 렌더링 컴포넌트 (중복 제거)
  const StepIndicator = ({ 
    status, 
    stepNumber, 
    isMobile = false 
  }: { 
    status: ReturnType<typeof getStepStatus>; 
    stepNumber: number; 
    isMobile?: boolean;
  }) => (
    <div className={cn(
      isMobile ? RECRUITMENT_STYLES.layout.mobileProcess.indicatorWrapper : RECRUITMENT_STYLES.layout.desktopProcess.indicatorWrapper,
      getStepIndicatorClass(status, isMobile)
    )}>
      {status === 'completed' ? (
        <CheckCircle className={cn(
          isMobile ? RECRUITMENT_STYLES.process.indicator.icon.mobile : RECRUITMENT_STYLES.process.indicator.icon.desktop,
          RECRUITMENT_STYLES.colors.primaryForeground
        )} />
      ) : isMobile ? (
        <div className={cn(
          RECRUITMENT_STYLES.process.indicator.dot.mobile,
          status === 'active' ? RECRUITMENT_STYLES.colors.bgPrimaryForeground : RECRUITMENT_STYLES.colors.bgMutedForeground
        )} />
      ) : (
        <span className={cn(
          RECRUITMENT_STYLES.text.stepNumber,
          status === 'active' ? RECRUITMENT_STYLES.text.stepNumberActive : RECRUITMENT_STYLES.text.stepNumberInactive
        )}>{stepNumber}</span>
      )}
    </div>
  );

  // 안내 메시지 렌더링 컴포넌트 (공통)
  const NoticeMessage = ({ 
    message, 
    isActive, 
    isMobile = false 
  }: { 
    message: string; 
    isActive: boolean; 
    isMobile?: boolean;
  }) => (
    <div className="mt-3 pt-3 border-t border-border/30">
      <div className="flex items-start gap-2">
        <Info className="w-3.5 h-3.5 text-primary/70 mt-0.5 shrink-0" />
        <p className={cn(
          isMobile ? "text-xs" : "text-xs md:text-sm",
          "leading-relaxed",
          isActive ? RECRUITMENT_STYLES.process.content.fullDate.active : RECRUITMENT_STYLES.process.content.fullDate.inactive
        )}>
          {message}
        </p>
      </div>
    </div>
  );

  // 스텝 콘텐츠 렌더링 컴포넌트 (중복 제거)
  const StepContent = ({ 
    step, 
    isActive, 
    isMobile = false 
  }: { 
    step: ProcessStep; 
    isActive: boolean; 
    isMobile?: boolean;
  }) => {
    // 안내 메시지 결정
    let noticeMessage: string | null = null;
    if (step.step === 3) {
      noticeMessage = APPLICATION_FORM_CONFIG.obInterviewNotice.description;
    } else if (step.step === 4) {
      noticeMessage = RECRUITMENT_SCHEDULE.final.ot;
    }

    return (
      <>
        {isActive && <GradientBackground />}
        <div className={isMobile ? RECRUITMENT_STYLES.layout.mobileProcess.contentWrapper : RECRUITMENT_STYLES.layout.desktopProcess.contentWrapper}>
          <div className={RECRUITMENT_STYLES.process.content.header.container}>
            <h4 className={cn(
              isMobile ? RECRUITMENT_STYLES.process.content.mobile.title : RECRUITMENT_STYLES.process.content.header.title.base,
              isActive ? RECRUITMENT_STYLES.process.content.header.title.active : RECRUITMENT_STYLES.process.content.header.title.inactive
            )}>{step.title}</h4>
            <p className={cn(
              RECRUITMENT_STYLES.process.content.header.date.base,
              isActive ? RECRUITMENT_STYLES.process.content.header.date.active : RECRUITMENT_STYLES.process.content.header.date.inactive
            )}>{step.date}</p>
          </div>
          <p className={cn(
            isMobile ? RECRUITMENT_STYLES.process.content.mobile.fullDate : RECRUITMENT_STYLES.process.content.fullDate.base,
            isActive ? RECRUITMENT_STYLES.process.content.fullDate.active : RECRUITMENT_STYLES.process.content.fullDate.inactive
          )}>{step.fullDate}</p>
          {noticeMessage && (
            <NoticeMessage 
              message={noticeMessage} 
              isActive={isActive} 
              isMobile={isMobile} 
            />
          )}
        </div>
      </>
    );
  };

  return (
    <section 
      id={RECRUITMENT_STYLES.sectionId} 
      ref={ref}
      className={cn(
        SECTION_STYLES.section.base,
        isVisible ? SECTION_STYLES.visibility.visible : SECTION_STYLES.visibility.hidden
      )}
    >
      <div className={RECRUITMENT_STYLES.layout.container}>
        <div className={SECTION_STYLES.header.container}>
          <h2 className={SECTION_STYLES.header.title}>
            {RECRUITMENT_INFO.sectionTitle}
          </h2>
          <p className={SECTION_STYLES.header.subtitle}>
            {RECRUITMENT_INFO.sectionSubtitle(RECRUITMENT_INFO.generation)}
          </p>
        </div>

        <div className={cn(RECRUITMENT_STYLES.process.grid.desktop)}>
          {RECRUITMENT_INFO_ITEMS.map((info, index) => (
            <div
              key={index}
              className={cn(RECRUITMENT_STYLES.infoCard.base, RECRUITMENT_STYLES.infoCard.padding)}
            >
              <div className={RECRUITMENT_STYLES.infoCard.gradient} />
              <div className={RECRUITMENT_STYLES.layout.infoCardContent}>
                <div className={RECRUITMENT_STYLES.infoCard.icon.container}>
                  <info.icon className={RECRUITMENT_STYLES.infoCard.icon.size} />
                </div>
                <h3 className={RECRUITMENT_STYLES.infoCard.title}>{info.title}</h3>
                <p className={RECRUITMENT_STYLES.infoCard.description}>{info.description}</p>
                <p className={RECRUITMENT_STYLES.infoCard.details}>{info.details}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={RECRUITMENT_STYLES.process.container}>
          <h3 className={RECRUITMENT_STYLES.section.header.title}>
            {RECRUITMENT_INFO.processTitle}
          </h3>
          <div className={RECRUITMENT_STYLES.layout.relative}>
            <div className={RECRUITMENT_STYLES.layout.desktopProcess.wrapper}>
              <div className={RECRUITMENT_STYLES.layout.desktopProcess.inner}>
                <div className={RECRUITMENT_STYLES.process.line.desktop.horizontal} />
                
                <div className={cn(RECRUITMENT_STYLES.layout.desktopProcess.steps, RECRUITMENT_STYLES.spacing.gap.large)}>
                  {PROCESS_STEPS.map((step, index) => {
                    const { status, isCompleted, isActive } = getStepStatuses(index);
                    
                    return (
                      <div key={index} className={RECRUITMENT_STYLES.layout.desktopProcess.stepCard}>
                        <StepIndicator status={status} stepNumber={step.step} isMobile={false} />
                        
                        {index < PROCESS_STEPS.length - 1 && (
                          <div className={RECRUITMENT_STYLES.process.line.desktop.connector}>
                            <div className={cn(
                              RECRUITMENT_STYLES.layout.desktopProcess.connector,
                              isCompleted ? RECRUITMENT_STYLES.process.line.active : RECRUITMENT_STYLES.process.line.inactive
                            )} />
                          </div>
                        )}
                        
                        <div className={cn(RECRUITMENT_STYLES.layout.fullWidth, RECRUITMENT_STYLES.process.stepCard.padding.desktop, getStepCardClass(status))}>
                          <StepContent step={step} isActive={isActive} isMobile={false} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className={RECRUITMENT_STYLES.layout.mobileProcess.wrapper}>
              {PROCESS_STEPS.map((step, index) => {
                const { status, isCompleted, isActive } = getStepStatuses(index);
                
                return (
                  <div key={index} className={RECRUITMENT_STYLES.spacing.gap.mobile}>
                    <div className={RECRUITMENT_STYLES.layout.mobileProcess.stepContainer}>
                      <StepIndicator status={status} stepNumber={step.step} isMobile={true} />
                      {index < PROCESS_STEPS.length - 1 && (
                        <div className={cn(
                          RECRUITMENT_STYLES.process.line.mobile.vertical,
                          isCompleted ? RECRUITMENT_STYLES.process.line.active : RECRUITMENT_STYLES.colors.bgBorder
                        )} />
                      )}
                    </div>
                    <div className={cn(RECRUITMENT_STYLES.layout.mobileProcess.stepCard, RECRUITMENT_STYLES.process.stepCard.padding.mobile, getStepCardClass(status))}>
                      <StepContent step={step} isActive={isActive} isMobile={true} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruitingSection;
