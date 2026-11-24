---
title: 영통방범대: 장애인 전용 주차구역 부정 이용 자동 감지 시스템
generation: 8기
type: 심화
tracks: CV
searchTracks: CV
tags: MediaPipe Pose, Gait 분석, LSTM, Multi-object Tracking, CCTV
summary: CCTV에서 하차 인원의 보행 특성을 포즈 추정과 LSTM으로 분류해 장애인 주차구역 부정 이용을 추정하는 시스템
thumbnail: 8-adv-disabled-parking-guard.jpg
github: https://github.com/khuda-data/8th-CV-DisabledParkingGuard
---

차량번호·표지 중심 단속으로는 보행상 장애인의 실제 탑승 여부를 알기 어렵다는 한계를 다뤘다. 하차 인원을 추적해 MediaPipe로 관절 좌표를 뽑고, 병적 보행 데이터로 학습한 LSTM으로 보행 특성을 분류하는 파이프라인을 구현했다.
