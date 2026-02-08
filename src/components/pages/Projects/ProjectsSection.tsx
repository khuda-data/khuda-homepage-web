import { useState, useMemo, useEffect, useCallback } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SCROLL_ANIMATION_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Search, ChevronDown, X, Github, ChevronLeft, ChevronRight } from "lucide-react";

// ============================================================================
// 타입 정의
// ============================================================================

interface Contributor {
  name: string;
  role: string; // 전공 또는 역할
  github?: string;
}

interface Project {
  title: string;
  description: string;
  longDescription: string;
  generation: string;
  track: string;
  tags: string[];
  thumbnail: string;
  slides: string[];
  contributors: Contributor[];
  githubUrl?: string;
}

// ============================================================================
// 샘플 프로젝트 데이터 (실제 데이터로 교체 필요)
// ============================================================================

const projectsData: Project[] = [
  {
    title: "StockMind",
    description: "AI 기반 주가 예측 및 포트폴리오 추천 서비스",
    longDescription:
      "StockMind는 LSTM과 Transformer 기반의 딥러닝 모델을 활용해 주가 변동을 예측하고, 사용자의 투자 성향에 맞춘 포트폴리오를 자동으로 추천하는 서비스입니다. 한국거래소 실시간 데이터와 뉴스 감성 분석을 결합하여 보다 정확한 예측을 목표로 합니다. 백테스팅을 통해 모델 성능을 검증하였으며, 실제 투자 시뮬레이션 환경을 제공합니다.",
    generation: "8기",
    track: "금융",
    tags: ["Finance", "AI", "Portfolio"],
    thumbnail: "https://picsum.photos/seed/stockmind/600/400",
    slides: [
      "https://picsum.photos/seed/stock-s1/1920/1080",
      "https://picsum.photos/seed/stock-s2/1920/1080",
      "https://picsum.photos/seed/stock-s3/1920/1080",
    ],
    contributors: [
      { name: "김데이터", role: "컴퓨터공학", github: "https://github.com/example1" },
      { name: "이금융", role: "경영학", github: "https://github.com/example2" },
      { name: "박분석", role: "통계학" },
    ],
    githubUrl: "https://github.com/khuda-data/stockmind",
  },
  {
    title: "Sentimo",
    description: "감성 분석 일기장",
    longDescription:
      "Sentimo는 사용자가 작성한 일기의 텍스트를 BERT 기반 감성 분석 모델로 분석하여 감정 상태를 시각화하는 서비스입니다. 일별/주별/월별 감정 추이를 그래프로 확인할 수 있으며, 감정 패턴을 기반으로 맞춤형 콘텐츠를 추천합니다.",
    generation: "7기",
    track: "NLP",
    tags: ["NLP", "Diary", "Emotion"],
    thumbnail: "https://picsum.photos/seed/sentimo/600/400",
    slides: [
      "https://picsum.photos/seed/sent-s1/1920/1080",
      "https://picsum.photos/seed/sent-s2/1920/1080",
    ],
    contributors: [
      { name: "강자연", role: "컴퓨터공학", github: "https://github.com/example3" },
      { name: "윤처리", role: "언어학" },
    ],
    githubUrl: "https://github.com/khuda-data/sentimo",
  },
  {
    title: "ScanIt",
    description: "상품 인식 및 자동 결제 솔루션",
    longDescription:
      "ScanIt은 YOLOv8 기반의 실시간 객체 탐지 모델을 활용하여 매장 내 상품을 자동으로 인식하고, 결제까지 원스톱으로 처리하는 무인 결제 솔루션입니다. 다양한 상품 카테고리를 학습시켜 높은 인식률을 달성하였습니다.",
    generation: "6기",
    track: "CV",
    tags: ["Computer Vision", "Retail", "Automation"],
    thumbnail: "https://picsum.photos/seed/scanit/600/400",
    slides: [
      "https://picsum.photos/seed/scan-s1/1920/1080",
      "https://picsum.photos/seed/scan-s2/1920/1080",
      "https://picsum.photos/seed/scan-s3/1920/1080",
      "https://picsum.photos/seed/scan-s4/1920/1080",
    ],
    contributors: [
      { name: "임비전", role: "컴퓨터공학", github: "https://github.com/example4" },
      { name: "장결제", role: "산업공학", github: "https://github.com/example5" },
      { name: "정인식", role: "컴퓨터공학" },
    ],
    githubUrl: "https://github.com/khuda-data/scanit",
  },
  {
    title: "BizInsite",
    description: "데이터 기반 비즈니스 인사이트 대시보드",
    longDescription:
      "BizInsite는 기업의 매출, 고객 행동, 마케팅 성과 등 다양한 비즈니스 데이터를 통합 분석하여 시각적 대시보드로 제공합니다. XAI 기법을 적용하여 모델의 예측 근거를 투명하게 설명하며, 의사결정자가 데이터 기반으로 전략을 수립할 수 있도록 지원합니다.",
    generation: "5기",
    track: "데이터비즈니스",
    tags: ["Data Analysis", "Business", "Dashboard"],
    thumbnail: "https://picsum.photos/seed/bizinsite/600/400",
    slides: [
      "https://picsum.photos/seed/biz-s1/1920/1080",
      "https://picsum.photos/seed/biz-s2/1920/1080",
    ],
    contributors: [
      { name: "한비즈", role: "경영학", github: "https://github.com/example6" },
      { name: "오인사이트", role: "통계학" },
    ],
  },
  {
    title: "AssetFlow",
    description: "MZ세대를 위한 자산 관리 플랫폼",
    longDescription:
      "AssetFlow는 MZ세대의 투자 패턴과 소비 습관을 분석하여 맞춤형 자산 관리 전략을 제공하는 플랫폼입니다. 머신러닝 기반 리스크 분석과 포트폴리오 최적화를 통해 개인화된 재무 솔루션을 제공합니다.",
    generation: "4기",
    track: "금융",
    tags: ["Fintech", "Asset", "MZ"],
    thumbnail: "https://picsum.photos/seed/assetflow/600/400",
    slides: [
      "https://picsum.photos/seed/asset-s1/1920/1080",
      "https://picsum.photos/seed/asset-s2/1920/1080",
      "https://picsum.photos/seed/asset-s3/1920/1080",
    ],
    contributors: [
      { name: "배자산", role: "경영학", github: "https://github.com/example7" },
      { name: "서관리", role: "통계학", github: "https://github.com/example8" },
    ],
    githubUrl: "https://github.com/khuda-data/assetflow",
  },
  {
    title: "TextSummarizer",
    description: "긴 글을 3줄 요약해주는 크롬 익스텐션",
    longDescription:
      "TextSummarizer는 웹 페이지의 긴 글을 3줄로 요약해주는 크롬 익스텐션입니다. KoBART 기반의 추출적/생성적 요약 모델을 결합하여 한국어 텍스트에 최적화된 요약 성능을 제공합니다. 뉴스, 블로그, 논문 등 다양한 텍스트 유형을 지원합니다.",
    generation: "3기",
    track: "NLP",
    tags: ["NLP", "Productivity", "Chrome"],
    thumbnail: "https://picsum.photos/seed/textsumm/600/400",
    slides: [
      "https://picsum.photos/seed/text-s1/1920/1080",
      "https://picsum.photos/seed/text-s2/1920/1080",
    ],
    contributors: [
      { name: "홍생성", role: "컴퓨터공학", github: "https://github.com/example9" },
      { name: "고언어", role: "언어학" },
    ],
    githubUrl: "https://github.com/khuda-data/textsummarizer",
  },
  {
    title: "DeepFashion",
    description: "딥러닝 기반 패션 스타일 추천 시스템",
    longDescription:
      "DeepFashion은 사용자의 옷 사진을 분석하여 스타일을 분류하고, 체형과 취향에 맞는 패션 아이템을 추천하는 시스템입니다. ResNet 기반 분류 모델과 협업 필터링을 결합하여 개인화된 패션 추천을 제공합니다.",
    generation: "8기",
    track: "CV",
    tags: ["Deep Learning", "Fashion", "Recommendation"],
    thumbnail: "https://picsum.photos/seed/deepfashion/600/400",
    slides: [
      "https://picsum.photos/seed/fashion-s1/1920/1080",
      "https://picsum.photos/seed/fashion-s2/1920/1080",
      "https://picsum.photos/seed/fashion-s3/1920/1080",
    ],
    contributors: [
      { name: "최패션", role: "컴퓨터공학", github: "https://github.com/example10" },
      { name: "김스타일", role: "산업디자인" },
      { name: "이추천", role: "통계학", github: "https://github.com/example11" },
    ],
    githubUrl: "https://github.com/khuda-data/deepfashion",
  },
  {
    title: "DataFlow",
    description: "실시간 데이터 파이프라인 모니터링 대시보드",
    longDescription:
      "DataFlow는 Apache Kafka와 Spark를 활용한 실시간 데이터 파이프라인의 상태를 모니터링하고, 이상 징후를 자동 감지하는 대시보드입니다. 파이프라인의 처리량, 지연 시간, 에러율을 실시간으로 시각화하며, 알림 시스템을 통해 즉각적인 대응이 가능합니다.",
    generation: "7기",
    track: "데이터엔지니어링",
    tags: ["Data Pipeline", "Monitoring", "Dashboard"],
    thumbnail: "https://picsum.photos/seed/dataflow/600/400",
    slides: [
      "https://picsum.photos/seed/flow-s1/1920/1080",
      "https://picsum.photos/seed/flow-s2/1920/1080",
    ],
    contributors: [
      { name: "송스트림", role: "컴퓨터공학", github: "https://github.com/example12" },
      { name: "유파이프", role: "산업공학" },
    ],
    githubUrl: "https://github.com/khuda-data/dataflow",
  },
  {
    title: "ChatBot Pro",
    description: "RAG 기반 맞춤형 고객 상담 챗봇",
    longDescription:
      "ChatBot Pro는 RAG(Retrieval-Augmented Generation) 아키텍처를 기반으로 기업 내부 문서를 학습하여 정확한 답변을 제공하는 맞춤형 고객 상담 챗봇입니다. 벡터 DB와 LLM을 결합하여 환각(hallucination)을 최소화하고, 출처 기반의 신뢰할 수 있는 답변을 생성합니다.",
    generation: "9기",
    track: "AI엔지니어링",
    tags: ["RAG", "Chatbot", "LLM"],
    thumbnail: "https://picsum.photos/seed/chatbotpro/600/400",
    slides: [
      "https://picsum.photos/seed/chat-s1/1920/1080",
      "https://picsum.photos/seed/chat-s2/1920/1080",
      "https://picsum.photos/seed/chat-s3/1920/1080",
    ],
    contributors: [
      { name: "정에이전트", role: "컴퓨터공학", github: "https://github.com/example13" },
      { name: "박엘엘엠", role: "AI학과", github: "https://github.com/example14" },
    ],
    githubUrl: "https://github.com/khuda-data/chatbotpro",
  },
];

