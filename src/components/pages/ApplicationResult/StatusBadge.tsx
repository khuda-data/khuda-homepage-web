import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { getStatusType } from "@/lib/statusUtils";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusTrimmed = status.trim();
  const statusType = getStatusType(status);
  
  switch (statusType) {
    case 'fail':
      return (
        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base">
          <XCircle className="w-4 h-4 mr-2" />
          불합격
        </Badge>
      );
    case 'pass':
      return (
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base">
          <CheckCircle className="w-4 h-4 mr-2" />
          합격 🎉
        </Badge>
      );
    case 'pending':
      return (
        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base">
          <Clock className="w-4 h-4 mr-2" />
          대기중
        </Badge>
      );
    default:
      return (
        <Badge className="bg-muted text-muted-foreground px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base">
          {statusTrimmed}
        </Badge>
      );
  }
};
