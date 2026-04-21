<img width="1920" height="1080" alt="KakaoTalk_20260401_023903613_01" src="https://github.com/user-attachments/assets/60b7c224-1b5a-4917-86ba-781a40c2e940" />

# :computer: 프로젝트 소개
## Subport 
섭포트는 여러 구독 서비스를 한 곳에서 등록하고, 결제 일정과 월간 지출, 리마인더 설정까지 관리할 수 있는 모바일 중심 구독 관리 서비스 입니다

## 서비스 도메인
<a href='https://subport.site' target="_blank">Subport</a>

## ✨ 주요 기능

- 게스트 로그인 및 카카오 로그인
- 구독 서비스 검색 및 등록
- 커스텀 구독 서비스 직접 생성
- 서비스별 플랜 추가, 수정, 삭제 기능
- 사용자가 등록한 구독 상세 조회
- 구독 플랜 변경, 더치페이 수정, 메모 수정
- 구독 비활성화, 삭제, 재활성화
- 캘린더 기반 결제 일정 및 지출 조회
- 월간 구독 지출 요약 카드
- 마이페이지, 계정 수정, 리마인더 설정
- FAQ 및 사용자 피드백 제출

## :books: 기술 스택

### Core

- React 19
    - 섭포트는 로그인 후 이용 할 수 있는 서비스이기 때문에 <br/>
     **초기 SEO 대응 보다 로그인 이후 사용자 경험 개선 및 복합적인 상태 변화 등 사용자 인터랙션이 더 중요한 서비스** 라고 생각하여 SPA 구조를 선택했습니다
- TypeScript
    - 구독, 플랜, 일정, 사용자 정보 등 다루는 **데이터 구조를 일관되게 관리**하고 **API 응답과 폼 값의 타입 안정성**을 위해 타입스크립트를 도입했습니다
- Vite
- React Router

### State / Data

- TanStack Query
  - **UI 상태와 서버 상태를 분리**하고, 로딩 & 캐싱 및 mutation 이후 **데이터 갱신을 일관된 패턴**으로 처리 할 수 있어 **API 연동의 복잡성**을 줄이는 데에 적합하다고 생각했습니다
- Zustand
  - **보일러 플레이트 코드가 적고** 러닝커브가 낮아 프로젝트 규모 대비 빠르게 도입하여 **단순한 상태 구조를 유지**하기에 적합하다고 생각하여 Zustand를 활용했습니다
- Axios

### Form / Validation

- React Hook Form
  - 구독 등록, 플랜 관리, 리마인더 설정 등 **입력 필드와 조건부 필드가 많은 화면을 효율적으로 관리**하기 위하여 선택했으며, 입력 & 에러 상태 등을 비교적 **단순한 구조**로 관리 할 수 있었습니다
- Zod
  - **폼 마다 다른 입력 규칙을 UI 로직과 분리**하고, 검증 규칙을 명확한 **스키마 형태**로 관리하기 위해 선택했습니다 RHF과 함께 사용했을 때 **조건부 입력 검증 및 타입 추론**까지 이어져 폼의 복잡도를 낮추는 데 도움이 됐습니다
- `@hookform/resolvers`

### UI

- Tailwind CSS v4
- Shadcn/UI
- Lucide React
- react-mobile-picker
- react-day-picker

## :bulb: 아키텍처 포인트

### 1. 도메인 중심 구조
처음 개발을 진행하며 폴더 구조를 `Layered structure` 로 진행했습니다, 추후 기능이 하나씩 붙으며 효율적인 관리를 위해 리팩토링을 진행하며,<br/>
기능 기준으로 `auth`, `account`, `subscription`, `subport` 도메인을 나누고, 구독 도메인은 다시 `services`, `plans`, `schedule`, `user-subscription`으로 세분화했습니다.

```text
src
├─ components
├─ domains
│  ├─ account
│  ├─ auth
│  ├─ subport
│  └─ subscription
│     ├─ pages
│     ├─ plans
│     ├─ schedule
│     ├─ services
│     └─ user-subscription
├─ routes
├─ shared
│  ├─ api
│  ├─ constants
│  ├─ form
│  ├─ lib
│  ├─ providers
│  └─ types
└─ hooks
```

### 2. 상태 분리 전략

- 서버 상태: React Query
- 인증 및 일시적 선택 상태: Zustand
- 라우트 필터/캘린더 상태: URL Search Params

이렇게 역할을 분리해 상태 복잡도를 낮추고, mutation 이후 캐시 갱신 범위를 명확하게 관리했습니다.

## 실행 방법

### 1. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 만들고 아래 값을 설정합니다.

```env
VITE_API_URL=YOUR_API_SERVER_URL
```

### 2. 패키지 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

## 스크립트

```bash
npm run dev
npm run build
npm run build:analyze
```

- `build:analyze`: Rollup Visualizer를 통해 번들 시각화 리포트를 생성합니다.
- 분석 결과 파일은 `dist/stats.html`에 생성됩니다.

## :exclamation: 구현하면서 집중한 부분

### 인증 전환 UX

- 게스트 로그인 제공
- 로그인 유도 모달에서 세션 스토리지를 활용하여 redirect 경로 저장
- 로그인 성공 후 기존 사용자 흐름으로 복귀
- 로컬 스토리지를 활용하여 첫 로그인 온보딩 및 피드백 유도 팝업 노출 상태 관리

### 복합 폼 구조화

- 구독 등록
- 플랜 생성/수정
- 계정 수정
- 리마인더 설정
- 피드백 작성

폼의 종류가 많고 규칙이 달랐기 때문에, React Hook Form + Zod 조합으로 입력 상태와 검증 규칙을 일관되게 구성했습니다.

## :bar_chart: 번들 최적화

번들 최적화 전에는 메인 엔트리 청크가 하나로 크게 묶여 있었고, 일부 큰 SVG 자산이 JS 번들에 포함되면서 초기 로드 비용이 컸습니다.

### 적용한 최적화

- 큰 SVG 자산 정리 및 이미지 자산 재검토
- 페이지 단위 lazy loading 적용
- 공통 의존성 청크 분리
- 번들 시각화 도구 추가

### 결과

최신 로컬 빌드 기준:

- 메인 엔트리 JS: `2.92MB -> 355.58KB`
- 메인 엔트리 청크 약 `87.8%` 감소
- 전체 출력 JS 합계: `2.92MB -> 1.20MB`

분석 방법:

```bash
npm run build:analyze
```

생성된 [stats.html](./dist/stats.html)에서 청크 구성과 큰 모듈을 시각적으로 확인할 수 있습니다.

<table>
  <tr>
    <td align="center"><strong>최적화 전</strong></td>
    <td align="center"><strong>최적화 후</strong></td>
  </tr>
  <tr>
    <td align="center">
      <img width="500" alt="최적화 전" src="https://github.com/user-attachments/assets/47041717-f77d-4bb9-b61f-93b61123b286" />
    </td>
    <td align="center">
      <img width="500" alt="최적화 후" src="https://github.com/user-attachments/assets/75f699d1-ace0-4e8e-ad5a-bb9c31758062" />
    </td>
  </tr>
</table>
