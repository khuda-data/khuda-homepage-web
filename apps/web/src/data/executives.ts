export interface ExecutiveProfile {
  name: string;
  role: string;
  department?: string;
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
  // 명단 공개 전 기수는 true로 두면 운영진 카드 대신 커밍순 안내가 노출된다.
  comingSoon?: boolean;
}

export const EXECUTIVE_PROFILES: GenerationExecutives[] = [
  {
    // 트랙장은 아직 미정이라 제외했다. 확정되면 role "트랙장" + department(트랙명)으로 추가한다.
    generation: "10기",
    executives: [
      {
        name: "표지훈",
        role: "회장",
        affiliation: "소프트웨어융합대학 소프트웨어융합학과",
        email: "pjh7639@khu.ac.kr",
      },
      {
        name: "이세혁",
        role: "부회장",
        affiliation: "소프트웨어융합대학 소프트웨어융합학과",
        email: "tpgur0125@khu.ac.kr",
      },
      {
        name: "김연길",
        role: "교육부장",
        affiliation: "소프트웨어융합대학 소프트웨어융합학과",
        email: "mcladinz@khu.ac.kr",
      },
      {
        name: "이채경",
        role: "교육부원",
        affiliation: "소프트웨어융합대학 소프트웨어융합학과",
        email: "leecg1219@khu.ac.kr",
      },
      {
        name: "정시찬",
        role: "교육부원",
        affiliation: "소프트웨어융합대학 소프트웨어융합학과",
        email: "jsc66519075@khu.ac.kr",
      },
      {
        name: "남필량",
        role: "기획부장",
        affiliation: "소프트웨어융합대학 소프트웨어융합학과",
        email: "philipn337@khu.ac.kr",
      },
      {
        name: "김은아",
        role: "기획부원",
        affiliation: "국제대학 국제학과",
        email: "sarahkim3494@gmail.com",
      },
      {
        name: "김민영",
        role: "기획부원",
        affiliation: "생명과학대학 스마트팜과학과",
        email: "alsdud8863@khu.ac.kr",
      },
      {
        name: "최수민",
        role: "기획부원",
        affiliation: "공과대학 산업경영공학과",
        email: "chsumin0316@khu.ac.kr",
      },
      {
        name: "조윤수",
        role: "대외홍보부장",
        affiliation: "공과대학 산업경영공학과",
        email: "yoonsoo2002@khu.ac.kr",
      },
      {
        name: "장은서",
        role: "대외홍보부원",
        affiliation: "공과대학 산업경영공학과",
        email: "esc6829@khu.ac.kr",
      },
      {
        name: "유민서",
        role: "대외홍보부원",
        affiliation: "전자정보대학 생체의공학과",
        email: "minser2005@khu.ac.kr",
      },
      {
        name: "김나균",
        role: "대외홍보부원",
        affiliation: "공과대학 산업경영공학과",
        email: "0503kng@khu.ac.kr",
      },
    ],
  },
  {
    generation: "9기",
    executives: [
      {
        name: "조윤수",
        role: "회장",
        department: "",
        affiliation: "공과대학 산업경영공학과",
        email: "yoonsoo2002@gmail.com",
      },
      {
        name: "신진수",
        role: "부회장",
        department: "AI 엔지니어링",
        affiliation: "소프트웨어융합대학 컴퓨터공학부",
        email: "jsshin8128@gmail.com",
      },
      {
        name: "양경식",
        role: "교육부장",
        department: "NLP",
        affiliation: "소프트웨어융합대학 컴퓨터공학부",
        email: "sondin144@gmail.com",
      },
      {
        name: "김회광",
        role: "교육부원",
        department: "",
        affiliation: "소프트웨어융합대학 소프트웨어융합학과",
        email: "whekwang@khu.ac.kr",
      },
      {
        name: "표지훈",
        role: "교육부원",
        department: "",
        affiliation: "소프트웨어융합대학 소프트웨어융합학과",
        email: "pjh7639@khu.ac.kr",
      },
      {
        name: "박윤찬",
        role: "기획부장",
        department: "",
        affiliation: "호텔관광대학 Hospitality 경영학과",
        email: "yunchan1220@naver.com",
      },
      {
        name: "안시현",
        role: "기획부원",
        department: "",
        affiliation: "소프트웨어융합대학 컴퓨터공학부",
        email: "sihyun8870@khu.ac.kr",
      },
      {
        name: "허준혁",
        role: "기획부원",
        department: "",
        affiliation: "소프트웨어융합대학 소프트웨어융합학과",
        email: "scythe0325@khu.ac.kr",
      },
      {
        name: "오윤진",
        role: "대외협력부장",
        department: "",
        affiliation: "공과대학 산업경영공학과",
        email: "kohj1357@gmail.com",
      },
      {
        name: "이승주",
        role: "대외협력부원",
        department: "",
        affiliation: "공과대학 산업경영공학과",
        email: "pjh7639@khu.ac.kr",
      },
      {
        name: "장은서",
        role: "대외협력부원",
        department: "",
        affiliation: "공과대학 산업경영공학과",
        email: "changse6829@gmail.com",
      },
      {
        name: "이승준",
        role: "트랙장",
        department: "CV",
        affiliation: "공과대학 산업경영공학과",
        email: "diplomat3334@khu.ac.kr",
      },
      {
        name: "강병오",
        role: "트랙장",
        department: "금융",
        affiliation: "소프트웨어융합대학 컴퓨터공학부",
        email: "garamkg@khu.ac.kr",
      },
      {
        name: "지가은",
        role: "트랙장",
        department: "데이터비즈니스",
        affiliation: "경영대학 경제학과",
        email: "jikhwn@gmail.com",
      },
      {
        name: "오종현",
        role: "트랙장",
        department: "데이터엔지니어링",
        affiliation: "소프트웨어융합대학 소프트웨어융합학과",
        email: "sjaiz1717@gmail.com",
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
        email: "yunchan1220@naver.com",
      },
      {
        name: "이승준",
        role: "부회장",
        department: "CV",
        affiliation: "공과대학 산업경영공학과",
        email: "diplomat3334@khu.ac.kr",
      },
      {
        name: "정유진",
        role: "대외협력부장",
        department: "NLP",
        affiliation: "공과대학 산업경영공학과",
        email: "yujin010917@khu.ac.kr",
      },
      {
        name: "조윤수",
        role: "기획부장",
        department: "",
        affiliation: "공과대학 산업경영공학과",
        email: "yoonsoo2002@gmail.com",
      },
      {
        name: "이지민",
        role: "기획부원",
        department: "",
        affiliation: "응용과학대학 우주과학과",
        email: "jimin04119@khu.ac.kr",
      },
      {
        name: "신진수",
        role: "교육부장",
        department: "",
        affiliation: "소프트웨어융합대학 컴퓨터공학부",
        email: "jsshin8128@gmail.com",
      },
      {
        name: "김리원",
        role: "교육부원",
        department: "",
        affiliation: "소프트웨어융합대학 컴퓨터공학부",
        email: "kiosuke1215@gmail.com",
      },
      {
        name: "지가은",
        role: "홍보부장",
        department: "",
        affiliation: "정경대학 경제학과",
        email: "jikhwn@gmail.com",
      },
      {
        name: "백지원",
        role: "홍보부원",
        department: "",
        affiliation: "소프트웨어융합대학 컴퓨터공학부",
        email: "wldnjsl2001@khu.ac.kr",
      },
      {
        name: "오윤진",
        role: "트랙장",
        department: "데이터비즈니스",
        affiliation: "공과대학 산업경영공학과",
        email: "kohj1357@gmail.com",
      },
      {
        name: "양경식",
        role: "트랙장",
        department: "데이터엔지니어링",
        affiliation: "소프트웨어융합대학 컴퓨터공학부",
        email: "sondin144@gmail.com",
      },
      {
        name: "임주현",
        role: "트랙장",
        department: "머신러닝 심화",
        affiliation: "공과대학 산업경영공학과",
        email: "brian0644@khu.ac.kr",
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
        affiliation: "공과대학 산업경영공학과",
        email: "yujin010917@khu.ac.kr",
      },
      {
        name: "이승준",
        role: "부회장",
        department: "",
        affiliation: "공과대학 산업경영공학과",
        email: "diplomat3334@khu.ac.kr",
      },
      {
        name: "최소영",
        role: "기획부장",
        department: "",
        affiliation: "소프트웨어융합대학 소프트웨어융합학과",
        email: "thdud23@khu.ac.kr",
      },
      {
        name: "신진수",
        role: "기획부원",
        department: "",
        affiliation: "소프트웨어융합대학 컴퓨터공학과",
        email: "jsshin8128@gmail.com",
      },
      {
        name: "홍민혁",
        role: "교육부장",
        department: "",
        affiliation: "외국어대학 스페인어학과",
        email: "minster7650@khu.ac.kr",
      },
      {
        name: "김형준",
        role: "홍보부장",
        department: "데이터비즈니스&추천시스템",
        affiliation: "공과대학 산업경영공학과",
        email: "caesar8608@snu.ac.kr",
      },
      {
        name: "김민서",
        role: "홍보부원",
        department: "",
        affiliation: "소프트웨어융합대학 컴퓨터공학과",
        email: "kiminseo@khu.ac.kr",
      },
      {
        name: "황종훈",
        role: "대외협력부장",
        department: "",
        affiliation: "소프트웨어융합대학 컴퓨터공학부",
        email: "hwang.jonghyeon@khuda.kr",
      },
      {
        name: "이찬",
        role: "트랙장",
        department: "CV",
        affiliation: "공과대학 산업경영공학과",
        email: "chan112500@khu.ac.kr",
      },
      {
        name: "김재욱",
        role: "트랙장",
        department: "NLP",
        affiliation: "소프트웨어융합대학 소프트웨어융합학과",
        email: "kim.jaeuk@khuda.kr",
      },
      {
        name: "임주현",
        role: "트랙장",
        department: "금융",
        affiliation: "공과대학 산업경영공학과",
        email: "brian0644@khu.ac.kr",
      },
      {
        name: "오윤진",
        role: "트랙장",
        department: "데이터비즈니스",
        affiliation: "공과대학 산업경영공학과",
        email: "kohj1357@gmail.com",
      },
    ],
  },
];
