export type ProjectType = "심화" | "토이";

export interface Project {
  id: string;
  title: string;
  generation: string;
  type: ProjectType;
  // 카드에 보여 주는 트랙 이름. 당시 이름 그대로 쓴다. (예: 데이터비즈니스, NLP)
  // 두 트랙이 함께 진행한 프로젝트는 두 개를 적는다. 토이 프로젝트는 ["토이 프로젝트"].
  tracks: string[];
  // 트랙 필터에서 이 프로젝트를 찾을 때 쓰는 이름. 현재 트랙 이름(아래 SEARCH_TRACKS)만 쓴다.
  searchTracks: string[];
  tags: string[];
  summary: string;
  description: string;
  thumbnail: string;
  githubUrl?: string;
}

// 프로젝트 글 자체는 content/projects/<기수>/*.md 에 들어있다.
// 그 .md 파일들을 읽어 Project[] 로 바꾸는 코드는 projects.server.ts 에 있고,
// 페이지(page.tsx)가 빌드 시점에 호출한다. 글을 추가/수정할 때 이 파일은 건드릴 필요 없다.

export const TOY_TRACK = "토이 프로젝트";

// 트랙 필터 선택지 (현재 트랙 이름 기준, 커리큘럼 순서).
// 이름이 바뀌거나 합쳐진 옛 트랙은 searchTracks 에서 현재 이름으로 묶는다.
//   NLP → LLM / 데이터비즈니스·데이터엔지니어링·추천시스템 → 데이터 분석 / 강화학습 → ML 심화
// ML 심화는 지금은 운영하지 않지만 과거 프로젝트를 찾을 수 있게 남겨 둔다.
export const SEARCH_TRACKS = [
  "데이터 분석",
  "LLM",
  "CV",
  "AI 엔지니어링",
  "금융",
  "ML 심화",
  TOY_TRACK,
];

export const ALL_TRACKS = "모든 트랙";
export const ALL_GENERATIONS = "모든 기수";

// 실제로 프로젝트가 있는 트랙·기수만 필터에 보여 준다. (빈 결과가 나오는 선택지를 없앤다)
export function getTrackOptions(projects: Project[]): string[] {
  const used = new Set(projects.flatMap((project) => project.searchTracks));
  return [ALL_TRACKS, ...SEARCH_TRACKS.filter((track) => used.has(track))];
}

export function getGenerationOptions(projects: Project[]): string[] {
  const numbers = [...new Set(projects.map((project) => parseInt(project.generation, 10)))]
    .filter((n) => !Number.isNaN(n))
    .sort((a, b) => b - a);
  return [ALL_GENERATIONS, ...numbers.map((n) => `${n}기`)];
}
