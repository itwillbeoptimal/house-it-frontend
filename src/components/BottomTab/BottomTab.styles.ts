import styled from '@emotion/styled';

export const TabItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const IconContainer = styled.div`
  display: flex;
  height: 32px;
  align-items: center;

  & svg {
    height: 32px;
  }
`;

export const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 768px;
  padding-bottom: env(safe-area-inset-bottom);
  margin: 0 auto;
  background-color: white;
  border-top: 1px solid ${(props) => props.theme.COLORS.GRAY[1]};
`;

export const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 80px;
  padding: 0 8px;
`;
