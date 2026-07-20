# DB 테이블 명세

PostgreSQL 기준. 모든 시각 컬럼은 timezone 포함 타입을 사용한다.

> admin 페이지가 제출된 지원서와 문항을 조회하고, 운영진이 지원자 답변을 수정한다. 자세한 내용은 문서 맨 아래 관리자 연동 고려사항을 참고한다.

---

## 1. questions

### 테이블 설명
지원자 유형별 지원서 문항을 정의한다. `select`, `checklist` 같은 선택형 문항의 선택지는 `options`에 저장한다.

### 테이블 이름
`questions`

### 컬럼 명세

| Key | Name | Type | Constraint(nullable) | Description | Example |
| --- | --- | --- | --- | --- | --- |
| PK | id | BIGINT | NOT NULL | 문항 ID (auto increment) | 2 |
| - | question | TEXT | NOT NULL | 문항 내용 | 성별 |
| - | applicant_type | ENUM(common, yb, ob) | NOT NULL | 문항 대상 유형 (question_audience_enum) | common |
| - | field_type | VARCHAR(32) | NOT NULL | 입력 필드 타입 (text, textarea, select, checklist 등) | select |
| - | required | BOOLEAN | NOT NULL | 필수 여부 | true |
| - | max_len | INTEGER | NULL | 최대 입력 길이 | 500 |
| - | options | JSONB | NULL | 선택지 목록 (select, checklist용) | ["남", "여"] |
| - | position | INTEGER | NOT NULL | 정렬 순서 | 20 |
| - | created_at | TIMESTAMPTZ | NOT NULL | 생성 시각 | 2026-06-26T14:00:00+09:00 |

### Example Row
```json
{
  "id": 2,
  "question": "성별",
  "applicant_type": "common",
  "field_type": "select",
  "required": true,
  "max_len": null,
  "options": ["남", "여"],
  "position": 20,
  "created_at": "2026-06-26T14:00:00+09:00"
}
```

---

## 2. applications

### 테이블 설명
제출된 지원서를 저장한다. 문항별 답변은 문항 ID를 키로 사용하는 맵 형태로 `answers`에 저장한다.

### 테이블 이름
`applications`

### 컬럼 명세

| Key | Name | Type | Constraint(nullable) | Description | Example |
| --- | --- | --- | --- | --- | --- |
| PK | id | BIGINT | NOT NULL | 지원서 ID (auto increment) | 1001 |
| - | applicant_type | ENUM(yb, ob) | NOT NULL | 지원자 유형 (applicant_type_enum) | yb |
| - | answers | JSONB | NOT NULL | 문항 ID별 답변 맵 | {"1": "홍길동"} |
| - | status | ENUM(submitted, reviewing, accepted, rejected) | NOT NULL | 처리 상태 (application_status_enum, 기본 submitted) | submitted |
| - | created_at | TIMESTAMPTZ | NOT NULL | 생성 시각 | 2026-06-26T14:00:00+09:00 |
| - | updated_at | TIMESTAMPTZ | NULL | 운영진이 답변을 수정한 시각 (접수 시점에는 비어 있음) | 2026-06-30T09:00:00+09:00 |
| - | updated_by | VARCHAR(255) | NULL | 답변을 수정한 운영진 이메일 | admin@khuda.co.kr |

> 이메일을 기준으로 한 사람당 한 번만 제출할 수 있다. 같은 이메일로 제출한 지원서가 이미 있으면 대소문자 구분 없이 접수를 거절한다.

### Example Row
```json
{
  "id": 1001,
  "applicant_type": "yb",
  "answers": {
    "1": "홍길동",
    "5": "hong@khu.ac.kr",
    "14": "데이터 분석에 관심이 생겨 지원했습니다."
  },
  "status": "submitted",
  "created_at": "2026-06-26T14:00:00+09:00",
  "updated_at": null,
  "updated_by": null
}
```

---

## 3. admins

### 테이블 설명
admin 페이지에 로그인할 수 있는 운영진 목록이다. Google 로그인 시 이 테이블에 이메일이 등록된 사용자만 인증을 통과한다.

### 테이블 이름
`admins`

### 컬럼 명세

| Key | Name | Type | Constraint(nullable) | Description | Example |
| --- | --- | --- | --- | --- | --- |
| PK | id | BIGINT | NOT NULL | 운영진 ID (auto increment) | 1 |
| UNIQUE | email | VARCHAR(255) | NOT NULL | 운영진 이메일 (유일) | khuda.official@gmail.com |
| - | name | VARCHAR(100) | NULL | 이름 | 홍길동 |
| - | created_at | TIMESTAMPTZ | NOT NULL | 등록 시각 | 2026-06-27T10:00:00+09:00 |

### Example Row
```json
{
  "id": 1,
  "email": "khuda.official@gmail.com",
  "name": null,
  "created_at": "2026-06-27T10:00:00+09:00"
}
```

---

## 관리자 연동 고려사항

admin 페이지에서 제출 지원서와 문항을 조회하고, 수정 요청이 오면 운영진이 답변을 수정한다.

운영진이 답변을 수정하므로 마지막 수정 시각(`updated_at`)과 수정자(`updated_by`)를 기록한다. 수정 범위는 답변뿐이고 상태(`status`)는 바꾸지 않는다.

- **지원서 조회**: `applications`만으로 목록과 상세를 모두 제공한다. `created_at`로 정렬, `status`로 필터링, `applicant_type`으로 구분한다. 답변 원문은 `answers`(JSONB)에 그대로 보관한다.
- **인증**: `admins`에 이메일이 있는 사용자만 admin API에 접근한다. 구글 로그인으로 신원을 확인하고 백엔드가 자체 JWT를 발급한다.
- **답변과 문항 매핑**: `answers`는 문항 ID를 key로 저장한다. 관리자 화면에서 문항 내용과 함께 보여주려면 `questions`를 ID로 조회해 join한다. 따라서 한 번 사용한 문항 행은 삭제하지 않고 보존한다(append 위주 관리). 기수마다 문항이 바뀌어도 과거 지원서의 답변 ID가 항상 해석 가능해야 하기 때문이다.
- **문항 조회**: `questions`는 `field_type`, `required`, `max_len`, `options`, `position`까지 한 행에 담아 폼 구성 정보를 모두 보유한다. 관리자는 이 컬럼들로 문항 전체를 그대로 조회한다.

