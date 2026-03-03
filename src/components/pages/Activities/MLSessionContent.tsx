import ImageGallery from "./ImageGallery";

const MLSessionContent = () => (
  <div>
    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">01 · Session</p>
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
      기초 세션 (ML Session)
    </h3>
    <p className="text-sm sm:text-base text-foreground/60 leading-[1.8] mb-6 sm:mb-8">
      방학 기간 동안 머신러닝의 기본 개념부터 주요 알고리즘까지, 이론과 실습을 병행하며 탄탄한 기초를 쌓는 세션입니다.
      주차별 교재 기반으로 핵심 개념 발제 및 코드 중심 학습, 이론·코드 퀴즈 및 해설 세션,
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

export default MLSessionContent;
