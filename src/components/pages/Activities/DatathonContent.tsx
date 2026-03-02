import ImageGallery from "./ImageGallery";

const DatathonContent = () => (
  <div>
    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">04 · Datathon</p>
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
      데이터톤
    </h3>
    <p className="text-sm sm:text-base text-foreground/60 leading-[1.8] mb-6 sm:mb-8">
      트랙 구분 없이 팀을 구성해 주어진 데이터셋과 문제를 해결하는 대회입니다.<br />
      데이터 전처리부터 모델링, 결과 해석까지 전 과정을 제한된 시간 내에 수행하며,<br />
      실전 경험과 팀워크를 동시에 쌓을 수 있는 KHUDA의 핵심 행사 중 하나입니다.
    </p>

    <ImageGallery
      images={[
        { src: "/images/activities/datathon-2.jpg", alt: "데이터톤 단체사진" },
        { src: "/images/activities/datathon-1.jpg", alt: "데이터톤 발표" },
        { src: "/images/activities/datathon-3.jpg", alt: "데이터톤 현장" },
      ]}
    />
  </div>
);

export default DatathonContent;
