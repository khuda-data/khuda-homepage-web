// YB 수료 조건 / YB 이외 혜택 / OB 혜택 항목을 동일한 형식(제목 + 설명 문단)으로 렌더하는 공용 컴포넌트.

export interface NoteItemData {
  title: string;
  description: string;
}

interface NoteItemProps {
  item: NoteItemData;
  /** 좌측 강조선 색상 클래스 (영역별로 다르게 지정) */
  borderClass: string;
  /** 제목 텍스트 크기 (수료 조건/혜택은 기본, 하위 항목은 sm) */
  titleSize?: "base" | "sm";
}

const NoteItem = ({ item, borderClass, titleSize = "base" }: NoteItemProps) => {
  const titleClass =
    titleSize === "base"
      ? "text-sm sm:text-[15px] font-semibold text-foreground mb-2"
      : "text-xs sm:text-sm font-semibold text-foreground mb-2";

  return (
    <div className={`border-l-2 ${borderClass} pl-4 sm:pl-5 py-1`}>
      <h4 className={titleClass}>{item.title}</h4>
      <p className="text-xs sm:text-sm text-foreground leading-relaxed">{item.description}</p>
    </div>
  );
};

export default NoteItem;
