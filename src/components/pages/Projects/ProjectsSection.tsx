import { useState, useMemo, useEffect, useCallback } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SCROLL_ANIMATION_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Search, ChevronDown, X, Github, ChevronLeft, ChevronRight } from "lucide-react";

// ============================================================================
// 타입 정의
// ============================================================================

interface Project {
  title: string;
  members: string;
  longDescription: string;
  generation: string;
  track: string;
  thumbnail: string;
  slides: string[];
  githubUrl?: string;
}

// ============================================================================
// 샘플 프로젝트 데이터 (실제 데이터로 교체 필요)
// ============================================================================

const projectsData: Project[] = [
  {
    title: "데이터 기반 이륜차 사고위험지수 개발 및 최적 단속지점 제안",
    members: "이재용, 김서윤, 박도현, 정하은",
    longDescription:
      "배달 플랫폼 성장으로 이륜차 운행이 급증하며 관련 사고가 사회적 문제로 대두되고 있습니다. 사고 다발지 데이터를 바탕으로 이륜차 사고 위험 지수를 개발하고, 사고를 효과적으로 줄일 수 있는 단속 및 안전 인프라 설치 우선순위를 제안합니다. 잠재적 위험 지역을 찾아내어 선제적으로 예방할 수 있는 데이터 기반 접근방식의 솔루션을 제공합니다.",
    generation: "8기",
    track: "ML 심화",
    thumbnail: "/images/projects/motorcycle-safety.png",
    slides: [],
    githubUrl: "https://github.com/khuda-data/8th-MLFull-RIDER",
  },
  {
    title: "카드 소비 데이터 기반 소비 취약군 식별 및 맞춤형 정책 제안",
    members: "한지민, 오태양, 송예린, 윤성호",
    longDescription:
      "수원시 카드 소비 데이터를 활용하여 기존 복지·금융 지표로는 포착하기 어려운 소비 취약 집단을 식별하고, 데이터 기반 맞춤형 정책 방향을 제안합니다. Isolation Forest와 군집 분석을 결합한 2단계 분석 프레임워크를 적용해 서로 다른 원인을 가진 소비 취약군을 도출하였습니다.",
    generation: "8기",
    track: "ML 심화",
    thumbnail: "",
    slides: [],
    githubUrl: "https://github.com/khuda-data/8th-MLFull-CardBasedSugg",
  },
  {
    title: "CCTV 영상 기반 보행 특성 분석을 통한 장애인 전용 주차구역 부정 이용 탐지",
    members: "최민준, 강수빈, 임현우, 배지연, 조은서",
    longDescription:
      "CCTV 영상에서 장애인 전용 주차구역에 주차된 차량에서 하차하는 사람의 보행 특성(Gait)을 분석하여, 보행상 장애 이용자가 실제로 탑승했을 가능성을 비식별적으로 추정하는 컴퓨터 비전 기반 프로토타입 시스템입니다. YOLO 기반 객체 탐지와 BoT-SORT 기반 Multi-object Tracking을 결합하였습니다.",
    generation: "8기",
    track: "CV",
    thumbnail: "",
    slides: [],
    githubUrl: "https://github.com/khuda-data/8th-CV-DisabledParkingGuard",
  },
  {
    title: "Grad-CAM과 Gemini를 결합한 제조 결함 하이브리드 검출 시스템",
    members: "유준혁, 김나연, 이동현, 박소율",
    longDescription:
      "ResNet-34의 Grad-CAM 시각화 결과를 Gemini API가 분석하여, 기존 딥러닝 모델이 놓치던 미세 결함(False Negative)을 언어적 추론으로 찾아내는 하이브리드 검출 시스템입니다. 재학습 없이도 미검출 결함 탐지율을 개선합니다.",
    generation: "8기",
    track: "데이터비즈니스",
    thumbnail: "",
    slides: [],
    githubUrl: "https://github.com/khuda-data/8th-DB-Refocus",
  },
  {
    title: "Steam 게임 쾌적도 지수(GCI) — 실시간 동접자 기반 매칭 품질 지표화",
    members: "장시우, 권다은, 신재민, 홍유진",
    longDescription:
      "실시간 동시 접속자 수(PCCU)와 매칭 필터 알고리즘을 결합하여 게임 서비스 상태 및 유저 체감 품질을 지표화한 데이터 엔지니어링 프로젝트입니다. Steam API와 커뮤니티 여론 데이터를 수집하고, 독자적인 '적합 유저 유입 속도' 수식을 적용하여 유저에게 최적의 플레이 타이밍을 제안합니다.",
    generation: "8기",
    track: "데이터엔지니어링",
    thumbnail: "",
    slides: [],
    githubUrl: "https://github.com/khuda-data/8th-DE-SteamQueue",
  },
  {
    title: "자소서 텍스트에서 검증 가능한 주장(Claim) 추출 및 즉석 후속 질문 검증 시스템",
    members: "정승우, 김하율, 이서준, 박민지, 조현아",
    longDescription:
      "자소서 텍스트에서 검증 가능한 주장(Claim)을 추출하고, 즉석 후속 질문을 통해 검증하는 시스템입니다. BERT 계열 모델로 Claim을 파싱하고 LLM으로 질문을 생성하며, FastAPI + PostgreSQL + FAISS로 전체 파이프라인을 구축하였습니다.",
    generation: "8기",
    track: "NLP",
    thumbnail: "",
    slides: [],
    githubUrl: "https://github.com/khuda-data/8th-NLP-CoverLetter",
  },
  {
    title: "사이버펑크 2077 출시 전후 여론 변화 시뮬레이션 — Multi-Agent RAG",
    members: "안도윤, 서지원, 문태호, 황수아",
    longDescription:
      "사이버펑크 2077의 출시 전후 여론 변화를 시뮬레이션하기 위해, 3가지 다른 방법론을 비교 분석하는 프로젝트입니다. 공통된 평가 스크립트와 공통 페르소나 모듈을 사용하여 실험의 일관성을 유지하며, 에이전트 기반 시뮬레이션을 통해 시간에 따른 동적 변화를 모델링합니다.",
    generation: "8기",
    track: "NLP",
    thumbnail: "",
    slides: [],
    githubUrl: "https://github.com/khuda-data/8th-NLP-Persona",
  },
  {
    title: "AI 말하기 평가 — 국회 회의록 요약, 그림 기반 문장 생성, 일상 대화 연결",
    members: "노건우, 양하린, 백준서, 구민채",
    longDescription:
      "국회 회의록 요약, 그림 기반 문장 생성, 한국어 일상 대화 연결의 3가지 NLP 태스크를 수행하는 프로젝트입니다. 각 팀이 독립적으로 개발 브랜치에서 작업하며, 공통된 평가 프레임워크를 통해 성능을 비교합니다.",
    generation: "8기",
    track: "NLP",
    thumbnail: "",
    slides: [],
    githubUrl: "https://github.com/khuda-data/8th-NLP-malpyeong",
  },
];

