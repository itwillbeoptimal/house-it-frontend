import React, { useEffect } from 'react';
import { lockBodyScroll, unlockBodyScroll } from '@/utils/bodyScrollUtils';
import useImageZoom from '@/pages/QnADetail/components/ImageViewerModal/hooks/useImageZoom';
import * as S from '@/pages/QnADetail/components/ImageViewerModal/ImageViewerModal.styles';
import CloseIcon from '@/assets/icons/cross.svg?react';

interface ImageViewerModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  imageUrl,
  onClose,
}) => {
  const {
    imageRef,
    updateScale,
    startDrag,
    moveDrag,
    endDrag,
    initializePinchZoom,
    updatePinchZoom,
    endPinchZoom,
    getScale,
  } = useImageZoom();

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.01;
    updateScale(getScale() + delta);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY,
      );
      initializePinchZoom(distance);
    } else if (e.touches.length === 1 && getScale() > 1) {
      startDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY,
      );
      updatePinchZoom(distance);
    } else if (e.touches.length === 1 && getScale() > 1) {
      e.preventDefault();
      moveDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    endPinchZoom();
    endDrag();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startDrag(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    moveDrag(e.clientX, e.clientY);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    lockBodyScroll();

    return () => {
      document.removeEventListener('keydown', handleEscape);
      unlockBodyScroll();
    };
  }, [onClose]);

  return (
    <S.Backdrop onClick={handleBackdropClick}>
      <S.CloseButton onClick={onClose}>
        <CloseIcon />
      </S.CloseButton>
      <S.Image
        ref={imageRef}
        src={imageUrl}
        alt="원본 이미지"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
      />
    </S.Backdrop>
  );
};

export default ImageViewerModal;
