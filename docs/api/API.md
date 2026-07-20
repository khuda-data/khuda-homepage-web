# API 명세

모든 응답은 공통 응답 래퍼인 `ApiResponse` 형식으로 반환한다. 값이 `null`인 필드는 직렬화할 때 제외한다.

문항은 `position` 오름차순으로 정렬하고, `position`이 같으면 `id` 오름차순으로 반환한다. 프론트엔드는 먼저 `common` 문항을 조회해 화면에 표시하고, 지원자 유형으로 `yb` 또는 `ob`를 선택하면 해당 유형의 문항을 추가로 조회한다.

`id`는 문항의 식별자이며, 화면에 표시되는 순서는 `position`으로 결정한다. 두 값은 같은 순번으로 맞춘다(`common` 1~9, `yb` 10~18, `ob` 19~23). 체크리스트 문항은 각 유형의 맨 앞에 배치한다.

---

## 1. 지원자 유형별 문항 조회

### API 설명
지원자 유형(`common`, `yb`, `ob`)에 해당하는 지원서 문항 목록을 조회한다.

### Endpoint + Method
`GET /api/questions/{applicant_type}`

### Path Parameter

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| applicant_type | string | Y | 지원자 유형 (common, yb, ob) | yb |

### Query Parameter
(없음)

### Request Header
(없음)

### Request Body
(없음)

### Request Example (JSON)
(없음)

### Response Body

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| success | boolean | Y | 요청 성공 여부 | true |
| status | integer | Y | HTTP 상태 코드 | 200 |
| message | string | Y | 응답 메시지 | 요청에 성공했습니다. |
| data | object | Y | 응답 데이터 | - |
| data.applicant_type | string | Y | 조회한 지원자 유형 | yb |
| data.questions | array | Y | 문항 목록 | - |
| data.questions[].id | integer | Y | 문항 ID | 14 |
| data.questions[].question | string | Y | 문항 내용 | 1. KHUDA에 지원하게 된 계기는 무엇인가요? |
| data.questions[].applicant_type | string | Y | 문항 대상 유형 | yb |
| data.questions[].field_type | string | Y | 입력 필드 타입 | textarea |
| data.questions[].required | boolean | Y | 필수 여부 | true |
| data.questions[].max_len | integer | N | 최대 입력 길이 (없으면 생략) | 500 |
| data.questions[].options | array | N | 선택지 목록 (select, checklist용, 없으면 생략) | ["남", "여"] |
| data.questions[].position | integer | Y | 정렬 순서 | 14 |
| code | string | N | 에러 코드 (실패 시) | (없음) |
| meta | object | N | 메타 정보 (실패 시) | (없음) |

### Success Response Example (2xx)

#### 200 OK (applicant_type = common)
지원하기 페이지 진입 시 가장 먼저 조회되는 공통 인적사항 문항이다.
```json
{
  "success": true,
  "status": 200,
  "message": "요청에 성공했습니다.",
  "data": {
    "applicant_type": "common",
    "questions": [
      {
        "id": 1,
        "question": "이름",
        "applicant_type": "common",
        "field_type": "text",
        "required": true,
        "max_len": 20,
        "position": 1
      },
      {
        "id": 2,
        "question": "성별",
        "applicant_type": "common",
        "field_type": "select",
        "required": true,
        "options": ["남", "여"],
        "position": 2
      },
      {
        "id": 3,
        "question": "생년월일",
        "applicant_type": "common",
        "field_type": "date",
        "required": true,
        "position": 3
      },
      {
        "id": 4,
        "question": "연락처",
        "applicant_type": "common",
        "field_type": "text",
        "required": true,
        "max_len": 20,
        "position": 4
      },
      {
        "id": 5,
        "question": "이메일",
        "applicant_type": "common",
        "field_type": "text",
        "required": true,
        "max_len": 60,
        "position": 5
      },
      {
        "id": 6,
        "question": "재학 상태",
        "applicant_type": "common",
        "field_type": "select",
        "required": true,
        "options": ["재학", "휴학", "졸업유예"],
        "position": 6
      },
      {
        "id": 7,
        "question": "학과",
        "applicant_type": "common",
        "field_type": "department",
        "required": true,
        "position": 7
      },
      {
        "id": 8,
        "question": "학년",
        "applicant_type": "common",
        "field_type": "select",
        "required": true,
        "options": ["1학년", "2학년", "3학년", "4학년", "5학년 이상"],
        "position": 8
      },
      {
        "id": 9,
        "question": "개인정보 수집 및 이용 동의",
        "applicant_type": "common",
        "field_type": "consent",
        "required": true,
        "position": 9
      }
    ]
  }
}
```

