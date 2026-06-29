import { useMemo, useState, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import { Mail, Pencil, Phone, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateTime } from "@/lib/format";
import type { AnswerItem } from "@/types/application";
import { normalizeTrack } from "@/types/application";
import { useApplication, useUpdateApplication } from "./api";
import { ApplicationTypeBadge } from "./ApplicationTypeBadge";

// 운영진이 볼 필요 없는 문항은 숨긴다(개인정보 동의, 사전 확인 체크리스트).
const HIDDEN_FIELD_TYPES = new Set(["consent", "checklist"]);
const INTERVIEW_DATE = "interview_date";
const INTERVIEW_TIME = "interview_time";

// 파이썬 활용 단계: 저장 값(숫자)을 운영진이 이해할 수 있는 라벨로 보여준다.
const PYTHON_LEVELS: Record<string, string> = {
  "1": "기본 문법",
  "2": "기본 프로그래밍",
  "3": "데이터 분석",
  "4": "모델 학습",
  "5": "프로젝트 수행",
};

const has = (a: AnswerItem, kw: string) => a.question.includes(kw);
const isEssay = (a: AnswerItem) => a.fieldType === "textarea";
const isInterview = (a: AnswerItem) => a.fieldType === INTERVIEW_DATE || a.fieldType === INTERVIEW_TIME;

// 보기 좋은 값 표시. 파이썬 단계는 라벨로, 배열 값은 칩으로 보여준다.
function FieldValue({ answer }: { answer: AnswerItem }) {
  const value = answer.value;
  if (!value) return <span className="text-muted-foreground">-</span>;

  if (answer.fieldType === "python") {
    const label = PYTHON_LEVELS[value];
    return <span>{label ? `${label} (${value}단계)` : value}</span>;
  }

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      if (parsed.length === 0) return <span className="text-muted-foreground">-</span>;
      return (
        <div className="flex flex-wrap gap-1.5">
          {parsed.map((item, i) => (
            <span key={i} className="rounded-lg bg-muted px-2.5 py-1 text-sm font-medium">
              {String(item)}
            </span>
          ))}
        </div>
      );
    }
  } catch {
    // 평범한 문자열
  }
  return <span className="whitespace-pre-wrap">{value}</span>;
}

function parseInterviewTime(value: string): Record<string, string[]> {
  try {
    const parsed = JSON.parse(value || "{}");
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      const result: Record<string, string[]> = {};
      for (const [date, times] of Object.entries(parsed)) {
        result[date] = Array.isArray(times) ? times.map(String) : [];
      }
      return result;
    }
  } catch {
    // 무시
  }
  return {};
}

