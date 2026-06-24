# API-ADMIN

관리자 앱(apps/admin) 연동용 API 명세.

설계 원칙
- 인증은 백엔드가 구글 OAuth(단일 공식 계정)로 검증한다. 프론트는 Google Identity Services로 ID 토큰을 받아 백엔드에 전달하고, 백엔드는 허용 목록(admin_users) 대조 후 httpOnly 세션 쿠키를 발급한다.
- 인증이 필요한 엔드포인트는 세션 쿠키(`session`)로 보호한다.
- 지원서 상세는 프론트 매핑이 필요 없도록 서버가 `label` / `display`(사람이 읽는 가공값)까지 부착해 내려준다.
- 에러 응답은 RFC 9457(`application/problem+json`)을 따른다.

공통 베이스 URL: `https://api-khuda.gaeng02.com`

---

## 1. 관리자 로그인 (구글)

### 1) API 설명
프론트(Google Identity Services)에서 받은 구글 ID 토큰을 검증한다. 토큰이 유효하고 `admin_users` 허용 목록에 포함된 계정이면 httpOnly 세션 쿠키를 발급하고 관리자 정보를 반환한다.

### 2) Endpoint + Method
`POST /api/admin/auth/google`

### 3) Path Parameter
(없음)

### 4) Query Parameter
(없음)

### 5) Request Header
| Name | Type | Required | Description | Example |
|------|------|----------|-------------|---------|
| Content-Type | string | Y | 요청 본문 형식 | `application/json` |

### 6) Request Body
| Name | Type | Required | Description | Example |
|------|------|----------|-------------|---------|
| id_token | string | Y | Google Identity Services 발급 ID 토큰(JWT) | `eyJhbGciOiJSUzI1NiIs...` |

### 7) Request Example (JSON)
```json
{
  "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjB..."
}
```

### 8) Response Body
| Name | Type | Required | Description | Example |
|------|------|----------|-------------|---------|
| email | string | Y | 관리자 이메일 | `khuda.official@gmail.com` |
| name | string | Y | 관리자 표시 이름 | `KHUDA 운영진` |
| role | string | Y | 권한 (`admin`) | `admin` |

> 성공 시 응답 헤더에 `Set-Cookie: session=<token>; HttpOnly; Secure; SameSite=Lax` 가 포함된다.

### 9) Success Response Example (2xx 상태 코드별 JSON)

**200 OK**
```json
{
  "email": "khuda.official@gmail.com",
  "name": "KHUDA 운영진",
  "role": "admin"
}
```

### 10) Error Response Example (4xx, 5xx 상태 코드별 JSON)

**401 Unauthorized** (ID 토큰 무효/만료)
```json
{
  "type": "https://api-khuda.gaeng02.com/errors/invalid-token",
  "title": "유효하지 않은 토큰입니다.",
  "status": 401,
  "detail": "구글 ID 토큰 검증에 실패했습니다.",
  "instance": "/api/admin/auth/google"
}
```

**403 Forbidden** (허용되지 않은 계정)
```json
{
  "type": "https://api-khuda.gaeng02.com/errors/forbidden",
  "title": "접근 권한이 없습니다.",
  "status": 403,
  "detail": "관리자로 등록되지 않은 계정입니다.",
  "instance": "/api/admin/auth/google"
}
```

**500 Internal Server Error**
```json
{
  "type": "https://api-khuda.gaeng02.com/errors/internal",
  "title": "서버 오류가 발생했습니다.",
  "status": 500,
  "detail": "잠시 후 다시 시도해주세요.",
  "instance": "/api/admin/auth/google"
}
```

---

## 2. 현재 세션 조회

### 1) API 설명
세션 쿠키로 현재 로그인한 관리자 정보를 조회한다. 새로고침 후 인증 상태 복원에 사용한다.

### 2) Endpoint + Method
`GET /api/admin/auth/me`

### 3) Path Parameter
(없음)

### 4) Query Parameter
(없음)

### 5) Request Header
| Name | Type | Required | Description | Example |
|------|------|----------|-------------|---------|
| Cookie | string | Y | 세션 쿠키 | `session=eyJhbGciOi...` |

### 6) Request Body
(없음)

### 7) Request Example (JSON)
(없음. GET 요청이므로 본문 없음)

### 8) Response Body
| Name | Type | Required | Description | Example |
|------|------|----------|-------------|---------|
| email | string | Y | 관리자 이메일 | `khuda.official@gmail.com` |
| name | string | Y | 관리자 표시 이름 | `KHUDA 운영진` |
| role | string | Y | 권한 (`admin`) | `admin` |

