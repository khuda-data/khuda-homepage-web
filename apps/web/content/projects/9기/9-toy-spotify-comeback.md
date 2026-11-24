---
title: Spotify 데이터 기반 역주행 곡의 특징 추출 및 역주행 가능성 예측
generation: 9기
type: 토이
tracks: 토이 프로젝트
searchTracks: 토이 프로젝트
tags: Spotify API, 로지스틱 회귀, LightGBM, SMOTE, PR-AUC
summary: Spotify 일간 차트와 오디오 특성으로 역주행 곡을 라벨링하고 발매 초반 정보로 역주행 가능성을 예측한 분석
thumbnail: 9-toy-spotify-comeback.jpg
---

발매 초기에 실패한 곡이 뒤늦게 차트에 오르는 역주행을 미리 알아볼 수 있는지 검증했다. 3년치 일간 차트로 초기·후기 성과를 나눠 라벨을 정의하고, 오디오 피처로 로지스틱 회귀(SMOTE)와 LightGBM을 PR-AUC 기준으로 비교했다.
