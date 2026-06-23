import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import type { Application, ApplicationAnswer } from "@/types/application";
import { APPLICATION_TYPE_LABEL } from "@/types/application";
import { formatDateTime } from "@/lib/format";

interface Props {
  application: Application | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// 섹션 등장 순서를 유지하며 답변을 그룹핑
function groupBySection(answers: ApplicationAnswer[]): [string, ApplicationAnswer[]][] {
  const groups: [string, ApplicationAnswer[]][] = [];
  const index = new Map<string, ApplicationAnswer[]>();
  for (const a of answers) {
    if (!index.has(a.section)) {
      const arr: ApplicationAnswer[] = [];
      index.set(a.section, arr);
      groups.push([a.section, arr]);
    }
    index.get(a.section)!.push(a);
  }
  return groups;
}

export const ApplicationDetailDrawer = ({ application, open, onOpenChange }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto p-6">
        {application && (
          <>
            <div className="space-y-1.5 pr-8">
              <SheetTitle>{application.name}</SheetTitle>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="secondary">
                  {APPLICATION_TYPE_LABEL[application.applicationType]}
                </Badge>
                <span className="text-muted-foreground">{application.track}</span>
              </div>
              <SheetDescription className="space-x-2">
                <span>{application.phone}</span>
                <span>제출 {formatDateTime(application.submittedAt)}</span>
              </SheetDescription>
            </div>

            <div className="mt-6 space-y-6">
              {groupBySection(application.answers).map(([section, items]) => (
                <section key={section}>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {section}
                  </h3>
                  <div className="space-y-4">
                    {items.map((a) => (
                      <div key={a.questionId}>
                        <p className="text-sm font-medium text-foreground">{a.question}</p>
                        <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">
                          {a.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              ))}

              {application.interviewTimes && application.interviewTimes.length > 0 && (
                <section>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    면접 희망시간
                  </h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {application.interviewTimes.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* 평가(합격 여부, 점수) 기능은 후속 단계에서 추가 */}
            <div className="mt-8 border-t border-border pt-4">
              <p className="text-xs text-muted-foreground">
                평가(합격 여부, 점수) 기능은 다음 단계에서 추가됩니다.
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
