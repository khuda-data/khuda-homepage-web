import { CheckCircle, Calendar, Users, UserPlus } from "lucide-react";
import { getStepStatus } from "@/lib/date-utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

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


const RecruitingSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section 
      id="recruiting" 
      ref={ref}
      className={cn(
        "section-padding relative transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            모집 안내
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            KHUDA와 함께 성장할 9기 멤버를 모집합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-16">
          {recruitmentInfo.map((info, index) => (
            <div
              key={index}
              className="group relative text-center rounded-3xl p-8 md:p-10 bg-black/70 backdrop-blur-2xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-blue-950/40 to-primary/25 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <info.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">{info.title}</h3>
                <p className="text-base md:text-lg font-medium mb-2 text-foreground leading-relaxed">{info.description}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{info.details}</p>
              </div>
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
                        
                        <div className={`w-full rounded-3xl p-6 md:p-8 border transition-all duration-300 shadow-sm min-h-[140px] flex flex-col relative overflow-hidden ${
                          status === 'active'
                            ? 'bg-black/70 backdrop-blur-2xl border-primary/50 shadow-lg shadow-primary/20'
                            : status === 'completed'
                            ? 'bg-black/70 backdrop-blur-2xl border-primary/50 shadow-lg shadow-primary/20'
                            : 'bg-black/70 backdrop-blur-2xl border-white/10'
                        } hover:border-white/20`}>
                          {(status === 'active' || status === 'completed') && (
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-blue-950/40 to-primary/25 rounded-3xl"></div>
                          )}
                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-3 gap-3">
                              <h4 className={`text-base md:text-lg font-semibold ${
                                status === 'active' || status === 'completed' ? 'text-primary' : 'text-foreground'
                              }`}>{step.title}</h4>
                              <p className={`text-sm font-medium whitespace-nowrap ${
                                status === 'active' || status === 'completed' ? 'text-primary/80' : 'text-muted-foreground'
                              }`}>{step.date}</p>
                            </div>
                            <p className={`text-xs md:text-sm leading-relaxed mt-auto ${
                              status === 'active' || status === 'completed' ? 'text-foreground/90' : 'text-muted-foreground'
                            }`}>{step.fullDate}</p>
                          </div>
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
                    <div className={`flex-1 rounded-3xl p-6 border transition-all duration-300 min-h-[140px] flex flex-col relative overflow-hidden ${
                      status === 'active'
                        ? 'bg-black/70 backdrop-blur-2xl border-primary/50 shadow-lg shadow-primary/20'
                        : status === 'completed'
                        ? 'bg-black/70 backdrop-blur-2xl border-primary/50 shadow-lg shadow-primary/20'
                        : 'bg-black/70 backdrop-blur-2xl border-white/10'
                    }`}>
                      {(status === 'active' || status === 'completed') && (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-blue-950/40 to-primary/25 rounded-3xl"></div>
                      )}
                      <div className="relative z-10">
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
