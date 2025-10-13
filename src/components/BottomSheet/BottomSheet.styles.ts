import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const Backdrop = styled.div<{ isClosing?: boolean }>`
  position: fixed;
  top: 0;
  left: 50%;
  width: 100%;
  max-width: 768px;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
  transform: translateX(-50%);
  animation: ${(props) => (props.isClosing ? fadeOut : fadeIn)} 0.3s ease;
`;

export const Container = styled.div<{
  isClosing?: boolean;
  isMounted?: boolean;
  isDragging?: boolean;
  dragOffset?: number;
  hasMaxHeight?: boolean;
}>`
  position: fixed;
  display: flex;
  flex: 1;
  flex-direction: column;
  bottom: 0;
  left: 0;
  width: 100%;
  max-height: 80dvh;
  padding-bottom: env(safe-area-inset-bottom);
  background-color: white;
  border-radius: 20px 20px 0 0;
  z-index: 100;
  transform: translateY(
    ${({ isDragging, dragOffset, isMounted }) => {
      if (isDragging) return `${dragOffset}px`;
      return isMounted ? '0' : '100%';
    }}
  );
  transition: ${(props) => (props.isDragging ? 'none' : 'transform 0.3s ease')};

  ${(props) =>
    props.hasMaxHeight &&
    `
    height: 80dvh;
  `}

  ${(props) =>
    props.isClosing &&
    `
    transform: translateY(100%);
  `}
`;

export const DragHandle = styled.div`
  flex-shrink: 0;
  padding: 12px 16px;
  margin: 0 auto;
  cursor: grab;
  touch-action: none;

  &:active {
    cursor: grabbing;
  }
`;

export const DragBar = styled.div`
  width: 40px;
  height: 4px;
  background-color: ${(props) => props.theme.COLORS.GRAY[3]};
  border-radius: 2px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 20px;
  flex-shrink: 0;
`;

export const SheetTitle = styled.h2`
  font-weight: 600;
  font-size: 18px;
  margin: 0;
`;

export const SheetContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  padding: 0 20px;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;
