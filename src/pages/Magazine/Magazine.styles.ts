import styled from '@emotion/styled';

interface ContainerProps {
  backgroundColor?: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100dvh;
  padding: 0 20px 20px 20px;
  background-color: ${({ backgroundColor }) => backgroundColor || 'inherit'};
`;

export const TabWrapper = styled.div`
  position: sticky;
  top: 72px;
`;

export const ContentArea = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
`;

export const MagazineGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const EmptyState = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const EmptyMessage = styled.p`
  color: ${({ theme }) => theme.COLORS.LABEL.TERTIARY};
  font-size: 16px;
`;
