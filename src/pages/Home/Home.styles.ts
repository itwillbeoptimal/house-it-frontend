import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const SectionTitle = styled.h2`
  padding: 32px 20px 0 20px;
  font-weight: 700;
  font-size: 18px;
`;

export const SectionDescription = styled.div`
  padding: 2px 20px 0 20px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
`;
