import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 20px 20px 20px;
  overflow-y: auto;
`;

export const WarningSection = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const WarningTitle = styled.h2`
  margin-bottom: 16px;
  font-weight: 600;
  font-size: 16px;
`;

export const WarningList = styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: 8px;
  gap: 20px;
`;

export const WarningItem = styled.li`
  position: relative;
  padding-left: 16px;
  line-height: 1.5;

  &::before {
    content: '•';
    position: absolute;
    left: 0;
  }
`;

export const AgreementSection = styled.section`
  margin-bottom: 24px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-top: auto;
  padding-top: 24px;
`;
