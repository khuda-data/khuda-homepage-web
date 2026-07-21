# 프로젝트 글 추가하기

## 1. 사진 올리기

대표 이미지(와 슬라이드 이미지)를 `apps/web/public/images/projects/` 폴더에 넣으세요.
예: `my-project.png`

## 2. 글 파일(.md) 만들기

`apps/web/content/projects/<기수>/` 폴더 안에 `.md` 파일을 하나 만드세요.
예: `8기/my-project.md`

👉 같은 폴더의 `_template.md`를 복사해서 쓰면 가장 편합니다.

```
---
title: 프로젝트 제목            # 필수
members: 홍길동, 김철수         # 팀원 (없으면 비워두기)
generation: 8기                # 기수 (필수)
track: NLP                     # 트랙 (필수, 아래 목록 참고)
thumbnail: my-project.png      # 대표 이미지 파일명 (public/images/projects/ 안의 파일명만)
github: https://github.com/... # (선택) 깃허브 주소
---

여기 아래에 프로젝트 설명을 적습니다.
```

**트랙 목록**: 데이터 분석 / 데이터 엔지니어링 / NLP / CV / AI 엔지니어링 / 금융
