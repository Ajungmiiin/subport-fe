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

| 온보딩 | 구독 등록 | 커스텀 멤버십 |
|:-:|:-:|:-:|
| <img width="240" src="https://github.com/user-attachments/assets/bea1e171-d2f3-4757-81c4-b1d68562800c" /> | <img width="240" src="https://github.com/user-attachments/assets/f4ab51d2-0d35-4e3e-8ed6-97296e866558" /> | <img width="240" src="https://github.com/user-attachments/assets/862239b5-c441-4de8-988e-b9a0a3c6cbe7" /> |

| 구독 일정 캘린더 | 비활성화 · 재활성화 | 더치페이 |
|:-:|:-:|:-:|
| <img width="240" src="https://github.com/user-attachments/assets/88c63e3d-6b38-46db-a718-98b9bcae7da2" /> | <img width="240" src="https://github.com/user-attachments/assets/11cb75bd-a385-4948-88e2-da0672331406" /> | <img width="240" src="https://github.com/user-attachments/assets/0eee4b4d-2836-46f3-be0d-048e2fc6c822" /> |

## :books: 기술 스택

| 구분 | 사용 기술 |
|---|---|
| Core | React 19 · TypeScript · Vite · React Router |
| State / Data | TanStack Query · Zustand · Axios |
| Form | React Hook Form · Zod |
| UI | Tailwind CSS v4 · shadcn/ui · Lucide · react-day-picker · react-mobile-picker |
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

