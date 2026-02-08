import { SECTION_STYLES } from "@/lib/constants";
import { useEffect, useState } from "react";
import AchievementsSection, { type AchievementInfo } from "./AchievementsSection";
import FeatureShowcase, { type FeatureInfo } from "./FeatureShowcase";
import TrackShowcase from "./TrackShowcase";
import ProfessorShowcase from "./ProfessorShowcase";
import SponsorShowcase from "./SponsorShowcase";
import ScrollReveal from "@/components/shared/ScrollReveal";

const AboutSection = () => {
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const handleReset = () => {
      setResetKey(prev => prev + 1);
    };

    window.addEventListener('countup-reset', handleReset);
    return () => {
      window.removeEventListener('countup-reset', handleReset);
    };
  }, []);

  const features: FeatureInfo[] = [
    {
      title: "ML 세션",
      description: "머신러닝 기초를 체계적으로 다지는 시간입니다. 파이썬 실습부터 머신러닝 핵심 개념까지, 데이터 분석의 기초를 탄탄히 쌓아갑니다.",
      details: "개인 랜덤 발제, 퀴즈, 팀별 토의를 통해 이론과 실습을 함께 학습합니다.",
    },
    {
      title: "토이 프로젝트 컨퍼런스",
      description: "방학 세션에서 배운 내용을 바탕으로 팀 단위로 진행한 토이 프로젝트를 발표하는 자리입니다.",
      details: "첫 프로젝트 경험을 통해 협업과 발표의 기초를 다집니다.",
    },
    {
      title: "파티룸",
      description: "네트워킹과 레크레이션을 통해 동아리원들과의 유대감을 형성하는 시간입니다.",
      details: "함께하는 즐거움을 통해 더욱 긴밀한 협업의 기반을 만듭니다.",
    },
    {
      title: "정규 세션",
      description: "심화 트랙에서 선택한 분야를 깊이 있게 공부하는 시간입니다. CV, NLP, Finance 등 전문 분야를 집중적으로 학습합니다.",
      details: "트랙별 심화 커리큘럼을 통해 전문성을 키워갑니다.",
    },
    {
      title: "정기 학술제 & 심화 프로젝트 컨퍼런스",
      description: "한 학기 동안 심화 트랙에서 완성한 프로젝트를 발표하는 학회의 대표 행사입니다.",
      details: "포스터 발표와 정식 발표를 통해 전문가들로부터 피드백을 받으며 프로젝트를 완성도 높게 발전시킵니다.",
    },
  ];

  const achievements: AchievementInfo[] = [
    { value: 200, label: "수료생", suffix: "+" },
    { value: 150, label: "아이디어 제출", suffix: "+" },
    { value: 9, label: "기수", suffix: "기", from: 1 },
    { value: 0, label: "중앙동아리연합회 선정", suffix: "", isStatic: true, staticText: "경희대학교\n2025 최우수 동아리" },
  ];

  return (
    <>
      {/* 성과 섹션 + 소개 텍스트 */}
      <section className="relative bg-background py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-6 sm:px-8 md:px-16 lg:px-20">
          <AchievementsSection achievements={achievements} resetKey={resetKey} />
          
          {/* 소개 텍스트 */}
          <div className="mt-6 sm:mt-8 md:mt-10">
            <ScrollReveal className="text-center">
              <div className={SECTION_STYLES.maxWidth.narrow}>
                <p className="text-xs sm:text-sm md:text-base text-white/70 leading-relaxed">
                  많은 경희대 학우들이 KHUDA에서 시작했습니다.
                </p>
                <p className="text-xs sm:text-sm md:text-base text-white/70 leading-relaxed mt-2">
                  데이터와 AI의 세계로 첫걸음을 내딛고, 함께 성장하며 새로운 가능성을 만들어갑니다.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 특징 쇼케이스 섹션 */}
      <section className="relative bg-background py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-6 sm:px-8 md:px-16 lg:px-20">
          <FeatureShowcase features={features} />
        </div>
      </section>

      {/* 트랙 소개 섹션 */}
      <section className="relative bg-background py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-6 sm:px-8 md:px-16 lg:px-20">
          <TrackShowcase />
        </div>
      </section>

      {/* 지도교수 소개 섹션 */}
      <section className="relative bg-background py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-6 sm:px-8 md:px-16 lg:px-20">
          <ProfessorShowcase />
        </div>
      </section>

      {/* 후원사 섹션 */}
      <section className="relative bg-background py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-6 sm:px-8 md:px-16 lg:px-20">
          <SponsorShowcase />
        </div>
      </section>

    </>
  );
};

export default AboutSection;
