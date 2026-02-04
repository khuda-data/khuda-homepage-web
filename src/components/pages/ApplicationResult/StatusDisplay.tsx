import { CheckCircle, Clock } from "lucide-react";
import { getStatusType } from "@/lib/statusUtils";

interface StatusDisplayProps {
  status: string;
}

export const StatusDisplay = ({ status }: StatusDisplayProps) => {
  const statusTrimmed = status.trim();
  const statusType = getStatusType(status);
  
  switch (statusType) {
    case 'fail':
      return (
        <span className="text-sm sm:text-base font-semibold text-red-400">불합격</span>
      );
    case 'pass':
      return (
        <>
          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
          <span className="text-sm sm:text-base font-semibold text-green-400">합격🎉</span>
        </>
      );
    case 'pending':
      return (
        <>
          <Clock className="w-4 h-4 text-yellow-400 flex-shrink-0" />
          <span className="text-sm sm:text-base font-semibold text-yellow-400">대기중</span>
        </>
      );
    default:
      return <span className="text-sm sm:text-base font-semibold text-foreground">{statusTrimmed}</span>;
  }
};
