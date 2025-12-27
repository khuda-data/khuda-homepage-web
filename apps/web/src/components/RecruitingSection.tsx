import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, Calendar, Users, UserPlus } from "lucide-react";
import { getStepStatus } from "@/lib/date-utils";
import { useState, useEffect } from "react";

const recruitmentInfo = [
  {
    icon: Users,
    title: "모집 대상",
    description: "경희대학교 재학생 및 휴학생",
    details: "전공 무관, 데이터분석/AI에 관심 있는 모든 분",
  },
  {
    icon: Calendar,
    title: "모집 일정",
    description: "2025년 12월 31일 (수) ~ 2026년 1월 4일 (일)",
    details: "서류 마감: 2026년 1월 4일 23:59",
  },
  {
    icon: UserPlus,
    title: "모집 인원",
    description: "트랙별 8명",
    details: "총 50명 내외",
  },
];

const processSteps = [
  { 
    step: 1, 
    title: "서류 접수", 
    date: "12.31~1.4",
    fullDate: "2025년 12월 31일 (수) ~ 2026년 1월 4일 (일) 23:59",
  },
  { 
    step: 2, 
    title: "서류 합격자 발표", 
    date: "1.7",
    fullDate: "2026년 1월 7일 (수) 18:00 이후 개별 안내",
  },
  { 
    step: 3, 
    title: "면접", 
    date: "1.9~1.11",
    fullDate: "2026년 1월 9일 (금) ~ 1월 11일 (일) 온라인 비대면",
  },
  { 
    step: 4, 
    title: "최종 합격자 발표", 
    date: "1.12",
    fullDate: "2026년 1월 12일 (월)",
  },
];

const faqs = [
  {
    question: "비전공자도 지원 가능한가요?",
    answer: "미정",
  },
  {
    question: "활동 기간과 시간은 어떻게 되나요?",
    answer: "미정",
  },
  {
    question: "트랙은 어떻게 선택하나요?",
    answer: "미정",
  },
  {
    question: "활동비가 있나요?",
    answer: "미정",
  },
  {
    question: "다른 동아리와 병행 가능한가요?",
    answer: "미정",
  },
];