function parseStringArray(value: string): string[] {
  try {
    const parsed = JSON.parse(value || "[]");
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch {
    // 무시
  }
  return [];
}

const Card = ({ children, className }: { children: ReactNode; className?: string }) => (
  <section
    className={cn(
      "rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6",
      className
    )}
  >
    {children}
  </section>
);

const SectionTitle = ({ children, hint }: { children: ReactNode; hint?: string }) => (
  <div className="mb-4 flex items-baseline justify-between">
    <h2 className="text-[15px] font-bold text-foreground">{children}</h2>
    {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
  </div>
);

export const ApplicationDetailPage = () => {
  const { id = "" } = useParams();
  const { data: application, isLoading, isError } = useApplication(id);
  const update = useUpdateApplication(id);

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>({});
  // 면접 시간: {날짜: [시간]} / 면접 날짜는 시간이 있는 날짜에서 도출한다.
  const [interviewDraft, setInterviewDraft] = useState<Record<string, string[]>>({});
  const [newDate, setNewDate] = useState("");
  const [saveError, setSaveError] = useState<string | null>(null);

  const answers = application?.answers ?? [];

  const visible = useMemo(() => answers.filter((a) => !HIDDEN_FIELD_TYPES.has(a.fieldType)), [answers]);
  const headerName = useMemo(() => answers.find((a) => has(a, "이름")), [answers]);
  const headerPhone = useMemo(() => answers.find((a) => has(a, "연락처")), [answers]);
  const headerEmail = useMemo(() => answers.find((a) => has(a, "이메일")), [answers]);
  const headerTrack = useMemo(() => answers.find((a) => has(a, "트랙")), [answers]);
  const headerIds = useMemo(
    () => new Set([headerName?.questionId, headerPhone?.questionId, headerEmail?.questionId, headerTrack?.questionId]),
    [headerName, headerPhone, headerEmail, headerTrack]
  );

  const basics = useMemo(
    () => visible.filter((a) => a.position <= 9 && !headerIds.has(a.questionId)),
    [visible, headerIds]
  );
  const general = useMemo(
    () => visible.filter((a) => a.position >= 10 && !isEssay(a) && !isInterview(a) && !headerIds.has(a.questionId)),
    [visible, headerIds]
  );
  const essays = useMemo(() => visible.filter(isEssay), [visible]);
  const interviewDate = useMemo(() => answers.find((a) => a.fieldType === INTERVIEW_DATE), [answers]);
  const interviewTime = useMemo(() => answers.find((a) => a.fieldType === INTERVIEW_TIME), [answers]);
  const hasInterview = Boolean(interviewTime || interviewDate);

  const startEdit = () => {
    const seed: Record<string, string> = {};
    answers.forEach((a) => {
      if (HIDDEN_FIELD_TYPES.has(a.fieldType) || isInterview(a)) return;
      seed[String(a.questionId)] = a.value;
    });
    setDraft(seed);
    setInterviewDraft(interviewTime ? parseInterviewTime(interviewTime.value) : {});
    setNewDate("");
    setSaveError(null);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setSaveError(null);
  };

  const setField = (questionId: number, value: string) =>
    setDraft((prev) => ({ ...prev, [String(questionId)]: value }));

  const removeTime = (date: string, time: string) =>
    setInterviewDraft((prev) => ({ ...prev, [date]: (prev[date] ?? []).filter((t) => t !== time) }));
  const addTime = (date: string, time: string) => {
    const t = time.trim();
    if (!t) return;
    setInterviewDraft((prev) => ({
      ...prev,
      [date]: (prev[date] ?? []).includes(t) ? prev[date] : [...(prev[date] ?? []), t],
    }));
  };
  const removeDate = (date: string) =>
    setInterviewDraft((prev) => {
      const next = { ...prev };
      delete next[date];
      return next;
    });
  const addDate = () => {
    const d = newDate.trim();
    if (!d || interviewDraft[d]) {
      setNewDate("");
      return;
    }
    setInterviewDraft((prev) => ({ ...prev, [d]: [] }));
    setNewDate("");
  };

  const handleSave = async () => {
    const changed: Record<string, string> = {};

    answers.forEach((a) => {
      if (HIDDEN_FIELD_TYPES.has(a.fieldType) || isInterview(a)) return;
      const next = draft[String(a.questionId)] ?? "";
      if (next !== a.value) changed[String(a.questionId)] = next;
    });

    if (interviewTime || interviewDate) {
      const cleaned: Record<string, string[]> = {};
      Object.entries(interviewDraft).forEach(([date, times]) => {
        if (times.length > 0) cleaned[date] = times;
      });
      if (interviewTime) {
        const timeValue = JSON.stringify(cleaned);
        if (timeValue !== interviewTime.value) changed[String(interviewTime.questionId)] = timeValue;
      }
      if (interviewDate) {
        const dateValue = JSON.stringify(Object.keys(cleaned));
        if (dateValue !== interviewDate.value) changed[String(interviewDate.questionId)] = dateValue;
      }
    }

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
        <Card>
          <Skeleton className="h-7 w-28" />
          <Skeleton className="mt-3 h-5 w-40" />
        </Card>
        <Card>
          <Skeleton className="h-5 w-24" />
          <Skeleton className="mt-4 h-12 w-full" />
        </Card>
      </div>
    );
  }

  if (isError || !application) {
    return <p className="py-16 text-center text-sm text-muted-foreground">지원서를 찾을 수 없습니다.</p>;
  }

  const draftVal = (a: AnswerItem) => draft[String(a.questionId)] ?? "";

  return (
    <div className="animate-fade-up space-y-4">
      {/* 프로필 헤더 */}
      <Card className="hover:shadow-sm">
        {isEditing ? (
          <div className="space-y-3">
            {/* 수정 모드: 이름 + 취소/저장 한 줄, 그 아래 유형/트랙 */}
            <div className="flex items-center gap-2">
              {headerName && (
                <Input
                  value={draftVal(headerName)}
                  onChange={(e) => setField(headerName.questionId, e.target.value)}
                  className="h-9 flex-1 text-lg font-bold"
                />
              )}
              <Button size="sm" variant="outline" onClick={cancelEdit} disabled={update.isPending}>
                취소
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={update.isPending}
                className="transition-transform active:scale-95"
              >
                {update.isPending ? "저장 중..." : "저장"}
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <ApplicationTypeBadge type={application.applicationType} />
              {headerTrack && (
                <span className="text-sm font-medium text-muted-foreground">
                  {normalizeTrack(headerTrack.value) || "트랙 미선택"}
                </span>
              )}
            </div>
          </div>
        ) : (
          /* 보기 모드: 이름, 유형, 트랙, 수정 버튼을 한 줄에 */
          <div className="flex items-center gap-2">
            <h1 className="truncate text-xl font-bold tracking-tight sm:text-2xl">
              {headerName?.value || "이름 미상"}
            </h1>
            <ApplicationTypeBadge type={application.applicationType} />
            {headerTrack && (
              <span className="truncate text-sm font-medium text-muted-foreground">
                {normalizeTrack(headerTrack.value) || "트랙 미선택"}
              </span>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={startEdit}
              className="ml-auto shrink-0 transition-transform active:scale-95"
            >
              <Pencil className="size-4" />
              수정
            </Button>
          </div>
        )}

        <div className="mt-5 grid grid-cols-1 gap-3 border-t border-border pt-5 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <Phone className="size-4 shrink-0 text-muted-foreground" />
            {isEditing && headerPhone ? (
              <Input
                value={draftVal(headerPhone)}
                onChange={(e) => setField(headerPhone.questionId, e.target.value)}
                className="h-9"
              />
            ) : (
              <span className="text-[15px]">{headerPhone?.value || "-"}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Mail className="size-4 shrink-0 text-muted-foreground" />
            {isEditing && headerEmail ? (
              <Input
                value={draftVal(headerEmail)}
                onChange={(e) => setField(headerEmail.questionId, e.target.value)}
                className="h-9"
              />
            ) : (
              <span className="truncate text-[15px]">{headerEmail?.value || "-"}</span>
            )}
          </div>
        </div>

        {application.updatedBy && (
          <p className="mt-4 text-xs text-muted-foreground">
            마지막 수정: {application.updatedBy}
            {application.updatedAt ? ` (${formatDateTime(application.updatedAt)})` : ""}
          </p>
        )}
        {saveError && <p className="mt-3 text-sm text-[#f04452]">{saveError}</p>}
      </Card>

      {/* 기본 정보 */}
      {basics.length > 0 && (
        <Card>
          <SectionTitle>기본 정보</SectionTitle>
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            {basics.map((a) => (
              <div key={a.questionId}>
                <p className="text-xs text-muted-foreground">{a.question}</p>
                {isEditing ? (
                  <Input
                    value={draftVal(a)}
                    onChange={(e) => setField(a.questionId, e.target.value)}
                    className="mt-1.5 h-9"
                  />
                ) : (
                  <div className="mt-1 text-[15px] font-medium">
                    <FieldValue answer={a} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 활동 정보 */}
      {general.length > 0 && (
        <Card>
          <SectionTitle>활동 정보</SectionTitle>
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            {general.map((a) => (
              <div key={a.questionId}>
                <p className="text-xs text-muted-foreground">{a.question}</p>
                {isEditing ? (
                  <Input
                    value={draftVal(a)}
                    onChange={(e) => setField(a.questionId, e.target.value)}
                    className="mt-1.5 h-9"
                  />
                ) : (
                  <div className="mt-1 text-[15px] font-medium">
                    <FieldValue answer={a} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 자기소개서 (운영진 검토용 핵심) */}
      {essays.length > 0 && (
        <Card>
          <SectionTitle hint={`${essays.length}문항`}>자기소개서</SectionTitle>
          <div className="space-y-5">
            {essays.map((a) => (
              <div key={a.questionId}>
                <p className="text-sm font-semibold leading-relaxed text-[#333d4b]">{a.question}</p>
                {isEditing ? (
                  <textarea
                    value={draftVal(a)}
                    onChange={(e) => setField(a.questionId, e.target.value)}
                    rows={5}
                    className="mt-2 w-full rounded-xl border border-border bg-background px-3.5 py-3 text-[15px] leading-relaxed outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
                  />
                ) : (
                  <div className="mt-2 rounded-xl bg-[#F8F9FA] px-4 py-3.5 text-[15px] leading-[1.75] text-[#4e5968] whitespace-pre-wrap">
                    {a.value || "-"}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 면접 가능 일정 (수정 가능) */}
      {hasInterview && (
        <Card>
          <SectionTitle hint={isEditing ? "시간을 추가하거나 빼서 조율하세요" : undefined}>
            면접 가능 일정
          </SectionTitle>

          {isEditing ? (
            <div className="space-y-4">
              {Object.entries(interviewDraft).map(([date, times]) => (
                <div key={date} className="rounded-xl border border-border bg-muted/30 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold">{date}</span>
                    <button
                      onClick={() => removeDate(date)}
                      className="text-xs text-muted-foreground transition-colors hover:text-[#f04452]"
                    >
                      날짜 삭제
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {times.map((time) => (
                      <span
                        key={time}
                        className="inline-flex items-center gap-1 rounded-lg bg-background px-2.5 py-1 text-sm shadow-sm"
                      >
                        {time}
                        <button
                          onClick={() => removeTime(date, time)}
                          className="text-muted-foreground transition-colors hover:text-[#f04452]"
                          aria-label={`${time} 삭제`}
                        >
                          <X className="size-3.5" />
                        </button>
                      </span>
                    ))}
                    <TimeAdder onAdd={(t) => addTime(date, t)} />
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-2">
                <Input
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addDate();
                    }
                  }}
                  placeholder="예: 7월 8일 (수)"
                  className="h-9 max-w-[220px]"
                />
                <Button variant="outline" onClick={addDate} className="h-9">
                  <Plus className="size-4" />
                  날짜 추가
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {Object.entries(parseInterviewTime(interviewTime?.value ?? "{}")).map(([date, times]) => (
                <div key={date}>
                  <p className="text-sm font-semibold text-[#333d4b]">{date}</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {times.length > 0 ? (
                      times.map((time) => (
                        <span key={time} className="rounded-lg bg-muted px-2.5 py-1 text-sm font-medium">
                          {time}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </div>
                </div>
              ))}
              {interviewTime && Object.keys(parseInterviewTime(interviewTime.value)).length === 0 && interviewDate && (
                <div className="flex flex-wrap gap-1.5">
                  {parseStringArray(interviewDate.value).map((d) => (
                    <span key={d} className="rounded-lg bg-muted px-2.5 py-1 text-sm font-medium">
                      {d}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

// 시간 한 칸 추가용 인라인 입력
const TimeAdder = ({ onAdd }: { onAdd: (time: string) => void }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const commit = () => {
    onAdd(value);
    setValue("");
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 rounded-lg border border-dashed border-border px-2.5 py-1 text-sm text-muted-foreground transition-colors hover:border-blue-400 hover:text-blue-500"
      >
        <Plus className="size-3.5" />
        시간
      </button>
    );
  }

  return (
    <input
      autoFocus
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          commit();
        } else if (e.key === "Escape") {
          setValue("");
          setOpen(false);
        }
      }}
      placeholder="10:00"
      className="w-20 rounded-lg border border-blue-400 bg-background px-2 py-1 text-sm outline-none ring-2 ring-blue-400/30"
    />
  );
};
