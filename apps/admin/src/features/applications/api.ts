import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Application, ApplicationDetail, ApplicationType } from "@/types/application";
import { apiGet, apiPatch } from "@/lib/apiClient";

// 백엔드 응답(snake_case) 형태
interface SummaryDto {
  application_id: number;
  applicant_type: ApplicationType;
  status: string;
  created_at: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  track?: string | null;
  answers: AnswerDto[];
}

interface ListDto {
  applications: SummaryDto[];
  total: number;
}

interface AnswerDto {
  question_id: number;
  question: string;
  field_type: string;
  position: number;
  value?: string | null;
}

interface DetailDto {
  application_id: number;
  applicant_type: ApplicationType;
  status: string;
  created_at: string;
  updated_at: string | null;
  updated_by: string | null;
  answers: AnswerDto[];
}

const toAnswers = (answers: AnswerDto[]) =>
  answers.map((a) => ({
    questionId: a.question_id,
    question: a.question,
    fieldType: a.field_type,
    position: a.position,
    value: a.value ?? "",
  }));

const toApplication = (d: SummaryDto): Application => ({
  id: String(d.application_id),
  name: d.name ?? "",
  phone: d.phone ?? "",
  email: d.email ?? "",
  applicationType: d.applicant_type,
  track: d.track ?? "",
  submittedAt: d.created_at,
  answers: toAnswers(d.answers ?? []),
});

const toDetail = (d: DetailDto): ApplicationDetail => ({
  id: d.application_id,
  applicationType: d.applicant_type,
  status: d.status,
  submittedAt: d.created_at,
  updatedAt: d.updated_at,
  updatedBy: d.updated_by,
  answers: toAnswers(d.answers),
});

export async function fetchApplications(): Promise<Application[]> {
  const data = await apiGet<ListDto>("/api/admin/applications");
  return data.applications.map(toApplication);
}

export function useApplications() {
  return useQuery({ queryKey: ["applications"], queryFn: fetchApplications });
}

export async function fetchApplication(id: string): Promise<ApplicationDetail> {
  const data = await apiGet<DetailDto>(`/api/admin/applications/${id}`);
  return toDetail(data);
}

export function useApplication(id: string) {
  return useQuery({
    queryKey: ["application", id],
    queryFn: () => fetchApplication(id),
    enabled: Boolean(id),
  });
}

export function useUpdateApplication(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (answers: Record<string, string>) =>
      apiPatch<DetailDto>(`/api/admin/applications/${id}`, { answers }).then(toDetail),
    onSuccess: (detail) => {
      queryClient.setQueryData(["application", id], detail);
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}
