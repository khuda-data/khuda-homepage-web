import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { FAQ_DATA, FAQ_MESSAGES, SECTION_STYLES, FAQ_STYLES, SCROLL_ANIMATION_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import SectionHeader from "@/components/shared/SectionHeader";

const FAQSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: SCROLL_ANIMATION_CONFIG.threshold });
  const IconComponent = FAQ_STYLES.accordion.trigger.iconComponent;

  return (
    <div 
      id={FAQ_STYLES.sectionId} 
      ref={ref}
      className={cn(
        "w-full py-12 sm:py-16 md:py-20 lg:py-24 mb-16 sm:mb-20 md:mb-24 transition-all duration-1000 ease-out",
        isVisible ? SECTION_STYLES.visibility.visible : SECTION_STYLES.visibility.hidden
      )}
    >
      <div className={SECTION_STYLES.container.base}>
        <div className={SECTION_STYLES.maxWidth.narrow}>
          {/* 헤더 */}
          <SectionHeader label="FAQ" title={FAQ_MESSAGES.title} />
          
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
                  "border-0 rounded-2xl bg-[#1a1a1a] border border-white/10 overflow-hidden transition-all duration-200 hover:border-white/20"
                )}
              >
                <AccordionTrigger className={cn(
                  "text-left hover:no-underline px-4 sm:px-6 py-4 sm:py-5 text-sm sm:text-base text-white font-medium transition-colors min-h-[44px] flex items-center hover:bg-white/[0.02]"
                )}>
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4 text-white/70 flex-shrink-0" />
                    <span className="text-white">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-6 pb-4 sm:pb-5 text-sm sm:text-base text-white/80 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;

