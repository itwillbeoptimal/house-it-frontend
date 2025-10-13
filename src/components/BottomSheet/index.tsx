import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import useBottomSheet from '@/hooks/useBottomSheet';
import { lockBodyScroll, unlockBodyScroll } from '@/utils/bodyScrollUtils';
import * as S from '@/components/BottomSheet/BottomSheet.styles';

const BottomSheet: React.FC = () => {
  const [isClosing, setIsClosing] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const startY = useRef(0);
  const startTime = useRef(0);
  const hasMoved = useRef(false);

  const { bottomSheet, closeBottomSheet } = useBottomSheet();

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      bottomSheet?.onClose?.();
      closeBottomSheet();
      setIsClosing(false);
      setDragOffset(0);
      setIsMounted(false);
    }, 300);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !bottomSheet?.disableBackdropClick) {
      handleClose();
    }
  };

  const handleDragStart = (clientY: number) => {
    setIsDragging(true);
    startY.current = clientY;
    startTime.current = Date.now();
    hasMoved.current = false;
  };

  const handleDragMove = (clientY: number) => {
    if (!isDragging) return;

    const offset = clientY - startY.current;

    if (Math.abs(offset) > 5) {
      hasMoved.current = true;
    }

    if (offset > 0) {
      setDragOffset(offset);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    const timeDiff = Date.now() - startTime.current;
    const isClick = !hasMoved.current && timeDiff < 300;

    if (isClick) {
      handleClose();
      return;
    }

    if (dragOffset > 100) {
      handleClose();
    } else {
      setDragOffset(0);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientY);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      handleDragMove(e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
        handleDragMove(e.touches[0].clientY);
      }
    };

    const handleMouseUp = () => {
      handleDragEnd();
    };

    const handleTouchEnd = () => {
      handleDragEnd();
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, {
        passive: false,
      });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragOffset]);

  useEffect(() => {
    if (bottomSheet?.isOpen) {
      lockBodyScroll();
      setTimeout(() => setIsMounted(true), 10);
    }

    return () => {
      unlockBodyScroll();
    };
  }, [bottomSheet?.isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && bottomSheet?.isOpen) {
        handleClose();
      }
    };

    if (bottomSheet?.isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [bottomSheet?.isOpen]);

  const hasTitle = Boolean(bottomSheet?.title);

  if (!bottomSheet?.isOpen) return null;

  return createPortal(
    <S.Backdrop isClosing={isClosing} onClick={handleBackdropClick}>
      <S.Container
        isClosing={isClosing}
        isMounted={isMounted}
        isDragging={isDragging}
        dragOffset={dragOffset}
        hasMaxHeight={bottomSheet?.hasMaxHeight}
        onClick={(e) => e.stopPropagation()}
      >
        <S.DragHandle
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <S.DragBar />
        </S.DragHandle>
        {hasTitle && (
          <S.Header>
            <S.SheetTitle>{bottomSheet.title}</S.SheetTitle>
          </S.Header>
        )}
        <S.SheetContent>{bottomSheet.content}</S.SheetContent>
      </S.Container>
    </S.Backdrop>,
    document.body,
  );
};

export default BottomSheet;
