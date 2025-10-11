import type { Provider } from '@/pages/Login/types/Provider';
import KakaoIcon from '@/assets/icons/kakao.svg?react';
import NaverIcon from '@/assets/icons/naver.svg?react';

// eslint-disable-next-line import/prefer-default-export
export const SOCIAL_LOGIN_OPTIONS = [
  {
    provider: 'kakao' as Provider,
    icon: KakaoIcon,
    label: '카카오 로그인',
    backgroundColor: '#fee500',
    color: 'rgba(0, 0, 0, 0.85)',
  },
  {
    provider: 'naver' as Provider,
    icon: NaverIcon,
    label: '네이버 로그인',
    backgroundColor: '#03c75a',
    color: 'white',
  },
];
