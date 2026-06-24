import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  RECRUITMENT_SCHEDULE, 
  RECRUITMENT_INFO,
  APPLICATION_FORM_CONFIG,
} from "@/lib/constants";

export const ScheduleCard = () => {
  return (
    <Card className="relative rounded-2xl border border-[#E8EBED] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
      <CardHeader className="pb-5">
        <CardTitle className="text-lg sm:text-xl font-bold text-[#191F28]">{APPLICATION_FORM_CONFIG.sections.schedule}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 sm:space-y-6">
        <div className="space-y-2.5">
          {[
            { label: "지원 기간", value: RECRUITMENT_SCHEDULE.application.full },
            { label: "서류 발표", value: RECRUITMENT_SCHEDULE.announcement.full },
            { label: "면접", value: RECRUITMENT_SCHEDULE.interview.full },
            { label: "최종 발표", value: RECRUITMENT_SCHEDULE.final.full },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-3 sm:gap-4">
              <span className="shrink-0 w-[72px] sm:w-20 text-center rounded-lg bg-[#F2F4F6] px-2 py-1.5 text-xs font-semibold text-[#8B95A1]">
                {row.label}
              </span>
              <span className="text-sm sm:text-base font-medium leading-relaxed text-[#191F28]">{row.value}</span>
            </div>
          ))}
        </div>
        <div className="pt-5 border-t border-[#F2F4F6]">
          <p className="text-xs sm:text-sm font-semibold text-[#8B95A1] mb-4">모집대상</p>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="p-5 rounded-2xl bg-[#F2F4F6]">
              <div className="flex items-center gap-2.5 mb-2.5">
                <Badge className="bg-[#3182F6] text-white text-xs font-semibold px-2 py-0.5 hover:bg-[#3182F6]">YB</Badge>
                <span className="text-sm sm:text-base font-bold text-[#191F28]">{APPLICATION_FORM_CONFIG.applicationTypes.yb.label(RECRUITMENT_INFO.generation)}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#4E5968] leading-relaxed">
                {APPLICATION_FORM_CONFIG.applicationTypes.yb.description}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#F2F4F6]">
              <div className="flex items-center gap-2.5 mb-2.5">
                <Badge className="bg-[#F04452] text-white text-xs font-semibold px-2 py-0.5 hover:bg-[#F04452]">OB</Badge>
                <span className="text-sm sm:text-base font-bold text-[#191F28]">{APPLICATION_FORM_CONFIG.applicationTypes.ob.label(RECRUITMENT_INFO.generation)}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#4E5968] leading-relaxed">
                {APPLICATION_FORM_CONFIG.applicationTypes.ob.description}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
