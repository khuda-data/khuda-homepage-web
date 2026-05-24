export interface Project {
  title: string;
  members: string;
  longDescription: string;
  generation: string;
  track: string;
  thumbnail: string;
  slides: string[];
  githubUrl?: string;
}

export const projectsData: Project[] = [
  {
    title: "데이터 기반 이륜차 사고위험지수 개발 및 최적 단속지점 제안",
    members: "이재용, 김서윤, 박도현, 정하은",
    longDescription:
      "배달 플랫폼 성장으로 이륜차 운행이 급증하며 관련 사고가 사회적 문제로 대두되고 있습니다. 사고 다발지 데이터를 바탕으로 이륜차 사고 위험 지수를 개발하고, 사고를 효과적으로 줄일 수 있는 단속 및 안전 인프라 설치 우선순위를 제안합니다. 잠재적 위험 지역을 찾아내어 선제적으로 예방할 수 있는 데이터 기반 접근방식의 솔루션을 제공합니다.",
    generation: "8기",
    track: "ML 심화",
    thumbnail: "/images/projects/motorcycle-safety.png",
    slides: [],
    githubUrl: "https://github.com/khuda-data/8th-MLFull-RIDER",
  },
  {
    title: "카드 소비 데이터 기반 소비 취약군 식별 및 맞춤형 정책 제안",
    members: "한지민, 오태양, 송예린, 윤성호",
    longDescription:
      "수원시 카드 소비 데이터를 활용하여 기존 복지·금융 지표로는 포착하기 어려운 소비 취약 집단을 식별하고, 데이터 기반 맞춤형 정책 방향을 제안합니다. Isolation Forest와 군집 분석을 결합한 2단계 분석 프레임워크를 적용해 서로 다른 원인을 가진 소비 취약군을 도출하였습니다.",
    generation: "8기",
    track: "ML 심화",
    thumbnail: "/images/projects/consumption-vulnerability.png",
    slides: [],
    githubUrl: "https://github.com/khuda-data/8th-MLFull-CardBasedSugg",
  },
  {
    title: "CCTV 영상 기반 보행 특성 분석을 통한 장애인 전용 주차구역 부정 이용 탐지",
    members: "최민준, 강수빈, 임현우, 배지연, 조은서",
    longDescription:
      "CCTV 영상에서 장애인 전용 주차구역에 주차된 차량에서 하차하는 사람의 보행 특성(Gait)을 분석하여, 보행상 장애 이용자가 실제로 탑승했을 가능성을 비식별적으로 추정하는 컴퓨터 비전 기반 프로토타입 시스템입니다. YOLO 기반 객체 탐지와 BoT-SORT 기반 Multi-object Tracking을 결합하였습니다.",
    generation: "8기",
    track: "CV",
    thumbnail: "/images/projects/parking-violation.png",
    slides: [],
    githubUrl: "https://github.com/khuda-data/8th-CV-DisabledParkingGuard",
  },
  {
    title: "Grad-CAM과 Gemini를 결합한 제조 결함 하이브리드 검출 시스템",
    members: "유준혁, 김나연, 이동현, 박소율",
    longDescription:
      "ResNet-34의 Grad-CAM 시각화 결과를 Gemini API가 분석하여, 기존 딥러닝 모델이 놓치던 미세 결함(False Negative)을 언어적 추론으로 찾아내는 하이브리드 검출 시스템입니다. 재학습 없이도 미검출 결함 탐지율을 개선합니다.",
    generation: "8기",
    track: "데이터비즈니스",
    thumbnail: "/images/projects/defect-detection.png",
    slides: [],
    githubUrl: "https://github.com/khuda-data/8th-DB-Refocus",
  },
  {
    title: "Steam 게임 쾌적도 지수(GCI) — 실시간 동접자 기반 매칭 품질 지표화",
    members: "장시우, 권다은, 신재민, 홍유진",
    longDescription:
      "실시간 동시 접속자 수(PCCU)와 매칭 필터 알고리즘을 결합하여 게임 서비스 상태 및 유저 체감 품질을 지표화한 데이터 엔지니어링 프로젝트입니다. Steam API와 커뮤니티 여론 데이터를 수집하고, 독자적인 '적합 유저 유입 속도' 수식을 적용하여 유저에게 최적의 플레이 타이밍을 제안합니다.",
    generation: "8기",
    track: "데이터엔지니어링",
    thumbnail: "/images/projects/match-quality.png",
    slides: [],
    githubUrl: "https://github.com/khuda-data/8th-DE-SteamQueue",
  },
  {
    title: "자소서 텍스트에서 검증 가능한 주장(Claim) 추출 및 즉석 후속 질문 검증 시스템",
    members: "정승우, 김하율, 이서준, 박민지, 조현아",
    longDescription:
      "자소서 텍스트에서 검증 가능한 주장(Claim)을 추출하고, 즉석 후속 질문을 통해 검증하는 시스템입니다. BERT 계열 모델로 Claim을 파싱하고 LLM으로 질문을 생성하며, FastAPI + PostgreSQL + FAISS로 전체 파이프라인을 구축하였습니다.",
    generation: "8기",
    track: "NLP",
    thumbnail: "/images/projects/claim-verification.png",
    slides: [],
    githubUrl: "https://github.com/khuda-data/8th-NLP-CoverLetter",
  },
  {
    title: "사이버펑크 2077 출시 전후 여론 변화 시뮬레이션 — Multi-Agent RAG",
    members: "안도윤, 서지원, 문태호, 황수아",
    longDescription:
      "사이버펑크 2077의 출시 전후 여론 변화를 시뮬레이션하기 위해, 3가지 다른 방법론을 비교 분석하는 프로젝트입니다. 공통된 평가 스크립트와 공통 페르소나 모듈을 사용하여 실험의 일관성을 유지하며, 에이전트 기반 시뮬레이션을 통해 시간에 따른 동적 변화를 모델링합니다.",
    generation: "8기",
    track: "NLP",
    thumbnail: "/images/projects/sentiment-simulation.png",
    slides: [],
    githubUrl: "https://github.com/khuda-data/8th-NLP-Persona",
  },
  {
    title: "유튜브 썸네일 효과 분석",
    members: "",
    longDescription:
      "유튜브 썸네일이 시청자 클릭률과 시청 지속 시간에 미치는 영향을 데이터로 분석하는 프로젝트입니다.",
    generation: "8기",
    track: "CV",
    thumbnail: "/images/projects/thumbnail-impact.png",
    slides: [],
  },
  {
    title: "수원시 공유 냉장고 싹쓸이 감지 패턴 모델",
    members: "",
    longDescription:
      "수원시 공유 냉장고 이용 데이터를 활용하여 비정상적 싹쓸이 패턴을 감지하고, 공정한 나눔이 이루어지도록 지원하는 모델 개발 프로젝트입니다.",
    generation: "8기",
    track: "데이터엔지니어링",
    thumbnail: "/images/projects/hoarding-detection.png",
    slides: [],
  },
];

export const generations = ["모든 기수", "9기", "8기", "7기", "6기", "5기", "4기", "3기", "2기", "1기"];
export const trackOptions = ["모든 트랙", "NLP", "CV", "데이터엔지니어링", "데이터비즈니스", "ML 심화"];
export const trackDisplayOrder = ["NLP", "CV", "데이터엔지니어링", "데이터비즈니스", "ML 심화"];
