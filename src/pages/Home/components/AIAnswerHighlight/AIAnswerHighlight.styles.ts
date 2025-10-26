import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const rotateGradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const Container = styled.div`
  padding-top: 16px;
  padding-left: 20px;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CardList = styled.div`
  display: flex;
  gap: 16px;

  &::after {
    content: '';
    width: 4px;
    flex-shrink: 0;
  }
`;

export const Card = styled.article`
  position: relative;
  flex-shrink: 0;
  width: 280px;
  padding: 1px;
  background: linear-gradient(270deg, #6a11cb, #80d0ff, #2575fc, #6a11cb);
  background-size: 400% 400%;
  border-radius: 16px;
  cursor: pointer;
  animation: ${rotateGradient} 8s ease infinite;
`;

export const CardInner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 24px;
  background-color: white;
  border-radius: 15px;
`;

export const AIBadge = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  gap: 4px;
  padding: 4px 8px;
  margin-bottom: 4px;
  background: linear-gradient(135deg, #80d0ff, #2575fc, #6a11cb);
  background-size: 175% 175%;
  border-radius: 12px;
  color: white;
  font-family: Paperozi;
  font-size: 10px;
  font-weight: 700;
  animation: ${rotateGradient} 4s ease infinite;
`;

export const Question = styled.h3`
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 15px;
  text-align: justify;
  line-height: 1.5;
  color: ${(props) => props.theme.COLORS.LABEL.PRIMARY};
`;

export const AnswerWrapper = styled.div`
  position: relative;
  flex: 1;
  margin-bottom: 16px;
`;

export const Answer = styled.p`
  display: -webkit-box;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-weight: 300;
  font-size: 13px;
  text-align: justify;
  line-height: 1.6;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ViewDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  font-size: 13px;
  font-weight: 600;

  & svg {
    width: auto;
    height: 0.9em;
    fill: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  }
`;
