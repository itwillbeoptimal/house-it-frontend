import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100dvh;
  padding: 0 64px 64px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  justify-content: flex-start;
  padding-top: 168px;
`;

export const Catchphrase = styled.h1`
  margin-bottom: 24px;
  font-family: Paperozi;
  font-weight: 400;
  font-size: 18px;
  text-align: center;
`;

export const LogoWrapper = styled.div`
  & svg {
    width: 196px;
    height: 52px;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 640px;
  gap: 16px;
`;

interface SocialLoginButtonProps {
  backgroundColor: string;
  color: string;
}

export const SocialLoginButton = styled.button<SocialLoginButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 8px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 12px;
  color: ${(props) => props.color};
  font-weight: 500;
  font-size: 16px;
`;
