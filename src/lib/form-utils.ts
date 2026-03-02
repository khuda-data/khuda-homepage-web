// ============================================================================
// 폼 UI 스타일 헬퍼
// ============================================================================

/**
 * 체크박스 컨테이너의 CSS 클래스를 반환
 */
export const getCheckboxContainerClass = (isSelected: boolean): string => {
  const baseClasses = "relative flex items-center space-x-3 p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 ease-out cursor-pointer transform min-h-[44px]";
  const selectedClasses = "border-blue-500 bg-gradient-to-br from-blue-500/10 to-blue-500/5 shadow-lg shadow-blue-500/10 scale-[1.02]";
  const unselectedClasses = "border-border/50 hover:border-blue-500/30 hover:bg-secondary/20 hover:scale-[1.01] active:scale-[0.99]";
  return `${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`;
};

/**
 * 체크박스 아이콘의 CSS 클래스를 반환
 */
export const getCheckboxIconClass = (isSelected: boolean): string => {
  const baseClasses = "h-4 w-4 rounded-sm border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0";
  const selectedClasses = "border-blue-500 bg-blue-500";
  const unselectedClasses = "border-border";
  return `${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`;
};

/**
 * 라디오 버튼의 CSS 클래스를 반환
 */
export const getRadioButtonClass = (isSelected: boolean): string => {
  const baseClasses = "relative flex items-center space-x-3 p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 ease-out cursor-pointer transform min-h-[44px]";
  const selectedClasses = "border-blue-500 bg-gradient-to-br from-blue-500/10 to-blue-500/5 shadow-lg shadow-blue-500/10 scale-[1.02]";
  const unselectedClasses = "border-border/50 hover:border-blue-500/50 hover:bg-blue-500/5 hover:scale-[1.01] active:scale-[0.99]";
  return `${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`;
};

/**
 * 면접 시간 버튼의 CSS 클래스를 반환
 */
export const getInterviewTimeButtonClass = (isSelected: boolean): string => {
  const baseClasses = "group relative flex items-center justify-center p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 cursor-pointer transition-all duration-200 ease-out transform min-h-[44px]";
  const selectedClasses = "border-blue-500 bg-blue-500/10 shadow-md shadow-blue-500/10 scale-[1.05]";
  const unselectedClasses = "border-border/40 bg-secondary/10 hover:border-blue-500/40 hover:bg-secondary/20 hover:scale-[1.02] active:scale-[0.98]";
  return `${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`;
};
