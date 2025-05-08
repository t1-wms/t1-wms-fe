# StockHolmes · 2025.01

**StockHolmes**는 현대 오토에버 모빌리티 SW 스쿨에서 진행한 WMS 구현 프로젝트로, 물건의 입고부터 적재, 출고까지의 관리 기능을 구현한 웹 서비스입니다.

[시연 영상](https://www.youtube.com/watch?v=wmSj0Zu8gxI&ab_channel=churrr)

[발표 자료](https://drive.google.com/file/d/1qZmcSrtbDsrPPBN2-yYEI0KVGlaaT1C8/view?usp=sharing)

(※ 현재는 배포되지 않은 프로젝트입니다.)

## 😀 개발 인원

| 이름 | 역할 | 연락처 |
| --- | --- | --- |
| 박상연 | FE | [dhkdwk1041@gmail.com](mailto:dhkdwk1041@gmail.com) |
| 김대호 | FE | [DHowor1d](https://github.com/DHowor1d) |
| 안준수 | BE | [junsoo1003](https://github.com/junsoo1003) |
| 남종식 | BE | [N-jongsik](https://github.com/N-jongsik) |
| 이주희 | BE | [ejoohee](https://github.com/ejoohee) |
| 이윤주 | BE | [glowju013](https://github.com/glowju013) |

## 🛠 프로젝트 기술 스택

- **프론트엔드**:
    - WMS: React.js, css module, typescript, axios, tanstack query, zustand
    - 작업자 앱: React.js, PWA, typescript, tailwind
- **백엔드**: Spring Boot, Spring Data JPA, MySQL, redis
- **배포**: AWS (EC2, S3, RDS, Route 53), Docker, Jenkins

## ✏️ Issue

### Suspense + Error Boundary 설계

StockHolmes 프로젝트에서는 UI/UX의 높은 반응성을 프론트엔드의 핵심 목표로 삼았기 때문에, UI 기획 단계에서부터 Suspense와 ErrorBoundary 영역을 미리 설계했습니다.

<img width="1236" alt="스크린샷 2025-05-08 오후 1 34 05" src="https://github.com/user-attachments/assets/65eea585-3745-44d6-9388-fe549fc6686e" />

### nivo 패키지의 번들 사이즈 문제

차트 구현을 위해 Nivo 패키지를 사용했는데, 이로 인해 번들 사이즈가 약 1,000KB까지 증가했습니다. 이를 최적화하기 위해 Nivo를 사용하는 컴포넌트를 lazy import 방식으로 분리하여, 번들 사이즈를 약 500KB까지 줄일 수 있었습니다.

<img width="497" alt="스크린샷 2025-05-08 오후 1 38 15" src="https://github.com/user-attachments/assets/4dd42ac0-57aa-465c-8b6f-eaed305d29bc" />


