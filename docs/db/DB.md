# DB-SCHEMA

KHUDA 지원서 시스템 DB 테이블 명세. (web 제출 + admin 조회 연동 기준)

설계 원칙
- 폼 필드는 `form_fields`로 정의해 슬러그(`field_key`) 기반 동적 폼을 지원한다.
- 지원서 본문 답변은 `application_answers`(EAV)에 `field_key` → `value`(JSONB)로 저장한다. (값의 실제 타입 보존)
- 목록 필터/정렬에 쓰는 값(이름/연락처/이메일/트랙)은 `applications`에 비정규화해 조회 성능을 확보한다.
- 관리자 허용 계정은 `admin_users`로 관리한다.

DBMS 기준: PostgreSQL

---

## 1. admin_users

### 1) 테이블 설명
관리자 앱 로그인 허용 계정(구글 OAuth 단일 공식 계정 검증용 화이트리스트).

### 2) 테이블 이름
`admin_users`

### 3) 컬럼 명세
| Key | Name | Type | Constraint(nullable) | Description | Example |
|-----|------|------|----------------------|-------------|---------|
| PK | id | BIGSERIAL | NOT NULL | 관리자 식별자 | `1` |
| - | email | VARCHAR(255) | NOT NULL (UNIQUE) | 구글 계정 이메일 | `khuda.official@gmail.com` |
| - | name | VARCHAR(50) | NOT NULL | 표시 이름 | `KHUDA 운영진` |
| - | role | VARCHAR(20) | NOT NULL | 권한 (`admin`) | `admin` |
| - | is_active | BOOLEAN | NOT NULL | 활성화 여부 | `true` |
| - | created_at | TIMESTAMPTZ | NOT NULL | 생성 시각 | `2026-06-01T09:00:00+09:00` |

### 4) Example Row
```json
{
  "id": 1,
  "email": "khuda.official@gmail.com",
  "name": "KHUDA 운영진",
  "role": "admin",
  "is_active": true,
  "created_at": "2026-06-01T09:00:00+09:00"
}
```

---

## 2. form_fields

### 1) 테이블 설명
지원자 유형별 지원서 폼 필드 정의. `GET /api/questions/{type}` 응답의 원본이며 동적 폼 렌더링과 서버 측 검증의 단일 출처(single source).

### 2) 테이블 이름
`form_fields`

### 3) 컬럼 명세
| Key | Name | Type | Constraint(nullable) | Description | Example |
|-----|------|------|----------------------|-------------|---------|
| PK | id | BIGSERIAL | NOT NULL | 필드 식별자 | `11` |
| - | applicant_type | VARCHAR(10) | NOT NULL | 적용 유형 (`common` \| `yb` \| `ob`) | `yb` |
| - | field_key | VARCHAR(50) | NOT NULL | 답변 슬러그 (유형 내 UNIQUE) | `essay_motivation` |
| - | label | TEXT | NOT NULL | 화면 표시 라벨 | `1. KHUDA에 지원하게 된 계기와 ...` |
| - | type | VARCHAR(20) | NOT NULL | 위젯 타입 (`text` \| `textarea` \| `select` \| `date` \| `consent` \| `python_level` \| `track` \| `interview_slot`) | `textarea` |
| - | required | BOOLEAN | NOT NULL | 필수 여부 | `true` |
| - | max_length | INTEGER | NULL | 최대 글자 수 | `700` |
| - | options | JSONB | NULL | select 선택지 (`[{value,label}]`) | `[{"value":"M","label":"남"}]` |
| - | visible_if | JSONB | NULL | 조건부 노출 (`{field,equals}`) | `{"field":"study_intention","equals":"yes"}` |
| - | required_if | JSONB | NULL | 조건부 필수 (`{field,equals}`) | `{"field":"study_intention","equals":"yes"}` |
| - | display_order | INTEGER | NOT NULL | 표시 순서 | `11` |
| - | is_active | BOOLEAN | NOT NULL | 사용 여부 | `true` |

### 4) Example Row
```json
{
  "id": 11,
  "applicant_type": "yb",
  "field_key": "essay_motivation",
  "label": "1. KHUDA에 지원하게 된 계기와 학회 활동을 통해 이루고 싶은 목표는 무엇인가요?",
  "type": "textarea",
  "required": true,
  "max_length": 700,
  "options": null,
  "visible_if": null,
  "required_if": null,
  "display_order": 11,
  "is_active": true
}
```

