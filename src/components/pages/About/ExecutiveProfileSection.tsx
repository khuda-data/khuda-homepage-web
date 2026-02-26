import { useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SCROLL_ANIMATION_CONFIG, EXECUTIVE_PROFILES, type ExecutiveProfile } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ChevronDown, Mail, GraduationCap } from "lucide-react";

const SCROLL_REVEAL_OPTIONS = {
  threshold: SCROLL_ANIMATION_CONFIG.threshold,
  rootMargin: "0px 0px -80px 0px",
};

const ExecutiveCard = ({ executive }: { executive: ExecutiveProfile }) => (
  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-5 hover:shadow-md hover:border-gray-300 hover:bg-gray-100 transition-all duration-300 flex flex-col group">
    <div className="text-center mb-3 sm:mb-4">
      <h4 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-1.5">
        {executive.name}
      </h4>
      <p className="text-xs sm:text-sm text-gray-600 font-medium">
        {executive.role === "트랙장" && executive.department
          ? `${executive.department} ${executive.role}`
          : executive.department && executive.role !== "트랙장"
          ? `${executive.role} · ${executive.department} 트랙장`
          : executive.role}
      </p>
    </div>

    {(executive.affiliation || executive.department) && (
      <div className="text-center mb-2 sm:mb-3 flex items-center justify-center gap-1">
        <GraduationCap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 flex-shrink-0" />
        <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed">
          {executive.affiliation || executive.department}
        </p>
      </div>
    )}

    {executive.email && (
      <div className="flex items-center justify-center pt-2 sm:pt-3 border-t border-gray-100 mt-auto">
        <a
          href={`mailto:${executive.email}`}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="이메일"
        >
          <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </a>
      </div>
    )}
  </div>
);

const ExecutiveGrid = ({ executives }: { executives: ExecutiveProfile[] }) => (
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-5 max-w-7xl mx-auto w-full">
    {executives.map((executive, index) => (
      <ExecutiveCard key={`${executive.name}-${index}`} executive={executive} />
    ))}
  </div>
);

const ExecutiveProfileSection = () => {
  const { ref, isVisible } = useScrollAnimation(SCROLL_REVEAL_OPTIONS);
  const [expandedGenerations, setExpandedGenerations] = useState<Set<string>>(
    new Set()
  );

  // 9기는 기본으로 표시, 나머지는 토글로
  const currentGeneration = EXECUTIVE_PROFILES[0];
  const pastGenerations = EXECUTIVE_PROFILES.slice(1);

  const toggleGeneration = (generation: string) => {
    const newExpanded = new Set(expandedGenerations);
    if (newExpanded.has(generation)) {
      newExpanded.delete(generation);
    } else {
      newExpanded.add(generation);
    }
    setExpandedGenerations(newExpanded);
  };

  return (
    <section className="relative bg-background pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-16 sm:pb-20 md:pb-24 lg:pb-28">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div
          ref={ref}
          className={cn(
            "max-w-7xl mx-auto transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          {/* 섹션 제목 */}
          <div className="mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight text-center px-2">
              KHUDA를 이끌어가는 운영진을 소개합니다
            </h2>
          </div>

          {/* 현재 기수 (9기) */}
          <div className="mb-10 sm:mb-12 md:mb-16">
            <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-700 mb-8 sm:mb-10 text-center">
              {currentGeneration.generation}
            </h3>
            <div className="px-4 sm:px-6 md:px-8">
              <ExecutiveGrid executives={currentGeneration.executives} />
            </div>
          </div>

          {/* 이전 기수 (토글 형태) */}
          {pastGenerations.length > 0 && (
            <div className="space-y-3 sm:space-y-4">
              {pastGenerations.map((generation) => {
                const isExpanded = expandedGenerations.has(generation.generation);

                return (
                  <div
                    key={generation.generation}
                    className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50 shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-300"
                  >
                    {/* 토글 헤더 */}
                    <button
                      onClick={() => toggleGeneration(generation.generation)}
                      className="w-full px-6 sm:px-8 md:px-10 py-4 sm:py-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-200 group"
                    >
                      <span className="text-base sm:text-lg md:text-xl font-medium text-gray-900">
                        {generation.generation}
                      </span>
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-gray-600 transition-all duration-200",
                          isExpanded && "transform rotate-180"
                        )}
                      />
                    </button>

                    {/* 토글 콘텐츠 */}
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300 ease-in-out",
                        isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      <div className="px-4 sm:px-6 md:px-8 py-5 sm:py-6 md:py-8 border-t border-gray-200 bg-gray-50">
                        <ExecutiveGrid executives={generation.executives} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExecutiveProfileSection;