#### 200 OK (applicant_type = yb)
체크리스트(id 10)가 유형 문항 중 가장 앞에 온다.
```json
{
  "success": true,
  "status": 200,
  "message": "요청에 성공했습니다.",
  "data": {
    "applicant_type": "yb",
    "questions": [
      {
        "id": 10,
        "question": "지원서 작성 전 아래 내용을 모두 확인해주세요.",
        "applicant_type": "yb",
        "field_type": "checklist",
        "required": true,
        "options": [
          "YB는 수료 조건을 반드시 이행하여야 함을 확인했습니다.",
          "지원하기 탭에서 수료 조건 내용을 확인했습니다.",
          "OT는 7월 13일에 진행되며, 필수로 참여해야 함을 확인했습니다."
        ],
        "position": 10
      },
      {
        "id": 11,
        "question": "파이썬(Python) 활용 단계를 선택해주세요.",
        "applicant_type": "yb",
        "field_type": "python",
        "required": true,
        "position": 11
      },
      {
        "id": 12,
        "question": "데이터·AI 분야와 관련해 들었던 이론 강의나 수업을 한 개 이상 작성해주세요.",
        "applicant_type": "yb",
        "field_type": "course_experience",
        "required": true,
        "position": 12
      },
      {
        "id": 13,
        "question": "관심 있는 심화 트랙을 선택해주세요.",
        "applicant_type": "yb",
        "field_type": "select",
        "required": true,
        "position": 13
      },
      {
        "id": 14,
        "question": "1. KHUDA에 지원하게 된 계기와 학회 활동을 통해 이루고 싶은 목표는 무엇인가요?",
        "applicant_type": "yb",
        "field_type": "textarea",
        "required": true,
        "max_len": 500,
        "position": 14
      },
      {
        "id": 15,
        "question": "2. 본인이 세운 목표를 달성하기 위해 어려운 상황 속에서도 끝까지 포기하지 않았던 경험에 대해 서술해주세요.",
        "applicant_type": "yb",
        "field_type": "textarea",
        "required": true,
        "max_len": 500,
        "position": 15
      },
      {
        "id": 16,
        "question": "3. 데이터·AI 관련 프로젝트나 관련 지식을 탐구해본 경험이 있다면, 그 과정과 배운 점을 함께 서술해주세요.",
        "applicant_type": "yb",
        "field_type": "textarea",
        "required": true,
        "max_len": 500,
        "position": 16
      },
      {
        "id": 17,
        "question": "면접 가능 일정",
        "applicant_type": "yb",
        "field_type": "interview_date",
        "required": true,
        "position": 17
      },
      {
        "id": 18,
        "question": "면접 가능 시간",
        "applicant_type": "yb",
        "field_type": "interview_time",
        "required": true,
        "position": 18
      }
    ]
  }
}
```

#### 200 OK (applicant_type = ob)
체크리스트(id 19)가 유형 문항 중 가장 앞에 온다. 스터디 세부(id 22)는 선택 입력이라 required가 false다.
```json
{
  "success": true,
  "status": 200,
  "message": "요청에 성공했습니다.",
  "data": {
    "applicant_type": "ob",
    "questions": [
      {
        "id": 19,
        "question": "지원서 작성 전 아래 내용을 모두 확인해주세요.",
        "applicant_type": "ob",
        "field_type": "checklist",
        "required": true,
        "options": [
          "OB는 별도의 수료 조건이 없음을 인지했습니다.",
          "지원하기 탭에서 혜택에 대한 내용을 확인했습니다.",
          "OT는 7월 13일에 진행되며, 필수로 참여해야 함을 확인했습니다."
        ],
        "position": 19
      },
      {
        "id": 20,
        "question": "참여를 희망하는 심화 트랙을 선택해주세요.",
        "applicant_type": "ob",
        "field_type": "select",
        "required": true,
        "position": 20
      },
      {
        "id": 21,
        "question": "스터디 개설 의향이 있으신가요?",
        "applicant_type": "ob",
        "field_type": "select",
        "required": true,
        "position": 21
      },
      {
        "id": 22,
        "question": "개설하고 싶은 스터디 또는 소모임이 있다면 작성해주세요.",
        "applicant_type": "ob",
        "field_type": "text",
        "required": false,
        "max_len": 120,
        "position": 22
      },
      {
        "id": 23,
        "question": "1. KHUDA에 지원하게 된 계기와 학회 활동을 통해 이루고 싶은 목표는 무엇인가요?",
        "applicant_type": "ob",
        "field_type": "textarea",
        "required": true,
        "max_len": 500,
        "position": 23
      }
    ]
  }
}
```

