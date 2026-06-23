import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { ApplicationAnswer } from "@/types/application";
import { APPLICATION_TYPE_LABEL } from "@/types/application";
import { formatDateTime } from "@/lib/format";
import { useApplications } from "./api";

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

export const ApplicationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useApplications();
  const application = data?.find((a) => a.id === id) ?? null;

  return (
    <div>
      <button
        onClick={() => navigate("/applications")}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        목록으로
      </button>

      {isLoading ? (
        <div className="rounded-lg border border-border bg-card p-6">
          <Skeleton className="h-6 w-32" />
          <div className="mt-6 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>
      ) : !application ? (
        <p className="py-16 text-center text-sm text-muted-foreground">
          지원서를 찾을 수 없습니다.
        </p>
      ) : (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          {/* 헤더 */}
          <div className="space-y-1.5">
            <h1 className="text-xl font-bold">{application.name}</h1>
            <div className="flex items-center gap-2 text-sm">
              <Badge variant="secondary">
                {APPLICATION_TYPE_LABEL[application.applicationType]}
              </Badge>
              <span className="text-muted-foreground">{application.track}</span>
            </div>
            <p className="space-x-2 text-sm text-muted-foreground">
              <span>{application.phone}</span>
              <span>제출 {formatDateTime(application.submittedAt)}</span>
            </p>
          </div>

          {/* 섹션별 문항 답변 */}
          <div className="mt-8 space-y-8">
            {groupBySection(application.answers).map(([section, items]) => (
              <section key={section}>
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {section}
                </h2>
                <div className="space-y-5">
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
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  면접 희망시간
                </h2>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {application.interviewTimes.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* 평가(합격 여부, 점수) 기능은 후속 단계에서 추가 */}
          <div className="mt-10 border-t border-border pt-4">
            <p className="text-xs text-muted-foreground">
              평가(합격 여부, 점수) 기능은 다음 단계에서 추가됩니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
