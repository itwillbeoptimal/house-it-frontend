import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

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

export const Container = styled.div<{ isClosing?: boolean }>`
  position: fixed;
  display: flex;
  flex: 1;
  flex-direction: column;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80dvh;
  padding-bottom: env(safe-area-inset-bottom);
  background-color: white;
  border-radius: 20px 20px 0 0;
  animation: ${(props) => (props.isClosing ? slideDown : slideUp)} 0.3s ease;
  z-index: 100;
`;

export const DragHandle = styled.div`
  width: 40px;
  height: 4px;
  background-color: ${(props) => props.theme.COLORS.GRAY[3]};
  border-radius: 2px;
  margin: 12px auto 8px auto;
  cursor: grab;
  flex-shrink: 0;

  &:active {
    cursor: grabbing;
  }
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
  padding: 0 20px;
  overflow-x: hidden;
  overflow-y: auto;
  min-height: 0;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;
