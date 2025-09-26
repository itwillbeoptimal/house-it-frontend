import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100dvh;
`;

export const TabWrapper = styled.div`
  position: sticky;
  top: 72px;
  padding: 0 20px;
`;
export const ContentArea = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 20px 20px 20px;
`;

export const QnAList = styled.div`
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
  margin-bottom: 4px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-weight: 500;
  font-size: 16px;
`;

export const ActionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const CompleteFilter = styled.button`
  display: flex;
  align-items: center;
  padding: 0 4px;
  gap: 4px;
  font-weight: 500;
`;

export const MyQnAButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  font-weight: 500;

  & svg {
    fill: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  }
`;
