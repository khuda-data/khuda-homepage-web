import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT_PHONE } from "@/lib/constants";

interface ContactInfoProps {
  variant?: 'default' | 'button';
}

export const ContactInfo = ({ variant = 'default' }: ContactInfoProps) => {
  const contactLinks = (
    <>
      <a
        href={`tel:${CONTACT_PHONE.회장.replace(/-/g, "")}`}
        className={cn(
          "flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors",
          variant === 'button' && "px-4 py-2 rounded-lg bg-muted/30 hover:bg-muted/50 border border-border/50 transition-all hover:scale-105 text-foreground gap-2"
        )}
      >
        <Phone className={cn("w-3 h-3", variant === 'button' && "w-3.5 h-3.5")} />
        <span>회장 조윤수 {CONTACT_PHONE.회장}</span>
      </a>
      {variant === 'default' && <span className="hidden sm:inline text-muted-foreground">/</span>}
      <a
        href={`tel:${CONTACT_PHONE.부회장.replace(/-/g, "")}`}
        className={cn(
          "flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors",
          variant === 'button' && "px-4 py-2 rounded-lg bg-muted/30 hover:bg-muted/50 border border-border/50 transition-all hover:scale-105 text-foreground gap-2"
        )}
      >
        <Phone className={cn("w-3 h-3", variant === 'button' && "w-3.5 h-3.5")} />
        <span>부회장 신진수 {CONTACT_PHONE.부회장}</span>
      </a>
    </>
  );

  return (
    <div className={cn(
      "flex flex-col sm:flex-row items-center justify-center pt-2",
      variant === 'default' ? "gap-2 sm:gap-4" : "gap-3 sm:gap-4"
    )}>
      {contactLinks}
    </div>
  );
};
