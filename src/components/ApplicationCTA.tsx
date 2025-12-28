import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

const ApplicationCTA = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    isExpired: false,
  });

  useEffect(() => {
    const deadline = new Date("2026-01-04T23:59:59");
    
    const updateTimer = () => {
      const now = new Date();
      const difference = deadline.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          isExpired: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({
        days,
        hours,
        minutes,
        isExpired: false,
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={ref}
      className={cn(
        "py-12 md:py-20 px-6 md:px-12 relative bg-background transition-all duration-1000 overflow-hidden",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/3 to-transparent pointer-events-none" />
      <div className="container mx-auto relative z-10">
        <div className="text-center">
          {!timeLeft.isExpired ? (
            <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <p className="text-sm text-muted-foreground mb-4 animate-pulse">서류 마감까지</p>
              <div className="flex justify-center items-center gap-1.5 md:gap-4 mb-6 md:mb-8">
                <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-500 delay-100">
                  <div 
                    key={timeLeft.days}
                    className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary mb-0.5 md:mb-1 transition-all duration-300 animate-in zoom-in-95 fade-in"
                    style={{ animationDuration: '0.3s' }}
                  >
                    {String(timeLeft.days).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">일</div>
                </div>
                <div className="text-xl md:text-3xl font-bold text-muted-foreground pb-3 md:pb-4 animate-pulse">:</div>
                <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-500 delay-200">
                  <div 
                    key={timeLeft.hours}
                    className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary mb-0.5 md:mb-1 transition-all duration-300 animate-in zoom-in-95 fade-in"
                    style={{ animationDuration: '0.3s' }}
                  >
                    {String(timeLeft.hours).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">시간</div>
                </div>
                <div className="text-xl md:text-3xl font-bold text-muted-foreground pb-3 md:pb-4 animate-pulse">:</div>
                <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-500 delay-300">
                  <div 
                    key={timeLeft.minutes}
                    className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary mb-0.5 md:mb-1 transition-all duration-300 animate-in zoom-in-95 fade-in"
                    style={{ animationDuration: '0.3s' }}
                  >
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">분</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <p className="text-base text-muted-foreground font-medium mb-2">서류 접수가 마감되었습니다.</p>
              <p className="text-sm text-muted-foreground">다음 기수에 지원해보세요. 기다리고 있을게요! 😊</p>
            </div>
          )}
          
          {timeLeft.isExpired ? (
            <Button 
              variant="hero" 
              size="xl" 
              disabled
              className="rounded-2xl px-8 py-6 text-lg font-semibold transition-all duration-200 opacity-50 cursor-not-allowed"
            >
              지원하기
            </Button>
          ) : (
            <Link to="/apply" className="inline-block animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
              <Button 
                variant="hero" 
                size="xl" 
                className="rounded-2xl px-8 py-6 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                지원하기
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default ApplicationCTA;

