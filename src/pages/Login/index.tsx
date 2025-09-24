import React from 'react';
import * as S from '@/pages/Login/Login.styles';
import LogoSVG from '@/assets/logo.svg?react';
import KakaoIcon from '@/assets/icons/kakao.svg?react';
import NaverIcon from '@/assets/icons/naver.svg?react';

const SOCIAL_LOGIN_OPTIONS = [
  {
    id: 'kakao',
    icon: KakaoIcon,
    label: '카카오 로그인',
    backgroundColor: '#fee500',
    color: 'rgba(0, 0, 0, 0.85)',
  },
  {
    id: 'naver',
    icon: NaverIcon,
    label: '네이버 로그인',
    backgroundColor: '#03c75a',
    color: 'white',
  },
];

const Login: React.FC = () => {
  return (
    <S.Container>
      <S.Content>
        <S.Catchphrase>생활에서 생기는 모든 질문의 답</S.Catchphrase>
        <S.LogoWrapper>
          <LogoSVG />
        </S.LogoWrapper>
      </S.Content>
      <S.ButtonsWrapper>
        {SOCIAL_LOGIN_OPTIONS.map(
          ({ id, icon: Icon, label, backgroundColor, color }) => (
            <S.SocialLoginButton
              key={id}
              backgroundColor={backgroundColor}
              color={color}
            >
              <Icon />
              {label}
            </S.SocialLoginButton>
          ),
        )}
      </S.ButtonsWrapper>
    </S.Container>
  );
};

export default Login;
