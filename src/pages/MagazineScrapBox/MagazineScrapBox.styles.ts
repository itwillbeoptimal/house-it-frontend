import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 20px;
`;

export const ContentArea = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const MagazineGrid = styled.div`
  display: grid;
  align-content: start;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

export const EmptyState = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const EmptyMessage = styled.p`
  margin-bottom: 4px;
  color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
  font-weight: 500;
  font-size: 16px;
`;

export const ObserverTrigger = styled.div`
  height: 20px;
  visibility: hidden;
`;
