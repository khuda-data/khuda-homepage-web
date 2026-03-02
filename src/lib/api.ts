import { API_BASE_URL } from "./constants";

// ============================================================================
// 타입 정의
// ============================================================================

export type ApplicantType = "yb" | "ob" | "common";

export interface Question {
  id: number;
  question: string;
  applicant_type: string;
  field_type: string;
  required: boolean;
  max_len: number | null;
  position: number;
}

export interface QuestionsResponse {
  applicant_type: string;
  questions: Question[];
}

export interface ApplicationResponse {
  application_id: number;
  status: string;
}

export type { InterviewDate, InterviewSchedule } from "@/types/interview";

export interface ApplicationResultRequest {
  student_id: string;
  phone_number: string;
  name: string;
}

export interface ApplicationResultResponse {
  student_id: string;
  name: string;
  status: string;
}

// ============================================================================
// 상수
// ============================================================================

const REQUEST_TIMEOUT = 30000; // 30초
const API_ENDPOINTS = {
  QUESTIONS: (type: ApplicantType) => `/api/questions/${type}`,
  APPLICATIONS: "/api/applications",
  APPLICATION_RESULT: "/api/application_result",
} as const;

// ============================================================================
// 커스텀 에러 클래스
// ============================================================================

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message);
    this.name = "ApiError";
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class NetworkError extends Error {
  constructor(message: string, public originalError?: unknown) {
    super(message);
    this.name = "NetworkError";
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

// ============================================================================
// 유틸리티 함수
// ============================================================================

/**
 * 타임아웃이 있는 fetch 래퍼
 */
const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
  timeout: number = REQUEST_TIMEOUT
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new NetworkError("요청 시간이 초과되었습니다. 다시 시도해주세요.", error);
    }
    throw error;
  }
};

/**
 * API 에러 처리 함수
 */
const handleApiError = async (response: Response, context: string): Promise<never> => {
  let errorMessage = `${context}에 실패했습니다.`;
  
  try {
    // response body가 있는지 확인
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const errorData = await response.json();
      if (errorData && typeof errorData === "object") {
        if (errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            errorMessage = errorData.detail
              .map((err: { msg?: string } | string) => 
                typeof err === "string" ? err : err.msg || JSON.stringify(err)
              )
              .join(", ");
          } else if (typeof errorData.detail === "string") {
            errorMessage = errorData.detail;
          }
        } else if (errorData.message && typeof errorData.message === "string") {
          errorMessage = errorData.message;
        }
      }
    }
  } catch {
    // JSON 파싱 실패 시 상태 코드 기반 메시지
    switch (response.status) {
      case 400:
        errorMessage = "잘못된 요청입니다.";
        break;
      case 401:
        errorMessage = "인증이 필요합니다.";
        break;
      case 403:
        errorMessage = "접근 권한이 없습니다.";
        break;
      case 404:
        errorMessage = "요청한 리소스를 찾을 수 없습니다.";
        break;
      case 500:
        errorMessage = "서버 오류가 발생했습니다.";
        break;
      case 503:
        errorMessage = "서비스를 일시적으로 사용할 수 없습니다.";
        break;
      default:
        errorMessage = `${context}에 실패했습니다. (상태 코드: ${response.status})`;
    }
  }
  
  throw new ApiError(errorMessage, response.status);
};

/**
 * 네트워크 에러 처리 함수
 */
const handleNetworkError = (error: unknown): never => {
  if (error instanceof ApiError) {
    throw error;
  }
  
  if (error instanceof NetworkError) {
    throw error;
  }
  
  if (error instanceof Error) {
    if (
      error.message.includes("fetch") || 
      error.message.includes("Failed to fetch") ||
      error.message.includes("NetworkError")
    ) {
      throw new NetworkError(
        "API 서버에 연결할 수 없습니다. CORS 설정 또는 네트워크 연결을 확인해주세요.",
        error
      );
    }
    throw new NetworkError(error.message, error);
  }
  
  throw new NetworkError("알 수 없는 네트워크 오류가 발생했습니다.", error);
};

