---
title: 전월세 통합 가격 지표 기반 대학생 주거 매물 적정성 예측 모델
generation: 9기
type: 토이
tracks: 토이 프로젝트
searchTracks: 토이 프로젝트
tags: DBSCAN, Random Forest, Optuna, Stacking Ensemble, 공공데이터
summary: 전세·월세를 통합한 가격 지표와 위치 기반 클러스터링 피처로 대학생 주거 매물의 적정 가격을 예측한 모델
thumbnail: 9-toy-student-housing-price.jpg
---

대학가 월세는 오르는데 매물 상태는 기대에 못 미친다는 문제에서 출발해 적정 가격을 판단하려 했다. 전월세를 단일 가격 지표로 환산하고 2,200여 개 좌표를 DBSCAN으로 34개로 압축한 뒤, Random Forest로 실매물의 적정성을 판정했다.
