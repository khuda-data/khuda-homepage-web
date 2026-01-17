// 상태 타입 판별 헬퍼 함수
export const getStatusType = (status: string): 'fail' | 'pass' | 'pending' | 'default' => {
  const statusTrimmed = status.trim();
  const statusLower = statusTrimmed.toLowerCase();
  
  // 불합격 체크를 먼저 수행 (합격보다 우선)
  if (
    statusTrimmed === "불합격" ||
    statusLower === "불합격" ||
    statusLower.includes("불합격") ||
    statusLower.includes("fail") ||
    statusLower.includes("reject")
  ) {
    return 'fail';
  }
  
  // 합격 체크
  if (
    statusTrimmed === "합격" ||
    statusLower === "합격" ||
    statusLower.includes("합격") ||
    statusLower.includes("pass")
  ) {
    return 'pass';
  }
  
  // 대기 체크
  if (
    statusLower.includes("대기") ||
    statusLower.includes("pending") ||
    statusLower.includes("wait")
  ) {
    return 'pending';
  }
  
  return 'default';
};
