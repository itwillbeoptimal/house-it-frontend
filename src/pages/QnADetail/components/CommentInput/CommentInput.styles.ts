import styled from '@emotion/styled';

export const Container = styled.div`
  position: sticky;
  display: flex;
  align-items: center;
  bottom: 0;
  padding: 16px 20px;
  margin: 0 -20px -20px -20px;
  gap: 8px;
  background-color: white;
  border-top: 1px solid ${(props) => props.theme.COLORS.GRAY[2]};
`;

export const CommentTextarea = styled.textarea`
  flex: 1;
  min-height: 36px;
  max-height: 100px;
  padding: 8px 12px;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[2]};
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.4;
  resize: none;

  &:focus {
    border-color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  }

  &::placeholder {
    color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
  }
`;

export const SendButton = styled.button`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 36px;
  background-color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  border-radius: 18px;

  &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }
`;
