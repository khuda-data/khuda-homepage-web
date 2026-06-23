// 면접 일정 관련 UI 도메인 타입 

export interface InterviewDate {
  value: string;
  label: string;
  subLabel: string;
}

export interface InterviewSchedule {
  dates: InterviewDate[];
  times: string[];
}