### 9) Success Response Example (2xx 상태 코드별 JSON)

**200 OK**
```json
{
  "email": "khuda.official@gmail.com",
  "name": "KHUDA 운영진",
  "role": "admin"
}
```

### 10) Error Response Example (4xx, 5xx 상태 코드별 JSON)

**401 Unauthorized** (세션 없음/만료)
```json
{
  "type": "https://api-khuda.gaeng02.com/errors/unauthorized",
  "title": "인증이 필요합니다.",
  "status": 401,
  "detail": "로그인이 필요합니다.",
  "instance": "/api/admin/auth/me"
}
```

---

## 3. 로그아웃

### 1) API 설명
세션을 만료시키고 세션 쿠키를 제거한다.

### 2) Endpoint + Method
`POST /api/admin/auth/logout`

### 3) Path Parameter
(없음)

### 4) Query Parameter
(없음)

### 5) Request Header
| Name | Type | Required | Description | Example |
|------|------|----------|-------------|---------|
| Cookie | string | Y | 세션 쿠키 | `session=eyJhbGciOi...` |

### 6) Request Body
(없음)

### 7) Request Example (JSON)
(없음. 본문 없음)

### 8) Response Body
(없음. 204 No Content, 응답 헤더로 세션 쿠키 만료)

### 9) Success Response Example (2xx 상태 코드별 JSON)

**204 No Content**
```
(본문 없음, Set-Cookie: session=; Max-Age=0)
```

### 10) Error Response Example (4xx, 5xx 상태 코드별 JSON)

**401 Unauthorized** (세션 없음)
```json
{
  "type": "https://api-khuda.gaeng02.com/errors/unauthorized",
  "title": "인증이 필요합니다.",
  "status": 401,
  "detail": "로그인이 필요합니다.",
  "instance": "/api/admin/auth/logout"
}
```

---

## 4. 지원서 목록 조회

### 1) API 설명
제출된 지원서를 페이지네이션으로 조회한다. 유형/트랙/상태 필터, 이름/연락처/이메일 검색, 정렬을 지원한다. 목록은 카드/테이블 표시에 필요한 요약 필드만 반환한다.

### 2) Endpoint + Method
`GET /api/admin/applications`

### 3) Path Parameter
(없음)

### 4) Query Parameter
| Name | Type | Required | Description | Example |
|------|------|----------|-------------|---------|
| page | integer | N | 페이지 번호 (1부터, 기본 1) | `1` |
| size | integer | N | 페이지당 개수 (기본 20) | `20` |
| type | string | N | 유형 필터 (`yb` \| `ob`) | `yb` |
| track | string | N | 트랙 코드 필터 | `nlp` |
| status | string | N | 상태 필터 (`submitted` \| `reviewing` \| `accepted` \| `rejected`) | `submitted` |
| q | string | N | 검색어 (이름/연락처/이메일) | `홍길동` |
| sort | string | N | 정렬 (`recent` \| `oldest` \| `name`, 기본 `recent`) | `recent` |

### 5) Request Header
| Name | Type | Required | Description | Example |
|------|------|----------|-------------|---------|
| Cookie | string | Y | 세션 쿠키 | `session=eyJhbGciOi...` |

### 6) Request Body
(없음)

### 7) Request Example (JSON)
(없음. GET 요청이므로 본문 없음)

예시 요청 URL: `GET /api/admin/applications?page=1&size=20&type=yb&track=nlp&sort=recent`

### 8) Response Body
| Name | Type | Required | Description | Example |
|------|------|----------|-------------|---------|
| items | array | Y | 지원서 요약 배열 | `[ ... ]` |
| items[].application_id | integer | Y | 지원서 ID | `1042` |
| items[].name | string | Y | 지원자 이름 | `홍길동` |
| items[].phone | string | Y | 연락처 | `010-1234-5678` |
| items[].email | string | Y | 이메일 | `hong@khu.ac.kr` |
| items[].applicant_type | string | Y | 유형 (`yb` \| `ob`) | `yb` |
| items[].track | string | Y | 트랙 표시명 | `자연어 처리` |
| items[].status | string | Y | 상태 | `submitted` |
| items[].submitted_at | string | Y | 제출 시각 (ISO 8601) | `2026-07-05T14:20:00+09:00` |
| page | integer | Y | 현재 페이지 | `1` |
| size | integer | Y | 페이지당 개수 | `20` |
| total | integer | Y | 전체 건수 | `134` |
| total_pages | integer | Y | 전체 페이지 수 | `7` |

