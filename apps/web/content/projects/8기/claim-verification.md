---
title: 자소서 텍스트에서 검증 가능한 주장(Claim) 추출 및 즉석 후속 질문 검증 시스템
members: 정승우, 김하율, 이서준, 박민지, 조현아
generation: 8기
track: NLP
thumbnail: claim-verification.png
github: https://github.com/khuda-data/8th-NLP-CoverLetter
---

자소서 텍스트에서 검증 가능한 주장(Claim)을 추출하고, 즉석 후속 질문을 통해 검증하는 시스템입니다. BERT 계열 모델로 Claim을 파싱하고 LLM으로 질문을 생성하며, FastAPI + PostgreSQL + FAISS로 전체 파이프라인을 구축하였습니다.
