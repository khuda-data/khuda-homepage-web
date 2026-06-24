import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RequiredMark } from "@/components/pages/Apply/RequiredMark";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { APPLICATION_FORM_CONFIG, CURRICULUM_INFO } from "@/lib/constants";
import type { Question } from "@/lib/api";

interface TrackSelectorProps {
  question: Question;
  answer: string;
  applicationType: "yb" | "ob" | "";
  onAnswerChange: (questionId: number, value: string) => void;
}

export const TrackSelector = ({ question, answer, applicationType, onAnswerChange }: TrackSelectorProps) => {
  const isOB = applicationType === "ob";
  const isYB = applicationType === "yb";

  const getDescription = () => null;

  return (
    <Card key={question.id} className="relative rounded-2xl border border-[#E8EBED] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
      <CardHeader className="relative z-10">
        <CardTitle className="text-base sm:text-lg font-bold text-[#191F28] flex items-center gap-2">
          {question.question}
          {question.required && <RequiredMark />}
        </CardTitle>
        {getDescription() && (
          <CardDescription className="text-[#8B95A1] leading-relaxed">
            {getDescription()}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        {isYB && (
          <div className="p-4 rounded-2xl bg-[#EBF3FF] space-y-1.5">
            <p className="text-sm font-semibold text-[#191F28]">면접 평가 기준 안내</p>
            <p className="text-[13px] font-medium text-[#333D4B] leading-relaxed">
              선택하신 관심 트랙이 방학 세션 이후 희망 트랙과 같다면 트랙 배정에 유리하게 작용할 수 있습니다. 또한 해당 트랙과 관련한 질문이 면접에 포함될 수 있습니다.
            </p>
          </div>
        )}
        <div className="space-y-4">
          {isOB ? (
            <Select
              value={answer || ""}
              onValueChange={(value) => onAnswerChange(question.id, value)}
              required={question.required}
            >
              <SelectTrigger
                className="h-14 rounded-xl text-base font-medium bg-[#F2F4F6] border border-transparent text-[#191F28] transition-colors duration-200 hover:bg-[#F9FAFB] focus:bg-white focus:border-[#3182F6] focus:outline-none focus:ring-0 focus:ring-offset-0"
              >
                <SelectValue placeholder="트랙을 선택해주세요 (선택사항)" />
              </SelectTrigger>
              <SelectContent
                className="rounded-2xl border border-[#E8EBED] bg-white shadow-xl max-h-[400px] p-2"
                position="popper"
              >
                {[
                  ...CURRICULUM_INFO.tracks.map(track => ({
                    value: track.id,
                    label: track.title,
                  })),
                  ...APPLICATION_FORM_CONFIG.trackSelectOptions,
                ].map((track) => (
                  <SelectItem
                    key={track.value}
                    value={track.value}
                    className="rounded-xl px-4 py-3 text-base font-medium cursor-pointer hover:bg-[#EBF3FF] focus:bg-[#EBF3FF] transition-colors duration-150 data-[highlighted]:bg-[#EBF3FF] [&>span:first-child]:hidden"
                  >
                    {track.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : isYB ? (
            <Select
              value={CURRICULUM_INFO.tracks.find(track => track.title === answer)?.id || ""}
              onValueChange={(value) => {
                const selectedTrack = CURRICULUM_INFO.tracks.find(track => track.id === value);
                if (selectedTrack) {
                  onAnswerChange(question.id, selectedTrack.title);
                }
              }}
              required={question.required}
            >
              <SelectTrigger
                className="h-14 rounded-xl text-base font-medium bg-[#F2F4F6] border border-transparent text-[#191F28] transition-colors duration-200 hover:bg-[#F9FAFB] focus:bg-white focus:border-[#3182F6] focus:outline-none focus:ring-0 focus:ring-offset-0"
              >
                <SelectValue placeholder="심화 트랙을 선택해주세요" />
              </SelectTrigger>
              <SelectContent
                className="rounded-2xl border border-[#E8EBED] bg-white shadow-xl max-h-[400px] p-2"
                position="popper"
              >
                {CURRICULUM_INFO.tracks.map(track => ({
                  value: track.id,
                  label: track.title,
                })).map((track) => (
                  <SelectItem
                    key={track.value}
                    value={track.value}
                    className="rounded-xl px-4 py-3 text-base font-medium cursor-pointer hover:bg-[#EBF3FF] focus:bg-[#EBF3FF] transition-colors duration-150 data-[highlighted]:bg-[#EBF3FF] [&>span:first-child]:hidden"
                  >
                    {track.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};