### 9) Success Response Example (2xx 상태 코드별 JSON)

**200 OK**
```json
{
  "items": [
    {
      "application_id": 1042,
      "name": "홍길동",
      "phone": "010-1234-5678",
      "email": "hong@khu.ac.kr",
      "applicant_type": "yb",
      "track": "자연어 처리",
      "status": "submitted",
      "submitted_at": "2026-07-05T14:20:00+09:00"
    }
  ],
  "page": 1,
  "size": 20,
  "total": 134,
  "total_pages": 7
}
```

### 10) Error Response Example (4xx, 5xx 상태 코드별 JSON)

**401 Unauthorized**
```json
{
  "type": "https://api-khuda.gaeng02.com/errors/unauthorized",
  "title": "인증이 필요합니다.",
  "status": 401,
  "detail": "로그인이 필요합니다.",
  "instance": "/api/admin/applications"
}
```

**500 Internal Server Error**
```json
{
  "type": "https://api-khuda.gaeng02.com/errors/internal",
  "title": "서버 오류가 발생했습니다.",
  "status": 500,
  "detail": "잠시 후 다시 시도해주세요.",
  "instance": "/api/admin/applications"
}
```

---

## 5. 지원서 상세 조회

### 1) API 설명
단일 지원서의 전체 답변을 조회한다. 답변은 슬러그 키별로 `label`(질문 라벨)과 `display`(사람이 읽는 가공값)를 함께 내려 프론트에서 별도 매핑 없이 그대로 표시할 수 있게 한다.

### 2) Endpoint + Method
`GET /api/admin/applications/{id}`

### 3) Path Parameter
| Name | Type | Required | Description | Example |
|------|------|----------|-------------|---------|
| id | integer | Y | 지원서 ID | `1042` |

### 4) Query Parameter
(없음)

### 5) Request Header
| Name | Type | Required | Description | Example |
|------|------|----------|-------------|---------|
| Cookie | string | Y | 세션 쿠키 | `session=eyJhbGciOi...` |

### 6) Request Body
(없음)

### 7) Request Example (JSON)
(없음. GET 요청이므로 본문 없음)

### 8) Response Body
| Name | Type | Required | Description | Example |
|------|------|----------|-------------|---------|
| application_id | integer | Y | 지원서 ID | `1042` |
| applicant_type | string | Y | 유형 (`yb` \| `ob`) | `yb` |
| status | string | Y | 상태 | `submitted` |
| submitted_at | string | Y | 제출 시각 (ISO 8601) | `2026-07-05T14:20:00+09:00` |
| applicant | object | Y | 지원자 요약 | `{ ... }` |
| applicant.name | string | Y | 이름 | `홍길동` |
| applicant.phone | string | Y | 연락처 | `010-1234-5678` |
| applicant.email | string | Y | 이메일 | `hong@khu.ac.kr` |
| answers | array | Y | 답변 목록 (표시 순서대로) | `[ ... ]` |
| answers[].key | string | Y | 답변 슬러그 | `essay_motivation` |
| answers[].label | string | Y | 질문 라벨 | `1. KHUDA에 지원하게 된 계기와 ...` |
| answers[].type | string | Y | 필드 타입 | `textarea` |
| answers[].section | string | Y | 섹션 (`basic` \| `common` \| `type`) | `type` |
| answers[].value | any | Y | 원본 값(타입 유지) | `"저는 ..."` |
| answers[].display | string | Y | 사람이 읽는 가공 문자열 | `7/8(화) 10:00, 10:20` |

### 9) Success Response Example (2xx 상태 코드별 JSON)

**200 OK**
```json
{
  "application_id": 1042,
  "applicant_type": "yb",
  "status": "submitted",
  "submitted_at": "2026-07-05T14:20:00+09:00",
  "applicant": {
    "name": "홍길동",
    "phone": "010-1234-5678",
    "email": "hong@khu.ac.kr"
  },
  "answers": [
    { "key": "name", "label": "이름", "type": "text", "section": "basic", "value": "홍길동", "display": "홍길동" },
    { "key": "gender", "label": "성별", "type": "select", "section": "basic", "value": "M", "display": "남" },
    { "key": "interest_track", "label": "관심 있는 심화 트랙", "type": "track", "section": "type", "value": "nlp", "display": "자연어 처리" },
    { "key": "python_level", "label": "파이썬 활용 단계", "type": "python_level", "section": "type", "value": 3, "display": "3단계" },
    { "key": "essay_motivation", "label": "1. KHUDA에 지원하게 된 계기와 학회 활동을 통해 이루고 싶은 목표는 무엇인가요?", "type": "textarea", "section": "type", "value": "저는 데이터 분석에 ...", "display": "저는 데이터 분석에 ..." },
    { "key": "interview_slots", "label": "면접 가능 일정", "type": "interview_slot", "section": "type", "value": [{ "date": "2026-07-08", "times": ["10:00", "10:20"] }], "display": "7/8(화) 10:00, 10:20" }
  ]
}
```

