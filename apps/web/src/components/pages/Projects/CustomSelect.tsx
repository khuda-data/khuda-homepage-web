import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

const CustomSelect = ({ value, onChange, options }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // 메뉴 바깥을 누르거나 Esc 를 누를 때만 닫는다.
  // (예전에는 버튼 blur 후 150ms 타이머로 닫아서, 항목을 조금만 길게 눌러도
  //  선택되기 전에 메뉴가 사라져 필터가 동작하지 않았다.)
  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-card border border-border hover:border-foreground/20 transition-all duration-200 text-sm text-foreground min-w-[120px]"
      >
        <span>{value}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-muted-foreground transition-transform duration-200 ml-auto",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && (
        <div
          role="listbox"
          className="absolute top-full mt-1 left-0 min-w-full bg-card border border-border rounded-lg shadow-xl z-50 py-1 max-h-60 overflow-y-auto"
        >
          {options.map((option) => (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={value === option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={cn(
                "w-full text-left px-4 py-2 text-sm whitespace-nowrap transition-colors duration-150 hover:bg-muted",
                value === option ? "text-foreground bg-muted/50" : "text-muted-foreground"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
