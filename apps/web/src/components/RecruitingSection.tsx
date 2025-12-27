import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, Calendar, Users, FileText, MessageSquare, Award } from "lucide-react";

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
    description: "2025년 2월 24일 ~ 3월 7일",
    details: "서류 마감: 3월 7일 23:59",
  },
  {
    icon: Award,
    title: "모집 인원",
    description: "트랙별 10~15명",
    details: "총 60~80명 내외",
  },
];

const processSteps = [
  { step: 1, icon: FileText, title: "서류 접수", date: "2.24 ~ 3.7" },
  { step: 2, icon: CheckCircle, title: "서류 검토", date: "3.8 ~ 3.12" },
  { step: 3, icon: MessageSquare, title: "면접", date: "3.13 ~ 3.15" },
  { step: 4, icon: Award, title: "최종 발표", date: "3.17" },
];

const faqs = [
  {
    question: "비전공자도 지원 가능한가요?",
    answer: "네, 전공과 관계없이 지원 가능합니다. 다만 Python 기초와 데이터 분석에 대한 기본적인 이해가 있으면 활동에 더 수월하게 참여할 수 있습니다. 열정과 학습 의지가 가장 중요합니다.",
  },
  {
    question: "활동 기간과 시간은 어떻게 되나요?",
    answer: "한 학기(약 16주) 동안 활동하며, 매주 1회 정기 세션(약 2-3시간)이 있습니다. 세션 외에도 팀 프로젝트와 스터디 시간이 필요할 수 있습니다.",
  },
  {
    question: "트랙은 어떻게 선택하나요?",
    answer: "지원서에서 1지망, 2지망 트랙을 선택하실 수 있습니다. 면접 과정에서 적합한 트랙을 함께 논의하며, 최종 배정됩니다.",
  },
  {
    question: "활동비가 있나요?",
    answer: "학기당 3만원의 활동비가 있습니다. 이는 세션 장소 대여, 간식, 발표회 진행 등에 사용됩니다.",
  },
  {
    question: "다른 동아리와 병행 가능한가요?",
    answer: "가능합니다. 다만 KHUDA 활동에 충실히 참여할 수 있는 시간적 여유가 있어야 합니다. 출석률 80% 이상 유지가 필요합니다.",
  },
];

const RecruitingSection = () => {
  return (
    <section id="recruiting" className="section-padding relative">
      <div className="container mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            모집 안내
          </h2>
          <p className="text-lg text-muted-foreground">
            KHUDA와 함께 성장할 9기 멤버를 모집합니다.
          </p>
        </div>

        {/* Recruitment info cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {recruitmentInfo.map((info, index) => (
            <div
              key={index}
              className="card-glass p-8 rounded-lg text-center hover:border-primary/50 transition-all duration-300"
            >
              <info.icon className="w-10 h-10 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
              <p className="text-foreground font-medium mb-1">{info.description}</p>
              <p className="text-sm text-muted-foreground">{info.details}</p>
            </div>
          ))}
        </div>

        {/* Process timeline */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-12">지원 프로세스</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            {processSteps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-sm font-medium mb-1">{step.title}</span>
                  <span className="text-xs text-muted-foreground">{step.date}</span>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block w-24 h-px bg-border mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">자주 묻는 질문</h3>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-left hover:text-primary transition-colors py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/apply">
            <Button variant="hero" size="xl" className="rounded-md">
              지원하기
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecruitingSection;
