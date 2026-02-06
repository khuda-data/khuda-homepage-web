import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { FAQ_DATA, FAQ_MESSAGES, SECTION_STYLES, FAQ_STYLES, SCROLL_ANIMATION_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const FAQSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: SCROLL_ANIMATION_CONFIG.threshold });
  const IconComponent = FAQ_STYLES.accordion.trigger.iconComponent;

  return (
    <section 
      id={FAQ_STYLES.sectionId} 
      ref={ref}
      className={cn(
        SECTION_STYLES.section.base,
        "py-16 sm:py-20 md:py-28 lg:py-32",
        isVisible ? SECTION_STYLES.visibility.visible : SECTION_STYLES.visibility.hidden
      )}
    >
      <div className={SECTION_STYLES.container.base}>
        <div className={SECTION_STYLES.maxWidth.narrow}>
          <div className={SECTION_STYLES.header.container}>
            <h2 className={SECTION_STYLES.header.title}>
              {FAQ_MESSAGES.title}
            </h2>
            <p className={SECTION_STYLES.header.subtitle}>
              {FAQ_MESSAGES.subtitle}
            </p>
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
                className={FAQ_STYLES.accordion.item.base}
              >
                <AccordionTrigger className={FAQ_STYLES.accordion.trigger.base}>
                  <div className={FAQ_STYLES.accordion.trigger.iconContainer}>
                    <IconComponent className={FAQ_STYLES.accordion.trigger.icon} />
                    {faq.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className={FAQ_STYLES.accordion.content.base}>
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

