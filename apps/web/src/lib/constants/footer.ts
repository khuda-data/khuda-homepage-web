import { Instagram, Link2, Github } from "lucide-react";
import { SOCIAL_LINKS } from "./contact";

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const FOOTER_INFO = {
  organization: "경희대학교 데이터분석/AI 학회 KHUDA",
  description: "데이터와 AI로 미래를 만들어가는 KHUDA와 함께하세요.",
  copyright: (year: number) => `Copyright © ${year} KHUDA. All Rights Reserved.`,
  sections: {
    location: "Location",
    contact: "Contact",
  },
  location: {
    address: "경기도 용인시 기흥구 덕영대로 1732",
    building: "경희대학교 국제캠퍼스",
  },
  socialLinks: [
    {
      id: "instagram",
      label: "@khu_da.official",
      href: SOCIAL_LINKS.instagram,
      icon: Instagram,
    },
    {
      id: "linktree",
      label: "Linktree",
      href: SOCIAL_LINKS.linktree,
      icon: Link2,
    },
    {
      id: "github",
      label: "KHUDA Github",
      href: SOCIAL_LINKS.github,
      icon: Github,
    },
  ] as SocialLink[],
};

export const FOOTER_STYLES = {
  footer: {
    base: "bg-secondary/85 border-t border-border",
    padding: "py-5 sm:py-8 md:py-12",
  },
  container: {
    base: "container mx-auto",
    padding: "px-4 sm:px-6 md:px-12",
  },
  grid: {
    base: "flex flex-col md:flex-row md:items-start md:justify-between",
    gap: "gap-5 sm:gap-6 md:gap-0",
  },
  layout: {
    flexCol: "flex flex-col",
  },
  section: {
    header: "font-semibold mb-3 sm:mb-4 md:mb-5 text-sm sm:text-base text-black",
    organization: "font-bold text-base sm:text-lg text-black",
    text: {
      base: "text-black text-xs sm:text-sm",
      small: "text-black text-[10px] sm:text-xs",
    },
    spacing: {
      marginBottom: "mb-2 sm:mb-3 md:mb-4",
      marginTop: "mt-3 sm:mt-4 md:mt-6",
      itemGap: "space-y-1.5 sm:space-y-2 md:space-y-3",
    },
  },
  middleSection: {
    container: "flex flex-col",
  },
  rightSection: {
    container: "flex flex-col",
  },
  rightGroup: {
    container: "flex flex-col gap-5 sm:gap-6 md:flex-row md:items-start md:justify-end md:gap-12 lg:gap-16",
  },
  socialLinks: {
    container: "flex items-center gap-2.5 sm:gap-3 md:gap-4",
    link: "w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-muted/30 border border-border/50 flex items-center justify-center text-foreground hover:bg-muted/50 hover:border-foreground/30 transition-all duration-200 group",
    icon: "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 stroke-[1.5] group-hover:stroke-2 transition-all",
  },
};
