import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 20px 20px 20px;
`;

export const WriteButton = styled.button`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: calc(env(safe-area-inset-bottom) + 92px);
  right: max(12px, calc((100vw - 480px) / 2 + 12px));
  width: 48px;
  height: 48px;
  background-color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  border-radius: 50%;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);

  & svg {
    width: 20px;
    height: 20px;
  }
`;
