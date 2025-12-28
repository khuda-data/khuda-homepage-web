const API_BASE_URL = import.meta.env.PROD 
  ? "http://3.38.172.201:8000" 
  : "";

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

export async function getQuestions(applicantType: "yb" | "ob" | "common"): Promise<QuestionsResponse> {
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
        if (response.status === 500) {
          errorMessage = `서버 오류가 발생했습니다. "${applicantType}" 타입이 백엔드에서 지원되지 않을 수 있습니다.`;
        } else if (response.status === 404) {
          errorMessage = `"${applicantType}" 타입의 질문을 찾을 수 없습니다.`;
        } else {
          errorMessage = `질문을 가져오는데 실패했습니다. (상태 코드: ${response.status})`;
        }
      }
      
      throw new Error(errorMessage);
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("fetch") || error.message.includes("Failed to fetch")) {
        throw new Error("API 서버에 연결할 수 없습니다. CORS 설정 또는 네트워크 연결을 확인해주세요.");
      }
      throw error;
    }
    throw new Error("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.");
  }
}

export async function submitApplication(
  applicantType: "yb" | "ob" | "common",
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
      if (error.message.includes("fetch") || error.message.includes("Failed to fetch")) {
        throw new Error("API 서버에 연결할 수 없습니다. CORS 설정 또는 네트워크 연결을 확인해주세요.");
      }
      throw error;
    }
    throw new Error("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.");
  }
}

