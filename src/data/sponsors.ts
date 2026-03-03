export interface Sponsor {
  name: string;
  logo?: string;
  website?: string;
  description?: string;
  year: number;
  /** 같은 년도 내 노출 순서 (작을수록 먼저, 임팩트 높은 순) */
  order?: number;
}

export interface GenerationSponsors {
  generation: string;
  sponsors: Sponsor[];
}

// 년도별 후원사 데이터 (년도 내림차순, 같은 년도는 order 오름차순·미지정 시 뒤로)
export const SPONSOR_DATA_BY_YEAR: Sponsor[] = [
  { name: "몬스터 에너지", year: 2026 },
  { name: "Perplexity", year: 2025, order: 1 },
  { name: "Lovable", year: 2025, order: 2 },
  { name: "블레이버스", year: 2025, order: 3 },
  { name: "한빛앤", logo: "/images/sponsors/hanbit-color.png", website: "https://www.hanbitn.com", year: 2025, order: 4 },
  { name: "레드불", year: 2025, order: 5 },
  { name: "몬스터 에너지", year: 2025, order: 6 },
  { name: "김성민커피", year: 2025, order: 7 },
  { name: "현대모비스", year: 2024 },
  { name: "경희대학교 중앙동아리연합회", description: "6기부터 (~2024)", year: 2024 },
];

// 기수별 역대 후원사 데이터 (하위 호환성 유지)
export const SPONSOR_DATA: GenerationSponsors[] = [
  {
    generation: "8기",
    sponsors: [
      { name: "Lovable", logo: "/images/sponsors/lovable-color.png", website: "https://lovable.dev", year: 2025 },
      { name: "Perplexity", logo: "/images/sponsors/perplexity-color.png", website: "https://www.perplexity.ai", year: 2025 },
      { name: "경희대학교", logo: "/images/sponsors/univ-color.png", website: "https://www.khu.ac.kr", year: 2025 },
    ],
  },
];
