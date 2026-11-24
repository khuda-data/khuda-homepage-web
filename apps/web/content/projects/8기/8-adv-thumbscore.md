---
title: ThumbScore: 유튜브 썸네일 효과 분석
generation: 8기
type: 심화
tracks: CV
searchTracks: CV
tags: 회귀분석, CLIP, ResNet-34, IA-ViT, Gemini
summary: 채널·영상 효과를 회귀로 통제한 잔차로 썸네일 점수를 정의하고 히트맵과 Gemini 피드백을 제공하는 분석 서비스
thumbnail: 8-adv-thumbscore.jpg
---

채널 규모 등 외부 요인을 걷어 낸 썸네일 자체의 효과를 측정하려 했다. Vlog 영상 4,693개의 회귀 잔차로 점수를 정의하고, 세 모델 중 고른 CLIP-ResNet50으로 점수와 히트맵을 예측해 Gemini 피드백을 제공한다.
