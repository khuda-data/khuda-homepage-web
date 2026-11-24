---
title: 스팀엔진: 스팀 기반 멀티 게임 매칭 건강도 실시간 모니터링
generation: 8기
type: 심화
tracks: 데이터엔지니어링
searchTracks: 데이터 분석
tags: Steam API, DuckDB, 대기행렬 이론, Little's Law, 실시간 대시보드
summary: Steam API 실시간 동시 접속자 수에 대기행렬 이론을 적용해 게임별 매칭 건강도를 산출하고 대시보드로 보여 주는 파이프라인
thumbnail: 8-adv-steam-matching-health.jpg
github: https://github.com/khuda-data/8th-DE-SteamQueue
---

매칭 대기 시간이 길다는 불만이 많지만 매칭이 활발한지 미리 알 방법이 없다는 문제를 다뤘다. 7개 게임의 동시 접속자 수에 서버·모드·실력 비율을 반영한 대기행렬 알고리즘으로 점수를 산출하고 대시보드로 시각화했다.
