import ImageGallery from "./ImageGallery";

const tracks = [
  { name: "Data Analytics", fullName: "데이터 분석" },
  { name: "Data Engineering", fullName: "데이터 엔지니어링" },
  { name: "LLM", fullName: "LLM" },
  { name: "CV", fullName: "컴퓨터 비전" },
  { name: "AI Engineering", fullName: "AI 엔지니어링" },
  { name: "Finance", fullName: "금융" },
];

const TrackSessionContent = () => (
  <div>
    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">03 · Session</p>
    <h3 className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
      심화 세션
      <span className="text-sm sm:text-base md:text-lg font-semibold text-foreground/35">
        Track Session
      </span>
    </h3>
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-2.5 mb-5">
      {tracks.map((track) => (
        <span
          key={track.name}
          className="inline-flex items-baseline justify-center sm:justify-start gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-white border border-border shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        >
          <span className="text-[13px] sm:text-sm font-bold text-foreground break-keep">{track.fullName}</span>
          <span className="hidden sm:inline text-[11px] font-medium text-muted-foreground">{track.name}</span>
        </span>
      ))}
    </div>
    <p className="text-sm sm:text-base text-foreground/60 leading-[1.8] mb-6 sm:mb-8">
      학기 중에는 관심 분야에 따라 6개 트랙 중 선택하여 보다 전문적인 주제와 실제 적용 사례를 다룹니다.
      트랙장 주관 심화 이론 및 적용 기법 학습, 최신 논문, 산업 사례, 실무 관점 공유를 통해
      같은 '데이터·AI 분야'라도 세부 트랙에 따라 어떻게 달라지는지 이해하는 단계로 나아갑니다.
    </p>

    <ImageGallery
      images={[
        { src: "/images/activities/track-session-3.jpg", alt: "심화 세션 4" },
        { src: "/images/activities/track-session-1.jpg", alt: "심화 세션" },
        { src: "/images/activities/track-session-2.jpg", alt: "심화 세션 2" },
      ]}
    />
  </div>
);

export default TrackSessionContent;
