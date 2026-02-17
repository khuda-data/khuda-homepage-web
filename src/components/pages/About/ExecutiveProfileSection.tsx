import { useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SCROLL_ANIMATION_CONFIG, EXECUTIVE_PROFILES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ChevronDown, Mail, Linkedin, Github, GraduationCap, User } from "lucide-react";

const SCROLL_REVEAL_OPTIONS = {
  threshold: SCROLL_ANIMATION_CONFIG.threshold,
  rootMargin: "0px 0px -80px 0px",
};

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
    <section className="relative bg-background py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div
          ref={ref}
          className={cn(
            "max-w-7xl mx-auto transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          {/* 섹션 제목 */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 leading-relaxed text-center">
              KHUDA를 이끌어가는 운영진을 소개합니다
            </h2>
          </div>

          {/* 현재 기수 (9기) */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-700 mb-8 sm:mb-10 md:mb-12 text-center">
              {currentGeneration.generation}
            </h3>
            <div className="px-6 sm:px-8 md:px-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 max-w-6xl mx-auto w-full">
              {currentGeneration.executives.map((executive, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-100 rounded-xl p-5 sm:p-6 md:p-7 hover:shadow-lg hover:border-gray-200 transition-all duration-300 flex flex-col group"
                >
                  {/* 프로필 이미지 영역 */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 sm:mb-5 rounded-full bg-gray-900 flex items-center justify-center overflow-hidden relative shadow-sm">
                    {executive.image ? (
                      <img
                        src={executive.image}
                        alt={executive.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                        <User className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                      </div>
                    )}
                  </div>

                  {/* 역할과 이름 */}
                  <div className="text-center mb-3 sm:mb-4">
                    <p className="text-xs sm:text-sm text-gray-500 mb-1 font-medium">
                      {executive.role}
                    </p>
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                      {executive.name}
                    </h4>
                  </div>

                  {/* 소속 정보 */}
                  {(executive.affiliation || executive.department) && (
                    <div className="text-center mb-4 sm:mb-5 flex items-center justify-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                      <p className="text-xs sm:text-sm text-gray-500">
                        {executive.affiliation || executive.department}
                      </p>
                    </div>
                  )}

                  {/* 소셜 링크 */}
                  {(executive.email || executive.linkedin || executive.github) && (
                    <div className="flex items-center justify-center gap-4 sm:gap-5 pt-4 border-t border-gray-100">
                      {executive.email && (
                        <a
                          href={`mailto:${executive.email}`}
                          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                          aria-label="이메일"
                        >
                          <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                        </a>
                      )}
                      {executive.linkedin && (
                        <a
                          href={executive.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                        </a>
                      )}
                      {executive.github && (
                        <a
                          href={executive.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                          aria-label="GitHub"
                        >
                          <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
              </div>
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
                    className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    {/* 토글 헤더 */}
                    <button
                      onClick={() => toggleGeneration(generation.generation)}
                      className="w-full px-6 sm:px-8 md:px-10 py-5 sm:py-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-200 group"
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
                      <div className="px-6 sm:px-8 md:px-10 py-6 sm:py-8 md:py-10 border-t border-gray-100 bg-gray-50/30">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 max-w-6xl mx-auto w-full">
                          {generation.executives.map((executive, index) => (
                            <div
                              key={index}
                              className="bg-white border border-gray-100 rounded-xl p-5 sm:p-6 md:p-7 hover:shadow-lg hover:border-gray-200 transition-all duration-300 flex flex-col group"
                            >
                              {/* 프로필 이미지 영역 */}
                              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 sm:mb-5 rounded-full bg-gray-900 flex items-center justify-center overflow-hidden relative shadow-sm">
                                {executive.image ? (
                                  <img
                                    src={executive.image}
                                    alt={executive.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                                    <User className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                                  </div>
                                )}
                              </div>

                              {/* 역할과 이름 */}
                              <div className="text-center mb-3 sm:mb-4">
                                <p className="text-xs sm:text-sm text-gray-500 mb-1 font-medium">
                                  {executive.role}
                                </p>
                                <h4 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                                  {executive.name}
                                </h4>
                              </div>

                              {/* 소속 정보 */}
                              {(executive.affiliation || executive.department) && (
                                <div className="text-center mb-4 sm:mb-5 flex items-center justify-center gap-1.5">
                                  <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                                  <p className="text-xs sm:text-sm text-gray-500">
                                    {executive.affiliation || executive.department}
                                  </p>
                                </div>
                              )}

                              {/* 소셜 링크 */}
                              {(executive.email || executive.linkedin || executive.github) && (
                                <div className="flex items-center justify-center gap-4 sm:gap-5 pt-4 border-t border-gray-100">
                                  {executive.email && (
                                    <a
                                      href={`mailto:${executive.email}`}
                                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                      aria-label="이메일"
                                    >
                                      <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </a>
                                  )}
                                  {executive.linkedin && (
                                    <a
                                      href={executive.linkedin}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                      aria-label="LinkedIn"
                                    >
                                      <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </a>
                                  )}
                                  {executive.github && (
                                    <a
                                      href={executive.github}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                      aria-label="GitHub"
                                    >
                                      <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
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
