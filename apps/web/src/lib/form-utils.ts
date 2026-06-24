// ============================================================================
// 폼 UI 스타일 헬퍼 (토스 스타일)
// 선택 시 연블루 배경(#EBF3FF) + 블루 보더(#3182F6), 비선택은 흰 배경.
// 과한 scale/shadow 없이 색·보더 전환만 부드럽게.
// ============================================================================

/**
 * 체크박스 컨테이너의 CSS 클래스를 반환
 */
export const getCheckboxContainerClass = (isSelected: boolean): string => {
  const baseClasses = "relative flex items-center gap-3 p-4 rounded-2xl border transition-colors duration-200 ease-out cursor-pointer min-h-[52px]";
  const selectedClasses = "border-[#3182F6] bg-[#EBF3FF]";
  const unselectedClasses = "border-[#E8EBED] bg-white hover:border-[#3182F6]/40 hover:bg-[#F9FAFB]";
  return `${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`;
};

/**
 * 체크박스 아이콘의 CSS 클래스를 반환
 */
export const getCheckboxIconClass = (isSelected: boolean): string => {
  const baseClasses = "h-5 w-5 rounded-md border flex items-center justify-center transition-colors duration-200 flex-shrink-0";
  const selectedClasses = "border-[#3182F6] bg-[#3182F6]";
  const unselectedClasses = "border-[#D1D6DB] bg-white";
  return `${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`;
};

/**
 * 라디오 버튼의 CSS 클래스를 반환
 */
export const getRadioButtonClass = (isSelected: boolean): string => {
  const baseClasses = "relative flex items-center gap-3 p-4 rounded-2xl border transition-colors duration-200 ease-out cursor-pointer min-h-[52px]";
  const selectedClasses = "border-[#3182F6] bg-[#EBF3FF]";
  const unselectedClasses = "border-[#E8EBED] bg-white hover:border-[#3182F6]/40 hover:bg-[#F9FAFB]";
  return `${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`;
};

/**
 * 면접 시간 버튼의 CSS 클래스를 반환
 */
export const getInterviewTimeButtonClass = (isSelected: boolean): string => {
  const baseClasses = "group relative flex items-center justify-center px-2 py-2.5 rounded-xl border text-sm font-medium cursor-pointer transition-colors duration-150 ease-out min-h-[44px]";
  const selectedClasses = "border-[#3182F6] bg-[#EBF3FF] text-[#3182F6]";
  const unselectedClasses = "border-[#E8EBED] bg-white text-[#4E5968] hover:border-[#3182F6]/40 hover:bg-[#F9FAFB]";
  return `${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`;
};
