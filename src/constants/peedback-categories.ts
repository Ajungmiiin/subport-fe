export const PEEDBACK_CATEGORIES = [
  {
    id: 'feature' as const,
    label: '기능 개선',
    options: [
      {
        id: 'feature-option-1',
        value: '새로운 구독 종류 추가',
      },
      {
        id: 'feature-option-2',
        value: '가격 표시 오류',
      },
      {
        id: 'feature-option-3',
        value: '알림 기능 개선',
      },
      {
        id: 'feature-option-4',
        value: '자동 분류 기능 개선',
      },
      {
        id: 'other',
        value: '기타 (직접입력)',
      },
    ],
  },
  {
    id: 'bug-report' as const,
    label: '버그/오류',
    options: [
      {
        id: 'bug-report-option-1',
        value: '서비스가 자주 느려지거나 멈춰요',
      },
      {
        id: 'bug-report-option-2',
        value: '특정 기능이 제대로 작동하지 않아요',
      },
      {
        id: 'bug-report-option-3',
        value: '데이터가 잘못 표시돼요',
      },
      {
        id: 'bug-report-option-4',
        value: '로그인/인증에 문제가 있어요',
      },
      {
        id: 'other',
        value: '기타 (직접입력)',
      },
    ],
  },
  {
    id: 'usability' as const,
    label: '사용성 불편',
    options: [
      {
        id: 'usability-option-1',
        value: '원하는 기능을 찾기 어려워요',
      },
      {
        id: 'usability-option-2',
        value: '사용 방법이 직관적이지 않아요',
      },
      {
        id: 'usability-option-3',
        value: '입력/수정이 번거로워요',
      },
      {
        id: 'other',
        value: '기타 (직접입력)',
      },
    ],
  },
  {
    id: 'category_other' as const,
    label: '기타',
  },
];
