---
title: 가성비 맛집 추천 시스템
generation: 7기
type: 토이
tracks: 토이 프로젝트
searchTracks: 토이 프로젝트
tags: XGBoost, Word2Vec, Selenium, Streamlit, RFECV
summary: 네이버 지도 데이터를 크롤링해 XGBoost로 가성비 점수를 예측하고 Word2Vec 메뉴 검색을 붙인 맛집 추천 대시보드
thumbnail: 7-toy-value-restaurants.jpg
github: https://github.com/khuda-data/7th-ML-team3
---

네이버 지도 별점의 신뢰도가 낮아 가성비 좋은 식당을 찾기 어렵다는 문제에서 출발했다. 크롤링한 식당 데이터로 XGBoost 가성비 점수 모델(R² 0.7182)을 만들고, Word2Vec 메뉴 벡터로 유사 메뉴를 검색하는 대시보드를 구현했다.
