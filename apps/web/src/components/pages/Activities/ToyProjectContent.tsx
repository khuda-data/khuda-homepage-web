import ImageGallery from "./ImageGallery";

const ToyProjectContent = () => (
  <div>
    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">02 · Project</p>
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
      토이 프로젝트
    </h3>
    <p className="text-sm sm:text-base text-foreground/60 leading-[1.8] mb-6 sm:mb-8">
      학습한 파이썬 프로그래밍과 머신러닝 기초 지식을 바탕으로 문제 정의부터 구현까지 전 과정을 경험합니다.
      프로젝트 주제 기획, 데이터 수집 및 전처리, 모델 설계 및 구현, 결과 정리 및 공유를 통해
      학습한 내용을 "아는 것"에서 끝내지 않고 직접 만들어보는 경험으로 연결합니다.
    </p>

    <ImageGallery
      images={[
        { src: "/images/activities/toy-project-1.jpg", alt: "토이 프로젝트 3" },
        { src: "/images/activities/toy-project-2.jpg", alt: "토이 프로젝트 4" },
        { src: "/images/activities/toy-project-3.jpg", alt: "토이 프로젝트 5" },
      ]}
    />
  </div>
);

export default ToyProjectContent;
