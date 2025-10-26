import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[1]};
  }
`;

export const Content = styled.div`
  flex: 1;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
  margin-bottom: 6px;
`;

export const CommentText = styled.div`
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
`;
