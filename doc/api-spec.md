# KHUDA 공식 홈페이지 API 명세서

**Base URL**: `https://api-khuda.gaeng02.com`
**Content-Type**: `application/json`
**Timeout**: 30초

---

## 1. 질문 목록 조회

지원자 유형에 따른 지원서 질문 목록을 반환합니다.

### Endpoint

```
GET /api/questions/{type}
```

### Path Parameter

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|---------|
| type | string | Y | 지원자 유형 (`yb` / `ob` / `common`) | `yb` |

### Request Example

```http
GET /api/questions/yb HTTP/1.1
Host: api-khuda.gaeng02.com
```

### Response Fields

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|---------|
| applicant_type | string | Y | 지원자 유형 | `"yb"` |
| questions | array | Y | 질문 목록 | `[...]` |
| questions[].id | number | Y | 질문 고유 ID | `1` |
| questions[].question | string | Y | 질문 내용 | `"지원 동기를 작성해주세요."` |
| questions[].applicant_type | string | Y | 해당 질문의 지원자 유형 | `"yb"` |
| questions[].field_type | string | Y | 입력 필드 유형 (`text` / `textarea` / `radio` / `checkbox` 등) | `"textarea"` |
| questions[].required | boolean | Y | 필수 여부 | `true` |
| questions[].max_len | number \| null | Y | 최대 입력 길이 (제한 없으면 null) | `500` |
| questions[].position | number | Y | 질문 순서 | `1` |

### 200 OK Response Example

```json
{
  "applicant_type": "yb",
  "questions": [
    {
      "id": 1,
      "question": "지원 동기를 작성해주세요.",
      "applicant_type": "yb",
      "field_type": "textarea",
      "required": true,
      "max_len": 500,
      "position": 1
    },
    {
      "id": 2,
      "question": "면접 가능 날짜를 선택해주세요.",
      "applicant_type": "yb",
      "field_type": "checkbox",
      "required": true,
      "max_len": null,
      "position": 2
    }
  ]
}
```

### Response Code

| 코드 | 설명 |
|------|------|
| 200 | 조회 성공 |
| 400 | 잘못된 요청 (유효하지 않은 type 값) |
| 404 | 해당 유형의 질문 없음 |
| 500 | 서버 내부 오류 |

### Error Response Example

```json
// 400 Bad Request
{
  "detail": "유효하지 않은 지원자 유형입니다."
}

// 404 Not Found
{
  "detail": "해당 유형의 질문을 찾을 수 없습니다."
}

// 500 Internal Server Error
{
  "detail": "서버 오류가 발생했습니다."
}
```

---

## 2. 지원서 제출

지원자 유형과 질문별 답변을 포함한 지원서를 제출합니다.

### Endpoint

```
POST /api/applications
```

### Request Body

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|---------|
| applicant_type | string | Y | 지원자 유형 (`yb` / `ob`) | `"yb"` |
| answers | object | Y | 질문 ID를 키, 답변 문자열을 값으로 하는 객체 | `{"1": "지원 동기 내용"}` |
| answers.{question_id} | string | Y | 각 질문에 대한 답변. 체크박스는 JSON 배열 문자열, 면접 날짜/시간도 JSON 직렬화 문자열로 전달 | `"[\"2025-03-01\"]"` |

### Request Example

```http
POST /api/applications HTTP/1.1
Host: api-khuda.gaeng02.com
Content-Type: application/json

{
  "applicant_type": "yb",
  "answers": {
    "1": "데이터 분석에 관심이 있어 지원합니다.",
    "2": "[\"2025-03-01\", \"2025-03-02\"]",
    "3": "{\"2025-03-01\": [\"10:00\", \"10:20\"], \"2025-03-02\": [\"14:00\"]}",
    "4": "agree"
  }
}
```

### Response Fields

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|---------|
| application_id | number | Y | 생성된 지원서 고유 ID | `42` |
| status | string | Y | 제출 상태 | `"submitted"` |

### 200 OK Response Example

```json
{
  "application_id": 42,
  "status": "submitted"
}
```

### Response Code

| 코드 | 설명 |
|------|------|
| 200 | 제출 성공 |
| 400 | 잘못된 요청 (필수 항목 누락, 유효성 오류 등) |
| 500 | 서버 내부 오류 |

### Error Response Example

```json
// 400 Bad Request
{
  "detail": [
    { "msg": "applicant_type은 필수 항목입니다." },
    { "msg": "answers는 비어있을 수 없습니다." }
  ]
}

// 500 Internal Server Error
{
  "detail": "서버 오류가 발생했습니다."
}
```

---

## 3. 합격자 결과 조회

학번, 전화번호, 이름을 입력하여 지원 결과를 조회합니다.

### Endpoint

```
POST /api/application_result
```

### Request Body

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|---------|
| student_id | string | Y | 학번 (10자리 숫자) | `"2021123456"` |
| phone_number | string | Y | 전화번호 (11자리 숫자, 하이픈 제외) | `"01012345678"` |
| name | string | Y | 이름 | `"홍길동"` |

### Request Example

```http
POST /api/application_result HTTP/1.1
Host: api-khuda.gaeng02.com
Content-Type: application/json

{
  "student_id": "2021123456",
  "phone_number": "01012345678",
  "name": "홍길동"
}
```

### Response Fields

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|---------|
| student_id | string | Y | 학번 | `"2021123456"` |
| name | string | Y | 이름 | `"홍길동"` |
| status | string | Y | 합격 여부 (`pass` / `fail` / `pending`) | `"pass"` |

### 200 OK Response Example

```json
{
  "student_id": "2021123456",
  "name": "홍길동",
  "status": "pass"
}
```

### Response Code

| 코드 | 설명 |
|------|------|
| 200 | 조회 성공 |
| 400 | 잘못된 요청 (필수 항목 누락, 형식 오류 등) |
| 404 | 해당 지원자 정보 없음 |
| 500 | 서버 내부 오류 |

### Error Response Example

```json
// 400 Bad Request
{
  "detail": "학번은 10자리로 입력해주세요."
}

// 404 Not Found
{
  "detail": "해당 지원자 정보를 찾을 수 없습니다."
}

// 500 Internal Server Error
{
  "detail": "서버 오류가 발생했습니다."
}
```