조건부 필수: 스터디 세부(id 22)는 기본값이 required false다. 다만 스터디 개설 의향(id 21) 답변이 yes이면 필수가 된다. 프론트가 제출을 막고 백엔드도 같은 규칙으로 검증한다. id 21 답변 값은 yes 또는 no다.

### Error Response Example (4xx, 5xx)

#### 404 Not Found
```json
{
  "success": false,
  "status": 404,
  "message": "유효하지 않은 지원자 유형입니다.",
  "code": "QUE_404_001",
  "meta": {
    "path": "/api/questions/xx",
    "timestamp": 1719400000000
  }
}
```

#### 500 Internal Server Error
```json
{
  "success": false,
  "status": 500,
  "message": "서버 내부 오류가 발생했습니다.",
  "code": "COM_500_001",
  "meta": {
    "path": "/api/questions/yb",
    "timestamp": 1719400000000
  }
}
```

---

## 2. 지원서 접수

### API 설명
지원자 유형과 문항별 답변을 받아 지원서를 접수한다.

### Endpoint + Method
`POST /api/applications`

### Path Parameter
(없음)

### Query Parameter
(없음)

### Request Header

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| Content-Type | string | Y | 요청 본문 타입 | application/json |

### Request Body

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| applicant_type | string | Y | 지원자 유형 (yb, ob) | yb |
| answers | object | Y | 문항 ID를 key로 하는 답변 맵 | {"1": "홍길동"} |

답변 값은 모두 문자열이다. 배열이나 객체형 답변(체크리스트, 면접 일정과 시간)은 JSON 문자열로 직렬화해 담는다.

이메일을 기준으로 1인 1제출만 허용한다. 같은 이메일이 이미 접수돼 있으면 409로 거절한다. yb, ob 구분 없이 한 사람당 한 번만 받고 대소문자는 무시한다.

### Request Example (JSON)
```json
{
  "applicant_type": "yb",
  "answers": {
    "1": "홍길동",
    "5": "hong@khu.ac.kr",
    "9": "agree",
    "10": "[\"YB는 수료 조건을 반드시 이행하여야 함을 확인했습니다.\"]",
    "14": "데이터 분석에 관심이 생겨 지원했습니다.",
    "17": "[\"7월 8일 (수)\"]",
    "18": "{\"7월 8일 (수)\": [\"10:00\", \"10:20\"]}"
  }
}
```

### Response Body

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| success | boolean | Y | 요청 성공 여부 | true |
| status | integer | Y | HTTP 상태 코드 | 201 |
| message | string | Y | 응답 메시지 | 정상적으로 생성되었습니다. |
| data | object | Y | 응답 데이터 | - |
| data.application_id | integer | Y | 생성된 지원서 ID | 1001 |
| data.status | string | Y | 지원서 처리 상태 | submitted |
| code | string | N | 에러 코드 (실패 시) | (없음) |
| meta | object | N | 메타 정보 (실패 시) | (없음) |

### Success Response Example (2xx)

#### 201 Created
```json
{
  "success": true,
  "status": 201,
  "message": "정상적으로 생성되었습니다.",
  "data": {
    "application_id": 1001,
    "status": "submitted"
  }
}
```

### Error Response Example (4xx, 5xx)

#### 400 Bad Request (필수 문항 누락)
```json
{
  "success": false,
  "status": 400,
  "message": "필수 문항이 비어 있습니다. - question_id=14",
  "code": "QUE_400_001",
  "meta": {
    "path": "/api/applications",
    "timestamp": 1719400000000
  }
}
```