### 10) Error Response Example (4xx, 5xx 상태 코드별 JSON)

**401 Unauthorized**
```json
{
  "type": "https://api-khuda.gaeng02.com/errors/unauthorized",
  "title": "인증이 필요합니다.",
  "status": 401,
  "detail": "로그인이 필요합니다.",
  "instance": "/api/admin/applications/1042"
}
```

**404 Not Found** (존재하지 않는 지원서)
```json
{
  "type": "https://api-khuda.gaeng02.com/errors/not-found",
  "title": "지원서를 찾을 수 없습니다.",
  "status": 404,
  "detail": "해당 ID의 지원서가 존재하지 않습니다.",
  "instance": "/api/admin/applications/999999"
}
```

**500 Internal Server Error**
```json
{
  "type": "https://api-khuda.gaeng02.com/errors/internal",
  "title": "서버 오류가 발생했습니다.",
  "status": 500,
  "detail": "잠시 후 다시 시도해주세요.",
  "instance": "/api/admin/applications/1042"
}
```

---

## 6. 지원서 CSV 내보내기

### 1) API 설명
현재 필터 조건에 해당하는 지원서를 CSV 파일로 내려받는다. 목록과 동일한 필터/검색 쿼리를 받는다. 응답은 `text/csv`다.

### 2) Endpoint + Method
`GET /api/admin/applications/export`

### 3) Path Parameter
(없음)

### 4) Query Parameter
| Name | Type | Required | Description | Example |
|------|------|----------|-------------|---------|
| type | string | N | 유형 필터 (`yb` \| `ob`) | `yb` |
| track | string | N | 트랙 코드 필터 | `nlp` |
| status | string | N | 상태 필터 | `submitted` |
| q | string | N | 검색어 (이름/연락처/이메일) | `홍길동` |

### 5) Request Header
| Name | Type | Required | Description | Example |
|------|------|----------|-------------|---------|
| Cookie | string | Y | 세션 쿠키 | `session=eyJhbGciOi...` |
| Accept | string | N | 응답 형식 | `text/csv` |

### 6) Request Body
(없음)

### 7) Request Example (JSON)
(없음. GET 요청이므로 본문 없음)

예시 요청 URL: `GET /api/admin/applications/export?type=yb&track=nlp`

### 8) Response Body
| Name | Type | Required | Description | Example |
|------|------|----------|-------------|---------|
| (binary) | text/csv | Y | UTF-8(BOM) CSV 본문. `Content-Disposition: attachment; filename="khuda-applications.csv"` | `application_id,name,...` |

### 9) Success Response Example (2xx 상태 코드별 JSON)

**200 OK** (Content-Type: `text/csv; charset=utf-8`)
```csv
application_id,name,phone,email,applicant_type,track,status,submitted_at
1042,홍길동,010-1234-5678,hong@khu.ac.kr,yb,자연어 처리,submitted,2026-07-05T14:20:00+09:00
```

### 10) Error Response Example (4xx, 5xx 상태 코드별 JSON)

**401 Unauthorized**
```json
{
  "type": "https://api-khuda.gaeng02.com/errors/unauthorized",
  "title": "인증이 필요합니다.",
  "status": 401,
  "detail": "로그인이 필요합니다.",
  "instance": "/api/admin/applications/export"
}
```

**500 Internal Server Error**
```json
{
  "type": "https://api-khuda.gaeng02.com/errors/internal",
  "title": "서버 오류가 발생했습니다.",
  "status": 500,
  "detail": "잠시 후 다시 시도해주세요.",
  "instance": "/api/admin/applications/export"
}
```

---

## 근거 (Reference)
- RFC 9457 Problem Details for HTTP APIs, 에러 응답 포맷 (`application/problem+json`): https://www.rfc-editor.org/rfc/rfc9457.html
- Google Identity Services: ID 토큰(JWT) 발급 및 검증: https://developers.google.com/identity/gsi/web/guides/overview
- OAuth 2.0 (RFC 6749): 인증 위임: https://www.rfc-editor.org/rfc/rfc6749
- REST 리소스 명명 및 페이지네이션/상태 코드 컨벤션 (200/204/401/403/404)