const RecruitingSection = () => {
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
    <section id="recruiting" className="section-padding relative">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            모집 안내
          </h2>
          <p className="text-lg text-muted-foreground">
            KHUDA와 함께 성장할 9기 멤버를 모집합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {recruitmentInfo.map((info, index) => (
            <div
              key={index}
              className="group relative text-center rounded-2xl p-8 bg-card border border-border/50 hover:border-border transition-all duration-200"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 bg-muted/30 text-foreground transition-all duration-200">
                <info.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">{info.title}</h3>
              <p className="text-base font-medium mb-2 text-foreground leading-relaxed">{info.description}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{info.details}</p>
            </div>
          ))}
        </div>

        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-16 text-foreground">지원 절차</h3>
          <div className="relative">
            <div className="hidden md:block max-w-6xl mx-auto">
              <div className="relative pb-12">
                <div className="absolute top-10 left-0 right-0 h-0.5 bg-border/30" />
                
                <div className="relative flex items-start justify-between gap-8 px-4">
                  {processSteps.map((step, index) => {
                    const status = getStepStatus(step);
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center relative">
                        <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center mb-8 transition-all duration-200 ${
                          status === 'completed'
                            ? 'bg-primary border-2 border-primary'
                            : status === 'active'
                            ? 'bg-primary border-2 border-primary shadow-lg shadow-primary/30'
                            : 'bg-card border-2 border-border'
                        }`}>
                          {status === 'completed' ? (
                            <CheckCircle className="w-5 h-5 text-primary-foreground" />
                          ) : (
                            <span className={`text-xs font-semibold ${
                              status === 'active' ? 'text-primary-foreground' : 'text-foreground'
                            }`}>{step.step}</span>
                          )}
                        </div>
                        
                        {index < processSteps.length - 1 && (
                          <div className="absolute top-10 left-[60%] right-0 h-0.5 z-10">
                            <div className={`h-full transition-all duration-300 ${
                              getStepStatus(processSteps[index + 1]) === 'completed' || status === 'completed'
                                ? 'bg-primary/50'
                                : 'bg-border/30'
                            }`} />
                          </div>
                        )}
                        
                        <div className={`w-full rounded-2xl p-6 border transition-all duration-200 shadow-sm min-h-[140px] flex flex-col ${
                          status === 'active'
                            ? 'bg-card border-primary/50 shadow-lg shadow-primary/10'
                            : status === 'completed'
                            ? 'bg-card border-primary/50 shadow-lg shadow-primary/10'
                            : 'bg-card border-border/50'
                        } hover:border-border`}>
                          <div className="flex items-center justify-between mb-3 gap-3">
                            <h4 className={`text-base font-semibold ${
                              status === 'active' || status === 'completed' ? 'text-primary' : 'text-foreground'
                            }`}>{step.title}</h4>
                            <p className={`text-sm font-medium whitespace-nowrap ${
                              status === 'active' || status === 'completed' ? 'text-primary/80' : 'text-muted-foreground'
                            }`}>{step.date}</p>
                          </div>
                          <p className={`text-xs leading-relaxed mt-auto ${
                            status === 'active' || status === 'completed' ? 'text-foreground/90' : 'text-muted-foreground'
                          }`}>{step.fullDate}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className="md:hidden space-y-6">
              {processSteps.map((step, index) => {
                const status = getStepStatus(step);
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all duration-200 ${
                        status === 'completed'
                          ? 'bg-primary border-2 border-primary'
                          : status === 'active'
                          ? 'bg-primary border-2 border-primary shadow-lg shadow-primary/30'
                          : 'bg-card border-2 border-border'
                      }`}>
                        {status === 'completed' ? (
                          <CheckCircle className="w-4 h-4 text-primary-foreground" />
                        ) : (
                          <div className={`w-3 h-3 rounded-full ${
                            status === 'active' ? 'bg-primary-foreground' : 'bg-muted-foreground/30'
                          }`} />
                        )}
                      </div>
                      {index < processSteps.length - 1 && (
                        <div className={`w-0.5 h-full min-h-[100px] transition-all duration-300 ${
                          getStepStatus(processSteps[index + 1]) === 'completed' || status === 'completed'
                            ? 'bg-primary/50'
                            : 'bg-border'
                        }`} />
                      )}
                    </div>
                    <div className={`flex-1 rounded-2xl p-6 border transition-all duration-200 min-h-[140px] flex flex-col ${
                      status === 'active'
                        ? 'bg-card border-primary/50 shadow-lg shadow-primary/10'
                        : status === 'completed'
                        ? 'bg-card border-primary/50 shadow-lg shadow-primary/10'
                        : 'bg-card border-border/50'
                    }`}>
                      <div className="flex items-center justify-between mb-3 gap-3">
                        <h4 className={`text-base font-semibold ${
                          status === 'active' || status === 'completed' ? 'text-primary' : 'text-foreground'
                        }`}>{step.title}</h4>
                        <p className={`text-sm font-medium whitespace-nowrap ${
                          status === 'active' || status === 'completed' ? 'text-primary/80' : 'text-muted-foreground'
                        }`}>{step.date}</p>
                      </div>
                      <p className={`text-xs leading-relaxed mt-auto ${
                        status === 'active' || status === 'completed' ? 'text-foreground/90' : 'text-muted-foreground'
                      }`}>{step.fullDate}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-foreground">자주 묻는 질문</h3>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border-0 rounded-2xl bg-card border border-border/50 overflow-hidden transition-all duration-200 hover:border-border"
              >
                <AccordionTrigger className="text-left hover:no-underline px-6 py-5 text-foreground font-medium transition-colors">
                  <span>{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center">
          {!timeLeft.isExpired ? (
            <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <p className="text-sm text-muted-foreground mb-4 animate-pulse">서류 마감까지</p>
              <div className="flex justify-center items-center gap-2 md:gap-4 mb-8">
                <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-500 delay-100">
                  <div 
                    key={timeLeft.days}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1 transition-all duration-300 animate-in zoom-in-95 fade-in"
                    style={{ animationDuration: '0.3s' }}
                  >
                    {String(timeLeft.days).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">일</div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-muted-foreground pb-4 animate-pulse">:</div>
                <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-500 delay-200">
                  <div 
                    key={timeLeft.hours}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1 transition-all duration-300 animate-in zoom-in-95 fade-in"
                    style={{ animationDuration: '0.3s' }}
                  >
                    {String(timeLeft.hours).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">시간</div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-muted-foreground pb-4 animate-pulse">:</div>
                <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-500 delay-300">
                  <div 
                    key={timeLeft.minutes}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1 transition-all duration-300 animate-in zoom-in-95 fade-in"
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

export default RecruitingSection;
