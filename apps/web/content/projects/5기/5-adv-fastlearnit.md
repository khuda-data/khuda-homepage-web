---
title: FastLearnIt: IT/소프트웨어 강의 통합 검색 사이트
generation: 5기
type: 심화
tracks: 데이터엔지니어링
searchTracks: 데이터 분석
tags: Airflow, Spark, OpenSearch, FastAPI, 크롤링
summary: Airflow로 여러 플랫폼 강의를 주기적으로 수집하고 Spark로 처리해 OpenSearch로 통합 검색을 제공하는 사이트
thumbnail: 5-adv-fastlearnit.jpg
github: https://github.com/khuda-data/5th-DE-Integrated-Search-Website-for-Spark-based-IT-Software-Courses
---

IT 강의 플랫폼이 많아져 강의를 고르기 어렵다는 문제를 다뤘다. Airflow DAG로 신규 강의는 주 1회, 전체 강의는 월 1회 크롤링하고 Spark로 정제한 데이터를 OpenSearch에 색인해 Flutter 웹사이트에서 검색하게 했다.
