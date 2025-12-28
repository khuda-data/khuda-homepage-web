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