#### 400 Bad Request (최대 길이 초과)
```json
{
  "success": false,
  "status": 400,
  "message": "문항 최대 길이를 초과했습니다. - question_id=14",
  "code": "QUE_400_002",
  "meta": {
    "path": "/api/applications",
    "timestamp": 1719400000000
  }
}
```

#### 400 Bad Request (알 수 없는 문항 ID)
```json
{
  "success": false,
  "status": 400,
  "message": "알 수 없는 문항 ID가 포함되어 있습니다.",
  "code": "APP_400_001",
  "meta": {
    "path": "/api/applications",
    "timestamp": 1719400000000
  }
}
```

#### 409 Conflict (중복 지원)
```json
{
  "success": false,
  "status": 409,
  "message": "이미 제출된 지원서가 있습니다.",
  "code": "APP_409_001",
  "meta": {
    "path": "/api/applications",
    "timestamp": 1719400000000
  }
}
```

#### 500 Internal Server Error
```json
{
  "success": false,
  "status": 500,
  "message": "서버 내부 오류가 발생했습니다.",
  "code": "COM_500_001",
  "meta": {
    "path": "/api/applications",
    "timestamp": 1719400000000
  }
}
```

---

## 3. 헬스 체크

### API 설명
서버 상태를 확인한다. 인프라 헬스 체크에 사용하는 엔드포인트이므로 공통 응답 래퍼를 사용하지 않는다.

### Endpoint + Method
`GET /health`

### Path Parameter
(없음)

### Query Parameter
(없음)

### Request Header
(없음)

### Request Body
(없음)

### Request Example (JSON)
(없음)

### Response Body

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| status | string | Y | 서버 상태 | ok |

### Success Response Example (2xx)

#### 200 OK
```json
{
  "status": "ok"
}
```

### Error Response Example (4xx, 5xx)
(없음)

---

## 4. admin 구글 로그인

### API 설명
어드민 페이지 로그인 API다. 프론트엔드에서 전달한 Google ID 토큰을 검증하고, `admins`에 등록된 운영진인지 확인한 뒤 자체 JWT를 발급한다.

### Endpoint + Method
`POST /api/admin/auth/google`

### Path Parameter
(없음)

### Query Parameter
(없음)

### Request Header

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| Content-Type | string | Y | 요청 본문 타입 | application/json |

### Request Body

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| id_token | string | Y | 구글 로그인으로 받은 ID 토큰 | eyJhbGciOi... |

### Request Example (JSON)
```json
{
  "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6..."
}
```

### Response Body

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| success | boolean | Y | 요청 성공 여부 | true |
| status | integer | Y | HTTP 상태 코드 | 200 |
| message | string | Y | 응답 메시지 | 요청에 성공했습니다. |
| data | object | Y | 응답 데이터 | - |
| data.access_token | string | Y | 백엔드 발급 JWT | eyJhbGciOi... |
| data.token_type | string | Y | 토큰 타입 | bearer |
| data.expires_in | integer | Y | 만료까지 남은 초 | 43200 |
| data.admin | object | Y | 로그인한 운영진 정보 | - |
| data.admin.email | string | Y | 운영진 이메일 | admin@khuda.co.kr |
| data.admin.name | string | N | 이름 (없으면 생략) | 홍길동 |
| code | string | N | 에러 코드 (실패 시) | (없음) |
| meta | object | N | 메타 정보 (실패 시) | (없음) |

### Success Response Example (2xx)

#### 200 OK
```json
{
  "success": true,
  "status": 200,
  "message": "요청에 성공했습니다.",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
    "token_type": "bearer",
    "expires_in": 43200,
    "admin": { "email": "admin@khuda.co.kr" }
  }
}
```

### Error Response Example (4xx, 5xx)

#### 401 Unauthorized (유효하지 않은 구글 토큰)
```json
{
  "success": false,
  "status": 401,
  "message": "유효하지 않은 구글 토큰입니다.",
  "code": "AUTH_401_003",
  "meta": { "path": "/api/admin/auth/google", "timestamp": 1719400000000 }
}
```

