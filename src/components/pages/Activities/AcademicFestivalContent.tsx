const AcademicFestivalContent = () => (
  <div>
    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">05 · Conference</p>
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
      정기 학술제
    </h3>
    <p className="text-sm sm:text-base text-foreground/60 leading-[1.8] mb-6 sm:mb-8">
      트랙별 1–2팀을 구성해 팀 단위 프로젝트를 수행하고, 학술 포스터 제작과 프로젝트 발표를 진행합니다.<br />
      프로젝트를 공유하고 설명하는 경험을 통해 사고의 깊이와 표현력을 함께 성장시킵니다.
    </p>

    <div className="flex gap-3 justify-start">
      {[
        { src: "/images/activities/conference-1.png", alt: "정기 학술제 1" },
        { src: "/images/activities/conference-2.jpeg", alt: "정기 학술제 2" },
      ].map((img) => (
        <img key={img.src} src={img.src} alt={img.alt} className="rounded-xl h-44 sm:h-60 md:h-64 w-auto object-cover" />
      ))}
    </div>

    <div className="flex flex-col sm:flex-row mt-6 sm:mt-8 border-y sm:border-y-0 sm:border-x border-border divide-y sm:divide-y-0 sm:divide-x divide-border">
      <div className="flex-1 px-4 py-4 sm:py-0">
        <h5 className="text-sm font-semibold text-foreground mb-1.5">포스터 발표</h5>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          참가 팀이 자신의 프로젝트를 포스터로 만들어 발표하는 자리입니다.<br />
          KHUDA 부원들 간의 상호 평가를 통해 피드백을 받습니다.
        </p>
      </div>
      <div className="flex-1 px-4 py-4 sm:py-0">
        <h5 className="text-sm font-semibold text-foreground mb-1.5">최종 발표</h5>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          심사위원분들을 모셔서 진행하는 프로젝트 발표입니다.<br />
          교수님을 비롯해 현직자 분들이 심사위원으로 참여합니다.
        </p>
      </div>
    </div>
  </div>
);

export default AcademicFestivalContent;
