---
title: WOODJUDGE: 유사 판례 기반 법률 조언 AI 서비스
generation: 7기
type: 심화
tracks: NLP
searchTracks: LLM
tags: RAG, LangChain, GPT-4o mini, KURE-v1, 판례 검색
summary: 자연어로 상황을 입력하면 RAG로 유사 판례를 검색해 근거 있는 법률 조언을 생성하는 AI 서비스
thumbnail: 7-adv-woodjudge.jpg
---

일반인이 로펌 방문 부담 없이 판례 근거가 있는 조언을 얻도록 하는 것을 목표로 했다. 판례를 KURE 임베딩으로 Chroma에 저장해 유사 판례를 찾고, GPT-4o mini가 사실관계·예상 결과·대응 전략·관련 판례를 정리한 답변을 생성한다.
