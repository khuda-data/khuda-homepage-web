# API-WEB

공개 홈페이지(apps/web) 연동용 API 요약. 원본 명세는 백엔드 레포 `khuda-homepage-api`의 `docs/api/API.md`다. 이 문서는 프론트 연동 관점 요약이며 형태가 어긋나면 백엔드 명세를 따른다.

공통 사항
- 베이스 URL: `https://api.khuda.kro.kr` (로컬은 `http://localhost:8000`)
- 모든 응답은 공통 래퍼 `ApiResponse` 형태다: `{ success, status, message, data, code, meta }`. null 필드는 생략된다. 프론트는 `data`만 언랩해서 쓴다.
- 실패 시 `code`(에러 코드)와 `meta.path`, `meta.timestamp`가 채워진다.

---

## 1. 지원자 유형별 문항 조회

`GET /api/questions/{applicant_type}`

- `applicant_type`: `common`, `yb`, `ob`
- 프론트는 `common`을 먼저 조회해 띄우고, 유형 선택 시 해당 유형 문항을 추가 조회한다.
- 문항은 `position` 오름차순(동률 시 `id`)으로 내려온다.

응답 `data`

| Name | Type | Description |
| --- | --- | --- |
| applicant_type | string | 조회한 유형 |
| questions | array | 문항 목록 |
| questions[].id | integer | 문항 ID |
| questions[].question | string | 문항 내용 |
| questions[].applicant_type | string | 문항 대상 유형 |
| questions[].field_type | string | 입력 타입 (text, textarea, select, checklist 등) |
| questions[].required | boolean | 필수 여부 |
| questions[].max_len | integer? | 최대 길이 (없으면 생략) |
| questions[].options | array? | 선택지 (select, checklist용, 없으면 생략) |
| questions[].position | integer | 정렬 순서 |

에러: 404 `QUE_404_001`(유효하지 않은 유형), 500 `COM_500_001`.

---

## 2. 지원서 접수

`POST /api/applications`

요청 본문

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| applicant_type | string | Y | `yb` 또는 `ob` |
| answers | object | Y | 문항 ID를 key로 하는 답변 맵 |

- 답변 값은 모두 문자열이다. 배열, 객체형 답변(체크리스트, 면접 일정과 시간)은 JSON 문자열로 직렬화해 담는다.
- 이메일을 기준으로 1인 1제출만 허용한다. 같은 이메일이 이미 있으면 409로 거절한다(yb, ob 무관, 대소문자 무시).

응답 `data`: `application_id`(integer), `status`(string).

에러: 400 `QUE_400_001`(필수 누락), 400 `QUE_400_002`(최대 길이 초과), 400 `APP_400_001`(알 수 없는 문항 ID), 409 `APP_409_001`(중복 지원), 500 `COM_500_001`.

---

## 3. 헬스 체크

`GET /health` -> `{ "status": "ok" }` (이 엔드포인트만 래퍼를 쓰지 않는다)
