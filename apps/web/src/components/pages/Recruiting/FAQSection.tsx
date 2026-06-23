import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { FAQ_MESSAGES, SECTION_STYLES, FAQ_STYLES, SCROLL_ANIMATION_CONFIG } from "@/lib/constants";
import { FAQ_DATA } from "@/data/faq";
import { cn } from "@/lib/utils";
import SectionHeader from "@/components/shared/SectionHeader";

interface FAQSectionProps {
  headerLabelClassName?: string;
  accentClassName?: string;
}

const FAQSection = ({ headerLabelClassName, accentClassName }: FAQSectionProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: SCROLL_ANIMATION_CONFIG.threshold });
  const qPrefixColorClassName = accentClassName ?? "text-blue-600";

  return (
    <div 
      id={FAQ_STYLES.sectionId} 
      ref={ref}
      className={cn(
        "w-full py-12 sm:py-16 md:py-20 lg:py-24 transition-all duration-1000 ease-out",
        isVisible ? SECTION_STYLES.visibility.visible : SECTION_STYLES.visibility.hidden
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* 헤더 */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <SectionHeader label="FAQ" title={FAQ_MESSAGES.title} labelClassName={headerLabelClassName} />
        </div>
        
        <Accordion 
          type={FAQ_STYLES.accordion.type} 
          collapsible={FAQ_STYLES.accordion.collapsible} 
          className={FAQ_STYLES.accordion.container}
        >
          {FAQ_DATA.map((faq) => (
            <AccordionItem 
              key={faq.question} 
              value={faq.question} 
              className={cn(
                FAQ_STYLES.accordion.item.base
              )}
            >
              <AccordionTrigger className={cn(
                FAQ_STYLES.accordion.trigger.base,
                "hover:bg-gray-200"
              )}>
                <div className={FAQ_STYLES.accordion.trigger.iconContainer}>
                  <span className={cn(qPrefixColorClassName, "font-bold flex-shrink-0 text-xs sm:text-sm md:text-base")}>
                    Q.
                  </span>
                  <span className="break-words">{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className={cn(
                FAQ_STYLES.accordion.content.base,
                "break-words whitespace-pre-line"
              )}>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQSection;
