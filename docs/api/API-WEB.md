# API-WEB

공개 웹(apps/web) 지원서 페이지 연동용 API 명세.

설계 원칙
- 답변 키는 안정적 슬러그(`name`, `essay_motivation` 등)를 사용한다. (DB PK와 외부 계약 분리)
- 답변 값은 실제 타입(string / number / boolean / array / object)으로 전송한다. (stringify 금지)
- 위젯 분기는 닫힌 `type` enum으로 한다. (`text | textarea | select | date | consent | python_level | track | interview_slot`)
- 에러 응답은 RFC 9457(`application/problem+json`)을 따른다.

공통 베이스 URL: `https://api-khuda.gaeng02.com`

---

## 1. 지원서 문항 조회

### 1) API 설명
지원자 유형(`common` / `yb` / `ob`)에 해당하는 지원서 폼 필드 정의를 조회한다. 프론트는 이 정의로 폼을 동적으로 렌더한다. 기본 인적사항은 `common`, 유형별 문항은 `yb` / `ob`로 분리 조회한다.

### 2) Endpoint + Method
`GET /api/questions/{type}`

### 3) Path Parameter
| Name | Type | Required | Description | Example |
|------|------|----------|-------------|---------|
| type | string | Y | 지원자 유형 (`common` \| `yb` \| `ob`) | `yb` |

### 4) Query Parameter
(없음)

### 5) Request Header
| Name | Type | Required | Description | Example |
|------|------|----------|-------------|---------|
| Accept | string | N | 응답 형식 | `application/json` |

### 6) Request Body
(없음)

### 7) Request Example (JSON)
(없음. GET 요청이므로 본문 없음)

### 8) Response Body
| Name | Type | Required | Description | Example |
|------|------|----------|-------------|---------|
| applicant_type | string | Y | 조회한 지원자 유형 | `yb` |
| fields | array | Y | 폼 필드 정의 배열 | `[ ... ]` |
| fields[].key | string | Y | 답변 식별 슬러그 (제출 시 answers 키) | `essay_motivation` |
| fields[].label | string | Y | 화면 표시 라벨 | `이름` |
| fields[].type | string | Y | 위젯 타입 (`text` \| `textarea` \| `select` \| `date` \| `consent` \| `python_level` \| `track` \| `interview_slot`) | `select` |
| fields[].required | boolean | Y | 필수 여부 | `true` |
| fields[].max_length | integer \| null | N | 최대 글자 수 (없으면 null) | `700` |
| fields[].options | array \| null | N | select 선택지 (`{value,label}`), 그 외 null | `[{"value":"M","label":"남"}]` |
| fields[].visible_if | object \| null | N | 조건부 노출 (`{field,equals}`) | `{"field":"study_intention","equals":"yes"}` |
| fields[].required_if | object \| null | N | 조건부 필수 (`{field,equals}`) | `{"field":"study_intention","equals":"yes"}` |
| fields[].order | integer | Y | 표시 순서 (오름차순) | `1` |

### 9) Success Response Example (2xx 상태 코드별 JSON)

