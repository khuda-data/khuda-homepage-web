import { useEffect, useState } from "react";
import AchievementsSection, { type AchievementInfo } from "./AchievementsSection";
import FeatureShowcase, { type FeatureInfo } from "./FeatureShowcase";
import TrackShowcase from "./TrackShowcase";
import SponsorShowcase from "./SponsorShowcase";

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
      title: "ML 기초 & 토이",
      label: "학습",
      description: "머신러닝 기초부터 토이 프로젝트까지, 데이터 사이언스의 첫걸음을 함께 시작합니다.",
      details: "파이썬 실습, ML 핵심 개념 학습, 그리고 팀 단위 토이 프로젝트를 통해 이론과 실전을 동시에 경험합니다.",
    },
    {
      title: "정규 & 심화 컨퍼런스",
      label: "성장",
      description: "심화 트랙에서 선택한 분야를 깊이 있게 공부하고, 프로젝트 결과를 발표합니다.",
      details: "CV, NLP, Finance 등 전문 분야의 심화 커리큘럼과 컨퍼런스를 통해 전문성을 키워갑니다.",
    },
    {
      title: "정기 학술제",
      label: "성과",
      description: "한 학기 동안 완성한 프로젝트를 발표하는 KHUDA의 대표 학술 행사입니다.",
      details: "포스터 발표와 정식 발표를 통해 전문가들로부터 피드백을 받으며 프로젝트의 완성도를 높입니다.",
    },
    {
      title: "네트워킹",
      label: "교류",
      description: "동아리원들과의 유대감을 형성하고 새로운 인연을 만드는 시간입니다.",
      details: "파티룸, 레크레이션, MT 등 다양한 네트워킹 활동을 통해 함께 성장하는 커뮤니티를 만들어갑니다.",
    },
  ];

  const achievements: AchievementInfo[] = [
    { value: 9, label: "기수", suffix: "기", from: 1, emoji: "🚀", variant: "accent" },
    { value: 150, label: "아이디어 제출", suffix: "+", emoji: "💡", variant: "accent" },
    { value: 200, label: "수료생", suffix: "+", emoji: "🎓", variant: "accent" },
    { value: 0, label: "중앙동아리연합회 선정", suffix: "", isStatic: true, staticText: "경희대학교\n2025 최우수 동아리", emoji: "🏆", variant: "primary" },
  ];

  return (
    <>
      {/* 성과 섹션 + 소개 텍스트 */}
      <section className="relative bg-background py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-6 sm:px-8 md:px-16 lg:px-20">
          <AchievementsSection achievements={achievements} resetKey={resetKey} />
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
