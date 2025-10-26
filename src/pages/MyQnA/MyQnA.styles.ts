import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 20px;
`;

export const QnAList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const EmptyState = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const EmptyMessage = styled.p`
  margin-bottom: 4px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-weight: 500;
  font-size: 16px;
`;

export const ObserverTrigger = styled.div`
  height: 20px;
  visibility: hidden;
`;
