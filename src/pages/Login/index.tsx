import React from 'react';
import type { Provider } from '@/pages/Login/types/Provider';
import * as S from '@/pages/Login/Login.styles';
import LogoSVG from '@/assets/logo.svg?react';
import { SOCIAL_LOGIN_OPTIONS } from '@/pages/Login/constants';

const Login: React.FC = () => {
  const handleLoginClick = (provider: Provider) => {
    let returnTo = new URLSearchParams(window.location.search).get('returnTo');

    if (!returnTo) {
      const { referrer } = document;
      const currentOrigin = window.location.origin;

      if (referrer && referrer.startsWith(currentOrigin)) {
        const referrerUrl = new URL(referrer);
        returnTo = referrerUrl.pathname + referrerUrl.search;
      } else {
        returnTo = '/';
      }
    }

    window.location.href = `${import.meta.env.VITE_SERVER_URL}/oauth2/authorization/${provider}?returnTo=${encodeURIComponent(returnTo)}`;
  };

  return (
    <S.Container>
      <S.Content>
        <S.LogoWrapper>
          <LogoSVG />
        </S.LogoWrapper>
        <S.GuideText>로그인하고 다양한 서비스를 이용해 보세요.</S.GuideText>
      </S.Content>
      <S.ButtonsWrapper>
        <S.SpeechBubble>5초 만에 가입할 수 있어요!</S.SpeechBubble>
        {SOCIAL_LOGIN_OPTIONS.map(
          ({ provider, icon: Icon, label, backgroundColor, color }) => (
            <S.SocialLoginButton
              key={provider}
              backgroundColor={backgroundColor}
              color={color}
              onClick={() => handleLoginClick(provider)}
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
