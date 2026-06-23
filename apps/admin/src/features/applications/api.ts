import { useQuery } from "@tanstack/react-query";
import type { Application } from "@/types/application";
import { mockApplications } from "@/data/applications";

// 백엔드 준비 전까지 mock 데이터를 반환한다.
// 연동 시 이 함수만 실제 API 호출(GET /api/admin/applications 등)로 교체하면 된다.
export async function fetchApplications(): Promise<Application[]> {
  await new Promise((resolve) => setTimeout(resolve, 300)); // 로딩 상태 확인용 지연
  return mockApplications;
}

export function useApplications() {
  return useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });
}