**200 OK**
```json
{
  "applicant_type": "yb",
  "fields": [
    { "key": "name", "label": "이름", "type": "text", "required": true, "max_length": 20, "options": null, "visible_if": null, "required_if": null, "order": 1 },
    { "key": "gender", "label": "성별", "type": "select", "required": true, "max_length": null, "options": [{ "value": "M", "label": "남" }, { "value": "F", "label": "여" }], "visible_if": null, "required_if": null, "order": 2 },
    { "key": "birth_date", "label": "생년월일", "type": "date", "required": true, "max_length": null, "options": null, "visible_if": null, "required_if": null, "order": 3 },
    { "key": "phone", "label": "연락처", "type": "text", "required": true, "max_length": 13, "options": null, "visible_if": null, "required_if": null, "order": 4 },
    { "key": "email", "label": "이메일", "type": "text", "required": true, "max_length": 60, "options": null, "visible_if": null, "required_if": null, "order": 5 },
    { "key": "enrollment_status", "label": "재학 상태", "type": "select", "required": true, "max_length": null, "options": [{ "value": "enrolled", "label": "재학" }, { "value": "leave", "label": "휴학" }, { "value": "deferred", "label": "졸업유예" }], "visible_if": null, "required_if": null, "order": 6 },
    { "key": "department", "label": "학과", "type": "select", "required": true, "max_length": null, "options": [{ "value": "computer_science", "label": "컴퓨터공학과" }], "visible_if": null, "required_if": null, "order": 7 },
    { "key": "grade", "label": "학년", "type": "select", "required": true, "max_length": null, "options": [{ "value": "1", "label": "1학년" }, { "value": "2", "label": "2학년" }], "visible_if": null, "required_if": null, "order": 8 },
    { "key": "python_level", "label": "파이썬(Python) 활용 단계를 선택해주세요.", "type": "python_level", "required": true, "max_length": null, "options": null, "visible_if": null, "required_if": null, "order": 9 },
    { "key": "interest_track", "label": "관심 있는 심화 트랙을 선택해주세요.", "type": "track", "required": true, "max_length": null, "options": [{ "value": "nlp", "label": "자연어 처리" }, { "value": "cv", "label": "컴퓨터 비전" }], "visible_if": null, "required_if": null, "order": 10 },
    { "key": "essay_motivation", "label": "1. KHUDA에 지원하게 된 계기와 학회 활동을 통해 이루고 싶은 목표는 무엇인가요?", "type": "textarea", "required": true, "max_length": 700, "options": null, "visible_if": null, "required_if": null, "order": 11 },
    { "key": "interview_slots", "label": "면접 가능 일정", "type": "interview_slot", "required": true, "max_length": null, "options": null, "visible_if": null, "required_if": null, "order": 14 },
    { "key": "privacy_consent", "label": "개인정보 수집 및 이용 동의", "type": "consent", "required": true, "max_length": null, "options": null, "visible_if": null, "required_if": null, "order": 100 }
  ]
}
```

### 10) Error Response Example (4xx, 5xx 상태 코드별 JSON)

**404 Not Found** (잘못된 유형)
```json
{
  "type": "https://api-khuda.gaeng02.com/errors/not-found",
  "title": "지원자 유형을 찾을 수 없습니다.",
  "status": 404,
  "detail": "유효한 유형은 common, yb, ob 입니다.",
  "instance": "/api/questions/invalid"
}
```

**500 Internal Server Error**
```json
{
  "type": "https://api-khuda.gaeng02.com/errors/internal",
  "title": "서버 오류가 발생했습니다.",
  "status": 500,
  "detail": "잠시 후 다시 시도해주세요.",
  "instance": "/api/questions/yb"
}
```

---

## 2. 지원서 제출

### 1) API 설명
작성한 지원서를 제출한다. `answers`는 문항 조회로 받은 `key` 슬러그를 키로 하고, 값은 필드 `type`에 맞는 실제 타입으로 전송한다. 서버는 동일 스키마로 필수/형식/조건부 필수를 검증한다.

### 2) Endpoint + Method
`POST /api/applications`

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
| applicant_type | string | Y | 지원자 유형 (`yb` \| `ob`) | `yb` |
| answers | object | Y | 슬러그 키 → 답변 값 맵 | `{ "name": "홍길동" }` |
| answers.name | string | Y | 이름 | `홍길동` |
| answers.gender | string | Y | 성별 (`M` \| `F`) | `M` |
| answers.birth_date | string | Y | 생년월일 (`YYYY-MM-DD`) | `2003-05-01` |
| answers.phone | string | Y | 연락처 | `010-1234-5678` |
| answers.email | string | Y | 이메일 | `hong@khu.ac.kr` |
| answers.enrollment_status | string | Y | 재학 상태 (`enrolled` \| `leave` \| `deferred`) | `enrolled` |
| answers.department | string | Y | 학과 코드 | `computer_science` |
| answers.grade | string | Y | 학년 | `2` |
| answers.python_level | integer | Y(YB) | 파이썬 활용 단계 (1~5) | `3` |
| answers.interest_track | string | Y | 관심/참여 희망 트랙 코드 | `nlp` |
| answers.study_intention | string | N(OB) | 스터디 개설 의향 (`yes` \| `no`) | `yes` |
| answers.study_detail | string | 조건부(OB, study_intention=yes 시 필수) | 개설 희망 스터디 설명 | `데이터 시각화 스터디` |
| answers.essay_motivation | string | Y | 자기소개 1번 | `저는 ...` |
| answers.essay_challenge | string | Y | 자기소개 2번 | `저는 ...` |
| answers.essay_project | string | Y | 자기소개 3번 | `저는 ...` |
| answers.interview_slots | array | Y(YB) | 면접 가능 일정/시간 (`{date,times[]}`) | `[{"date":"2026-07-08","times":["10:00"]}]` |
| answers.privacy_consent | boolean | Y | 개인정보 수집 및 이용 동의 | `true` |

