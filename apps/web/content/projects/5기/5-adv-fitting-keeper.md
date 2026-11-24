---
title: Fitting Keeper: 금융 전략 과적합 경고 대시보드
generation: 5기
type: 심화
tracks: 금융
searchTracks: 금융
tags: GMM, Geometric Brownian Motion, MCMC, Likelihood Ratio Test, 백테스트
summary: IS/OS 기간 시장 변화를 GMM 군집화와 GBM·MCMC·우도비검정으로 비교해 투자 전략의 과적합을 경고하는 대시보드
thumbnail: 5-adv-fitting-keeper.jpg
github: https://github.com/khuda-data/5th-FM-Fitting-Keeper
---

IS/OS 기간을 나눠 검증해도 투자 전략이 결국 과적합될 수 있다는 문제를 다뤘다. 두 기간의 시장을 GMM 분포 수로 비교하고, GBM 모델 파라미터를 MCMC로 추정해 우도비검정으로 시장 변화가 유의한지 판단한 뒤 경고하는 대시보드를 만들었다.
