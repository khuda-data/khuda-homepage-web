import { useState, useEffect, useRef, useCallback } from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { cn } from "@/lib/utils";

const timelineSteps = [
  { id: "ml-session", label: "ML 세션", number: "01" },
  { id: "toy-project", label: "토이 프로젝트", number: "02" },
  { id: "track-session", label: "심화 세션", number: "03" },
  { id: "datathon", label: "데이터톤", number: "04" },
  { id: "academic-festival", label: "학술제", number: "05" },
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
// 이미지 갤러리 공통 컴포넌트 (모바일 가로 스크롤)
// ============================================================================
const ImageGallery = ({ images }: { images: { src: string; alt: string }[] }) => (
  <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-x-visible scrollbar-hide">
    {images.map((img) => (
      <img
        key={img.src}
        src={img.src}
        alt={img.alt}
        className="rounded-xl h-44 sm:h-60 md:h-64 w-[72vw] sm:w-auto max-w-xs sm:max-w-none flex-shrink-0 snap-start object-cover"
      />
    ))}
  </div>
);

// ============================================================================
// 섹션 콘텐츠 컴포넌트
// ============================================================================

const MLSessionContent = () => (
  <div>
    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">01 · Session</p>
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
      기초 세션 (ML Session)
    </h3>
    <p className="text-sm sm:text-base text-foreground/60 leading-[1.8] mb-6 sm:mb-8">
      방학 기간 동안 머신러닝의 기본 개념부터 주요 알고리즘까지, 이론과 실습을 병행하며 탄탄한 기초를 쌓는 세션입니다.<br />
      주차별 교재 기반으로 핵심 개념 발제 및 코드 중심 학습, 이론·코드 퀴즈 및 해설 세션,<br />
      팀 단위 주제 토의를 통해 개념을 설명하고 질문할 수 있는 수준까지 도달하는 것을 목표로 합니다.
    </p>

    <ImageGallery
      images={[
        { src: "/images/activities/ml-session-1.jpeg", alt: "ML 세션 1" },
        { src: "/images/activities/ml-session-3.jpeg", alt: "ML 세션 3" },
        { src: "/images/activities/ml-session8.jpg", alt: "ML 세션 8" },
      ]}
    />

    <div className="flex flex-col sm:flex-row mt-6 sm:mt-8 border-y sm:border-y-0 sm:border-x border-border divide-y sm:divide-y-0 sm:divide-x divide-border">
      {[
        { title: "개인 랜덤 발제", desc: "매주 랜덤으로 선택된 부원이 주제에 대해 발제하며, 발표 능력과 이해도를 향상시킵니다." },
        { title: "퀴즈 및 해설", desc: "학습한 내용을 퀴즈로 점검하고, 해설을 통해 복습하며 이해도를 높입니다." },
        { title: "팀별 토의", desc: "팀 단위로 주제를 토의하며 다양한 관점을 공유하고 협업 능력을 기릅니다." },
      ].map((item) => (
        <div key={item.title} className="flex-1 px-4 py-4 sm:py-0">
          <h5 className="text-sm font-semibold text-foreground mb-1.5">{item.title}</h5>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

const ToyProjectContent = () => (
  <div>
    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">02 · Project</p>
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
      토이 프로젝트
    </h3>
    <p className="text-sm sm:text-base text-foreground/60 leading-[1.8] mb-6 sm:mb-8">
      학습한 파이썬 프로그래밍과 머신러닝 기초 지식을 바탕으로 문제 정의부터 구현까지 전 과정을 경험합니다.<br />
      프로젝트 주제 기획, 데이터 수집 및 전처리, 모델 설계 및 구현, 결과 정리 및 공유를 통해<br />
      학습한 내용을 "아는 것"에서 끝내지 않고 직접 만들어보는 경험으로 연결합니다.
    </p>

    <ImageGallery
      images={[
        { src: "/images/activities/toy-project-3.jpg", alt: "토이 프로젝트 3" },
        { src: "/images/activities/toy-project-1.jpeg", alt: "토이 프로젝트 1" },
        { src: "/images/activities/toy-project-2.jpeg", alt: "토이 프로젝트 2" },
      ]}
    />
  </div>
);

const TrackSessionContent = () => (
  <div>
    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">03 · Session</p>
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
      심화 세션 (Track Session)
    </h3>
    <div className="flex flex-wrap gap-2 mb-5">
      {tracks.map((track) => (
        <span
          key={track.name}
          className="px-3 py-1.5 rounded-full bg-muted text-foreground/70 text-xs sm:text-sm font-medium"
        >
          {track.name}
        </span>
      ))}
    </div>
    <p className="text-sm sm:text-base text-foreground/60 leading-[1.8] mb-6 sm:mb-8">
      학기 중에는 관심 분야에 따라 6개 트랙 중 선택하여 보다 전문적인 주제와 실제 적용 사례를 다룹니다.<br />
      트랙장 주관 심화 이론 및 적용 기법 학습, 최신 논문, 산업 사례, 실무 관점 공유를 통해<br />
      같은 '머신러닝'이라도 분야에 따라 어떻게 달라지는지 이해하는 단계로 나아갑니다.
    </p>

    <ImageGallery
      images={[
        { src: "/images/activities/track-session.jpg", alt: "심화 세션" },
        { src: "/images/activities/track-session-2.jpg", alt: "심화 세션 2" },
        { src: "/images/activities/track-session-3.jpg", alt: "심화 세션 3" },
      ]}
    />
  </div>
);

const DatathonContent = () => (
  <div>
    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">04 · Datathon</p>
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
      데이터톤
    </h3>
    <p className="text-sm sm:text-base text-foreground/60 leading-[1.8] mb-6 sm:mb-8">
      트랙 구분 없이 팀을 구성해 주어진 데이터셋과 문제를 해결하는 대회입니다.<br />
      데이터 전처리부터 모델링, 결과 해석까지 전 과정을 제한된 시간 내에 수행하며,<br />
      실전 경험과 팀워크를 동시에 쌓을 수 있는 KHUDA의 핵심 행사 중 하나입니다.
    </p>

    <ImageGallery
      images={[
        { src: "/images/activities/datathon-2.jpg", alt: "데이터톤 단체사진" },
        { src: "/images/activities/datathon-1.jpg", alt: "데이터톤 발표" },
        { src: "/images/activities/datathon-3.jpg", alt: "데이터톤 현장" },
      ]}
    />
  </div>
);

const AcademicFestivalContent = () => (
  <div>
    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">05 · Conference</p>
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
      정기 학술제
    </h3>
    <p className="text-sm sm:text-base text-foreground/60 leading-[1.8] mb-6 sm:mb-8">
      트랙별 1–2팀을 구성해 팀 단위 프로젝트를 수행하고, 학술 포스터 제작과 프로젝트 발표를 진행합니다.<br />
      프로젝트를 공유하고 설명하는 경험을 통해 사고의 깊이와 표현력을 함께 성장시킵니다.
    </p>

    <div className="flex gap-3 justify-start">
      {[
        { src: "/images/activities/conference-1.png", alt: "정기 학술제 1" },
        { src: "/images/activities/conference-2.jpeg", alt: "정기 학술제 2" },
      ].map((img) => (
        <img key={img.src} src={img.src} alt={img.alt} className="rounded-xl h-44 sm:h-60 md:h-64 w-auto object-cover" />
      ))}
    </div>

    <div className="flex flex-col sm:flex-row mt-6 sm:mt-8 border-y sm:border-y-0 sm:border-x border-border divide-y sm:divide-y-0 sm:divide-x divide-border">
      <div className="flex-1 px-4 py-4 sm:py-0">
        <h5 className="text-sm font-semibold text-foreground mb-1.5">포스터 발표</h5>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          참가 팀이 자신의 프로젝트를 포스터로 만들어 발표하는 자리입니다.<br />
          KHUDA 부원들 간의 상호 평가를 통해 피드백을 받습니다.
        </p>
      </div>
      <div className="flex-1 px-4 py-4 sm:py-0">
        <h5 className="text-sm font-semibold text-foreground mb-1.5">정식 발표</h5>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          심사위원분들을 모셔서 진행하는 프로젝트 발표입니다.<br />
          교수님을 비롯해 현직자 분들이 심사위원으로 참여합니다.
        </p>
      </div>
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
  const [activeSection, setActiveSection] = useState("ml-session");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

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
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />

      <main>
        {/* 히어로 섹션 */}
        <section className="relative overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url(/images/headers/hello.png)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-black/15" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-[1]" />
          <div className="container mx-auto relative z-10 px-4 sm:px-6 md:px-12 lg:px-16 pt-28 sm:pt-36 md:pt-44 lg:pt-52 xl:pt-60 pb-8 sm:pb-10 md:pb-12 lg:pb-14 xl:pb-16">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-2.5 md:mb-3 text-white leading-[1.3] text-left">
              KHUDA의 다양한 활동
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/70 leading-relaxed max-w-2xl text-left">
              기초 세션, 심화 세션, 정기 학술제 등 다양한 활동을 통해 데이터와 AI에 대해 함께 배우고 성장해요.
            </p>
          </div>
        </section>

        {/* 콘텐츠 섹션 */}
        <section className="py-8 sm:py-16 px-4 sm:px-4 md:px-8 bg-background">
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