### 7) Request Example (JSON)
```json
{
  "applicant_type": "yb",
  "answers": {
    "name": "홍길동",
    "gender": "M",
    "birth_date": "2003-05-01",
    "phone": "010-1234-5678",
    "email": "hong@khu.ac.kr",
    "enrollment_status": "enrolled",
    "department": "computer_science",
    "grade": "2",
    "python_level": 3,
    "interest_track": "nlp",
    "essay_motivation": "저는 데이터 분석에 관심이 많아 ...",
    "essay_challenge": "프로젝트를 진행하며 ...",
    "essay_project": "캡스톤에서 자연어 처리 모델을 ...",
    "interview_slots": [
      { "date": "2026-07-08", "times": ["10:00", "10:20"] },
      { "date": "2026-07-09", "times": ["14:00"] }
    ],
    "privacy_consent": true
  }
}
```

### 8) Response Body
| Name | Type | Required | Description | Example |
|------|------|----------|-------------|---------|
| application_id | integer | Y | 생성된 지원서 ID | `1042` |
| status | string | Y | 지원서 상태 | `submitted` |
| submitted_at | string | Y | 제출 시각 (ISO 8601) | `2026-07-05T14:20:00+09:00` |

### 9) Success Response Example (2xx 상태 코드별 JSON)

**201 Created**
```json
{
  "application_id": 1042,
  "status": "submitted",
  "submitted_at": "2026-07-05T14:20:00+09:00"
}
```

### 10) Error Response Example (4xx, 5xx 상태 코드별 JSON)

**400 Bad Request** (본문 형식 오류)
```json
{
  "type": "https://api-khuda.gaeng02.com/errors/bad-request",
  "title": "잘못된 요청입니다.",
  "status": 400,
  "detail": "요청 본문을 해석할 수 없습니다.",
  "instance": "/api/applications"
}
```

**409 Conflict** (중복 제출, 이메일/연락처 기준)
```json
{
  "type": "https://api-khuda.gaeng02.com/errors/duplicate",
  "title": "이미 제출된 지원서입니다.",
  "status": 409,
  "detail": "동일한 연락처로 접수된 지원서가 존재합니다.",
  "instance": "/api/applications"
}
```

**422 Unprocessable Entity** (검증 실패, 필드별 에러)
```json
{
  "type": "https://api-khuda.gaeng02.com/errors/validation",
  "title": "지원서 검증에 실패했습니다.",
  "status": 422,
  "detail": "필수 항목이 비어 있거나 형식이 올바르지 않습니다.",
  "instance": "/api/applications",
  "errors": [
    { "field": "essay_motivation", "message": "필수 항목입니다." },
    { "field": "study_detail", "message": "스터디 개설 의향이 '예'인 경우 필수입니다." }
  ]
}
```

**500 Internal Server Error**
```json
{
  "type": "https://api-khuda.gaeng02.com/errors/internal",
  "title": "서버 오류가 발생했습니다.",
  "status": 500,
  "detail": "잠시 후 다시 시도해주세요.",
  "instance": "/api/applications"
}
```

---

## 근거 (Reference)
- RFC 9457 Problem Details for HTTP APIs, 에러 응답 포맷 (`application/problem+json`): https://www.rfc-editor.org/rfc/rfc9457.html
- JSON Schema (스키마 주도 폼 정의: key/label/type/options/조건부) : https://json-schema.org
- REST 리소스 명명 및 상태 코드 컨벤션 (201 Created, 422 Unprocessable Entity)
