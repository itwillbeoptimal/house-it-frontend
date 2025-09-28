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

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
`;

export const Title = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 600;
  font-size: 18px;
`;
