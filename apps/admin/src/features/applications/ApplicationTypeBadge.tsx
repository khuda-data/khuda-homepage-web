import { Badge } from "@/components/ui/badge";
import type { ApplicationType } from "@/types/application";
import { APPLICATION_TYPE_LABEL } from "@/types/application";
import { cn } from "@/lib/utils";

const TYPE_CLASS: Record<ApplicationType, string> = {
  yb: "bg-[#EBF3FF] text-[#3182F6]",
  ob: "bg-[#FFEAEC] text-[#F04452]",
};

export const ApplicationTypeBadge = ({ type }: { type: ApplicationType }) => (
  <Badge variant="secondary" className={cn("border-transparent", TYPE_CLASS[type])}>
    {APPLICATION_TYPE_LABEL[type]}
  </Badge>
);
