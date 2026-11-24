# 프로젝트 글 추가하기

## 1. 대표 이미지 올리기

`apps/web/public/images/projects/` 폴더에 넣으세요. 파일 이름은 글 파일 이름과 같게 맞추면 찾기 쉽습니다.
예: `10-adv-my-project.jpg`

- 발표 자료의 표지(팀원 이름), 연락처, 메신저 캡처처럼 **개인정보가 보이는 장은 쓰지 않습니다.**
- 사람 얼굴이 보이면 얼굴만 살짝 블러 처리합니다.

## 2. 글 파일(.md) 만들기

`apps/web/content/projects/<기수>/` 폴더에 `.md` 파일을 만드세요. 같은 폴더의 `_template.md`를 복사해 쓰면 편합니다.

```
---
title: 프로젝트 제목                     # 필수
generation: 10기                        # 필수
type: 심화                              # 심화 또는 토이
tracks: LLM                             # 카드에 보이는 트랙 이름 (당시 이름 그대로, 합동이면 "NLP, AIE")
searchTracks: LLM                       # 트랙 필터에서 찾을 이름 (아래 목록에서만)
tags: RAG, LangGraph, FastAPI           # 키워드 3~5개 (목록 카드에는 앞의 3개만 보임)
summary: 한 줄 소개
thumbnail: 10-adv-my-project.jpg        # public/images/projects/ 안의 파일명
github: https://github.com/khuda-data/... # (선택)
---

상세 화면 설명 (두 문장 정도)
```

- **토이 프로젝트**는 `type: 토이`, `tracks: 토이 프로젝트`, `searchTracks: 토이 프로젝트`로 적습니다.
- **팀원 이름은 적지 않습니다.** (공개 동의를 받지 않았기 때문)

## 트랙 이름 정리

`searchTracks`에는 아래 이름만 씁니다: **데이터 분석 / LLM / CV / AI 엔지니어링 / 금융 / ML 심화 / 토이 프로젝트**

| 당시 트랙 이름 (`tracks`) | 검색 이름 (`searchTracks`) |
|---|---|
| NLP | LLM |
| AIE | AI 엔지니어링 |
| 데이터비즈니스, 데이터엔지니어링, 추천시스템 | 데이터 분석 |
| 강화학습, ML 심화 | ML 심화 (지금은 운영하지 않는 트랙) |
| CV, 금융 | 그대로 |

트랙 필터와 기수 필터에는 실제로 프로젝트가 있는 항목만 나옵니다.
