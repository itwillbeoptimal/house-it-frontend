import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const scaleOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const Backdrop = styled.div<{ isClosing?: boolean }>`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
  animation: ${(props) => (props.isClosing ? fadeOut : fadeIn)} 0.2s ease;
`;

export const Container = styled.div<{ isClosing?: boolean }>`
  position: relative;
  width: 85dvw;
  max-width: 408px;
  background-color: white;
  border-radius: 16px;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  animation: ${(props) => (props.isClosing ? scaleOut : scaleIn)} 0.2s ease;
`;

export const ModalHeader = styled.div<{ hasTitle: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.hasTitle ? 'space-between' : 'flex-end'};
  padding: 20px 24px 16px 24px;
`;

export const ModalTitle = styled.h1`
  flex: 1;
  font-weight: 700;
  font-size: 16px;
`;

export const ModalContent = styled.div<{ hasHeader: boolean }>`
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  padding: ${(props) => (props.hasHeader ? '0 24px 24px 24px' : '24px')};
  white-space: pre-line;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 24px 24px 24px;
  gap: 8px;
`;

export const FooterButtonWrapper = styled.div`
  flex: 1;
`;

export const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const LoadingText = styled.div`
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0.4) 100%
  );
  background-size: 200% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  animation: ${shimmer} 2s ease-in-out infinite;
`;