// ============================================================================
// 필터 옵션
// ============================================================================

const generations = ["모든 기수", "9기", "8기", "7기", "6기", "5기", "4기", "3기", "2기", "1기"];
const trackOptions = ["모든 트랙", "CV", "NLP", "금융", "데이터비즈니스", "데이터엔지니어링", "AI엔지니어링"];

// ============================================================================
// 트랙 색상 매핑
// ============================================================================

const trackColorMap: Record<string, string> = {
  CV: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  NLP: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "금융": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "데이터비즈니스": "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "데이터엔지니어링": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  "AI엔지니어링": "bg-rose-500/20 text-rose-300 border-rose-500/30",
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
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-200 text-sm text-white/90 min-w-[120px]"
      >
        <span>{value}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-white/50 transition-transform duration-200 ml-auto",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full mt-1 left-0 min-w-full bg-zinc-900 border border-white/10 rounded-lg shadow-xl z-50 py-1 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={cn(
                "w-full text-left px-4 py-2 text-sm transition-colors duration-150 hover:bg-white/10",
                value === option ? "text-white bg-white/5" : "text-white/70"
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

  return (
    <div className="relative group/carousel">
      <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-black/50 max-w-[85%] mx-auto">
        <img
          src={slides[currentIndex]}
          alt={`${title} 장표 ${currentIndex + 1}`}
          className="w-full h-full object-contain"
        />
        {/* 슬라이드 카운터 */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/60 text-xs text-white/80 backdrop-blur-sm">
          {currentIndex + 1} / {slides.length}
        </div>
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
  const trackColor = trackColorMap[project.track] || "bg-white/10 text-white/70 border-white/20";

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
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* 모달 본체 */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="sticky top-4 float-right mr-4 z-10 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* 뱃지 + 제목 */}
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/10 text-white/80 border border-white/10">
              {project.generation}
            </span>
            <span className={cn("px-2.5 py-1 rounded-md text-xs font-semibold border", trackColor)}>
              {project.track}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {project.title}
          </h2>

          <p className="text-sm text-white/50 mb-2">
            {project.description}
          </p>

          {/* 태그 */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.map((tag, index) => (
              <span key={index} className="text-xs text-white/40">
                #{tag}
              </span>
            ))}
          </div>

          {/* 프로젝트 소개 (긴 버전) */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">
              프로젝트 소개
            </h3>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-5">
              {project.longDescription}
            </p>
            {project.slides.length > 0 && (
              <SlideCarousel slides={project.slides} title={project.title} />
            )}
          </div>

          {/* GitHub 링크 */}
          {project.githubUrl && (
            <div className="mb-8">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 transition-all duration-200 text-sm text-white/80 hover:text-white"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            </div>
          )}

          {/* 컨트리뷰터 */}
          <div>
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">
              Contributors
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.contributors.map((contributor, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                >
                  {/* 아바타 플레이스홀더 */}
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/50 text-sm font-semibold flex-shrink-0">
                    {contributor.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white/90 truncate">
                      {contributor.name}
                    </p>
                    <p className="text-xs text-white/40 truncate">
                      {contributor.role}
                    </p>
                  </div>
                  {contributor.github && (
                    <a
                      href={contributor.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/30 hover:text-white/70 transition-colors flex-shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
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
  const trackColor = trackColorMap[project.track] || "bg-white/10 text-white/70 border-white/20";

  return (
    <div
      onClick={onClick}
      className="group rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/15 transition-all duration-300 overflow-hidden hover:bg-white/[0.05] cursor-pointer"
    >
      {/* 썸네일 이미지 */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* 카드 콘텐츠 */}
      <div className="p-4 sm:p-5">
        {/* 뱃지 */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/10 text-white/80 border border-white/10">
            {project.generation}
          </span>
          <span className={cn("px-2.5 py-1 rounded-md text-xs font-semibold border", trackColor)}>
            {project.track}
          </span>
        </div>

        {/* 제목 */}
        <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 group-hover:text-white/90 transition-colors">
          {project.title}
        </h3>

        {/* 한줄 소개 */}
        <p className="text-sm text-white/50 mb-3 line-clamp-1">{project.description}</p>

        {/* 태그 */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag, index) => (
            <span key={index} className="text-xs text-white/40 hover:text-white/60 transition-colors">
              #{tag}
            </span>
          ))}
        </div>
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
        project.description.includes(searchQuery) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
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
          "py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-12 relative bg-background transition-all duration-1000 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <div className="container mx-auto max-w-6xl">
          {/* 섹션 제목 */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-foreground">
            KHUDA에서 진행된 프로젝트 둘러보기
          </h2>

          {/* 필터 바 */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
            <div className="flex items-center gap-3">
              <CustomSelect
                value={selectedGeneration}
                onChange={setSelectedGeneration}
                options={generations}
              />
              <CustomSelect
                value={selectedTrack}
                onChange={setSelectedTrack}
                options={trackOptions}
              />
            </div>

            {/* 검색 */}
            <div className="relative flex-1 w-full sm:w-auto sm:max-w-xs sm:ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="프로젝트 검색 (제목, 태그..)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 focus:border-white/30 focus:outline-none text-sm text-white/90 placeholder:text-white/30 transition-colors duration-200"
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
              <p className="text-white/40 text-sm sm:text-base">
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
