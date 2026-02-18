import { useState, useEffect, useRef, useCallback } from "react";
import Header from "@/components/shared/Header";
import PageHeroSection from "@/components/shared/PageHeroSection";
import Footer from "@/components/shared/Footer";
import { cn } from "@/lib/utils";

type VersionType = "v1" | "v2";

const timelineSteps = [
  { id: "ml-session", label: "ML 세션", number: "01", image: "/images/activities/ml-session-2.jpeg", hasContent: true },
  { id: "toy-project", label: "토이 프로젝트", number: "02", image: "/images/activities/toy-project-1.jpeg", hasContent: true },
  { id: "track-session", label: "심화 세션", number: "03", image: "/images/activities/track-session.jpg", hasContent: true },
  { id: "datathon", label: "데이터톤", number: "04", image: "/images/activities/datathon-1.jpg", hasContent: true },
  { id: "academic-festival", label: "정기 학술제", number: "05", image: "/images/activities/festival-group.png", hasContent: true },
];

const tracks = [
  { name: "CV", fullName: "컴퓨터비전" },
  { name: "NLP", fullName: "자연어처리" },
  { name: "Finance", fullName: "금융" },
  { name: "Data Business", fullName: "데이터비즈니스" },
  { name: "Data Engineering", fullName: "데이터엔지니어링" },
  { name: "AI Engineering", fullName: "AI엔지니어링" },
];

// ============================================================================
// 섹션 콘텐츠 컴포넌트
// ============================================================================

