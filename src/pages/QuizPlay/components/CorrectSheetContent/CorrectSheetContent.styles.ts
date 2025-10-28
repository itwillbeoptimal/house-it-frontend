import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 60dvh;
  padding-bottom: 20px;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 15px;
  line-height: 1.6;
  white-space: pre-line;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
  gap: 8px;
`;
