import styled from '@emotion/styled';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  width: 100%;
  max-width: 768px;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
  transform: translateX(-50%);
`;

export const Image = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 16px;
  transform: translate(-50%, -50%);
  cursor: default;
  transition: transform 0.1s ease-out;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 28px;
  right: 28px;
  width: 28px;
  height: 28px;
  z-index: 100;

  & svg {
    fill: white;
    opacity: 0.8;
    width: 16px;
    height: 16px;
  }
`;
