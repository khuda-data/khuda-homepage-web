import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  RECRUITMENT_SCHEDULE, 
  RECRUITMENT_INFO,
  APPLICATION_FORM_CONFIG,
} from "@/lib/constants";

export const ScheduleCard = () => {
  return (
    <Card className="relative border border-border shadow-lg bg-card overflow-hidden">
      <CardHeader className="pb-6">
        <CardTitle className="text-lg sm:text-xl text-foreground">{APPLICATION_FORM_CONFIG.sections.schedule}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          <div className="space-y-2 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-background to-muted/20 border border-border/50 hover:border-blue-600/30 transition-all duration-200">
            <p className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wide">서류 모집기간</p>
            <p className="text-sm sm:text-base md:text-lg font-semibold leading-relaxed">{RECRUITMENT_SCHEDULE.application.full}</p>
          </div>
          <div className="space-y-2 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-background to-muted/20 border border-border/50 hover:border-blue-600/30 transition-all duration-200">
            <p className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wide">서류 합격자 발표</p>
            <p className="text-sm sm:text-base md:text-lg font-semibold leading-relaxed">{RECRUITMENT_SCHEDULE.announcement.full}</p>
          </div>
          <div className="space-y-2 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-background to-muted/20 border border-border/50 hover:border-blue-600/30 transition-all duration-200">
            <p className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wide">면접</p>
            <p className="text-sm sm:text-base md:text-lg font-semibold leading-relaxed">{RECRUITMENT_SCHEDULE.interview.full}</p>
          </div>
          <div className="space-y-2 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-background to-muted/20 border border-border/50 hover:border-blue-600/30 transition-all duration-200">
            <p className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wide">최종 합격자 발표</p>
            <p className="text-sm sm:text-base md:text-lg font-semibold leading-relaxed">{RECRUITMENT_SCHEDULE.final.full}</p>
          </div>
        </div>
        <div className="pt-4 border-t border-border/50">
          <p className="text-xs sm:text-sm font-semibold text-muted-foreground mb-4 sm:mb-6">모집대상</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-background to-muted/5 border border-border/50 hover:border-blue-600/30 hover:shadow-lg hover:shadow-blue-600/5 transition-all duration-300">
              <div className="flex items-center gap-2.5 mb-3">
                <Badge className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5">YB</Badge>
                <span className="text-sm sm:text-base font-bold text-foreground">{APPLICATION_FORM_CONFIG.applicationTypes.yb.label(RECRUITMENT_INFO.generation)}</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {APPLICATION_FORM_CONFIG.applicationTypes.yb.description}
              </p>
            </div>
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-background to-muted/5 border border-border/50 hover:border-blue-600/30 hover:shadow-lg hover:shadow-blue-600/5 transition-all duration-300">
              <div className="flex items-center gap-2.5 mb-3">
                <Badge className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5">OB</Badge>
                <span className="text-sm sm:text-base font-bold text-foreground">{APPLICATION_FORM_CONFIG.applicationTypes.ob.label(RECRUITMENT_INFO.generation)}</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {APPLICATION_FORM_CONFIG.applicationTypes.ob.description}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
