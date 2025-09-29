import styled from '@emotion/styled';

interface SocialLoginButtonProps {
  backgroundColor: string;
  color: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100dvh;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30dvh;
`;

export const GuideText = styled.p`
  margin-top: 16px;
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  letter-spacing: -0.05rem;
  white-space: pre-line;
`;

export const LogoWrapper = styled.div`
  & svg {
    width: 180px;
    height: 48px;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
  margin-bottom: 10dvh;
  gap: 12px;
`;

export const SpeechBubble = styled.div`
  position: relative;
  align-self: center;
  padding: 4px 16px;
  margin-bottom: 4px;
  background-color: white;
  border: 1px solid ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 8px;
    height: 8px;
    background-color: white;
    border-right: 1px solid ${(props) => props.theme.COLORS.MAIN.PRIMARY};
    border-bottom: 1px solid ${(props) => props.theme.COLORS.MAIN.PRIMARY};
    border-radius: 0 0 2px 0;
  }
`;

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
