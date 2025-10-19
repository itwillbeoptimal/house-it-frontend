import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 20px 20px 20px;
`;

export const QuestionNumber = styled.div`
  margin-bottom: 4px;
  color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  font-family: Paperozi;
  font-weight: 600;
`;

export const Question = styled.h1`
  margin-bottom: 20px;
  font-family: Paperozi;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.4;
  word-break: keep-all;
`;

export const AnswerGrid = styled.div<{ type: 'ox' | 'multiple' }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.type === 'ox' ? '1fr 1fr' : '1fr'};
  gap: 12px;
`;

export const AnswerButton = styled.button<{
  animate?: boolean;
  isOX?: boolean;
  isSelected?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 56px;
  padding: 16px 24px;
  background-color: ${(props) =>
    props.isSelected ? props.theme.COLORS.MAIN.TERTIARY : 'white'};
  border: ${(props) =>
    props.isSelected
      ? `1px solid ${props.theme.COLORS.MAIN.PRIMARY}`
      : `1px solid ${props.theme.COLORS.GRAY[2]}`};
  border-radius: 16px;
  color: ${(props) =>
    props.isSelected
      ? props.theme.COLORS.MAIN.PRIMARY
      : props.theme.COLORS.LABEL.SECONDARY};
  font-weight: ${(props) => (props.isSelected ? 500 : 400)};
  letter-spacing: -0.05rem;
  line-height: 20px;
  word-break: keep-all;
  transition: all 0.2s ease;
  animation: ${(props) => (props.animate ? shake : 'none')} 0.5s ease-in-out;
  ${(props) => props.isOX && 'aspect-ratio: 1 / 1;'}

  &:disabled {
    cursor: not-allowed;
  }
  
  & svg {
    width: 60%;
    height: 60%;
    fill: ${(props) =>
      props.isSelected
        ? props.theme.COLORS.MAIN.PRIMARY
        : props.theme.COLORS.LABEL.TERTIARY};
  }
}
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
`;
