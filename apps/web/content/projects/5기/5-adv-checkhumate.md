---
title: checKHUmate: 룸메이트 추천 알고리즘 개발
generation: 5기
type: 심화
tracks: 추천시스템
searchTracks: 데이터 분석
tags: Faiss, SBERT, 규칙 기반 필터링, Flask, One-Hot Encoding
summary: 기숙사 룸메 체크리스트 데이터를 규칙 기반 필터링과 Faiss·SBERT 유사도로 매칭하는 룸메이트 추천 서비스
thumbnail: 5-adv-checkhumate.jpg
github: https://github.com/khuda-data/5th-RecSys-ChecKHUMate
---

경희대 기숙사 룸메이트 매칭 시스템의 한계를 보완하는 것이 목표다. 에브리타임 룸메 체크리스트 이미지에서 133개 행을 직접 수집해 규칙 기반 필터링을 만들고, Faiss 속성 유사도와 SBERT 한줄소개 유사도를 이어 붙인 추천을 구현했다.