#### 403 Forbidden (운영진 아님)
```json
{
  "success": false,
  "status": 403,
  "message": "관리자 권한이 없습니다.",
  "code": "AUTH_403_001",
  "meta": { "path": "/api/admin/auth/google", "timestamp": 1719400000000 }
}
```

---

## 5. admin 지원 목록 조회

### API 설명
제출된 지원서 목록을 조회한다. 운영진 인증이 필요하다. 요약 필드(이름, 이메일, 연락처, 트랙)는 문항 답변에서 도출한다.

### Endpoint + Method
`GET /api/admin/applications`

### Path Parameter
(없음)

### Query Parameter

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| applicant_type | string | N | 유형 필터 (yb, ob) | yb |
| search | string | N | 이름, 이메일, 연락처 부분 검색 | 홍길동 |

### Request Header

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| Authorization | string | Y | 로그인으로 받은 JWT | Bearer eyJhbGciOi... |

### Request Body
(없음)

### Request Example (JSON)
(없음)

### Response Body

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| success | boolean | Y | 요청 성공 여부 | true |
| status | integer | Y | HTTP 상태 코드 | 200 |
| message | string | Y | 응답 메시지 | 요청에 성공했습니다. |
| data | object | Y | 응답 데이터 | - |
| data.total | integer | Y | 결과 수 | 2 |
| data.applications | array | Y | 지원서 요약 목록 | - |
| data.applications[].application_id | integer | Y | 지원서 ID | 1001 |
| data.applications[].applicant_type | string | Y | 지원자 유형 | yb |
| data.applications[].status | string | Y | 처리 상태 | submitted |
| data.applications[].created_at | string | Y | 제출 시각 | 2026-06-29T14:00:00+09:00 |
| data.applications[].name | string | N | 이름 | 홍길동 |
| data.applications[].email | string | N | 이메일 | hong@khu.ac.kr |
| data.applications[].phone | string | N | 연락처 | 010-1234-5678 |
| data.applications[].track | string | N | 트랙 | 컴퓨터 비전 |
| data.applications[].answers | array | Y | 문항과 답변 전체 (CSV 내보내기용, 상세와 같은 형태) | - |

### Success Response Example (2xx)

#### 200 OK
```json
{
  "success": true,
  "status": 200,
  "message": "요청에 성공했습니다.",
  "data": {
    "total": 1,
    "applications": [
      {
        "application_id": 1001,
        "applicant_type": "yb",
        "status": "submitted",
        "created_at": "2026-06-29T14:00:00+09:00",
        "name": "홍길동",
        "email": "hong@khu.ac.kr",
        "phone": "010-1234-5678",
        "track": "컴퓨터 비전",
        "answers": [
          { "question_id": 1, "question": "이름", "field_type": "text", "position": 1, "value": "홍길동" }
        ]
      }
    ]
  }
}
```

### Error Response Example (4xx, 5xx)

#### 401 Unauthorized (토큰 없음)
```json
{
  "success": false,
  "status": 401,
  "message": "인증 토큰이 필요합니다.",
  "code": "AUTH_401_001",
  "meta": { "path": "/api/admin/applications", "timestamp": 1719400000000 }
}
```

#### 403 Forbidden (운영진 아님)
```json
{
  "success": false,
  "status": 403,
  "message": "관리자 권한이 없습니다.",
  "code": "AUTH_403_001",
  "meta": { "path": "/api/admin/applications", "timestamp": 1719400000000 }
}
```

---

## 6. admin 지원 상세 조회

### API 설명
지원서 한 건의 상세 정보를 조회한다. 답변에 문항 메타데이터인 문항 내용과 입력 유형을 결합한 뒤 `position` 순으로 반환한다. 운영진 인증이 필요하다.

### Endpoint + Method
`GET /api/admin/applications/{application_id}`

### Path Parameter

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| application_id | integer | Y | 지원서 ID | 1001 |

### Query Parameter
(없음)

### Request Header

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| Authorization | string | Y | 로그인으로 받은 JWT | Bearer eyJhbGciOi... |

### Request Body
(없음)

### Request Example (JSON)
(없음)

