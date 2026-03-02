const INTERVIEW_TIME_CONFIG = {
  startHour: 10,
  endHour: 20,
  minuteInterval: 20,
} as const;

/**
 * 면접 가능 시간 목록을 생성
 * @returns "HH:MM" 형식의 시간 문자열 배열
 */
export const generateInterviewTimes = (): string[] => {
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

  const times: string[] = [];
  for (let hour = INTERVIEW_TIME_CONFIG.startHour; hour <= INTERVIEW_TIME_CONFIG.endHour; hour++) {
    for (let minute = 0; minute < 60; minute += INTERVIEW_TIME_CONFIG.minuteInterval) {
      times.push(`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`);
    }
  }
  return times;
};
