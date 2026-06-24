import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// 지원 전 유의사항 (중복 제거 후 핵심만)
const NOTICE_ITEMS = [
  "지원 전 모집 및 활동 일정과 KHUDA 커리큘럼을 꼭 확인해 주세요.",
  "마감 시간 이후에는 지원서를 접수하지 않습니다.",
  "서버 오류에 대비해 작성 내용을 따로 백업해 두시길 권장합니다.",
  "최종 제출하지 않은 임시저장 지원서는 미제출로 간주하오니 반드시 최종 제출하시길 바랍니다.",
  "제출한 지원서는 수정과 반환이 불가합니다.",
];

export const ApplicationGuide = () => {
  return (
    <Card className="relative rounded-2xl border border-[#E8EBED] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg sm:text-xl font-bold text-[#191F28]">
          지원 안내
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2.5">
          {NOTICE_ITEMS.map((item) => (
            <li
              key={item}
              className="relative pl-4 text-sm sm:text-[15px] font-medium text-[#333D4B] leading-relaxed before:absolute before:left-0 before:top-[9px] before:h-1 before:w-1 before:rounded-full before:bg-[#8B95A1]"
            >
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
