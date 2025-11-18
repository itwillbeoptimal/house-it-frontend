import styled from '@emotion/styled';

export const FollowUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  gap: 16px;

  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[1]};
  }
`;

export const QuestionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 16px;
  margin-right: 24px;
  background-color: ${(props) => props.theme.COLORS.GRAY[0]};
  border-left: 4px solid ${(props) => props.theme.COLORS.MAIN.SECONDARY};
`;

export const AnswerSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 12px 16px;
  margin-left: 24px;
  background-color: ${(props) => props.theme.COLORS.GRAY[0]};
  border-right: 4px solid ${(props) => props.theme.COLORS.MAIN.SECONDARY};
`;

export const Comment = styled.div`
  margin-bottom: 4px;
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
`;
