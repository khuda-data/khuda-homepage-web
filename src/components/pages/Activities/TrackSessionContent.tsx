import ImageGallery from "./ImageGallery";

const tracks = [
  { name: "CV", fullName: "컴퓨터비전" },
  { name: "NLP", fullName: "자연어처리" },
  { name: "Finance", fullName: "금융" },
  { name: "Data Business", fullName: "데이터비즈니스" },
  { name: "Data Engineering", fullName: "데이터엔지니어링" },
  { name: "AI Engineering", fullName: "AI엔지니어링" },
];

const TrackSessionContent = () => (
  <div>
    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">03 · Session</p>
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
      심화 세션 (Track Session)
    </h3>
    <div className="flex flex-wrap gap-2 mb-5">
      {tracks.map((track) => (
        <span
          key={track.name}
          className="px-3 py-1.5 rounded-full bg-muted text-foreground/70 text-xs sm:text-sm font-medium"
        >
          {track.name}
        </span>
      ))}
    </div>
    <p className="text-sm sm:text-base text-foreground/60 leading-[1.8] mb-6 sm:mb-8">
      학기 중에는 관심 분야에 따라 6개 트랙 중 선택하여 보다 전문적인 주제와 실제 적용 사례를 다룹니다.<br />
      트랙장 주관 심화 이론 및 적용 기법 학습, 최신 논문, 산업 사례, 실무 관점 공유를 통해<br />
      같은 '머신러닝'이라도 분야에 따라 어떻게 달라지는지 이해하는 단계로 나아갑니다.
    </p>

    <ImageGallery
      images={[
        { src: "/images/activities/track-session.jpg", alt: "심화 세션" },
        { src: "/images/activities/track-session-2.jpg", alt: "심화 세션 2" },
        { src: "/images/activities/track-session-3.jpg", alt: "심화 세션 3" },
      ]}
    />
  </div>
);

export default TrackSessionContent;
