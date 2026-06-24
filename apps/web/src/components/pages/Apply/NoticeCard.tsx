import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// 활동 관련 유의사항 (기존 자주 묻는 질문 내용을 고지 형태로 정리)
const NOTICE_ITEMS = [
  "방학 중과 학기 중 모두 경희대학교 국제캠퍼스에서 대면으로 진행됩니다.",
  "데이터 엔지니어링 트랙은 10기에서 운영하지 않습니다.",
  "YB는 기초 세션과 심화 세션을 이수하고 정기 학술제에 참가해 산출물을 제출 및 발표해야 수료로 인정됩니다.",
  "OB는 별도의 수료 요건이 없습니다.",
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
              className="relative pl-4 text-sm sm:text-[15px] font-semibold text-[#333D4B] leading-relaxed before:absolute before:left-0 before:top-[10px] before:h-1 before:w-1 before:rounded-full before:bg-[#8B95A1]"
            >
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
