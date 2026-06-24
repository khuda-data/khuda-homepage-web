import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// [인수인계] 경희대학교 학과 목록 (2026 기준, 공식 입학처/단과대학 페이지 확인)
//   - 단과대학 통폐합·신설로 매년 바뀔 수 있으니 새 기수마다 점검할 것.
//   - 목록에 없는 경우를 대비해 마지막에 "기타"를 둔다.
type CollegeGroup = { campus: "국제" | "서울"; college: string; majors: string[] };

const KHU_DEPARTMENTS: CollegeGroup[] = [
  // ── 국제캠퍼스 ──
  { campus: "국제", college: "소프트웨어융합대학", majors: ["컴퓨터공학과", "인공지능학과", "소프트웨어융합학과"] },
  { campus: "국제", college: "전자정보대학", majors: ["전자공학과", "생체의공학과"] },
  { campus: "국제", college: "공과대학", majors: ["기계공학과", "산업경영공학과", "원자력공학과", "화학공학과", "정보전자신소재공학과", "사회기반시스템공학과", "건축공학과", "환경공학과", "건축학과"] },
  { campus: "국제", college: "응용과학대학", majors: ["응용수학과", "응용물리학과", "응용화학과", "우주과학과"] },
  { campus: "국제", college: "생명과학대학", majors: ["유전생명공학과", "식품생명공학과", "한방생명공학과", "원예생명공학과", "스마트팜과학과", "식물환경신소재공학과"] },
  { campus: "국제", college: "국제대학", majors: ["국제학과"] },
  { campus: "국제", college: "외국어대학", majors: ["글로벌커뮤니케이션학부", "프랑스어학과", "스페인어학과", "러시아어학과", "중국어학과", "일본어학과", "한국어학과"] },
  { campus: "국제", college: "예술·디자인대학", majors: ["산업디자인학과", "시각디자인학과", "환경조경디자인학과", "의류디자인학과", "디지털콘텐츠학과", "도예학과", "연극영화학과", "포스트모던음악학과"] },
  { campus: "국제", college: "체육대학", majors: ["체육학과", "스포츠의학과", "골프산업학과", "태권도학과", "스포츠지도학과"] },
  // ── 서울캠퍼스 ──
  { campus: "서울", college: "문과대학", majors: ["국어국문학과", "영어영문학과", "응용영어통번역학과", "사학과", "철학과"] },
  { campus: "서울", college: "정경대학", majors: ["정치외교학과", "행정학과", "사회학과", "경제학과", "무역학과", "미디어학과", "국제통상·금융투자학부"] },
  { campus: "서울", college: "경영대학", majors: ["경영학과", "회계·세무학과", "빅데이터응용학과"] },
  { campus: "서울", college: "호텔관광대학", majors: ["Hospitality경영학과", "조리&푸드디자인학과", "관광학과", "문화관광콘텐츠학과"] },
  { campus: "서울", college: "이과대학", majors: ["수학과", "물리학과", "화학과", "생물학과", "지리학과", "미래정보디스플레이학부"] },
  { campus: "서울", college: "생활과학대학", majors: ["식품영양학과", "아동가족학과", "주거환경학과", "의상학과"] },
  { campus: "서울", college: "간호과학대학", majors: ["간호학과"] },
  { campus: "서울", college: "약학대학", majors: ["약학과", "한약학과", "약과학과"] },
  { campus: "서울", college: "의·치·한의과대학", majors: ["의예과", "치의예과", "한의예과"] },
  { campus: "서울", college: "음악대학", majors: ["작곡과", "성악과", "기악과", "피아노과"] },
  { campus: "서울", college: "미술대학", majors: ["회화과", "조소과"] },
  { campus: "서울", college: "무용학부", majors: ["무용학부"] },
  { campus: "서울", college: "자율전공", majors: ["자율전공학부", "자유전공학부"] },
];

interface DepartmentFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const itemClass =
  "rounded-lg px-3 py-2.5 text-sm font-medium cursor-pointer transition-colors duration-150 hover:bg-[#EBF3FF] focus:bg-[#EBF3FF] data-[highlighted]:bg-[#EBF3FF] [&>span:first-child]:hidden";

export const DepartmentField = ({ value, onChange }: DepartmentFieldProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-12 min-h-[48px] rounded-xl text-sm sm:text-base bg-[#F2F4F6] border border-transparent text-[#191F28] transition-colors duration-200 focus:bg-white focus:border-[#3182F6] focus:outline-none focus:ring-0 focus:ring-offset-0">
        <SelectValue placeholder="학과를 선택해주세요" />
      </SelectTrigger>
      <SelectContent className="rounded-2xl border border-[#E8EBED] bg-white shadow-xl max-h-[320px] p-1.5" position="popper">
        {KHU_DEPARTMENTS.map((group, i) => (
          <SelectGroup key={`${group.campus}-${group.college}`}>
            {i > 0 && <SelectSeparator className="my-1.5 bg-[#F2F4F6]" />}
            <SelectLabel className="px-3 py-1.5 text-xs font-semibold text-[#8B95A1]">
              {group.college} ({group.campus})
            </SelectLabel>
            {group.majors.map((major) => (
              <SelectItem key={major} value={major} className={itemClass}>
                {major}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
        <SelectSeparator className="my-1.5 bg-[#F2F4F6]" />
        <SelectItem value="기타" className={itemClass}>기타</SelectItem>
      </SelectContent>
    </Select>
  );
};
