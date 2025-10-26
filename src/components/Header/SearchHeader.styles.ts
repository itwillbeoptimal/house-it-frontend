import styled from '@emotion/styled';

export const Container = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 480px;
  height: 88px;
  padding: 20px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.COLORS.BACKGROUND};
  z-index: 10;
`;

export const BackButton = styled.button`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
`;
