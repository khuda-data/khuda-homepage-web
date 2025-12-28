export const generateInterviewTimes = (): string[] => {
  const times: string[] = [];
  for (let hour = 10; hour <= 20; hour++) {
    for (let minute = 0; minute < 60; minute += 20) {
      const timeStr = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      times.push(timeStr);
    }
  }
  return times;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    return false;
  }
};

export const getCheckboxContainerClass = (isSelected: boolean): string => {
  return `relative flex items-center space-x-3 p-4 rounded-xl border-2 transition-all duration-200 ease-out cursor-pointer transform ${
    isSelected
      ? "border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/10 scale-[1.02]"
      : "border-border/50 hover:border-primary/30 hover:bg-secondary/20 hover:scale-[1.01] active:scale-[0.99]"
  }`;
};

export const getCheckboxIconClass = (isSelected: boolean): string => {
  return `h-4 w-4 rounded-sm border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
    isSelected ? "border-primary bg-primary" : "border-border"
  }`;
};

export const getRadioButtonClass = (isSelected: boolean): string => {
  return `relative flex items-center space-x-3 p-4 rounded-xl border-2 transition-all duration-200 ease-out cursor-pointer transform ${
    isSelected
      ? "border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/10 scale-[1.02]"
      : "border-border/50 hover:border-primary/50 hover:bg-primary/5 hover:scale-[1.01] active:scale-[0.99]"
  }`;
};

export const getInterviewTimeButtonClass = (isSelected: boolean): string => {
  return `group relative flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ease-out transform ${
    isSelected
      ? "border-primary bg-primary/10 shadow-md shadow-primary/10 scale-[1.05]"
      : "border-border/40 bg-secondary/10 hover:border-primary/40 hover:bg-secondary/20 hover:scale-[1.02] active:scale-[0.98]"
  }`;
};

