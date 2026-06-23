const AcademicFestivalContent = () => (
  <div>
    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">05 · Conference</p>
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
      정기 학술제
    </h3>
    <p className="text-sm sm:text-base text-foreground/60 leading-[1.8] mb-6 sm:mb-8">
      트랙별 1–2팀을 구성해 팀 단위 프로젝트를 수행하고, 학술 포스터 제작과 프로젝트 발표를 진행합니다.
      프로젝트를 공유하고 설명하는 경험을 통해 사고의 깊이와 표현력을 함께 성장시킵니다.
      여기에 교수님을 비롯해 현직자 분들이 심사위원으로 참여합니다.
    </p>

    <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
      {[
        { src: "/images/activities/conference-1.png", alt: "정기 학술제 1" },
        { src: "/images/activities/conference-2.jpg", alt: "정기 학술제 2" },
      ].map((img) => (
        <img key={img.src} src={img.src} alt={img.alt} className="rounded-xl h-44 sm:h-60 md:h-64 w-[72vw] sm:w-auto sm:flex-1 flex-shrink-0 snap-start object-cover" />
      ))}
    </div>
  </div>
);

export default AcademicFestivalContent;
