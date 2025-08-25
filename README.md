# 🎵 Koalnu Spotify Demo

React(19)와 TypeScript 기반으로 구현한 Spotify 클론 웹 애플리케이션입니다.  
Spotify Web API를 활용해 **음악 검색, 프로필 조회, 플레이리스트 관리** 등의 기능을 제공합니다.  

⚠️ **주의사항**
- Spotify API 제한에 따라 실제 음악 재생은 지원하지 않으며, **검색 및 플레이리스트 관리 기능까지만 포함**됩니다.
- 현재 로그인은 Spotify Developer Dashboard에 등록된 계정만 가능합니다. 따라서 일반 방문자는 로그인 후 플레이리스트 조회 기능을 바로 체험할 수 없습니다.

🚧 추후 업데이트 예정:
- Demo Mode 제공 (모의 데이터 기반으로 동일한 기능 체험 가능)

---

## 🚀 Live Demo
**[🔗 배포된 사이트 보기](https://ksy-spotify-demo.netlify.app/)**

---

## 📋 프로젝트 개요

### 🎯 프로젝트 목표
본 프로젝트는 **Spotify Web API 연동**을 통해 실제 서비스 개발에서 자주 요구되는  
- 인증 처리  
- 전역/서버 상태 관리  
- 데이터 캐싱  
- 반응형 UI 설계  

등을 경험하는 것을 목적으로 합니다.

### 💡 핵심 가치
- **실제 API 연동**: Spotify OAuth2 (Client Credentials + PKCE) 및 Web API 활용  
- **사용자 중심 설계**: 직관적인 UI/UX와 모바일 반응형 레이아웃  
- **유지보수성과 확장성**: TypeScript 및 모듈화 구조 적용  
- **성능 최적화**: React Query 기반 캐싱 & 무한 스크롤 구현  

---

## 🛠 기술 스택

### Frontend
- React 19 (최신 안정/실험 기능 기반)  
- TypeScript  
- React Router v7 – SPA 라우팅  
- MUI (Material-UI 7) – UI 라이브러리  
- Zustand – 인증 및 클라이언트 전역 상태 관리  
- React Query (Tanstack v5) – 서버 상태 관리 & 데이터 캐싱  

### 빌드 & 개발 환경
- Webpack 5 + Babel – 모던 프론트엔드 번들링 환경  
- ESLint + Prettier – 코드 품질 및 스타일 관리  
- Netlify – CI/CD 자동 배포  

### API
- **Spotify Web API**  
  - 음악/아티스트/앨범 검색  
  - 사용자 프로필 조회  
  - 플레이리스트 생성 및 관리  

---

## ✨ 주요 기능

### 🔐 보안 및 인증
OAuth2 기반 **이중 플로우** 적용  

- **Client Credentials Flow**  
  - 공개 데이터(일부 음악/메타데이터 조회) 요청 시 사용  
  - 원래는 서버-사이드 용도가 일반적이나, 학습 목적상 클라이언트에서도 토큰 발급 로직 구현  

- **Authorization Code Flow with PKCE**  
  - 사용자 프로필/플레이리스트 접근 시 사용  
  - `code_verifier` + `code_challenge` 기반으로 토큰 교환  
  - `refresh_token` 발급 가능 (⚠️ 현 버전에서는 자동 갱신 로직 미구현)  

#### 토큰 저장 전략
- 현재: `Zustand + persist`로 access_token을 LocalStorage에 저장 → 새로고침 시 로그인 유지  
- ⚠️ 한계: LocalStorage는 XSS 공격에 취약  
- 🚀 개선 방향:  
  - `access_token`은 메모리 기반으로 관리  
  - `refresh_token`은 **HttpOnly Secure Cookie**로 저장하여 보안 강화  

---

## 📊 상태 관리 패턴
- **Zustand**  
  - 사용자 인증 및 로그인 상태 관리  
  - Persist 미들웨어로 상태를 LocalStorage에 유지  
  - ⚠️ 개선 포인트: 민감한 토큰 저장은 cookie 기반으로 전환 필요  

- **React Query**  
  - Spotify API 데이터 캐싱 & 비동기 상태 관리  

- **혼합 전략**  
  - 공개 데이터 조회 → Client Credentials Flow + React Query 훅(`useClientCredentialToken`)  
  - 사용자 데이터 접근 → PKCE Flow + Zustand  
  - 이원화 구조로 서버 상태와 클라이언트 상태를 명확히 분리  

---

## 📱 UI/UX 주요 특징
- 반응형 그리드 시스템 (MUI Grid)  
- 무한 스크롤 (Intersection Observer + `useInfiniteQuery`)

---

## 🏗 프로젝트 구조
```
koalnu-spotify-demo/
├── src/
│   ├── apis/      # Spotify API 통신 모듈
│   ├── common/    # 공통 UI 컴포넌트
│   ├── hooks/     # 커스텀 훅
│   ├── layout/    # 레이아웃 컴포넌트
│   ├── models/    # 타입 정의 (TS Interfaces)
│   ├── pages/     # 라우팅 단위 페이지
│   ├── store/     # Zustand 전역 상태
│   └── utils/     # 공용 유틸 함수
```


---

## 🔧 기술적 설계 포인트

### 상태 관리 전략
- **Zustand** → 인증/클라이언트 상태 관리  
- **React Query** → API 데이터 캐싱/페칭 최적화  
- 서버 상태와 클라이언트 상태를 명확히 분리  

### 퍼포먼스 최적화
- React Query `staleTime` 활용  
- `React.memo` / `useCallback`으로 불필요 렌더링 방지  
- Intersection Observer 기반 무한 스크롤  

### 보안 고려
- PKCE + Authorization Code Flow로 사용자 데이터 인증  
- Client Credentials Flow는 **공용 데이터 조회용으로 한정**  
- CSRF 방지를 위한 `state` parameter 사용  
- ⚠️ 현재는 LocalStorage 기반 토큰 저장 → 학습용 구조  
- 🚀 실제 서비스에서는 Refresh Token + HttpOnly Cookie 기반 관리로 보안성 강화  

---

## ⭐ 프로젝트 가치
이 프로젝트는 실제 서비스 수준에서 흔히 발생하는  
**"API 연동, 인증, 상태 관리, 반응형 UI"** 문제를 학습하고 검증하는 앱입니다.

---
