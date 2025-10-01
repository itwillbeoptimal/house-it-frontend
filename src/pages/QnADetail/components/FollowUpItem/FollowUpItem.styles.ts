import styled from '@emotion/styled';

export const FollowUpContainer = styled.div`
  padding: 16px 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[1]};
  }
`;

export const QuestionSection = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
`;

export const QuestionContent = styled.div`
  flex: 1;
`;

export const QuestionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
`;

export const AIBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  margin-right: -4px;
  background: linear-gradient(135deg, #b721ff 0%, #21d4fd 100%);
  border-radius: 12px;
  color: white;
  font-size: 10px;
  font-weight: 500;
`;

export const QuestionText = styled.div`
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
`;

export const AnswerSection = styled.div`
  margin-left: 48px;
  padding: 16px;
  background-color: ${(props) => props.theme.COLORS.GRAY[0]};
  border-radius: 8px;
`;

export const AnswerHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  gap: 8px;
`;

export const AnswerText = styled.div`
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
`;

export const PendingAnswer = styled.div`
  margin-left: 48px;
  padding: 12px;
  background-color: ${(props) => props.theme.COLORS.GRAY[0]};
  border-radius: 8px;
  border-left: 3px solid ${(props) => props.theme.COLORS.GRAY[3]};
  color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
  font-size: 14px;
  text-align: center;
`;
