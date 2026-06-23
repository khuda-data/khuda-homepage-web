export type StepStatus = 'pending' | 'active' | 'completed';

export interface ProcessStep {
  step: number;
  title: string;
  date: string;
  fullDate: string;
}

/**
 * 한국어 날짜 문자열을 Date 객체로 변환
 * @param dateStr - "2024년 3월 15일" 형식의 문자열
 * @returns Date 객체 또는 null (파싱 실패 시)
 */
export const parseKoreanDate = (dateStr: string): Date | null => {
  const match = dateStr.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/);
  if (!match) {
    return null;
  }

  const [, yearStr, monthStr, dayStr] = match;
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  // 유효성 검증
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return null;
  }

  // 월 범위 검증 (1-12)
  if (month < 1 || month > 12) {
    return null;
  }

  // 날짜 생성 및 유효성 검증 (잘못된 날짜는 자동으로 조정됨)
  const date = new Date(year, month - 1, day);
  
  // 생성된 날짜가 입력값과 일치하는지 확인 (예: 2월 30일 같은 경우)
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
};

/**
 * 날짜 범위 문자열에서 시작일과 종료일 추출
 * @param dateRangeStr - "2024년 3월 15일 ~ 2024년 3월 20일" 형식의 문자열
 * @returns 시작일과 종료일 객체
 */
export const extractDateRange = (dateRangeStr: string): { startDate: Date | null; endDate: Date | null } => {
  if (!dateRangeStr || typeof dateRangeStr !== 'string') {
    return { startDate: null, endDate: null };
  }

  const dateMatches = dateRangeStr.match(/(\d{4}년\s*\d{1,2}월\s*\d{1,2}일)/g);
  if (!dateMatches || dateMatches.length === 0) {
    return { startDate: null, endDate: null };
  }

  const startDate = parseKoreanDate(dateMatches[0]);
  if (!startDate) {
    return { startDate: null, endDate: null };
  }

  const endDate = dateMatches[1] ? parseKoreanDate(dateMatches[1]) : startDate;

  return { startDate, endDate };
};

/**
 * 프로세스 스텝의 현재 상태를 반환
 * @param step - ProcessStep 객체
 * @returns 'pending' | 'active' | 'completed'
 */
export const getStepStatus = (step: ProcessStep): StepStatus => {
  const now = new Date();
  // 시간을 00:00:00으로 설정하여 날짜만 비교
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const { startDate, endDate } = extractDateRange(step.fullDate);
  
  if (!startDate) {
    return 'pending';
  }
  
  // 시작일과 종료일도 시간을 00:00:00으로 설정
  const normalizedStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const finalEndDate = endDate || startDate;
  const normalizedEndDate = new Date(finalEndDate.getFullYear(), finalEndDate.getMonth(), finalEndDate.getDate());
  
  if (today > normalizedEndDate) {
    return 'completed';
  } else if (today >= normalizedStartDate) {
    return 'active';
  } else {
    return 'pending';
  }
};

// 시간 변환 상수
export const TIME_CONSTANTS = {
  MS_PER_SECOND: 1000,
  SECONDS_PER_MINUTE: 60,
  MINUTES_PER_HOUR: 60,
  HOURS_PER_DAY: 24,
  get MS_PER_MINUTE() {
    return this.MS_PER_SECOND * this.SECONDS_PER_MINUTE;
  },
  get MS_PER_HOUR() {
    return this.MS_PER_MINUTE * this.MINUTES_PER_HOUR;
  },
  get MS_PER_DAY() {
    return this.MS_PER_HOUR * this.HOURS_PER_DAY;
  },
} as const;

// 남은 시간 계산 함수
export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  isExpired: boolean;
}

/**
 * 마감일까지 남은 시간을 계산
 * @param deadline - 마감일 (Date 객체 또는 ISO 문자열)
 * @returns 남은 시간 정보 객체
 */
export const calculateTimeLeft = (deadline: string | Date): TimeLeft => {
  const deadlineDate = typeof deadline === 'string' ? new Date(deadline) : deadline;
  
  // 유효하지 않은 날짜인지 확인
  if (isNaN(deadlineDate.getTime())) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      isExpired: true,
    };
  }

  const now = new Date();
  const difference = deadlineDate.getTime() - now.getTime();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      isExpired: true,
    };
  }

  const days = Math.floor(difference / TIME_CONSTANTS.MS_PER_DAY);
  const hours = Math.floor((difference % TIME_CONSTANTS.MS_PER_DAY) / TIME_CONSTANTS.MS_PER_HOUR);
  const minutes = Math.floor((difference % TIME_CONSTANTS.MS_PER_HOUR) / TIME_CONSTANTS.MS_PER_MINUTE);

  return {
    days,
    hours,
    minutes,
    isExpired: false,
  };
};

