export interface ExecutiveProfile {
  name: string;
  role: string;
  department?: string;
  year?: string;
  image?: string;
  description?: string;
  motto?: string;
  affiliation?: string;
  email?: string;
  linkedin?: string;
  github?: string;
}

export interface GenerationExecutives {
  generation: string;
  executives: ExecutiveProfile[];
}

export const EXECUTIVE_PROFILES: GenerationExecutives[] = [
  {
    generation: "9기",
    executives: [
      {
        name: "조윤수",
        role: "회장",
        department: "",
        affiliation: "경희대학교",
        year: "2024",
        email: "cho.yunsu@khuda.kr",
      },
      {
        name: "신진수",
        role: "부회장",
        department: "AI 엔지니어링",
        affiliation: "경희대학교",
        year: "2024",
        email: "shin.jinsu@khuda.kr",
      },
      {
        name: "양경식",
        role: "교육부장",
        department: "NLP",
        affiliation: "경희대학교",
        year: "2024",
        email: "yang.kyungsik@khuda.kr",
      },
      {
        name: "김회광",
        role: "교육부원",
        department: "",
        affiliation: "경희대학교",
        year: "2024",
        email: "kim.hoegwang@khuda.kr",
      },
      {
        name: "표지훈",
        role: "교육부원",
        department: "",
        affiliation: "경희대학교",
        year: "2024",
        email: "pyo.jihun@khuda.kr",
      },
      {
        name: "박윤찬",
        role: "기획부장",
        department: "",
        affiliation: "경희대학교",
        year: "2024",
        email: "park.yunchan@khuda.kr",
      },
      {
        name: "안시현",
        role: "기획부원",
        department: "",
        affiliation: "경희대학교",
        year: "2024",
        email: "ahn.sihyun@khuda.kr",
      },
      {
        name: "허준혁",
        role: "기획부원",
        department: "",
        affiliation: "경희대학교",
        year: "2024",
        email: "heo.junhyuk@khuda.kr",
      },
      {
        name: "오윤진",
        role: "대외협력부장",
        department: "",
        affiliation: "경희대학교",
        year: "2024",
        email: "oh.yunjin@khuda.kr",
      },
      {
        name: "이승주",
        role: "대외협력부원",
        department: "",
        affiliation: "경희대학교",
        year: "2024",
        email: "lee.seungju@khuda.kr",
      },
      {
        name: "이승준",
        role: "트랙장",
        department: "CV",
        affiliation: "경희대학교",
        year: "2024",
        email: "lee.seungjun@khuda.kr",
      },
      {
        name: "오종현",
        role: "트랙장",
        department: "데이터엔지니어링",
        affiliation: "경희대학교",
        year: "2024",
        email: "oh.jonghyun@khuda.kr",
      },
      {
        name: "강병오",
        role: "트랙장",
        department: "금융",
        affiliation: "경희대학교",
        year: "2024",
        email: "kang.byeongo@khuda.kr",
      },
      {
        name: "지가은",
        role: "트랙장",
        department: "데이터비즈니스",
        affiliation: "경희대학교",
        year: "2024",
        email: "ji.gaeun@khuda.kr",
      },
    ],
  },
  {
    generation: "8기",
    executives: [
      {
        name: "박윤찬",
        role: "회장",
        department: "",
        affiliation: "호텔관광대학 Hospitality 경영학과",
        year: "2023",
        email: "park.yunchan@khuda.kr",
      },
      {
        name: "이승준",
        role: "부회장",
        department: "CV",
        affiliation: "공과대학 산업경영공학과",
        year: "2023",
        email: "lee.seungjun@khuda.kr",
      },
      {
        name: "정유진",
        role: "대외협력부장",
        department: "NLP",
        affiliation: "공과대학 산업경영공학과",
        year: "2023",
        email: "jeong.yujin@khuda.kr",
      },
      {
        name: "조윤수",
        role: "기획부장",
        department: "",
        affiliation: "공과대학 산업경영공학과",
        year: "2023",
        email: "cho.yunsu@khuda.kr",
      },
      {
        name: "이지민",
        role: "기획부원",
        department: "",
        affiliation: "응용과학대학 우주과학과",
        year: "2023",
        email: "lee.jimin@khuda.kr",
      },
      {
        name: "신진수",
        role: "교육부장",
        department: "",
        affiliation: "소프트웨어융합대학 컴퓨터공학부",
        year: "2023",
        email: "shin.jinsu@khuda.kr",
      },
      {
        name: "김리원",
        role: "교육부원",
        department: "",
        affiliation: "소프트웨어융합대학 컴퓨터공학부",
        year: "2023",
        email: "kim.riwon@khuda.kr",
      },
      {
        name: "지가은",
        role: "홍보부장",
        department: "",
        affiliation: "정경대학 경제학과",
        year: "2023",
        email: "ji.gaeun@khuda.kr",
      },
      {
        name: "백지원",
        role: "홍보부원",
        department: "",
        affiliation: "소프트웨어융합대학 컴퓨터공학부",
        year: "2023",
        email: "baek.jiwon@khuda.kr",
      },
      {
        name: "양경식",
        role: "트랙장",
        department: "데이터엔지니어링",
        affiliation: "소프트웨어융합대학 컴퓨터공학부",
        year: "2023",
        email: "yang.kyungsik@khuda.kr",
      },
      {
        name: "임주현",
        role: "트랙장",
        department: "머신러닝 심화",
        affiliation: "공과대학 산업경영공학과",
        year: "2023",
        email: "im.juhyun@khuda.kr",
      },
      {
        name: "오윤진",
        role: "트랙장",
        department: "데이터비즈니스",
        affiliation: "공과대학 산업경영공학과",
        year: "2023",
        email: "oh.yunjin@khuda.kr",
      },
    ],
  },
  {
    generation: "7기",
    executives: [
      {
        name: "정유진",
        role: "회장",
        department: "",
        affiliation: "경희대학교",
        year: "2022",
        email: "jeong.yujin@khuda.kr",
      },
      {
        name: "이승준",
        role: "부회장",
        department: "",
        affiliation: "경희대학교",
        year: "2022",
        email: "lee.seungjun@khuda.kr",
      },
    ],
  },
];
