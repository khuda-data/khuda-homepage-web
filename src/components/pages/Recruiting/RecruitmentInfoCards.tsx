import { Calendar, Users, UserPlus } from "lucide-react";
import { RECRUITMENT_INFO, RECRUITMENT_SCHEDULE, RECRUITMENT_STYLES } from "@/lib/constants";
import { cn } from "@/lib/utils";

// 모집 정보 배열 (상수)
const RECRUITMENT_INFO_ITEMS = [
  {
    icon: Users,
    title: RECRUITMENT_INFO.infoItems.target.title,
    description: RECRUITMENT_INFO.target,
    details: RECRUITMENT_INFO.targetDetails,
  },
  {
    icon: Calendar,
    title: RECRUITMENT_INFO.infoItems.schedule.title,
    description: RECRUITMENT_SCHEDULE.application.dateRange(RECRUITMENT_SCHEDULE.application.start, RECRUITMENT_SCHEDULE.application.end),
    details: RECRUITMENT_SCHEDULE.application.deadlineWithLabel(RECRUITMENT_INFO.deadlineLabel, RECRUITMENT_SCHEDULE.application.deadline),
  },
  {
    icon: UserPlus,
    title: RECRUITMENT_INFO.infoItems.capacity.title,
    description: RECRUITMENT_INFO.trackCapacityText,
    details: RECRUITMENT_INFO.totalCapacityText,
  },
] as const;

const RecruitmentInfoCards = () => {
  return (
    <div className={cn(RECRUITMENT_STYLES.process.grid.desktop)}>
      {RECRUITMENT_INFO_ITEMS.map((info, index) => (
        <div
          key={index}
          className={cn(RECRUITMENT_STYLES.infoCard.base, RECRUITMENT_STYLES.infoCard.padding)}
        >
          <div className={RECRUITMENT_STYLES.infoCard.gradient} />
          <div className={RECRUITMENT_STYLES.layout.infoCardContent}>
            <div className={RECRUITMENT_STYLES.infoCard.icon.container}>
              <info.icon className={RECRUITMENT_STYLES.infoCard.icon.size} />
            </div>
            <h3 className={RECRUITMENT_STYLES.infoCard.title}>{info.title}</h3>
            <p className={RECRUITMENT_STYLES.infoCard.description}>{info.description}</p>
            <p className={RECRUITMENT_STYLES.infoCard.details}>{info.details}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecruitmentInfoCards;
