import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/shared/Header";
import PageHeroSection from "@/components/shared/PageHeroSection";
import Footer from "@/components/shared/Footer";
import SEO from "@/components/shared/SEO";
import { cn } from "@/lib/utils";
import MLSessionContent from "@/components/pages/Activities/MLSessionContent";
import ToyProjectContent from "@/components/pages/Activities/ToyProjectContent";
import TrackSessionContent from "@/components/pages/Activities/TrackSessionContent";
import DatathonContent from "@/components/pages/Activities/DatathonContent";
import AcademicFestivalContent from "@/components/pages/Activities/AcademicFestivalContent";

const timelineSteps = [
  { id: "ml-session", label: "ML 세션", number: "01" },
  { id: "toy-project", label: "토이 프로젝트", number: "02" },
  { id: "track-session", label: "심화 세션", number: "03" },
  { id: "datathon", label: "데이터톤", number: "04" },
  { id: "academic-festival", label: "학술제", number: "05" },
];

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
  const [searchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState("ml-session");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const scrolledToSection = useRef(false);

  const setSectionRef = useCallback((id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  }, []);

  useEffect(() => {
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
  }, []);

  // ?section= 파라미터로 진입 시 해당 섹션으로 스크롤 (최초 1회)
  useEffect(() => {
    if (scrolledToSection.current) return;
    const sectionParam = searchParams.get("section");
    if (!sectionParam) return;
    const validIds = timelineSteps.map((s) => s.id);
    if (!validIds.includes(sectionParam)) return;

    const timeoutId = setTimeout(() => {
      scrolledToSection.current = true;
      const el = sectionRefs.current[sectionParam];
      if (el) {
        const offset = 100;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 300);

    return () => clearTimeout(timeoutId);
    // 마운트 시 한 번만 실행
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  }, []);

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
      <SEO
        title="활동 | KHUDA"
        description="KHUDA의 다양한 활동을 소개합니다."
        path="/activities"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "홈", item: "https://www.khuda.co.kr" },
              { "@type": "ListItem", position: 2, name: "활동", item: "https://www.khuda.co.kr/activities" },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "활동 | KHUDA",
            description: "KHUDA의 다양한 활동을 소개합니다.",
            url: "https://www.khuda.co.kr/activities",
            isPartOf: { "@type": "WebSite", url: "https://www.khuda.co.kr" },
          },
        ]}
      />
      <Header />

      <main>
        <PageHeroSection
          title="KHUDA의 다양한 활동"
          subtitle="기초 세션, 심화 세션, 정기 학술제 등 다양한 활동을 통해 데이터와 AI에 대해 함께 배우고 성장해요."
          backgroundImage="/images/headers/page-header.png"
        />

        {/* 콘텐츠 섹션 */}
        <section className="py-8 sm:py-16 px-4 sm:px-4 md:px-8 bg-background overflow-x-clip">
          <div className="mx-auto max-w-7xl">
            <div className="flex gap-6 lg:gap-10">

              {/* Sticky 세로 타임라인 (데스크톱) */}
              <nav className="hidden md:block w-44 lg:w-52 flex-shrink-0">
                <div className="sticky top-36 lg:top-40">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-5">
                    커리큘럼
                  </p>
                  <div className="relative pl-5">
                    <div className="absolute left-[5px] top-1 bottom-1 w-px bg-border" />

                    {timelineSteps.map((step) => (
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
                        <div
                          className={cn(
                            "absolute -left-5 w-[11px] h-[11px] rounded-full border-2 transition-all duration-200",
                            activeSection === step.id
                              ? "border-blue-600 bg-blue-600 scale-125"
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

              {/* 모바일 하단 네비게이션 */}
              <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 bg-card/95 backdrop-blur-md border border-border rounded-full px-2 py-1.5 shadow-lg">
                {timelineSteps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => scrollToSection(step.id)}
                    className={cn(
                      "flex items-center gap-1 rounded-full text-xs font-medium transition-all duration-200",
                      activeSection === step.id
                        ? "bg-blue-600 text-white px-3 py-1.5"
                        : "text-muted-foreground px-2 py-1.5"
                    )}
                  >
                    <span className="font-bold">{step.number}</span>
                  </button>
                ))}
              </div>

              {/* 콘텐츠 영역 */}
              <div className="flex-1 min-w-0 space-y-14 sm:space-y-20 md:space-y-28 pb-20 md:pb-0">
                {timelineSteps.map((step) => {
                  const Content = sectionComponents[step.id];
                  if (!Content) return null;
                  return (
                    <div
                      key={step.id}
                      id={step.id}
                      ref={setSectionRef(step.id)}
                      className="fade-up"
                    >
                      <Content />
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Activities;