// ============================================================================
// 필터 옵션
// ============================================================================

const generations = ["모든 기수", "9기", "8기", "7기", "6기", "5기", "4기", "3기", "2기", "1기"];
const trackOptions = ["모든 트랙", "ML 심화", "CV", "NLP", "데이터비즈니스", "데이터엔지니어링"];

// ============================================================================
// 트랙 색상 매핑
// ============================================================================

const trackAccentMap: Record<string, string> = {
  "ML 심화": "text-red-800",
  CV: "text-red-800",
  NLP: "text-red-800",
  "데이터비즈니스": "text-red-800",
  "데이터엔지니어링": "text-red-800",
};

// ============================================================================
// 커스텀 셀렉트 컴포넌트
// ============================================================================

const CustomSelect = ({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-card border border-border hover:border-foreground/20 transition-all duration-200 text-sm text-foreground min-w-[120px]"
      >
        <span>{value}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-muted-foreground transition-transform duration-200 ml-auto",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full mt-1 left-0 min-w-full bg-card border border-border rounded-lg shadow-xl z-50 py-1 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={cn(
                "w-full text-left px-4 py-2 text-sm transition-colors duration-150 hover:bg-muted",
                value === option ? "text-foreground bg-muted/50" : "text-muted-foreground"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// PPT 장표 캐러셀 컴포넌트
// ============================================================================

const SlideCarousel = ({ slides, title }: { slides: string[]; title: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative group/carousel">
      <div className="relative aspect-[2/1] rounded-lg overflow-hidden bg-muted flex items-center justify-center">
        {currentSlide ? (
          <>
            <img
              src={currentSlide}
              alt={`${title} ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
            {slides.length > 1 && (
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/60 text-xs text-white/80 backdrop-blur-sm">
                {currentIndex + 1} / {slides.length}
              </div>
            )}
          </>
        ) : (
          <p className="text-muted-foreground text-sm">이미지 준비중</p>
        )}
      </div>
      {/* 이전/다음 버튼 */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
};

// ============================================================================
// 프로젝트 상세 모달 컴포넌트
// ============================================================================

const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  const accentColor = trackAccentMap[project.track] || "text-muted-foreground";

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* 모달 본체 */}
      <div className="relative w-full max-w-[780px] max-h-[85vh] overflow-y-auto rounded-2xl bg-card border border-border shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="sticky top-5 float-right mr-8 z-10 w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="px-10 sm:px-14 pt-12 sm:pt-14 pb-10 sm:pb-12">
          {/* 트랙 · 기수 · GitHub */}
          <div className="flex items-center gap-1.5 mb-4 text-sm font-semibold">
            <span className={accentColor}>{project.track}</span>
            <span className="text-muted-foreground/40">·</span>
            <span className="text-foreground/60">{project.generation}</span>
            {project.githubUrl && (
              <>
                <span className="text-muted-foreground/40">·</span>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </>
            )}
          </div>

          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2.5">
            {project.title}
          </h2>

          <p className="text-sm text-muted-foreground mb-8">
            {project.members}
          </p>

          {/* 이미지 캐러셀 */}
          <div className="mb-8">
            <SlideCarousel
              slides={project.slides.length > 0 ? project.slides : [project.thumbnail]}
              title={project.title}
            />
          </div>

          {/* 프로젝트 소개 */}
          <div>
            <p className="text-[15px] text-foreground/65 leading-[1.8]">
              {project.longDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 프로젝트 카드 컴포넌트
// ============================================================================

const ProjectCard = ({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) => {
  const accentColor = trackAccentMap[project.track] || "text-muted-foreground";

  return (
    <div
      onClick={onClick}
      className="group rounded-xl sm:rounded-2xl bg-card border border-border hover:border-foreground/20 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-lg cursor-pointer"
    >
      {/* 썸네일 이미지 */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted flex items-center justify-center">
        {project.thumbnail ? (
          <>
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <p className="text-muted-foreground text-sm">이미지 준비중</p>
        )}
      </div>

      {/* 카드 콘텐츠 */}
      <div className="p-4 sm:p-5">
        {/* 트랙 · 기수 */}
        <p className="text-sm font-semibold mb-2">
          <span className={accentColor}>{project.track}</span>
          <span className="text-muted-foreground/40 mx-1.5">·</span>
          <span className="text-foreground/60">{project.generation}</span>
        </p>

        {/* 제목 */}
        <h3 className="text-sm sm:text-base font-semibold text-foreground leading-snug group-hover:text-foreground/80 transition-colors line-clamp-2">
          {project.title}
        </h3>
      </div>
    </div>
  );
};

// ============================================================================
// 메인 컴포넌트
// ============================================================================

const ProjectsSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: SCROLL_ANIMATION_CONFIG.threshold });
  const [selectedGeneration, setSelectedGeneration] = useState("모든 기수");
  const [selectedTrack, setSelectedTrack] = useState("모든 트랙");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesGeneration =
        selectedGeneration === "모든 기수" || project.generation === selectedGeneration;
      const matchesTrack =
        selectedTrack === "모든 트랙" || project.track === selectedTrack;
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.members.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesGeneration && matchesTrack && matchesSearch;
    });
  }, [selectedGeneration, selectedTrack, searchQuery]);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <>
      <section
        id="projects"
        ref={ref}
        className={cn(
          "pt-5 sm:pt-8 md:pt-10 pb-8 sm:pb-12 md:pb-16 lg:pb-20 px-4 sm:px-6 md:px-12 relative bg-background transition-all duration-1000 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <div className="container mx-auto max-w-6xl">
          {/* 필터 바 */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
            <div className="flex items-center gap-3">
              <CustomSelect
                value={selectedTrack}
                onChange={setSelectedTrack}
                options={trackOptions}
              />
              <CustomSelect
                value={selectedGeneration}
                onChange={setSelectedGeneration}
                options={generations}
              />
            </div>

            {/* 검색 */}
            <div className="relative flex-1 w-full sm:w-auto sm:max-w-xs sm:ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="프로젝트 검색 (제목, 팀명..)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-card border border-border hover:border-foreground/20 focus:border-foreground/30 focus:outline-none text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-200"
              />
            </div>
          </div>

          {/* 프로젝트 카드 그리드 */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={`${project.title}-${index}`}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 sm:py-24">
              <p className="text-muted-foreground text-sm sm:text-base">
                조건에 맞는 프로젝트가 없습니다.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 프로젝트 상세 모달 */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default ProjectsSection;