const MLSessionContent = () => (
  <div className="max-w-3xl mx-auto text-center">
    <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">01 · Session</p>
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
      기초 세션 (ML Session)
    </h3>
    <p className="text-sm sm:text-base text-foreground/60 leading-[1.8] max-w-2xl mx-auto mb-8">
      방학 기간 동안 머신러닝의 기본 개념부터 주요 알고리즘까지, 이론과 실습을 병행하며 탄탄한 기초를 쌓는 세션입니다.
      주차별 교재 기반으로 핵심 개념 발제 및 코드 중심 학습,
      이론·코드 퀴즈 및 해설 세션, 팀 단위 주제 토의를 통해
      개념을 설명하고 질문할 수 있는 수준까지 도달하는 것을 목표로 합니다.
    </p>

    <div className="flex gap-3 justify-center">
      {[
        { src: "/images/activities/ml-session-1.jpeg", alt: "ML 세션 1" },
        { src: "/images/activities/ml-session-2.jpeg", alt: "ML 세션 2" },
        { src: "/images/activities/ml-session-3.jpeg", alt: "ML 세션 3" },
      ].map((img) => (
        <img key={img.src} src={img.src} alt={img.alt} className="rounded-xl h-56 sm:h-64 w-auto object-cover" />
      ))}
    </div>

    <div className="grid sm:grid-cols-3 gap-8 mt-8">
      {[
        { title: "개인 랜덤 발제", desc: "매주 랜덤으로 선택된 부원이 주제에 대해 발제하며, 발표 능력과 이해도를 향상시킵니다." },
        { title: "퀴즈 및 해설", desc: "학습한 내용을 퀴즈로 점검하고, 해설을 통해 복습하며 이해도를 높입니다." },
        { title: "팀별 토의", desc: "팀 단위로 주제를 토의하며 다양한 관점을 공유하고 협업 능력을 기릅니다." },
      ].map((item, index) => (
        <div key={item.title} className={index > 0 ? "pl-4 border-l border-border" : "pl-4"}>
          <h5 className="text-sm font-semibold text-foreground mb-1.5">{item.title}</h5>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

const ToyProjectContent = () => (
  <div className="max-w-3xl mx-auto text-center">
    <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">02 · Project</p>
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
      토이 프로젝트
    </h3>
    <p className="text-sm sm:text-base text-foreground/60 leading-[1.8] max-w-2xl mx-auto mb-8">
      학습한 파이썬 프로그래밍과 머신러닝 기초 지식을 바탕으로
      문제 정의부터 구현까지 전 과정을 경험합니다.
      프로젝트 주제 기획, 데이터 수집 및 전처리, 모델 설계 및 구현, 결과 정리 및 공유를 통해
      학습한 내용을 "아는 것"에서 끝내지 않고 직접 만들어보는 경험으로 연결합니다.
    </p>

    <div className="flex gap-3 justify-center">
      {[
        { src: "/images/activities/toy-project-1.jpeg", alt: "토이 프로젝트 1" },
        { src: "/images/activities/toy-project-2.jpeg", alt: "토이 프로젝트 2" },
      ].map((img) => (
        <img key={img.src} src={img.src} alt={img.alt} className="rounded-xl h-56 sm:h-64 w-auto object-cover" />
      ))}
    </div>
  </div>
);

const TrackSessionContent = () => (
  <div className="max-w-3xl mx-auto text-center">
    <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">03 · Session</p>
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
      심화 세션 (Track Session)
    </h3>
    <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {tracks.map((track) => (
          <span
            key={track.name}
            className="px-3 py-1.5 rounded-full bg-muted text-foreground/70 text-xs sm:text-sm font-medium"
          >
            {track.name}
          </span>
        ))}
      </div>
    <p className="text-sm sm:text-base text-foreground/60 leading-[1.8] max-w-2xl mx-auto mb-8">
      학기 중에는 관심 분야에 따라 6개 트랙 중 선택하여 보다 전문적인 주제와 실제 적용 사례를 다룹니다.
      트랙장 주관 심화 이론 및 적용 기법 학습, 최신 논문, 산업 사례, 실무 관점 공유를 통해
      같은 '머신러닝'이라도 분야에 따라 어떻게 달라지는지 이해하는 단계로 나아갑니다.
    </p>

    <div className="flex justify-center">
      <img src="/images/activities/track-session.jpg" alt="심화 세션" className="rounded-xl h-56 sm:h-64 w-auto object-cover" />
    </div>
  </div>
);

const DatathonContent = () => (
  <div className="max-w-3xl mx-auto text-center">
    <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">04 · Datathon</p>
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
      데이터톤
    </h3>
    <p className="text-sm sm:text-base text-foreground/60 leading-[1.8] max-w-2xl mx-auto mb-8">
      트랙 구분 없이 팀을 구성해 주어진 데이터셋과 문제를 해결하는 대회입니다.
      데이터 전처리부터 모델링, 결과 해석까지 전 과정을 제한된 시간 내에 수행하며,
      실전 경험과 팀워크를 동시에 쌓을 수 있는 KHUDA의 핵심 행사 중 하나입니다.
    </p>

    <div className="flex gap-3 justify-center">
      {[
        { src: "/images/activities/datathon-2.jpg", alt: "데이터톤 단체사진" },
        { src: "/images/activities/datathon-1.jpg", alt: "데이터톤 발표" },
        { src: "/images/activities/datathon-3.jpg", alt: "데이터톤 현장" },
      ].map((img) => (
        <img key={img.src} src={img.src} alt={img.alt} className="rounded-xl h-56 sm:h-64 w-auto object-cover" />
      ))}
    </div>
  </div>
);

const AcademicFestivalContent = () => (
  <div className="max-w-3xl mx-auto text-center">
    <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">05 · Conference</p>
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
      정기 학술제
    </h3>
    <p className="text-sm sm:text-base text-foreground/60 leading-[1.8] max-w-2xl mx-auto mb-8">
      트랙별 1–2팀을 구성해 팀 단위 프로젝트를 수행하고,
      학술 포스터 제작과 프로젝트 발표를 진행합니다.
      프로젝트를 공유하고 설명하는 경험을 통해
      사고의 깊이와 표현력을 함께 성장시킵니다.
    </p>

    <div className="flex justify-center">
      <img src="/images/activities/festival-group.png" alt="정기 학술제" className="rounded-xl h-56 sm:h-64 w-auto object-cover" />
    </div>

    <div className="grid sm:grid-cols-2 gap-8 mt-8">
      {[
        {
          title: "포스터 발표",
          desc: "참가 팀이 자신의 프로젝트를 포스터로 만들어 발표하는 자리입니다. KHUDA 부원들 간의 상호 평가를 통해 피드백을 받습니다.",
        },
        {
          title: "정식 발표",
          desc: "심사위원분들을 모셔서 진행하는 프로젝트 발표입니다. 교수님을 비롯해 현직자 분들이 심사위원으로 참여합니다.",
        },
      ].map((item, index) => (
        <div key={item.title} className={index > 0 ? "pl-4 border-l border-border" : "pl-4"}>
          <h5 className="text-sm font-semibold text-foreground mb-1.5">{item.title}</h5>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

const sectionComponents: Record<string, React.FC> = {
  "ml-session": MLSessionContent,
  "toy-project": ToyProjectContent,
  "datathon": DatathonContent,
  "track-session": TrackSessionContent,
  "academic-festival": AcademicFestivalContent,
};

// ============================================================================
// 메인 컴포넌트
// ============================================================================

const Activities = () => {
  const [version, setVersion] = useState<VersionType>("v1");
  const [activeSection, setActiveSection] = useState("ml-session");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const setSectionRef = useCallback((id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  }, []);

  useEffect(() => {
    if (version !== "v2") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    timelineSteps.forEach((step) => {
      const el = sectionRefs.current[step.id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [version]);

  useEffect(() => {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const fadeEls = document.querySelectorAll(".fade-up");
    fadeEls.forEach((el) => fadeObserver.observe(el));

    return () => fadeObserver.disconnect();
  }, [version]);

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main>
        <PageHeroSection
          title="KHUDA의 다양한 활동"
          subtitle="세미나, 스터디, 해커톤 등 다양한 활동을 통해 데이터와 AI에 대해 함께 배우고 성장해요."
        />

        {/* 버전 토글 */}
        <div className="flex justify-center items-center gap-10 sm:gap-14 py-5 sm:py-6 bg-background/95 backdrop-blur-sm sticky top-12 sm:top-16 md:top-18 lg:top-20 z-30 mt-2 sm:mt-4">
          {[
            { key: "v1" as VersionType, label: "Overview" },
            { key: "v2" as VersionType, label: "Detail" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setVersion(tab.key)}
              className={cn(
                "relative text-base sm:text-lg font-semibold transition-all duration-200 pb-2",
                version === tab.key
                  ? "text-foreground"
                  : "text-muted-foreground/50 hover:text-muted-foreground"
              )}
            >
              {tab.label}
              {version === tab.key && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-foreground rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* ================================================================ */}
        {/* Version 1: 가로 타임라인 + 수직 콘텐츠 */}
        {/* ================================================================ */}
        {version === "v1" && (
          <section className="py-10 sm:py-16 px-3 sm:px-4 md:px-8 bg-background">
            <div className="mx-auto max-w-6xl">
              {/* 가로 타임라인 (사진 위아래 교차) */}
              <div className="relative mb-12 sm:mb-20 hidden sm:block max-w-4xl mx-auto">
                {/* 중앙 가로선 */}
                <div className="absolute top-1/2 left-[8%] right-[8%] -translate-y-1/2">
                  <div className="h-px bg-border" />
                </div>

                <div className="grid grid-cols-5">
                  {timelineSteps.map((step, index) => {
                    const isTop = index % 2 === 0;
                    return (
                      <button
                        key={step.id}
                        onClick={() => {
                          const el = document.getElementById(`v1-${step.id}`);
                          if (el) {
                            const offset = 100;
                            const top = el.getBoundingClientRect().top + window.scrollY - offset;
                            window.scrollTo({ top, behavior: "smooth" });
                          }
                        }}
                        className="group relative flex flex-col items-center"
                      >
                        {/* 위쪽 콘텐츠 (짝수 인덱스) */}
                        <div className={cn("w-28 lg:w-36 mb-3", isTop ? "opacity-100" : "opacity-0 pointer-events-none")}>
                          <img
                            src={step.image}
                            alt={step.label}
                            className="w-full aspect-[4/3] object-cover rounded-xl shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300"
                          />
                          <p className="mt-2.5 text-xs lg:text-sm font-semibold text-foreground/80 group-hover:text-foreground text-center transition-colors">{step.label}</p>
                        </div>

                        {/* 연결선 (위) */}
                        <div className={cn("w-px h-5 bg-border", isTop ? "" : "order-first")} />

                        {/* 도트 */}
                        <div className="relative z-10 w-9 h-9 rounded-full bg-background border-2 border-primary/30 text-primary flex items-center justify-center text-xs font-bold group-hover:border-primary group-hover:bg-primary group-hover:text-background transition-all duration-300 my-0.5">
                          {step.number}
                        </div>

                        {/* 연결선 (아래) */}
                        <div className={cn("w-px h-5 bg-border", !isTop ? "" : "order-last")} />

                        {/* 아래쪽 콘텐츠 (홀수 인덱스) */}
                        <div className={cn("w-28 lg:w-36 mt-3", !isTop ? "opacity-100" : "opacity-0 pointer-events-none")}>
                          <img
                            src={step.image}
                            alt={step.label}
                            className="w-full aspect-[4/3] object-cover rounded-xl shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300"
                          />
                          <p className="mt-2.5 text-xs lg:text-sm font-semibold text-foreground/80 group-hover:text-foreground text-center transition-colors">{step.label}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 모바일 타임라인 */}
              <div className="sm:hidden mb-10">
                <div className="flex justify-between items-center px-4">
                  {timelineSteps.map((step) => (
                    <button
                      key={step.id}
                      onClick={() => {
                        const el = document.getElementById(`v1-${step.id}`);
                        if (el) {
                          const offset = 100;
                          const top = el.getBoundingClientRect().top + window.scrollY - offset;
                          window.scrollTo({ top, behavior: "smooth" });
                        }
                      }}
                      className="flex flex-col items-center group"
                    >
                      <div className="w-9 h-9 rounded-full bg-background border-2 border-primary/30 text-primary flex items-center justify-center text-xs font-bold group-hover:border-primary group-hover:bg-primary group-hover:text-background transition-all duration-300">
                        {step.number}
                      </div>
                      <span className="mt-2 text-[11px] font-medium text-foreground/70 text-center leading-tight">
                        {step.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 콘텐츠 섹션 */}
              <div className="space-y-20 sm:space-y-28">
                {timelineSteps.filter((s) => s.hasContent).map((step) => {
                  const Content = sectionComponents[step.id];
                  if (!Content) return null;
                  return (
                    <div key={step.id} id={`v1-${step.id}`} className="fade-up">
                      <Content />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ================================================================ */}
        {/* Version 2: 세로 sticky 타임라인 + 수직 콘텐츠 */}
        {/* ================================================================ */}
        {version === "v2" && (
          <section className="py-10 sm:py-16 px-3 sm:px-4 md:px-8 bg-background">
            <div className="mx-auto max-w-7xl">
              <div className="flex gap-6 lg:gap-10">
                {/* Sticky 세로 타임라인 (데스크톱) */}
                <nav className="hidden md:block w-44 lg:w-52 flex-shrink-0">
                  <div className="sticky top-36 lg:top-40">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-5">
                      커리큘럼
                    </p>
                    <div className="relative pl-5">
                      {/* 세로 라인 */}
                      <div className="absolute left-[5px] top-1 bottom-1 w-px bg-border" />

                      {timelineSteps.filter((s) => s.hasContent).map((step) => (
                        <button
                          key={step.id}
                          onClick={() => scrollToSection(step.id)}
                          className={cn(
                            "relative flex items-center w-full text-left py-3 transition-all duration-200",
                            activeSection === step.id
                              ? "text-foreground"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {/* 도트 */}
                          <div
                            className={cn(
                              "absolute -left-5 w-[11px] h-[11px] rounded-full border-2 transition-all duration-200",
                              activeSection === step.id
                                ? "border-primary bg-primary scale-125"
                                : "border-border bg-background"
                            )}
                          />
                          <span className={cn(
                            "text-sm transition-all duration-200",
                            activeSection === step.id ? "font-semibold" : "font-medium"
                          )}>
                            {step.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </nav>

                {/* 모바일 가로 네비 */}
                <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-1.5 bg-card/95 backdrop-blur-md border border-border rounded-full px-2 py-1.5 shadow-lg">
                  {timelineSteps.filter((s) => s.hasContent).map((step) => (
                    <button
                      key={step.id}
                      onClick={() => scrollToSection(step.id)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                        activeSection === step.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {step.number}
                    </button>
                  ))}
                </div>

                {/* 콘텐츠 영역 */}
                <div className="flex-1 min-w-0 space-y-20 sm:space-y-28">
                  {timelineSteps.filter((s) => s.hasContent).map((step) => {
                    const Content = sectionComponents[step.id];
                    if (!Content) return null;
                    return (
                      <div
                        key={step.id}
                        id={step.id}
                        ref={setSectionRef(step.id)}
                        className="fade-up [&>div]:text-left [&>div]:mx-0 [&>div]:max-w-none [&_p]:mx-0 [&_.flex]:justify-start [&_.grid]:text-left [&_.grid>div]:border-l [&_.grid>div]:border-border"
                      >
                        <Content />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Activities;
