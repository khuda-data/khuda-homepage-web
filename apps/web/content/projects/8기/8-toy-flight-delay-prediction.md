---
title: 기상 데이터 기반 항공편 결항 및 지연 예측 모델 개발
generation: 8기
type: 토이
tracks: 토이 프로젝트
searchTracks: 토이 프로젝트
tags: CatBoost, XGBoost, LightGBM, SHAP, 기상 데이터
summary: 제주공항 출발 항공편과 기상 데이터를 결합해 결항·지연을 예측하고 SHAP으로 주요 기상 요인을 해석한 모델
thumbnail: 8-toy-flight-delay-prediction.jpg
github: https://github.com/khuda-data/8th-ML-team4
---

결항 요인의 약 85%가 기상 악화라는 점에서 출발해 승객이 미리 대처할 수 있는 예측을 목표로 했다. 제주공항 출발편과 기상 데이터를 결합해 결항은 XGBoost(정확도 0.9462), 지연은 가중치를 준 LightGBM으로 예측했다.