---

## 3. applications

### 1) 테이블 설명
제출된 지원서 1건. 목록 조회, 필터, 정렬에 필요한 값(이름/연락처/이메일/트랙)을 비정규화해 보관하고, 상세 답변은 `application_answers`에 분리 저장한다.

### 2) 테이블 이름
`applications`

### 3) 컬럼 명세
| Key | Name | Type | Constraint(nullable) | Description | Example |
|-----|------|------|----------------------|-------------|---------|
| PK | id | BIGSERIAL | NOT NULL | 지원서 ID | `1042` |
| - | applicant_type | VARCHAR(10) | NOT NULL | 유형 (`yb` \| `ob`) | `yb` |
| - | status | VARCHAR(20) | NOT NULL | 상태 (`submitted` \| `reviewing` \| `accepted` \| `rejected`) | `submitted` |
| - | name | VARCHAR(20) | NOT NULL | 지원자 이름(비정규화) | `홍길동` |
| - | phone | VARCHAR(20) | NOT NULL | 연락처(비정규화) | `010-1234-5678` |
| - | email | VARCHAR(60) | NOT NULL | 이메일(비정규화) | `hong@khu.ac.kr` |
| - | track | VARCHAR(50) | NULL | 트랙 코드(비정규화, 필터용) | `nlp` |
| - | submitted_at | TIMESTAMPTZ | NOT NULL | 제출 시각 | `2026-07-05T14:20:00+09:00` |
| - | created_at | TIMESTAMPTZ | NOT NULL | 생성 시각 | `2026-07-05T14:20:00+09:00` |
| - | updated_at | TIMESTAMPTZ | NOT NULL | 수정 시각 | `2026-07-05T14:20:00+09:00` |

### 4) Example Row
```json
{
  "id": 1042,
  "applicant_type": "yb",
  "status": "submitted",
  "name": "홍길동",
  "phone": "010-1234-5678",
  "email": "hong@khu.ac.kr",
  "track": "nlp",
  "submitted_at": "2026-07-05T14:20:00+09:00",
  "created_at": "2026-07-05T14:20:00+09:00",
  "updated_at": "2026-07-05T14:20:00+09:00"
}
```

---

## 4. application_answers

### 1) 테이블 설명
지원서별 답변 항목(EAV). `field_key`별로 값을 JSONB로 저장해 string/number/boolean/array/object 등 실제 타입을 보존한다. 상세 조회 시 `form_fields`와 `field_key`로 join해 라벨/타입을 부착한다.

### 2) 테이블 이름
`application_answers`

### 3) 컬럼 명세
| Key | Name | Type | Constraint(nullable) | Description | Example |
|-----|------|------|----------------------|-------------|---------|
| PK | id | BIGSERIAL | NOT NULL | 답변 식별자 | `50231` |
| FK | application_id | BIGINT | NOT NULL | `applications.id` 참조 | `1042` |
| - | field_key | VARCHAR(50) | NOT NULL | 답변 슬러그 (`form_fields.field_key`) | `interview_slots` |
| - | value | JSONB | NOT NULL | 답변 값(실제 타입 보존) | `[{"date":"2026-07-08","times":["10:00"]}]` |
| - | created_at | TIMESTAMPTZ | NOT NULL | 생성 시각 | `2026-07-05T14:20:00+09:00` |

> 제약: `UNIQUE (application_id, field_key)`, `FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE`

### 4) Example Row
```json
{
  "id": 50231,
  "application_id": 1042,
  "field_key": "interview_slots",
  "value": [{ "date": "2026-07-08", "times": ["10:00", "10:20"] }],
  "created_at": "2026-07-05T14:20:00+09:00"
}
```

---

## 근거 (Reference)
- PostgreSQL JSONB: 가변 스키마 값 저장: https://www.postgresql.org/docs/current/datatype-json.html
- JSON Schema (슬러그 기반 동적 폼 정의): https://json-schema.org
- 관계형 비정규화 / EAV 패턴: 동적 속성 저장과 조회 성능 절충
