import { HelpCircle } from "lucide-react";

export const FAQ_MESSAGES = {
  title: "자주 묻는 질문",
  subtitle: "궁금한 점이 있으신가요?",
};

export const FAQ_STYLES = {
  sectionId: "faq",
  accordion: {
    type: "single" as const,
    collapsible: true,
    container: "w-full space-y-2 sm:space-y-3 md:space-y-4",
    item: {
      base: "border-0 rounded-lg sm:rounded-xl md:rounded-2xl bg-gray-100 border border-border/50 overflow-hidden transition-all duration-200 hover:border-border",
    },
    trigger: {
      base: "text-left hover:no-underline px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 text-xs sm:text-sm md:text-base text-gray-900 font-medium transition-colors min-h-[44px] sm:min-h-[48px] flex items-center",
      iconContainer: "flex items-center gap-1.5 sm:gap-2",
      icon: "w-4 h-4 text-blue-600 flex-shrink-0",
      iconComponent: HelpCircle,
    },
    content: {
      base: "px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-5 text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed",
    },
  },
};
