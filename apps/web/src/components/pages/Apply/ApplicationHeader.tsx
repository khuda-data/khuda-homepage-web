import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const ApplicationHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 py-3 sm:py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>메인으로</span>
        </Link>
      </div>
    </header>
  );
};
