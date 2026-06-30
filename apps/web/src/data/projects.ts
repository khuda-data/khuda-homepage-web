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

// 프로젝트 글 자체는 content/projects/<기수>/*.md 에 들어있다.
// 그 .md 파일들을 읽어 Project[] 로 바꾸는 코드는 projects.server.ts 에 있고,
// 페이지(page.tsx)가 빌드 시점에 호출한다. 글을 추가/수정할 때 이 파일은 건드릴 필요 없다.

// 최신 기수. 새 기수가 시작되면 이 숫자만 올리면 필터 목록이 자동으로 갱신된다.
const LATEST_GENERATION = 10;
export const generations = [
  "모든 기수",
  ...Array.from({ length: LATEST_GENERATION }, (_, index) => `${LATEST_GENERATION - index}기`),
];

// 화면에 노출하는 정식 트랙은 아래 6개로 통일한다 (커리큘럼 트랙과 동일하게 유지).
// 순서도 커리큘럼 기준이다.
const CORE_TRACKS = ["데이터 분석", "데이터 엔지니어링", "NLP", "CV", "AI 엔지니어링", "금융"];
// ML 심화는 8기에서 금융 대신 운영한 트랙이라 과거 프로젝트 분류를 위해 예외로 유지한다.
// 9기 이후로는 금융 트랙을 사용하므로 새 프로젝트에는 ML 심화를 쓰지 않는다.
const LEGACY_TRACKS = ["ML 심화"];

export const trackOptions = ["모든 트랙", ...CORE_TRACKS, ...LEGACY_TRACKS];
export const trackDisplayOrder = [...CORE_TRACKS, ...LEGACY_TRACKS];
