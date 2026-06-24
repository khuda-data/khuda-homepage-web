import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BirthDateFieldProps {
  value: string; // "YYYY-MM-DD"
  onChange: (value: string) => void;
}

// 생년월일 입력: 년/월/일 드롭다운 3개
//
// [인수인계] 생년월일 선택 범위 원칙: 만 19세 ~ 만 34세
//   - 지원 가능 연령을 만 19세 ~ 만 34세로 본다.
//   - 출생연도 = 모집연도 - 만나이 로 계산한다.
//     · 가장 어린 쪽: CURRENT_YEAR - 19 (만 19세)
//     · 가장 많은 쪽: CURRENT_YEAR - 34 (만 34세)
//   - 새 기수 모집 때는 CURRENT_YEAR만 해당 연도로 갱신하면 범위가 자동으로 맞춰진다.
const CURRENT_YEAR = 2026;
const YOUNGEST_BIRTH_YEAR = CURRENT_YEAR - 19; // 만 19세
const OLDEST_BIRTH_YEAR = CURRENT_YEAR - 34; // 만 34세
const YEARS = Array.from(
  { length: YOUNGEST_BIRTH_YEAR - OLDEST_BIRTH_YEAR + 1 },
  (_, i) => String(YOUNGEST_BIRTH_YEAR - i),
); // 2007 ~ 1992
const MONTHS = Array.from({ length: 12 }, (_, i) => String(i + 1));
const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));

const triggerClass =
  "h-12 min-h-[48px] rounded-xl text-sm sm:text-base bg-[#F2F4F6] border border-transparent text-[#191F28] transition-colors duration-200 focus:bg-white focus:border-[#3182F6] focus:outline-none focus:ring-0 focus:ring-offset-0";
const contentClass = "rounded-2xl border border-[#E8EBED] bg-white shadow-xl max-h-[280px] p-1.5";
const itemClass =
  "rounded-lg px-3 py-2.5 text-sm font-medium cursor-pointer transition-colors duration-150 hover:bg-[#EBF3FF] focus:bg-[#EBF3FF] data-[highlighted]:bg-[#EBF3FF] [&>span:first-child]:hidden";

const pad = (v: string) => v.padStart(2, "0");

export const BirthDateField = ({ value, onChange }: BirthDateFieldProps) => {
  const [yy, mm, dd] = value.split("-");
  const [y, setY] = useState(yy || "");
  const [m, setM] = useState(mm ? String(Number(mm)) : "");
  const [d, setD] = useState(dd ? String(Number(dd)) : "");

  // 셋 다 선택되면 "YYYY-MM-DD"로, 아니면 빈 값(필수 검증용)으로 전달
  const emit = (ny: string, nm: string, nd: string) => {
    onChange(ny && nm && nd ? `${ny}-${pad(nm)}-${pad(nd)}` : "");
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      <Select value={y} onValueChange={(v) => { setY(v); emit(v, m, d); }}>
        <SelectTrigger className={triggerClass}>
          <SelectValue placeholder="년" />
        </SelectTrigger>
        <SelectContent className={contentClass} position="popper">
          {YEARS.map((year) => (
            <SelectItem key={year} value={year} className={itemClass}>{year}년</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={m} onValueChange={(v) => { setM(v); emit(y, v, d); }}>
        <SelectTrigger className={triggerClass}>
          <SelectValue placeholder="월" />
        </SelectTrigger>
        <SelectContent className={contentClass} position="popper">
          {MONTHS.map((month) => (
            <SelectItem key={month} value={month} className={itemClass}>{month}월</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={d} onValueChange={(v) => { setD(v); emit(y, m, v); }}>
        <SelectTrigger className={triggerClass}>
          <SelectValue placeholder="일" />
        </SelectTrigger>
        <SelectContent className={contentClass} position="popper">
          {DAYS.map((day) => (
            <SelectItem key={day} value={day} className={itemClass}>{day}일</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
