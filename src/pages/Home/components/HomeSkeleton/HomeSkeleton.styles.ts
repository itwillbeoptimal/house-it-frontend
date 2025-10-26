import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const CarouselSkeleton = styled.div`
  width: calc(100% - 40px);
  margin: 0 20px;
  aspect-ratio: 16/9;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.COLORS.GRAY[1]} 0%,
    ${(props) => props.theme.COLORS.GRAY[2]} 50%,
    ${(props) => props.theme.COLORS.GRAY[1]} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: 16px;
`;

export const SectionTitle = styled.div`
  width: 140px;
  height: 24px;
  margin: 32px 20px 0 20px;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.COLORS.GRAY[1]} 0%,
    ${(props) => props.theme.COLORS.GRAY[2]} 50%,
    ${(props) => props.theme.COLORS.GRAY[1]} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: 8px;
`;

export const SectionDescription = styled.div`
  width: 180px;
  height: 16px;
  margin: 8px 20px 0 20px;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.COLORS.GRAY[1]} 0%,
    ${(props) => props.theme.COLORS.GRAY[2]} 50%,
    ${(props) => props.theme.COLORS.GRAY[1]} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: 8px;
`;

export const MagazineCarouselSkeleton = styled.div`
  position: relative;
  width: 100%;
  padding-top: 16px;
  overflow: hidden;
`;

export const MagazineTrack = styled.div`
  display: flex;
  transform: translateX(calc(7.5%));
`;

export const MagazineCard = styled.div<{ active?: boolean }>`
  flex-shrink: 0;
  width: 85%;
  height: 320px;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.COLORS.GRAY[1]} 0%,
    ${(props) => props.theme.COLORS.GRAY[2]} 50%,
    ${(props) => props.theme.COLORS.GRAY[1]} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: 16px;
  opacity: ${(props) => (props.active ? 1 : 0.5)};
  transform: scale(${(props) => (props.active ? 1 : 0.9)});
  transition: all 0.3s ease;
`;

export const AIAnswerContainer = styled.div`
  padding-top: 16px;
  padding-left: 20px;
  overflow: hidden;
`;

export const AIAnswerTrack = styled.div`
  display: flex;
  gap: 16px;
`;

export const AIAnswerCard = styled.div`
  flex-shrink: 0;
  width: 280px;
  padding: 1px;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.COLORS.GRAY[1]} 0%,
    ${(props) => props.theme.COLORS.GRAY[2]} 50%,
    ${(props) => props.theme.COLORS.GRAY[1]} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: 16px;
`;

export const AIAnswerCardInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  width: 100%;
  padding: 24px;
  background-color: white;
  border-radius: 15px;
`;

export const AIBadge = styled.div`
  width: 42px;
  height: 21px;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.COLORS.GRAY[1]} 0%,
    ${(props) => props.theme.COLORS.GRAY[2]} 50%,
    ${(props) => props.theme.COLORS.GRAY[1]} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: 12px;
`;

export const QuestionLine = styled.div`
  height: 18px;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.COLORS.GRAY[1]} 0%,
    ${(props) => props.theme.COLORS.GRAY[2]} 50%,
    ${(props) => props.theme.COLORS.GRAY[1]} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: 4px;

  &:first-of-type {
    width: 100%;
  }

  &:last-of-type {
    width: 70%;
  }
`;

export const Answer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: 8px;
  gap: 8px;
`;

export const AnswerLine = styled.div`
  height: 15px;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.COLORS.GRAY[1]} 0%,
    ${(props) => props.theme.COLORS.GRAY[2]} 50%,
    ${(props) => props.theme.COLORS.GRAY[1]} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: 4px;

  &:nth-of-type(1) {
    width: 100%;
  }

  &:nth-of-type(2) {
    width: 95%;
  }

  &:nth-of-type(3) {
    width: 60%;
  }
`;

export const ViewDetailLine = styled.div`
  width: 80px;
  height: 18px;
  margin-left: auto;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.COLORS.GRAY[1]} 0%,
    ${(props) => props.theme.COLORS.GRAY[2]} 50%,
    ${(props) => props.theme.COLORS.GRAY[1]} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: 4px;
`;
