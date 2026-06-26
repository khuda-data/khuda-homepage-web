# DB-SCHEMA

KHUDA 지원서 시스템 DB 테이블 요약. 원본 명세는 백엔드 레포 `khuda-homepage-api`의 `docs/db/DB.md`다. 이 문서는 연동 관점 요약이며 어긋나면 백엔드 명세를 따른다.

DBMS: PostgreSQL. 모든 시각 컬럼은 timezone 포함 타입이다.

설계 요점
- 문항은 `questions`에 정의한다. 선택형(select, checklist)의 선택지는 `options`(JSONB)에 담는다.
- 지원서 답변은 `applications.answers`(JSONB)에 문항 ID를 key로 하는 맵으로 저장한다. (별도 EAV 테이블을 두지 않는다)
- 운영진 허용 계정은 `admins`로 관리한다.

---

## 1. questions

| Key | Name | Type | Null | Description |
| --- | --- | --- | --- | --- |
| PK | id | BIGINT | NOT NULL | 문항 ID |
| - | question | TEXT | NOT NULL | 문항 내용 |
| - | applicant_type | ENUM(common, yb, ob) | NOT NULL | 문항 대상 유형 |
| - | field_type | VARCHAR(32) | NOT NULL | 입력 타입 |
| - | required | BOOLEAN | NOT NULL | 필수 여부 |
| - | max_len | INTEGER | NULL | 최대 입력 길이 |
| - | options | JSONB | NULL | 선택지 목록 |
| - | position | INTEGER | NOT NULL | 정렬 순서 |
| - | created_at | TIMESTAMPTZ | NOT NULL | 생성 시각 |

---

## 2. applications

| Key | Name | Type | Null | Description |
| --- | --- | --- | --- | --- |
| PK | id | BIGINT | NOT NULL | 지원서 ID |
| - | applicant_type | ENUM(yb, ob) | NOT NULL | 지원자 유형 |
| - | answers | JSONB | NOT NULL | 문항 ID별 답변 맵 |
| - | status | ENUM(submitted, reviewing, accepted, rejected) | NOT NULL | 처리 상태 (기본 submitted) |
| - | created_at | TIMESTAMPTZ | NOT NULL | 생성 시각 |
| - | updated_at | TIMESTAMPTZ | NULL | 운영진이 답변을 수정한 시각 |
| - | updated_by | VARCHAR(255) | NULL | 답변을 수정한 운영진 이메일 |

- 이메일을 기준으로 1인 1제출만 허용한다(대소문자 무시).
- 운영진은 답변만 수정하며 상태는 바꾸지 않는다. 수정 시 `updated_at`, `updated_by`를 기록한다.
- 목록 요약(이름, 연락처, 이메일, 트랙)은 `answers`에서 문항 키워드로 도출한다(별도 비정규화 컬럼 없음).

---

## 3. admins

| Key | Name | Type | Null | Description |
| --- | --- | --- | --- | --- |
| PK | id | BIGINT | NOT NULL | 운영진 ID |
| UNIQUE | email | VARCHAR(255) | NOT NULL | 운영진 이메일 (유일) |
| - | name | VARCHAR(100) | NULL | 이름 |
| - | created_at | TIMESTAMPTZ | NOT NULL | 등록 시각 |

구글 로그인 시 이 테이블에 이메일이 있는 사용자만 인증을 통과한다.
