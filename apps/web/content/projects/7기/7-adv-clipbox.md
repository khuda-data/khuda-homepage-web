---
title: ClipBox: AI 기반 사고 탐지 블랙박스 임베디드 시스템
generation: 7기
type: 심화
tracks: CV
searchTracks: CV
tags: ResNet18, LSTM, YOLO, face_recognition, 사고 영상 분류
summary: 주행 영상에서 사고 구간을 자동 탐지해 번호판·얼굴을 블러 처리한 뒤 업로드하는 AI 블랙박스 시스템
thumbnail: 7-adv-clipbox.jpg
---

사고 차량 블랙박스만으로는 사각지대·영상 손상 한계가 있어, 주변 차량이 사고 장면을 자동 확보·공유하도록 했다. 100프레임 슬라이딩 윈도우에 ResNet18+LSTM 분류로 사고 구간을 추출하고, 얼굴·번호판을 블러 처리해 웹에 업로드한다.
