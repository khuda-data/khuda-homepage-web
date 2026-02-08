import { useState } from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Beams from "@/components/shared/Beams";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SECTION_STYLES, SCROLL_ANIMATION_CONFIG } from "@/lib/constants";

// 탭 타입
type TabType = "curriculum" | "datathon" | "conference";

const Activities = () => {
  const [activeTab, setActiveTab] = useState<TabType>("curriculum");
  const [selectedDatathonIndex, setSelectedDatathonIndex] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [toyConferenceImageIndex, setToyConferenceImageIndex] = useState(0);
  const [academicConferenceImageIndex, setAcademicConferenceImageIndex] = useState(0);
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: SCROLL_ANIMATION_CONFIG.threshold });

  // Conference 이미지 데이터
  const toyConferenceImages = [
    "/images/conference/toy-1.jpg",
    "/images/conference/toy-2.jpg",
    "/images/conference/toy-3.jpg",
    "/images/conference/toy-4.jpg",
    "/images/conference/toy-5.jpg",
    "/images/conference/toy-6.jpg",
  ];

  const academicConferenceImages = [
    "/images/conference/academic-1.jpg",
    "/images/conference/academic-2.jpg",
    "/images/conference/academic-3.jpg",
    "/images/conference/academic-4.jpg",
    "/images/conference/academic-5.jpg",
    "/images/conference/academic-6.jpg",
  ];

  // 탭 데이터
  const tabs = [
    { id: "curriculum" as TabType, label: "커리큘럼" },
    { id: "datathon" as TabType, label: "데이터톤" },
    { id: "conference" as TabType, label: "컨퍼런스" },
  ];

  // 트랙 데이터
  const tracks = [
    { id: "cv", name: "CV", fullName: "컴퓨터비전" },
    { id: "nlp", name: "NLP", fullName: "자연어처리" },
    { id: "fin", name: "Finance", fullName: "금융" },
    { id: "db", name: "Data Business", fullName: "데이터비즈니스" },
    { id: "de", name: "Data Engineering", fullName: "데이터엔지니어링" },
    { id: "aie", name: "AI Engineering", fullName: "AI엔지니어링" },
  ];

  // 데이터톤 히스토리
  const datathonHistory = [
    { 
      number: "제1회", 
      title: "제1회 KHU'DATA 데이터톤",
      theme: "", 
      description: "",
      images: [
        "/images/datathon/1-1.jpg",
        "/images/datathon/1-2.jpg",
        "/images/datathon/1-3.jpg",
        "/images/datathon/1-4.jpg",
        "/images/datathon/1-5.jpg",
        "/images/datathon/1-6.jpg",
      ],
    },
    { 
      number: "제2회", 
      title: "제2회 KHU'DATA 데이터톤",
      theme: "", 
      description: "",
      images: [
        "/images/datathon/2-1.jpg",
        "/images/datathon/2-2.jpg",
        "/images/datathon/2-3.jpg",
        "/images/datathon/2-4.jpg",
        "/images/datathon/2-5.jpg",
        "/images/datathon/2-6.jpg",
      ],
    },
  ];

  const selectedDatathon = datathonHistory[selectedDatathonIndex];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className={cn(
            "relative pt-24 sm:pt-28 md:pt-36 lg:pt-44 pb-28 sm:pb-32 md:pb-40 lg:pb-48 mt-16 sm:mt-20 md:mt-28 lg:mt-36 overflow-hidden bg-black",
            heroVisible ? SECTION_STYLES.visibility.visible : SECTION_STYLES.visibility.hidden
          )}
        >
          {/* Beams 배경 */}
          <div className="absolute inset-0 z-0">
            <Beams
              beamWidth={3}
              beamHeight={30}
              beamNumber={20}
              lightColor="#ffffff"
              speed={2}
              noiseIntensity={1.75}
              scale={0.2}
              rotation={30}
            />
          </div>
          
          {/* 상단 그라데이션 - 헤더와 자연스러운 연결 */}
          <div className="absolute top-0 left-0 right-0 h-32 sm:h-40 md:h-48 bg-gradient-to-b from-background to-transparent z-[1]" />
          
          {/* 하단 그라데이션 - 자연스러운 연결 */}
          <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 md:h-48 bg-gradient-to-t from-background to-transparent z-[1]" />
          
          <div className={cn(SECTION_STYLES.container.base, "relative z-10")}>
            <div className="max-w-5xl mx-auto">
              <div className={SECTION_STYLES.header.container}>
                <h2 className="text-[1.75rem] sm:text-[2rem] md:text-[2.75rem] lg:text-[3.25rem] font-bold mb-2 sm:mb-2 md:mb-3 text-white">
                  Experience Structured Growth
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-300">
                  KHUDA의 모든 활동은 '성장 경험'을 중심으로 설계됩니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 섹션 제목 & 탭 버튼 - 기존 CurriculumSection 스타일 */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-12 relative bg-background">
          <div className="container mx-auto relative z-10">
            {/* 섹션 제목 */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4">
                {activeTab === "curriculum" && "방학세션으로 시작해요"}
                {activeTab === "datathon" && "KHU'DATA — KHUDA 데이터톤"}
                {activeTab === "conference" && "컨퍼런스"}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
                {activeTab === "curriculum" && "방학 동안 파이썬 실습과 머신러닝 기초를 함께 배워요. 개인 랜덤 발제, 퀴즈, 팀별 토의를 통해 기초를 탄탄히 다지고, 팀 단위로 토이프로젝트를 진행합니다."}
                {activeTab === "datathon" && <>KHU'DATA는 KHUDA가 주관하는 실전형 데이터 분석 대회입니다. 데이터를 기반으로 사회·산업 전반의 문제를 탐구하고 창의적인 데이터 기반 솔루션을 제시하는 것을 목표로 합니다.<br />실제 데이터 기반 문제 제시, 팀 단위 분석 및 모델링, 인사이트 도출 및 결과 발표를 통해 데이터 분석을 성과물로 완성해보는 경험을 제공합니다.</>}
                {activeTab === "conference" && "프로젝트를 공유하고 설명하는 경험을 통해 사고의 깊이와 표현력을 함께 성장시킵니다."}
              </p>
            </div>

            {/* 탭 버튼 - 기존 버튼 스타일 */}
            <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 min-h-[44px] flex items-center justify-center",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground active:scale-95"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            {/* Curriculum Tab */}
            {activeTab === "curriculum" && (
              <div className="space-y-8 sm:space-y-12">
                {/* 기초 세션 (ML Session) */}
                <div className="rounded-2xl sm:rounded-3xl bg-black/98 backdrop-blur-2xl border border-white/10 overflow-hidden p-6 sm:p-8 md:p-10 lg:p-12">
                  {/* 그라데이션 배경 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-blue-950/25 to-primary/15 rounded-3xl pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-tl from-primary/12 via-transparent to-transparent rounded-3xl pointer-events-none" />
                  
                  <div className="relative z-10">
                    {/* 섹션 헤더 */}
                    <div className="mb-5 sm:mb-6">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white">
                        기초 세션 (ML Session)
                      </h3>
                      <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                        방학 기간 동안 머신러닝의 기본 개념부터 주요 알고리즘까지 체계적으로 학습합니다.
                      </p>
                    </div>

                    {/* Session 카드 - 텍스트 왼쪽, 이미지 오른쪽 */}
                    <div className="bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 px-6 sm:px-8 md:px-12 py-8 sm:py-10 md:py-14 mb-8">
                      <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
                        <div>
                          <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 text-white">Session</h4>
                          <p className="text-sm text-white/50 mb-4">Foundations of Data & Machine Learning</p>
                          <div className="text-sm sm:text-base text-white/80 leading-relaxed space-y-5">
                            <p>
                              머신러닝의 기본 개념부터 주요 알고리즘까지, 이론과 실습을 병행하며 탄탄한 기초를 쌓는 세션입니다.
                            </p>
                            <p>
                              주차별 교재(현재: 파이썬 머신러닝 완벽가이드) 기반으로 핵심 개념 발제 및 코드 중심 학습,
                              이론·코드 퀴즈 및 해설 세션, 팀 단위 주제 토의를 통해 개념을 설명하고 질문할 수 있는 수준까지 도달하는 것을 목표로 합니다.
                            </p>
                          </div>
                        </div>
                        <div className="bg-white/5 rounded-xl aspect-video flex items-center justify-center border border-white/10">
                          <span className="text-white/30 text-sm">이미지 영역</span>
                        </div>
                      </div>
                    </div>

                    {/* Project 카드 - 이미지 왼쪽, 텍스트 오른쪽 */}
                    <div className="bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 px-6 sm:px-8 md:px-12 py-8 sm:py-10 md:py-14">
                      <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
                        <div className="order-2 md:order-1 bg-white/5 rounded-xl aspect-video flex items-center justify-center border border-white/10">
                          <span className="text-white/30 text-sm">이미지 영역</span>
                        </div>
                        <div className="order-1 md:order-2">
                          <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 text-white">Project</h4>
                          <p className="text-sm text-white/50 mb-4">Toy Project (Team-based)</p>
                          <div className="text-sm sm:text-base text-white/80 leading-relaxed space-y-5">
                            <p>
                              방학 세션 동안 팀을 구성해 진행하는 프로젝트로, 학습한 파이썬 프로그래밍과 머신러닝 기초 지식을 바탕으로
                              문제 정의부터 구현까지 전 과정을 경험합니다.
                            </p>
                            <p>
                              프로젝트 주제 기획, 데이터 수집 및 전처리, 모델 설계 및 구현, 결과 정리 및 공유를 통해
                              학습한 내용을 "아는 것"에서 끝내지 않고 직접 만들어보는 경험으로 연결합니다.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 심화 세션 (Track Session) */}
                <div className="rounded-2xl sm:rounded-3xl bg-black/98 backdrop-blur-2xl border border-white/10 overflow-hidden p-6 sm:p-8 md:p-10 lg:p-12">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-blue-950/25 to-primary/15 rounded-3xl pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-tl from-primary/12 via-transparent to-transparent rounded-3xl pointer-events-none" />
                  
                  <div className="relative z-10">
                    {/* 섹션 헤더 */}
                    <div className="mb-5 sm:mb-6">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white">
                        심화 세션 (Track Session)
                      </h3>
                      <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                        학기 중에는 관심 분야에 따라 트랙을 선택해 보다 전문적인 주제와 실제 적용 사례를 다룹니다.
                      </p>
                      {/* Track Tags */}
                      <div className="flex flex-wrap gap-2 mt-6">
                        {tracks.map((track) => (
                          <span 
                            key={track.id}
                            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-primary/20 text-primary text-xs sm:text-sm font-medium border border-primary/30"
                          >
                            {track.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Session 카드 - 텍스트 왼쪽, 이미지 오른쪽 */}
                    <div className="bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 px-6 sm:px-8 md:px-12 py-8 sm:py-10 md:py-14 mb-8">
                      <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
                        <div>
                          <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 text-white">Session</h4>
                          <p className="text-sm text-white/50 mb-4">Advanced Track-based Learning</p>
                          <div className="text-sm sm:text-base text-white/80 leading-relaxed space-y-5">
                            <p>
                              CV, NLP, Finance, Data Business, Data Engineering, AI Engineering 등 6개 트랙 중 선택하여
                              트랙장 주관 심화 이론 및 적용 기법 학습, 최신 논문, 산업 사례, 실무 관점 공유를 통해
                              같은 '머신러닝'이라도 분야에 따라 어떻게 달라지는지 이해하는 단계로 나아갑니다.
                            </p>
                          </div>
                        </div>
                        <div className="bg-white/5 rounded-xl aspect-video flex items-center justify-center border border-white/10">
                          <span className="text-white/30 text-sm">이미지 영역</span>
                        </div>
                      </div>
                    </div>

                    {/* Project 카드 1 - 이미지 왼쪽, 텍스트 오른쪽 */}
                    <div className="bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 px-6 sm:px-8 md:px-12 py-8 sm:py-10 md:py-14 mb-8">
                      <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
                        <div className="order-2 md:order-1 bg-white/5 rounded-xl aspect-video flex items-center justify-center border border-white/10">
                          <span className="text-white/30 text-sm">이미지 영역</span>
                        </div>
                        <div className="order-1 md:order-2">
                          <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 text-white">Project</h4>
                          <p className="text-sm text-white/50 mb-4">Individual Project & Report</p>
                          <div className="text-sm sm:text-base text-white/80 leading-relaxed space-y-5">
                            <p>
                              정규 학기 기준 약 9주차에 걸쳐 자유 주제로 개인 프로젝트를 수행하고, 문제 정의부터 결과 해석까지를 정리한 개인 보고서를 작성합니다.
                            </p>
                            <p>
                              개인 관심사 기반 주제 선정, 독립적인 프로젝트 수행 경험, 논리적 사고와 문제 해결 과정 정리를 통해 결과보다 중요한 것은 '어떻게 접근했고, 무엇을 배웠는지 설명할 수 있는가'입니다.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project 카드 2 - 텍스트 왼쪽, 이미지 오른쪽 */}
                    <div className="bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 px-6 sm:px-8 md:px-12 py-8 sm:py-10 md:py-14">
                      <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
                        <div>
                          <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 text-white">Project</h4>
                          <p className="text-sm text-white/50 mb-4">Regular Academic Festival</p>
                          <div className="text-sm sm:text-base text-white/80 leading-relaxed space-y-5">
                            <p>
                              트랙별 1–2팀을 구성해 팀 단위 프로젝트를 수행하고, 학술 포스터 제작과 프로젝트 발표를 진행하는 KHUDA의 대표적인 학술 행사입니다.
                            </p>
                            <p>
                              트랙별 심화 주제 기반 프로젝트, 학술 포스터 제작, 프로젝트 발표 및 질의응답을 통해 프로젝트를 공유하고 설명하는 경험을 통해 사고의 깊이와 표현력을 함께 성장시킵니다.
                            </p>
                          </div>
                        </div>
                        <div className="bg-white/5 rounded-xl aspect-video flex items-center justify-center border border-white/10">
                          <span className="text-white/30 text-sm">이미지 영역</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Datathon Tab */}
            {activeTab === "datathon" && (
              <div className="space-y-8 sm:space-y-12">
                <div className="rounded-2xl sm:rounded-3xl bg-black/98 backdrop-blur-2xl border border-white/10 overflow-hidden p-6 sm:p-8 md:p-10 lg:p-12">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-blue-950/25 to-primary/15 rounded-3xl pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-tl from-primary/12 via-transparent to-transparent rounded-3xl pointer-events-none" />
                  
                  <div className="relative z-10">
                    {/* 회차 선택 탭 */}
                    <div className="flex gap-2 mb-8 border-b border-white/10 pb-4">
                      {datathonHistory.map((datathon, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedDatathonIndex(index);
                            setSelectedImageIndex(0);
                          }}
                          className={cn(
                            "px-4 sm:px-6 py-2 sm:py-3 font-semibold transition-all duration-300 rounded-lg text-sm sm:text-base",
                            selectedDatathonIndex === index
                              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                              : "text-white/60 hover:text-white hover:bg-white/10"
                          )}
                        >
                          {datathon.number}
                        </button>
                      ))}
                    </div>

                    {/* 선택된 회차 내용 */}
                    <div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white">{selectedDatathon.title}</h3>
                      {selectedDatathon.theme && (
                        <p className="text-base sm:text-lg text-primary mb-4">{selectedDatathon.theme}</p>
                      )}

                      {selectedDatathon.description ? (
                        <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-8">{selectedDatathon.description}</p>
                      ) : (
                        <p className="text-sm sm:text-base text-white/50 mb-8">상세 정보 준비 중입니다.</p>
                      )}

                      {/* 썸네일 갤러리 */}
                      <div className="space-y-4 max-w-3xl mx-auto">
                        {/* 메인 이미지 */}
                        <div className="relative bg-white/5 rounded-xl overflow-hidden border border-white/10 aspect-[16/9]">
                          {selectedDatathon.images && selectedDatathon.images.length > 0 ? (
                            <>
                              <img
                                src={selectedDatathon.images[selectedImageIndex]}
                                alt={`${selectedDatathon.title} 이미지 ${selectedImageIndex + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                              <div className="hidden absolute inset-0 flex items-center justify-center bg-white/5">
                                <span className="text-white/40 text-sm">이미지 준비 중</span>
                              </div>
                              {/* 이미지 카운터 */}
                              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-white/80 text-xs sm:text-sm">
                                {selectedImageIndex + 1} / {selectedDatathon.images.length}
                              </div>
                              {/* 좌우 네비게이션 버튼 */}
                              {selectedDatathon.images.length > 1 && (
                                <>
                                  <button
                                    onClick={() => setSelectedImageIndex(prev => 
                                      prev === 0 ? selectedDatathon.images.length - 1 : prev - 1
                                    )}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-black/70 hover:text-white transition-all"
                                  >
                                    ‹
                                  </button>
                                  <button
                                    onClick={() => setSelectedImageIndex(prev => 
                                      prev === selectedDatathon.images.length - 1 ? 0 : prev + 1
                                    )}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-black/70 hover:text-white transition-all"
                                  >
                                    ›
                                  </button>
                                </>
                              )}
                            </>
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-white/40 text-sm">이미지 준비 중</span>
                            </div>
                          )}
                        </div>

                        {/* 썸네일 목록 */}
                        {selectedDatathon.images && selectedDatathon.images.length > 1 && (
                          <div className="flex gap-2 justify-center pb-2">
                            {selectedDatathon.images.map((image, index) => (
                              <button
                                key={index}
                                onClick={() => setSelectedImageIndex(index)}
                                className={cn(
                                  "flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 md:w-24 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200",
                                  selectedImageIndex === index
                                    ? "border-primary ring-2 ring-primary/30"
                                    : "border-white/10 hover:border-white/30 opacity-60 hover:opacity-100"
                                )}
                              >
                                <img
                                  src={image}
                                  alt={`썸네일 ${index + 1}`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Conference Tab */}
            {activeTab === "conference" && (
              <div className="space-y-8 sm:space-y-12">
                {/* Toy Project Conference */}
                <div className="rounded-2xl sm:rounded-3xl bg-black/98 backdrop-blur-2xl border border-white/10 overflow-hidden p-6 sm:p-8 md:p-10 lg:p-12">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-blue-950/25 to-primary/15 rounded-3xl pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-tl from-primary/12 via-transparent to-transparent rounded-3xl pointer-events-none" />
                  
                  <div className="relative z-10">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white">토이 프로젝트 컨퍼런스</h3>

                    <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6 sm:mb-8">
                      방학 세션 동안 진행한 팀 프로젝트를 공유하는 컨퍼런스입니다.
                      프로젝트 기획 배경, 문제 해결 접근 방식, 구현 결과 및 인사이트 공유를 통해
                      결과를 발표하는 것이 아니라 사고의 흐름을 설명하는 자리입니다.
                    </p>

                    {/* 썸네일 갤러리 */}
                    <div className="space-y-4 max-w-3xl mx-auto">
                      {/* 메인 이미지 */}
                      <div className="relative bg-white/5 rounded-xl overflow-hidden border border-white/10 aspect-[16/9]">
                        {toyConferenceImages.length > 0 ? (
                          <>
                            <img
                              src={toyConferenceImages[toyConferenceImageIndex]}
                              alt={`토이 프로젝트 컨퍼런스 이미지 ${toyConferenceImageIndex + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                            <div className="hidden absolute inset-0 flex items-center justify-center bg-white/5">
                              <span className="text-white/40 text-sm">이미지 준비 중</span>
                            </div>
                            {/* 이미지 카운터 */}
                            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-white/80 text-xs sm:text-sm">
                              {toyConferenceImageIndex + 1} / {toyConferenceImages.length}
                            </div>
                            {/* 좌우 네비게이션 버튼 */}
                            {toyConferenceImages.length > 1 && (
                              <>
                                <button
                                  onClick={() => setToyConferenceImageIndex(prev => 
                                    prev === 0 ? toyConferenceImages.length - 1 : prev - 1
                                  )}
                                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-black/70 hover:text-white transition-all"
                                >
                                  ‹
                                </button>
                                <button
                                  onClick={() => setToyConferenceImageIndex(prev => 
                                    prev === toyConferenceImages.length - 1 ? 0 : prev + 1
                                  )}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-black/70 hover:text-white transition-all"
                                >
                                  ›
                                </button>
                              </>
                            )}
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white/40 text-sm">이미지 준비 중</span>
                          </div>
                        )}
                      </div>

                      {/* 썸네일 목록 */}
                      {toyConferenceImages.length > 1 && (
                        <div className="flex gap-2 justify-center pb-2">
                          {toyConferenceImages.map((image, index) => (
                            <button
                              key={index}
                              onClick={() => setToyConferenceImageIndex(index)}
                              className={cn(
                                "flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 md:w-24 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200",
                                toyConferenceImageIndex === index
                                  ? "border-primary ring-2 ring-primary/30"
                                  : "border-white/10 hover:border-white/30 opacity-60 hover:opacity-100"
                              )}
                            >
                              <img
                                src={image}
                                alt={`썸네일 ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Academic Conference */}
                <div className="rounded-2xl sm:rounded-3xl bg-black/98 backdrop-blur-2xl border border-white/10 overflow-hidden p-6 sm:p-8 md:p-10 lg:p-12">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-blue-950/25 to-primary/15 rounded-3xl pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-tl from-primary/12 via-transparent to-transparent rounded-3xl pointer-events-none" />
                  
                  <div className="relative z-10">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white">정기 학술 컨퍼런스</h3>

                    <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6 sm:mb-8">
                      학기 중 트랙별 프로젝트 결과를 공유하는 KHUDA의 정기 학술 컨퍼런스입니다.
                      트랙별 심화 주제 프로젝트, 학술 포스터 발표, 프로젝트 기반 토론 및 피드백을 통해
                      학습 → 프로젝트 → 공유, 성장의 전 과정을 마무리하는 무대입니다.
                    </p>

                    {/* 썸네일 갤러리 */}
                    <div className="space-y-4 max-w-3xl mx-auto">
                      {/* 메인 이미지 */}
                      <div className="relative bg-white/5 rounded-xl overflow-hidden border border-white/10 aspect-[16/9]">
                        {academicConferenceImages.length > 0 ? (
                          <>
                            <img
                              src={academicConferenceImages[academicConferenceImageIndex]}
                              alt={`Academic Conference 이미지 ${academicConferenceImageIndex + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                            <div className="hidden absolute inset-0 flex items-center justify-center bg-white/5">
                              <span className="text-white/40 text-sm">이미지 준비 중</span>
                            </div>
                            {/* 이미지 카운터 */}
                            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-white/80 text-xs sm:text-sm">
                              {academicConferenceImageIndex + 1} / {academicConferenceImages.length}
                            </div>
                            {/* 좌우 네비게이션 버튼 */}
                            {academicConferenceImages.length > 1 && (
                              <>
                                <button
                                  onClick={() => setAcademicConferenceImageIndex(prev => 
                                    prev === 0 ? academicConferenceImages.length - 1 : prev - 1
                                  )}
                                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-black/70 hover:text-white transition-all"
                                >
                                  ‹
                                </button>
                                <button
                                  onClick={() => setAcademicConferenceImageIndex(prev => 
                                    prev === academicConferenceImages.length - 1 ? 0 : prev + 1
                                  )}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-black/70 hover:text-white transition-all"
                                >
                                  ›
                                </button>
                              </>
                            )}
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white/40 text-sm">이미지 준비 중</span>
                          </div>
                        )}
                      </div>

                      {/* 썸네일 목록 */}
                      {academicConferenceImages.length > 1 && (
                        <div className="flex gap-2 justify-center pb-2">
                          {academicConferenceImages.map((image, index) => (
                            <button
                              key={index}
                              onClick={() => setAcademicConferenceImageIndex(index)}
                              className={cn(
                                "flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 md:w-24 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200",
                                academicConferenceImageIndex === index
                                  ? "border-primary ring-2 ring-primary/30"
                                  : "border-white/10 hover:border-white/30 opacity-60 hover:opacity-100"
                              )}
                            >
                              <img
                                src={image}
                                alt={`썸네일 ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Activities;
