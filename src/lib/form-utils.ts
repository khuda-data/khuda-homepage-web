// ============================================================================
// 면접 시간 생성 설정
// ============================================================================

const INTERVIEW_TIME_CONFIG = {
  startHour: 10,
  endHour: 20,
  minuteInterval: 20,
} as const;

/**
 * 면접 가능 시간 목록을 생성
 * @returns "HH:MM" 형식의 시간 문자열 배열 (예: ["10:00", "10:20", "10:40", ...])
 */
export const generateInterviewTimes = (): string[] => {
  const times: string[] = [];
  
  // 설정 검증
  if (
    INTERVIEW_TIME_CONFIG.startHour < 0 || 
    INTERVIEW_TIME_CONFIG.startHour > 23 ||
    INTERVIEW_TIME_CONFIG.endHour < 0 || 
    INTERVIEW_TIME_CONFIG.endHour > 23 ||
    INTERVIEW_TIME_CONFIG.startHour > INTERVIEW_TIME_CONFIG.endHour
  ) {
    console.warn("잘못된 면접 시간 설정입니다. 기본값을 사용합니다.");
    return [];
  }

  for (let hour = INTERVIEW_TIME_CONFIG.startHour; hour <= INTERVIEW_TIME_CONFIG.endHour; hour++) {
    for (let minute = 0; minute < 60; minute += INTERVIEW_TIME_CONFIG.minuteInterval) {
      const timeStr = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      times.push(timeStr);
    }
  }
  
  return times;
};

// ============================================================================
// 클립보드 유틸리티
// ============================================================================

/**
 * 텍스트를 클립보드에 복사
 * @param text - 복사할 텍스트
 * @returns 복사 성공 여부
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (!text || typeof text !== 'string') {
    return false;
  }

  // 클립보드 API 지원 여부 확인
  if (!navigator.clipboard || !navigator.clipboard.writeText) {
    // 폴백: 구식 방법 사용
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.setAttribute('readonly', '');
    textArea.style.opacity = '0';
    
    try {
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      return successful;
    } catch (err) {
      console.warn('클립보드 복사에 실패했습니다:', err);
      return false;
    } finally {
      // 항상 textArea 제거 (에러 발생 시에도)
      if (document.body.contains(textArea)) {
        document.body.removeChild(textArea);
      }
    }
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.warn('클립보드 복사에 실패했습니다:', err);
    return false;
  }
};

// ============================================================================
// 폼 스타일 유틸리티
// ============================================================================

/**
 * 체크박스 컨테이너의 CSS 클래스를 반환
 * @param isSelected - 선택 여부
 * @returns CSS 클래스 문자열
 */
export const getCheckboxContainerClass = (isSelected: boolean): string => {
  const baseClasses = "relative flex items-center space-x-3 p-4 rounded-xl border-2 transition-all duration-200 ease-out cursor-pointer transform";
  const selectedClasses = "border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/10 scale-[1.02]";
  const unselectedClasses = "border-border/50 hover:border-primary/30 hover:bg-secondary/20 hover:scale-[1.01] active:scale-[0.99]";
  
  return `${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`;
};

/**
 * 체크박스 아이콘의 CSS 클래스를 반환
 * @param isSelected - 선택 여부
 * @returns CSS 클래스 문자열
 */
export const getCheckboxIconClass = (isSelected: boolean): string => {
  const baseClasses = "h-4 w-4 rounded-sm border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0";
  const selectedClasses = "border-primary bg-primary";
  const unselectedClasses = "border-border";
  
  return `${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`;
};

/**
 * 라디오 버튼의 CSS 클래스를 반환
 * @param isSelected - 선택 여부
 * @returns CSS 클래스 문자열
 */
export const getRadioButtonClass = (isSelected: boolean): string => {
  const baseClasses = "relative flex items-center space-x-3 p-4 rounded-xl border-2 transition-all duration-200 ease-out cursor-pointer transform";
  const selectedClasses = "border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/10 scale-[1.02]";
  const unselectedClasses = "border-border/50 hover:border-primary/50 hover:bg-primary/5 hover:scale-[1.01] active:scale-[0.99]";
  
  return `${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`;
};

/**
 * 면접 시간 버튼의 CSS 클래스를 반환
 * @param isSelected - 선택 여부
 * @returns CSS 클래스 문자열
 */
export const getInterviewTimeButtonClass = (isSelected: boolean): string => {
  const baseClasses = "group relative flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ease-out transform";
  const selectedClasses = "border-primary bg-primary/10 shadow-md shadow-primary/10 scale-[1.05]";
  const unselectedClasses = "border-border/40 bg-secondary/10 hover:border-primary/40 hover:bg-secondary/20 hover:scale-[1.02] active:scale-[0.98]";
  
  return `${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`;
};