### Response Body

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| success | boolean | Y | 요청 성공 여부 | true |
| status | integer | Y | HTTP 상태 코드 | 200 |
| message | string | Y | 응답 메시지 | 요청에 성공했습니다. |
| data | object | Y | 응답 데이터 | - |
| data.application_id | integer | Y | 지원서 ID | 1001 |
| data.applicant_type | string | Y | 지원자 유형 | yb |
| data.status | string | Y | 처리 상태 | submitted |
| data.created_at | string | Y | 제출 시각 | 2026-06-29T14:00:00+09:00 |
| data.updated_at | string | N | 마지막 수정 시각 (없으면 생략) | 2026-06-30T09:00:00+09:00 |
| data.updated_by | string | N | 수정한 운영진 이메일 (없으면 생략) | admin@khuda.co.kr |
| data.answers | array | Y | 문항과 답변 목록 (position 순) | - |
| data.answers[].question_id | integer | Y | 문항 ID | 1 |
| data.answers[].question | string | Y | 문항 내용 | 이름 |
| data.answers[].field_type | string | Y | 입력 필드 타입 | text |
| data.answers[].position | integer | Y | 정렬 순서 | 1 |
| data.answers[].value | string | N | 답변 값 (없으면 생략) | 홍길동 |

### Success Response Example (2xx)

#### 200 OK
```json
{
  "success": true,
  "status": 200,
  "message": "요청에 성공했습니다.",
  "data": {
    "application_id": 1001,
    "applicant_type": "yb",
    "status": "submitted",
    "created_at": "2026-06-29T14:00:00+09:00",
    "answers": [
      { "question_id": 1, "question": "이름", "field_type": "text", "position": 1, "value": "홍길동" },
      { "question_id": 5, "question": "이메일", "field_type": "text", "position": 5, "value": "hong@khu.ac.kr" }
    ]
  }
}
```

### Error Response Example (4xx, 5xx)

#### 404 Not Found (없는 지원서)
```json
{
  "success": false,
  "status": 404,
  "message": "존재하지 않는 지원서입니다.",
  "code": "APP_404_001",
  "meta": { "path": "/api/admin/applications/999", "timestamp": 1719400000000 }
}
```

---

## 7. admin 지원 답변 수정

### API 설명
운영진이 지원자의 답변을 수정한다. 전달된 답변만 기존 답변에 덮어쓴 뒤 전체 답변을 다시 검증한다. 수정 범위는 답변으로 한정하며, 상태(`status`)는 변경하지 않는다.

### Endpoint + Method
`PATCH /api/admin/applications/{application_id}`

### Path Parameter

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| application_id | integer | Y | 지원서 ID | 1001 |

### Query Parameter
(없음)

### Request Header

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| Content-Type | string | Y | 요청 본문 타입 | application/json |
| Authorization | string | Y | 로그인으로 받은 JWT | Bearer eyJhbGciOi... |

### Request Body

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| answers | object | Y | 수정할 문항 ID와 값의 맵 | {"4": "010-0000-0000"} |

### Request Example (JSON)
```json
{
  "answers": { "4": "010-0000-0000" }
}
```

### Response Body
지원 상세 조회(6번)와 같은 형태로 수정된 지원서를 내려준다.

### Success Response Example (2xx)

#### 200 OK
```json
{
  "success": true,
  "status": 200,
  "message": "요청에 성공했습니다.",
  "data": {
    "application_id": 1001,
    "applicant_type": "yb",
    "status": "submitted",
    "created_at": "2026-06-29T14:00:00+09:00",
    "updated_at": "2026-06-30T09:00:00+09:00",
    "updated_by": "admin@khuda.co.kr",
    "answers": [
      { "question_id": 4, "question": "연락처", "field_type": "text", "position": 4, "value": "010-0000-0000" }
    ]
  }
}
```

### Error Response Example (4xx, 5xx)

#### 400 Bad Request (필수 문항 누락)
```json
{
  "success": false,
  "status": 400,
  "message": "필수 문항이 비어 있습니다. - question_id=4",
  "code": "QUE_400_001",
  "meta": { "path": "/api/admin/applications/1001", "timestamp": 1719400000000 }
}
```

#### 404 Not Found (없는 지원서)
```json
{
  "success": false,
  "status": 404,
  "message": "존재하지 않는 지원서입니다.",
  "code": "APP_404_001",
  "meta": { "path": "/api/admin/applications/999", "timestamp": 1719400000000 }
}
```
