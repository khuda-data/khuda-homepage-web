import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// 활동 관련 유의사항 (기존 자주 묻는 질문 내용을 고지 형태로 정리)
const NOTICE_ITEMS = [
  "방학 중과 학기 중 모두 경희대학교 국제캠퍼스에서 대면으로 진행됩니다.",
  "활동비는 YB 45,000원, OB 5,000원이며 발표 시 공지를 통해 안내됩니다.",
];

export const NoticeCard = () => {
  return (
    <Card className="relative rounded-2xl border border-[#E8EBED] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg sm:text-xl font-bold text-[#191F28]">유의사항</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2.5">
          {NOTICE_ITEMS.map((item) => (
            <li
              key={item}
              className="relative pl-4 text-sm sm:text-[15px] text-[#4E5968] leading-relaxed before:absolute before:left-0 before:top-[9px] before:h-1 before:w-1 before:rounded-full before:bg-[#8B95A1]"
            >
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
