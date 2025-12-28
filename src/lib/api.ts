// 개발 환경에서는 프록시를 사용하고, 프로덕션에서는 직접 API 서버를 사용
const API_BASE_URL = import.meta.env.PROD 
  ? "http://3.38.172.201:8000" 
  : ""; // 프록시 사용 시 빈 문자열

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

export interface ApplicationRequest {
  applicant_type: string;
  answers: Record<string, string>;
}

export interface ApplicationResponse {
  application_id: number;
  status: string;
}

export async function getQuestions(applicantType: string): Promise<QuestionsResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/questions/${applicantType}`);
    
    if (!response.ok) {
      let errorMessage = "질문을 가져오는데 실패했습니다.";
      
      try {
        const errorData = await response.json();
        if (errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            errorMessage = errorData.detail.map((err: { msg?: string } | string) => 
              typeof err === "string" ? err : err.msg || JSON.stringify(err)
            ).join(", ");
          } else if (typeof errorData.detail === "string") {
            errorMessage = errorData.detail;
          }
        }
      } catch {
      }
      
      throw new Error(errorMessage);
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      // CORS 또는 네트워크 오류인 경우 더 자세한 메시지 제공
      if (error.message.includes("fetch") || error.message.includes("Failed to fetch")) {
        throw new Error("API 서버에 연결할 수 없습니다. CORS 설정 또는 네트워크 연결을 확인해주세요.");
      }
      throw error;
    }
    throw new Error("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.");
  }
}

export async function submitApplication(
  applicantType: string,
  answers: Record<string, string>
): Promise<ApplicationResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        applicant_type: applicantType,
        answers,
      }),
    });
    
    if (!response.ok) {
      let errorMessage = "지원서 제출에 실패했습니다.";
      
      try {
        const errorData = await response.json();
        if (errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            errorMessage = errorData.detail.map((err: { msg?: string } | string) => 
              typeof err === "string" ? err : err.msg || JSON.stringify(err)
            ).join(", ");
          } else if (typeof errorData.detail === "string") {
            errorMessage = errorData.detail;
          }
        }
      } catch {
      }
      
      throw new Error(errorMessage);
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      // CORS 또는 네트워크 오류인 경우 더 자세한 메시지 제공
      if (error.message.includes("fetch") || error.message.includes("Failed to fetch")) {
        throw new Error("API 서버에 연결할 수 없습니다. CORS 설정 또는 네트워크 연결을 확인해주세요.");
      }
      throw error;
    }
    throw new Error("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.");
  }
}

