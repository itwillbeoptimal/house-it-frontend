import styled from '@emotion/styled';

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 88px 0 calc(80px + env(safe-area-inset-bottom)) 0;
`;
