import { getStatusType } from "@/lib/statusUtils";
import { ContactInfo } from "./ContactInfo";

interface ResultMessageSectionProps {
  status: string;
}

export const ResultMessageSection = ({ status }: ResultMessageSectionProps) => {
  const statusType = getStatusType(status);
  
  if (statusType === 'fail') {
    return (
      <div className="space-y-3 sm:space-y-4">
        <div className="bg-gradient-to-br from-muted/40 to-muted/20 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border border-border/50 space-y-2 sm:space-y-3">
          <div className="text-center space-y-1.5 sm:space-y-2">
            <p className="text-sm sm:text-base md:text-lg text-foreground font-semibold">
              지원해주셔서 감사합니다.
            </p>
            <div className="space-y-1 sm:space-y-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <p>이번 기수에는 아쉽게도 선발되지 못하셨습니다.</p>
              <p>하지만 지원서에서 느껴진 진심과 준비는 분명했고, 얼마나 애써왔는지 저희도 알고 있습니다. 이번 결과 하나로 흔들리지 않으셨으면 합니다.</p>
              <p className="pt-0.5 sm:pt-1">다음 기수에도 꼭 다시 지원해 주세요. 감사합니다.</p>
            </div>
          </div>
        </div>
        <div className="space-y-2 sm:space-y-3">
          <p className="text-xs sm:text-sm text-muted-foreground text-center">
            추가 문의사항이 있으시면 운영진에게 연락해주세요.
          </p>
          <ContactInfo variant="default" />
        </div>
      </div>
    );
  }
  
  if (statusType === 'pass') {
    return (
      <div className="space-y-3 sm:space-y-4">
        <div className="bg-gradient-to-br from-muted/40 to-muted/20 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border border-border/50">
          <p className="text-xs sm:text-sm md:text-base text-foreground text-center font-medium leading-relaxed">
            합격을 진심으로 축하드립니다!<br />
            곧 카카오톡 공지방에 초대될 예정이며,<br />
            OT에 대한 자세한 공지가 있을 예정입니다.
          </p>
        </div>
        <div className="space-y-2 sm:space-y-3">
          <p className="text-xs sm:text-sm text-muted-foreground text-center">
            문의사항이 있으시면 운영진에게 연락해주세요.
          </p>
          <ContactInfo variant="default" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-2 sm:space-y-3">
      <p className="text-xs sm:text-sm text-muted-foreground text-center">
        추가 문의사항이 있으시면 운영진에게 연락해주세요.
      </p>
      <ContactInfo variant="button" />
    </div>
  );
};
