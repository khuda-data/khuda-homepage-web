import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

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

const FAQSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section 
      id="faq" 
      ref={ref}
      className={cn(
        "section-padding relative transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              자주 묻는 질문
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              궁금한 점이 있으신가요?
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border-0 rounded-2xl bg-card border border-border/50 overflow-hidden transition-all duration-200 hover:border-border"
              >
                <AccordionTrigger className="text-left hover:no-underline px-6 py-5 text-foreground font-medium transition-colors">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