/**
 * 응답 데이터 타입 검증
 */
const validateQuestionsResponse = (data: unknown): QuestionsResponse => {
  if (
    typeof data === "object" &&
    data !== null &&
    "applicant_type" in data &&
    typeof (data as { applicant_type: unknown }).applicant_type === "string" &&
    "questions" in data &&
    Array.isArray((data as { questions: unknown }).questions)
  ) {
    const response = data as QuestionsResponse;
    // questions 배열의 각 항목이 Question 타입인지 간단히 확인
    if (response.questions.every(q => typeof q === "object" && q !== null && "id" in q && "question" in q)) {
      return response;
    }
  }
  throw new ApiError("응답 데이터 형식이 올바르지 않습니다.");
};

const validateApplicationResponse = (data: unknown): ApplicationResponse => {
  if (
    typeof data === "object" &&
    data !== null &&
    "application_id" in data &&
    typeof (data as { application_id: unknown }).application_id === "number" &&
    "status" in data &&
    typeof (data as { status: unknown }).status === "string"
  ) {
    return data as ApplicationResponse;
  }
  throw new ApiError("응답 데이터 형식이 올바르지 않습니다.");
};

const validateApplicationResultResponse = (data: unknown): ApplicationResultResponse => {
  if (
    typeof data === "object" &&
    data !== null &&
    "student_id" in data &&
    typeof (data as { student_id: unknown }).student_id === "string" &&
    "name" in data &&
    typeof (data as { name: unknown }).name === "string" &&
    "status" in data &&
    typeof (data as { status: unknown }).status === "string"
  ) {
    return data as ApplicationResultResponse;
  }
  throw new ApiError("응답 데이터 형식이 올바르지 않습니다.");
};

/**
 * 공통 API 호출 함수
 */
const apiCall = async <T>(
  url: string,
  options: RequestInit,
  validator: (data: unknown) => T,
  context: string
): Promise<T> => {
  try {
    const response = await fetchWithTimeout(url, options);
    
    if (!response.ok) {
      await handleApiError(response, context);
    }
    
    // JSON 파싱 시도
    let data: unknown;
    try {
      data = await response.json();
    } catch (parseError) {
      throw new ApiError(
        "서버 응답을 파싱할 수 없습니다. 응답 형식을 확인해주세요.",
        response.status,
        parseError
      );
    }
    
    return validator(data);
  } catch (error) {
    return handleNetworkError(error);
  }
};

// ============================================================================
// API 함수
// ============================================================================

/**
 * 지원자 유형에 따른 질문 목록 조회
 */
export async function getQuestions(applicantType: ApplicantType): Promise<QuestionsResponse> {
  const url = `${API_BASE_URL}${API_ENDPOINTS.QUESTIONS(applicantType)}`;
  return apiCall(
    url,
    {
      method: "GET",
    },
    validateQuestionsResponse,
    "질문을 가져오는데"
  );
}

/**
 * 지원서 제출
 */
export async function submitApplication(
  applicantType: ApplicantType,
  answers: Record<string, string>
): Promise<ApplicationResponse> {
  const url = `${API_BASE_URL}${API_ENDPOINTS.APPLICATIONS}`;
  return apiCall(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        applicant_type: applicantType,
        answers,
      }),
    },
    validateApplicationResponse,
    "지원서 제출에"
  );
}

/**
 * 합격자 결과 조회
 */
export async function getApplicationResult(
  request: ApplicationResultRequest
): Promise<ApplicationResultResponse> {
  const url = `${API_BASE_URL}${API_ENDPOINTS.APPLICATION_RESULT}`;
  return apiCall(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: request.student_id,
        phone_number: request.phone_number,
        name: request.name,
      }),
    },
    validateApplicationResultResponse,
    "합격자 결과 조회에"
  );
}


