import { useMemo, useState, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import { Pencil, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateTime } from "@/lib/format";
import type { AnswerItem } from "@/types/application";
import { useApplication, useUpdateApplication } from "./api";
import { ApplicationTypeBadge } from "./ApplicationTypeBadge";

// 구조화된 값이라 직접 수정하면 깨질 수 있는 문항은 잠근다.
const LOCKED_FIELD_TYPES = new Set(["checklist", "interview_date", "interview_time", "consent"]);

const cardClass = "rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6";

// answers에서 키워드로 값 찾기 (헤더 표시용)
function answerByKeyword(answers: AnswerItem[], keyword: string): string {
  return answers.find((a) => a.question.includes(keyword))?.value ?? "";
}

// 체크리스트, 면접 등 JSON 문자열 값을 읽기 좋게 표시한다.
function displayValue(value: string): string {
  if (!value) return "-";
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.join(", ");
    if (parsed && typeof parsed === "object") {
      return Object.entries(parsed)
        .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
        .join(" / ");
    }
  } catch {
    // 평범한 문자열
  }
  return value;
}

const SectionTitle = ({ children }: { children: ReactNode }) => (
  <h2 className="mb-4 text-[15px] font-bold text-foreground">{children}</h2>
);

export const ApplicationDetailPage = () => {
  const { id = "" } = useParams();
  const { data: application, isLoading, isError } = useApplication(id);
  const update = useUpdateApplication(id);

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [saveError, setSaveError] = useState<string | null>(null);

  const answers = application?.answers ?? [];
  const basics = useMemo(() => answers.filter((a) => a.position <= 9), [answers]);
  const typeAnswers = useMemo(() => answers.filter((a) => a.position >= 10), [answers]);

  const startEdit = () => {
    const seed: Record<string, string> = {};
    answers.forEach((a) => {
      seed[String(a.questionId)] = a.value;
    });
    setDraft(seed);
    setSaveError(null);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setSaveError(null);
  };

  const setField = (questionId: number, value: string) => {
    setDraft((prev) => ({ ...prev, [String(questionId)]: value }));
  };

  const handleSave = async () => {
    // 잠긴 문항을 제외하고 바뀐 값만 보낸다.
    const changed: Record<string, string> = {};
    answers.forEach((a) => {
      if (LOCKED_FIELD_TYPES.has(a.fieldType)) return;
      const next = draft[String(a.questionId)] ?? "";
      if (next !== a.value) changed[String(a.questionId)] = next;
    });

    if (Object.keys(changed).length === 0) {
      setIsEditing(false);
      return;
    }

    setSaveError(null);
    try {
      await update.mutateAsync(changed);
      setIsEditing(false);
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "저장에 실패했습니다.");
    }
  };

  if (isLoading) {
    return (
      <div className="animate-fade-up space-y-4">
        <div className={cardClass}>
          <Skeleton className="h-7 w-28" />
          <Skeleton className="mt-3 h-5 w-40" />
        </div>
        <div className={cardClass}>
          <Skeleton className="h-5 w-24" />
          <Skeleton className="mt-4 h-12 w-full" />
        </div>
      </div>
    );
  }

  if (isError || !application) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground">
        지원서를 찾을 수 없습니다.
      </p>
    );
  }

  const renderEditField = (a: AnswerItem) => {
    if (LOCKED_FIELD_TYPES.has(a.fieldType)) {
      return (
        <p className="mt-1.5 whitespace-pre-wrap rounded-lg bg-muted px-3 py-2 text-[15px] text-muted-foreground">
          {displayValue(a.value)}
        </p>
      );
    }
    const value = draft[String(a.questionId)] ?? "";
    if (a.fieldType === "textarea") {
      return (
        <textarea
          value={value}
          onChange={(e) => setField(a.questionId, e.target.value)}
          rows={4}
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-[15px] outline-none focus:ring-2 focus:ring-ring"
        />
      );
    }
    return (
      <Input
        value={value}
        onChange={(e) => setField(a.questionId, e.target.value)}
        className="mt-1.5"
      />
    );
  };

  return (
    <div className="animate-fade-up space-y-4">
      {/* 프로필 헤더 */}
      <div className={cardClass}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {answerByKeyword(answers, "이름") || "이름 미상"}
            </h1>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <ApplicationTypeBadge type={application.applicationType} />
              <span className="text-muted-foreground/40">/</span>
              <span className="text-muted-foreground">
                {answerByKeyword(answers, "트랙") || "트랙 미선택"}
              </span>
            </div>
          </div>

          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={cancelEdit} disabled={update.isPending}>
                <X className="size-4" />
                취소
              </Button>
              <Button onClick={handleSave} disabled={update.isPending}>
                <Save className="size-4" />
                {update.isPending ? "저장 중..." : "저장"}
              </Button>
            </div>
          ) : (
            <Button variant="outline" onClick={startEdit}>
              <Pencil className="size-4" />
              수정
            </Button>
          )}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-5">
          <div>
            <p className="text-xs text-muted-foreground">연락처</p>
            <p className="mt-1 text-[15px] font-medium">{answerByKeyword(answers, "연락처") || "-"}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">이메일</p>
            <p className="mt-1 text-[15px] font-medium">{answerByKeyword(answers, "이메일") || "-"}</p>
          </div>
        </div>

        {application.updatedBy && (
          <p className="mt-4 text-xs text-muted-foreground">
            마지막 수정: {application.updatedBy}
            {application.updatedAt ? ` (${formatDateTime(application.updatedAt)})` : ""}
          </p>
        )}
        {saveError && <p className="mt-3 text-sm text-[#f04452]">{saveError}</p>}
      </div>

      {/* 기본정보 */}
      {basics.length > 0 && (
        <div className={cardClass}>
          <SectionTitle>기본정보</SectionTitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {basics.map((a) => (
              <div key={a.questionId}>
                <p className="text-xs text-muted-foreground">{a.question}</p>
                {isEditing ? (
                  renderEditField(a)
                ) : (
                  <p className="mt-1 text-[15px] font-medium">{displayValue(a.value)}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 유형별 문항 */}
      {typeAnswers.length > 0 && (
        <div className={cardClass}>
          <SectionTitle>유형별 문항</SectionTitle>
          <div className="space-y-5">
            {typeAnswers.map((a) => (
              <div key={a.questionId}>
                <p className="text-sm font-semibold text-[#333d4b]">{a.question}</p>
                {isEditing ? (
                  renderEditField(a)
                ) : (
                  <p className="mt-1.5 whitespace-pre-wrap text-[15px] leading-relaxed text-[#4e5968]">
                    {displayValue(a.value)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
