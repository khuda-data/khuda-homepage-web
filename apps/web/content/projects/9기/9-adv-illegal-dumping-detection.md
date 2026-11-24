---
title: CCTV 기반 쓰레기 무단투기 탐지
generation: 9기
type: 심화
tracks: CV
searchTracks: CV
tags: VideoMAE, Video Anomaly Detection, Grad-CAM, YOLO, BoT-SORT
summary: 공공 CCTV 영상에서 무단투기 행동의 발생 여부와 구간을 탐지하고 Grad-CAM으로 판단 근거를 시각화하는 이상행동 탐지 모델
thumbnail: 9-adv-illegal-dumping-detection.jpg
github: https://github.com/khuda-data/9th-CV-team1
---

기존 객체 탐지 기반 단속은 오탐이 잦아 관리 인력이 확인할 영상이 늘어나는 문제가 있다. 1,440개 영상에서 11,866개 클립을 만들어 VideoMAE를 클립·프레임 이중 헤드로 파인튜닝했고, 투기 여부와 의심 구간을 함께 출력한다.
