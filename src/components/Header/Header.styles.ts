import styled from '@emotion/styled';

export const Container = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 768px;
  height: 72px;
  padding: 20px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.COLORS.BACKGROUND};
  z-index: 10;
`;

export const LogoButton = styled.button``;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
  margin-right: 16px;
`;

export const MyButton = styled.button``;
