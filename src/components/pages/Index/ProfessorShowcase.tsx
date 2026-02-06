import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SCROLL_ANIMATION_CONFIG } from "@/lib/constants";
import ProfessorProfileCard from "./ProfessorProfileCard";
import ProfessorDetailCards from "./ProfessorDetailCards";

const SCROLL_REVEAL_OPTIONS = {
  threshold: SCROLL_ANIMATION_CONFIG.threshold,
  rootMargin: "0px 0px -80px 0px",
};

export interface ProfessorInfo {
  name: string;
  nameInitial: string;
  title: string;
  department: string;
  greeting: string;
  bio: string[];
  details: string[];
  labName: string;
  labUrl: string;
  researchAreas: string[];
}

const professor: ProfessorInfo = {
  name: "박상근",
  nameInitial: "박",
  title: "지도교수",
  department: "경희대학교 소프트웨어융합학과",
  greeting:
    "안녕하세요, KHUDA 지도교수\n경희대학교 소프트웨어융합학과 박상근 교수입니다.",
  bio: [
    "급속도로 발전하는 데이터 엔지니어링과 인공지능 기술로 인해 우리 사회를 포함한 전세계의 과학, 산업, 교육 등이 큰 변화를 겪고 있습니다. 이러한 변화 가운데 우수한 잠재력을 가진 학생들이 활약하고 성장할 수 있는 기회의 장을 대학에서 어떻게 만들어낼 수 있을지 끊임없이 고민을 해왔습니다. KHUDA는 다양한 주제의 스터디, 프로젝트, 대회 참여 및 연구 활동을 통해 구성원들의 도약을 이끌어낼 수 있는 학회입니다.",
    "미래의 변화를 주도할 연구자, 공학자, 경영자로 성장하고 싶은 경희대학교 학우 분들은 KHUDA를 통해 저와 함께 길을 찾을 수 있기를 바랍니다.",
  ],
  details: [
    "경희대학교 소프트웨어융합학과, 조교수 (현재)",
    "User eXperience Computing Lab (UXC Lab) 운영",
  ],
  labName: "UXC Lab",
  labUrl: "https://uxclab.khu.ac.kr",
  researchAreas: [
    "Behavioral Data Science",
    "Human-Centered AI",
    "Intelligent Agent Design",
  ],
};

const ProfessorShowcase = () => {
  const { ref, isVisible } = useScrollAnimation(SCROLL_REVEAL_OPTIONS);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
    >
      {/* 섹션 헤더 */}
      <div className="mb-10 sm:mb-14 md:mb-16">
        <div className="flex-1">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] tracking-tight">
            ADVISOR
          </h2>
          <p className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base md:text-lg text-white/60 leading-relaxed max-w-xl">
            KHUDA의 학술 활동을 이끌어 주시는 지도 교수님을 소개합니다.
          </p>
        </div>
      </div>

      {/* 메인 콘텐츠 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
        <ProfessorProfileCard professor={professor} />
        <ProfessorDetailCards professor={professor} />
      </div>
    </div>
  );
};

export default ProfessorShowcase;
