export type StepStatus = 'pending' | 'active' | 'completed';

export interface ProcessStep {
  step: number;
  title: string;
  date: string;
  fullDate: string;
}

export const parseKoreanDate = (dateStr: string): Date | null => {
  const match = dateStr.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/);
  if (match) {
    const [, year, month, day] = match;
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }
  return null;
};

export const extractDateRange = (dateRangeStr: string): { startDate: Date | null; endDate: Date | null } => {
  const dateMatches = dateRangeStr.match(/(\d{4}년\s*\d{1,2}월\s*\d{1,2}일)/g);
  if (!dateMatches || dateMatches.length === 0) {
    return { startDate: null, endDate: null };
  }

  const startDate = parseKoreanDate(dateMatches[0]);
  const endDate = dateMatches[1] ? parseKoreanDate(dateMatches[1]) : startDate;

  return { startDate, endDate };
};

export const getStepStatus = (step: ProcessStep): StepStatus => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const { startDate, endDate } = extractDateRange(step.fullDate);
  
  if (!startDate) {
    return 'pending';
  }
  
  const finalEndDate = endDate || startDate;
  
  if (today > finalEndDate) {
    return 'completed';
  } else if (today >= startDate) {
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

export const calculateTimeLeft = (deadline: string | Date): TimeLeft => {
  const deadlineDate = typeof deadline === 'string' ? new Date(deadline) : deadline;
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

