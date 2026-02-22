import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { APPLICATION_FORM_CONFIG, CURRICULUM_INFO } from "@/lib/constants";
import { getQuestionIcon } from "@/lib/questionUtils";
import type { Question } from "@/lib/api";

interface TrackSelectorProps {
  question: Question;
  answer: string;
  applicationType: "yb" | "ob" | "";
  onAnswerChange: (questionId: number, value: string) => void;
}

export const TrackSelector = ({ question, answer, applicationType, onAnswerChange }: TrackSelectorProps) => {
  const questionIcon = getQuestionIcon(question.question);
  const isOB = applicationType === "ob";
  const isYB = applicationType === "yb";

  const getDescription = () => {
    if (isOB) {
      return "심화 트랙 참여를 희망하시는 경우에만 선택해주세요.";
    }
    return null;
  };

  return (
    <Card key={question.id} className="relative border border-white/10 shadow-lg bg-black/70 backdrop-blur-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-blue-950/40 to-blue-600/25 rounded-lg opacity-50"></div>
      <CardHeader className="relative z-10">
        <CardTitle className="text-xl flex items-center gap-3">
          {questionIcon}
          {question.question}
          {question.required && <span className="text-destructive">*</span>}
        </CardTitle>
        {getDescription() && (
          <CardDescription>
            {getDescription()}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        <div className="space-y-4">
          {isOB ? (
            <Select
              value={answer || ""}
              onValueChange={(value) => onAnswerChange(question.id, value)}
              required={question.required}
            >
              <SelectTrigger 
                className={`h-14 rounded-2xl text-base font-medium transition-all duration-200 ease-out transform ${
                  answer && answer !== "none"
                    ? "bg-gradient-to-br from-blue-600/10 via-blue-600/5 to-transparent border-2 border-blue-600/60 shadow-md shadow-blue-600/10 scale-[1.01]"
                    : "bg-secondary/20 border-2 border-border/40 hover:border-blue-600/30 hover:bg-secondary/30 hover:scale-[1.01] active:scale-[0.99]"
                } focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 focus:outline-none focus:scale-[1.01]`}
              >
                <div className="flex items-center gap-2.5 flex-1">
                  {answer && answer !== "none" && (
                    <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0 animate-in zoom-in-95 duration-200" />
                  )}
                  <SelectValue placeholder="트랙을 선택해주세요 (선택사항)" />
                </div>
              </SelectTrigger>
              <SelectContent 
                className="rounded-2xl border-2 border-border/50 bg-card/95 backdrop-blur-md shadow-xl max-h-[400px] p-2"
                position="popper"
              >
                {[
                  ...CURRICULUM_INFO.tracks.map(track => ({
                    value: track.id,
                    label: `${track.label} (${track.title})`,
                  })),
                  ...APPLICATION_FORM_CONFIG.trackSelectOptions,
                ].map((track) => (
                  <SelectItem 
                    key={track.value}
                    value={track.value} 
                    className="rounded-xl px-4 py-3 text-base font-medium cursor-pointer hover:bg-blue-600/10 focus:bg-blue-600/10 transition-all duration-150 ease-out data-[highlighted]:bg-blue-600/10 data-[highlighted]:scale-[1.02]"
                  >
                    {track.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : isYB ? (
            <Select
              value={CURRICULUM_INFO.tracks.find(track => `${track.label} (${track.title})` === answer)?.id || ""}
              onValueChange={(value) => {
                const selectedTrack = CURRICULUM_INFO.tracks.find(track => track.id === value);
                if (selectedTrack) {
                  onAnswerChange(question.id, `${selectedTrack.label} (${selectedTrack.title})`);
                }
              }}
              required={question.required}
            >
              <SelectTrigger 
                className={`h-14 rounded-2xl text-base font-medium transition-all duration-200 ease-out transform ${
                  answer && answer !== "none"
                    ? "bg-gradient-to-br from-blue-600/10 via-blue-600/5 to-transparent border-2 border-blue-600/60 shadow-md shadow-blue-600/10 scale-[1.01]"
                    : "bg-secondary/20 border-2 border-border/40 hover:border-blue-600/30 hover:bg-secondary/30 hover:scale-[1.01] active:scale-[0.99]"
                } focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 focus:outline-none focus:scale-[1.01]`}
              >
                <div className="flex items-center gap-2.5 flex-1">
                  {answer && answer !== "none" && (
                    <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  )}
                  <SelectValue placeholder="심화 트랙을 선택해주세요" />
                </div>
              </SelectTrigger>
              <SelectContent 
                className="rounded-2xl border-2 border-border/50 bg-card/95 backdrop-blur-md shadow-xl max-h-[400px] p-2"
                position="popper"
              >
                {CURRICULUM_INFO.tracks.map(track => ({
                  value: track.id,
                  label: `${track.label} (${track.title})`,
                })).map((track) => (
                  <SelectItem 
                    key={track.value}
                    value={track.value} 
                    className="rounded-xl px-4 py-3 text-base font-medium cursor-pointer hover:bg-blue-600/10 focus:bg-blue-600/10 transition-all duration-150 ease-out data-[highlighted]:bg-blue-600/10 data-[highlighted]:scale-[1.02]"
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
