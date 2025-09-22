import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  padding: 0 20px;
  gap: 16px;
  background-color: ${(props) => props.theme.COLORS.BACKGROUND};
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const TabButton = styled.button<{ active?: boolean }>`
  flex-shrink: 0;
  padding: 8px;
  border-bottom: ${(props) =>
    props.active ? `2px solid ${props.theme.COLORS.LABEL.PRIMARY}` : 'none'};
  color: ${(props) =>
    props.active
      ? props.theme.COLORS.LABEL.PRIMARY
      : props.theme.COLORS.LABEL.TERTIARY};
  font-size: 14px;
  font-weight: ${(props) => (props.active ? 600 : 400)};
`;
