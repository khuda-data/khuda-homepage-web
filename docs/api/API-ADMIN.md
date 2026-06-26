# API-ADMIN

관리자 앱(apps/admin) 연동용 API 요약. 원본 명세는 백엔드 레포 `khuda-homepage-api`의 `docs/api/API.md`다. 이 문서는 프론트 연동 관점 요약이며 형태가 어긋나면 백엔드 명세를 따른다.

공통 사항
- 베이스 URL: `https://api.khuda.kro.kr` (로컬은 `http://localhost:8000`)
- 인증: 프론트가 구글 로그인으로 받은 ID 토큰을 백엔드에 보내면, 백엔드가 검증하고 운영진(`admins`) 여부를 확인한 뒤 자체 JWT를 발급한다. 이후 요청은 `Authorization: Bearer <JWT>`로 보낸다. JWT는 클라이언트(localStorage)에 보관한다.
- 모든 응답은 공통 래퍼 `ApiResponse` 형태다. 프론트는 `data`만 언랩해서 쓴다. 401이면 로그아웃 처리한다.

---

## 1. 구글 로그인

`POST /api/admin/auth/google`

요청 본문: `id_token`(string, 구글 ID 토큰).

응답 `data`

| Name | Type | Description |
| --- | --- | --- |
| access_token | string | 백엔드 발급 JWT |
| token_type | string | `bearer` |
| expires_in | integer | 만료까지 남은 초 |
| admin | object | `{ email, name? }` |

에러: 401 `AUTH_401_003`(유효하지 않은 구글 토큰), 403 `AUTH_403_001`(운영진 아님), 500.

> 세션 쿠키나 별도 로그아웃 엔드포인트는 없다. 로그아웃은 클라이언트에서 토큰을 지우면 된다.

---

## 2. 지원 목록 조회

`GET /api/admin/applications` (헤더 `Authorization: Bearer <JWT>`)

쿼리: `applicant_type`(yb, ob, 선택), `search`(이름/이메일/연락처 부분검색, 선택).

응답 `data`

| Name | Type | Description |
| --- | --- | --- |
| total | integer | 결과 수 |
| applications | array | 요약 목록 |
| applications[].application_id | integer | 지원서 ID |
| applications[].applicant_type | string | 유형 |
| applications[].status | string | 처리 상태 |
| applications[].created_at | string | 제출 시각 |
| applications[].name | string? | 이름 |
| applications[].email | string? | 이메일 |
| applications[].phone | string? | 연락처 |
| applications[].track | string? | 트랙 |
| applications[].answers | array | 문항과 답변 전체 (CSV 내보내기용, 상세와 같은 형태) |

에러: 401 `AUTH_401_001`(토큰 없음) / `AUTH_401_002`(유효하지 않은 토큰), 403 `AUTH_403_001`, 500.

---

## 3. 지원 상세 조회

`GET /api/admin/applications/{application_id}` (헤더 `Authorization`)

응답 `data`

| Name | Type | Description |
| --- | --- | --- |
| application_id | integer | 지원서 ID |
| applicant_type | string | 유형 |
| status | string | 처리 상태 |
| created_at | string | 제출 시각 |
| updated_at | string? | 마지막 수정 시각 |
| updated_by | string? | 수정한 운영진 이메일 |
| answers | array | 문항과 답변 (position 순) |
| answers[].question_id | integer | 문항 ID |
| answers[].question | string | 문항 내용 |
| answers[].field_type | string | 입력 타입 |
| answers[].position | integer | 정렬 순서 |
| answers[].value | string? | 답변 값 |

답변 값은 저장된 문자열 그대로다. 체크리스트, 면접 같은 값은 JSON 문자열이라 프론트에서 파싱해 표시한다.

에러: 401, 403, 404 `APP_404_001`(없는 지원서), 500.

---

## 4. 지원 답변 수정

`PATCH /api/admin/applications/{application_id}` (헤더 `Authorization`, `Content-Type: application/json`)

요청 본문: `answers`(object, 수정할 문항 ID와 값의 맵). 보낸 문항만 덮어쓰고 전체를 다시 검증한다. 수정 범위는 답변뿐이고 상태는 바꾸지 않는다.

응답 `data`: 상세 조회(3번)와 같은 형태로 수정된 지원서를 내려준다. `updated_at`, `updated_by`가 채워진다.

에러: 400 `QUE_400_001`/`QUE_400_002`/`APP_400_001`(검증 실패), 401, 403, 404 `APP_404_001`, 500.

> CSV 내보내기는 별도 엔드포인트가 아니라 목록 조회 결과를 프론트에서 파일로 만든다.
