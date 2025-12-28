import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect, type ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { 
  RECRUITMENT_SCHEDULE, 
  APPLICATION_CTA_MESSAGES, 
  TIME_UNITS,
  TIME_SEPARATOR,
  ANIMATION_CONFIG,
  CTA_STYLES,
  ROUTES,
  SECTION_STYLES,
  BUTTON_CONFIG,
  SCROLL_ANIMATION_CONFIG
} from "@/lib/constants";
import { calculateTimeLeft, type TimeLeft, TIME_CONSTANTS } from "@/lib/date-utils";

// 상수 정의
const APPLICATION_DEADLINE = import.meta.env.VITE_APPLICATION_DEADLINE || RECRUITMENT_SCHEDULE.application.deadlineISO;
const TIMER_UPDATE_INTERVAL = TIME_CONSTANTS.MS_PER_SECOND;

// 타이머 단위 컴포넌트
const TimeUnitDisplay = ({ value, label, delay }: { value: number; label: string; delay: string }) => (
  <div className={cn(
    CTA_STYLES.timer.unit.container,
    ANIMATION_CONFIG.timeUnit.fadeInDuration,
    delay
  )}>
    <div 
      className={cn(
        CTA_STYLES.timer.unit.value.base,
        ANIMATION_CONFIG.timeUnit.duration
      )}
    >
      {String(value).padStart(CTA_STYLES.padding.padStartLength, CTA_STYLES.padding.padStartChar)}
    </div>
    <div className={CTA_STYLES.timer.unit.label}>{label}</div>
  </div>
);

// 콜론 구분자 컴포넌트
const TimeSeparator = () => (
  <div className={CTA_STYLES.timer.separator}>{TIME_SEPARATOR}</div>
);

// 공통 메시지 래퍼 컴포넌트
const MessageWrapper = ({ children }: { children: ReactNode }) => (
  <div className={cn(CTA_STYLES.contentWrapper.marginBottom, ANIMATION_CONFIG.fadeIn)}>
    {children}
  </div>
);

const ApplicationCTA = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: SCROLL_ANIMATION_CONFIG.threshold });
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    isExpired: false,
  });

  useEffect(() => {
    const updateTimer = () => {
      setTimeLeft(calculateTimeLeft(APPLICATION_DEADLINE));
    };

    updateTimer();
    const interval = setInterval(updateTimer, TIMER_UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // Button 공통 props
  const commonButtonProps = {
    variant: BUTTON_CONFIG.variant.hero,
    size: BUTTON_CONFIG.size.xl,
  } as const;

  const buttonText = APPLICATION_CTA_MESSAGES.buttonText;

  return (
    <section 
      ref={ref}
      className={cn(
        CTA_STYLES.section.padding,
        CTA_STYLES.section.base,
        isVisible ? SECTION_STYLES.visibility.visible : SECTION_STYLES.visibility.hidden
      )}
    >
      <div className={CTA_STYLES.gradient.vertical} />
      <div className={CTA_STYLES.gradient.horizontal} />
      <div className={SECTION_STYLES.container.base}>
        <div className={SECTION_STYLES.textCenter}>
          {timeLeft.isExpired ? (
            <>
              <MessageWrapper>
                <p className={CTA_STYLES.title.base}>
                  {APPLICATION_CTA_MESSAGES.deadlineExpired.title}
                </p>
                <p className={CTA_STYLES.subtitle}>
                  {APPLICATION_CTA_MESSAGES.deadlineExpired.subtitle}
                </p>
              </MessageWrapper>
              <Button 
                {...commonButtonProps}
                disabled
                className={ANIMATION_CONFIG.button.disabled}
              >
                {buttonText}
              </Button>
            </>
          ) : (
            <>
              <MessageWrapper>
                <p className={CTA_STYLES.title.active}>
                  {APPLICATION_CTA_MESSAGES.deadlineActive.title}
                </p>
                <div className={cn(
                  CTA_STYLES.timerContainer.flex,
                  CTA_STYLES.timerContainer.gap,
                  CTA_STYLES.timerContainer.marginBottom
                )}>
                  {TIME_UNITS.map((unit, index) => (
                    <div key={unit.key} className={CTA_STYLES.timerContainer.item}>
                      <TimeUnitDisplay 
                        value={timeLeft[unit.key]} 
                        label={unit.label} 
                        delay={unit.delay} 
                      />
                      {index < TIME_UNITS.length - 1 && <TimeSeparator />}
                    </div>
                  ))}
                </div>
              </MessageWrapper>
              <Link to={ROUTES.apply} className={cn(CTA_STYLES.link.wrapper, ANIMATION_CONFIG.fadeIn, ANIMATION_CONFIG.linkDelay)}>
                <Button 
                  {...commonButtonProps}
                  className={ANIMATION_CONFIG.button.active}
                >
                  {buttonText}
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ApplicationCTA;

