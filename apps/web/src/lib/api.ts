const API_BASE_URL = "http://3.38.172.201:8000";

export interface Question {
  id: number;
  question: string;
  applicant_type: string;
  field_type: string;
  required: boolean;
  max_len: number;
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

/**
 * 지원 유형에 따른 질문 목록을 가져옵니다.
 */
export async function getQuestions(applicantType: string): Promise<QuestionsResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/questions/${applicantType}`);
    
    if (!response.ok) {
      let errorMessage = "질문을 가져오는데 실패했습니다.";
      
      try {
        const errorData = await response.json();
        if (errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            errorMessage = errorData.detail.map((err: any) => err.msg || JSON.stringify(err)).join(", ");
          } else if (typeof errorData.detail === "string") {
            errorMessage = errorData.detail;
          }
        }
      } catch {
        // JSON 파싱 실패 시 기본 메시지 사용
      }
      
      throw new Error(errorMessage);
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.");
  }
}

/**
 * 지원서를 제출합니다.
 */
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
            errorMessage = errorData.detail.map((err: any) => err.msg || JSON.stringify(err)).join(", ");
          } else if (typeof errorData.detail === "string") {
            errorMessage = errorData.detail;
          }
        }
      } catch {
        // JSON 파싱 실패 시 기본 메시지 사용
      }
      
      throw new Error(errorMessage);
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.");
  }
}

