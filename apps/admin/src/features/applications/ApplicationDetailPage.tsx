import { useEffect, useRef, useState, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import type { ApplicationAnswer } from "@/types/application";
import { SECTIONS } from "@/types/application";
import { useApplications } from "./api";
import { ApplicationTypeBadge } from "./ApplicationTypeBadge";

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

const SectionTitle = ({ children }: { children: ReactNode }) => (
  <h2 className="mb-4 text-[15px] font-bold text-foreground">{children}</h2>
);

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="mt-1 text-[15px] font-medium text-foreground">{value}</p>
  </div>
);

const cardClass = "rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6";
// 스티키 상단바(h-16) 아래로 스크롤되도록 여백
const SCROLL_OFFSET = 88;

export const ApplicationDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useApplications();
  const application = data?.find((a) => a.id === id) ?? null;

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeId, setActiveId] = useState("");

  const grouped = application ? groupBySection(application.answers) : [];
  const hasInterview = !!application?.interviewTimes?.length;

  // 목차 항목 (답변 섹션 + 면접 희망시간)
  const navItems = [
    ...grouped.map(([section], i) => ({ id: `sec-${i}`, label: section })),
    ...(hasInterview ? [{ id: "sec-interview", label: "면접 희망시간" }] : []),
  ];

  // 스크롤 위치에 따라 현재 섹션 강조 (노션 목차처럼)
  useEffect(() => {
    if (!application) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: `-${SCROLL_OFFSET}px 0px -65% 0px` }
    );
    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [application]);

  const scrollToSection = (sectionKey: string) => {
    const el = sectionRefs.current[sectionKey];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const setRef = (key: string) => (el: HTMLElement | null) => {
    sectionRefs.current[key] = el;
  };

  return (
    <div className="animate-fade-up">
      {isLoading ? (
        <div className="space-y-4">
          <div className={cardClass}>
            <Skeleton className="h-7 w-28" />
            <Skeleton className="mt-3 h-5 w-40" />
          </div>
          <div className={cardClass}>
            <Skeleton className="h-5 w-24" />
            <Skeleton className="mt-4 h-12 w-full" />
          </div>
        </div>
      ) : !application ? (
        <p className="py-16 text-center text-sm text-muted-foreground">
          지원서를 찾을 수 없습니다.
        </p>
      ) : (
        <div className="flex gap-6">
          {/* 우측 목차 (노션 스타일) */}
          <nav className="hidden w-44 shrink-0 lg:order-2 lg:block">
            <div className="sticky top-24">
              <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                목차
              </p>
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={cn(
                        "w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors",
                        activeId === item.id
                          ? "bg-muted font-semibold text-foreground"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* 본문 */}
          <div className="min-w-0 flex-1 space-y-4 lg:order-1">
            {/* 프로필 헤더 */}
            <div className={cardClass}>
              <h1 className="text-2xl font-bold tracking-tight">{application.name}</h1>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <ApplicationTypeBadge type={application.applicationType} />
                <span className="text-muted-foreground/40">/</span>
                <span className="text-muted-foreground">{application.track}</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-5">
                <Field label="연락처" value={application.phone} />
                <Field label="이메일" value={application.email} />
              </div>
            </div>

            {/* 섹션별 문항 답변 */}
            {grouped.map(([section, items], i) => {
              const key = `sec-${i}`;
              return (
                <div key={key} id={key} ref={setRef(key)} className={cardClass}>
                  <SectionTitle>{section}</SectionTitle>
                  {section === SECTIONS.basic ? (
                    <div className="grid grid-cols-2 gap-4">
                      {items.map((a) => (
                        <Field key={a.questionId} label={a.question} value={a.answer} />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {items.map((a) => (
                        <div key={a.questionId}>
                          <p className="text-sm font-semibold text-[#333d4b]">{a.question}</p>
                          <p className="mt-1.5 whitespace-pre-wrap text-[15px] leading-relaxed text-[#4e5968]">
                            {a.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* 면접 희망시간 */}
            {hasInterview && (
              <div id="sec-interview" ref={setRef("sec-interview")} className={cardClass}>
                <SectionTitle>면접 희망시간</SectionTitle>
                <div className="flex flex-wrap gap-2">
                  {application.interviewTimes!.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg bg-muted px-3 py-1.5 text-sm font-medium text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
