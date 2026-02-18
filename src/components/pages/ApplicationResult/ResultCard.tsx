import { useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw, UserCircle, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMMON_STYLES } from "@/lib/constants";
import { StatusDisplay } from "./StatusDisplay";
import { ResultMessageSection } from "./ResultMessageSection";

interface Result {
  student_id: string;
  name: string;
  status: string;
}

interface ResultCardProps {
  result: Result;
  onReset: () => void;
}

export const ResultCard = ({ result, onReset }: ResultCardProps) => {
  const resultCardRef = useRef<HTMLDivElement>(null);

  // 결과 카드로 스크롤
  useEffect(() => {
    if (resultCardRef.current) {
      setTimeout(() => {
        resultCardRef.current?.scrollIntoView({ 
          behavior: "smooth", 
          block: "nearest" 
        });
      }, 100);
    }
  }, []);

  return (
    <Card 
      ref={resultCardRef}
      className={cn(
        COMMON_STYLES.cardBase, 
        "rounded-xl sm:rounded-2xl md:rounded-3xl mt-6 sm:mt-8",
        "animate-in fade-in slide-in-from-bottom-4 duration-500"
      )}
    >
      <CardHeader className="px-4 sm:px-6 pb-3 sm:pb-4">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-lg sm:text-xl md:text-2xl text-foreground flex items-center gap-2">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            조회 결과
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-xs sm:text-sm text-muted-foreground hover:text-foreground min-h-[36px] sm:min-h-[32px] px-2 sm:px-3"
          >
            <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
            <span className="hidden sm:inline">다시 조회</span>
            <span className="sm:hidden">재조회</span>
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 sm:space-y-6 pt-0 px-4 sm:px-6 pb-4 sm:pb-6">
        {/* 정보 필드들 */}
        <div className="space-y-2.5 sm:space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/20 border border-border/50 hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-2">
              <UserCircle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">이름</span>
            </div>
            <span className="text-sm sm:text-base font-semibold text-foreground sm:text-right">{result.name}</span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/20 border border-border/50 hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">학번</span>
            </div>
            <span className="text-sm sm:text-base font-semibold text-foreground font-mono sm:text-right break-all">{result.student_id}</span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/20 border border-border/50 hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">상태</span>
            </div>
            <div className="flex items-center gap-2 sm:justify-end">
              <StatusDisplay status={result.status} />
            </div>
          </div>
        </div>

        {/* 메시지 및 연락처 섹션 */}
        <div className="pt-3 sm:pt-4 border-t border-border/50">
          <ResultMessageSection status={result.status} />
        </div>
      </CardContent>
    </Card>
  );
};
