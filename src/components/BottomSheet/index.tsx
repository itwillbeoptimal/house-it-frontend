import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import useBottomSheet from '@/hooks/useBottomSheet';
import { lockBodyScroll, unlockBodyScroll } from '@/utils/bodyScrollUtils';
import * as S from '@/components/BottomSheet/BottomSheet.styles';

const BottomSheet: React.FC = () => {
  const [isClosing, setIsClosing] = useState(false);

  const { bottomSheet, closeBottomSheet } = useBottomSheet();

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      bottomSheet?.onClose?.();
      closeBottomSheet();
      setIsClosing(false);
    }, 300);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !bottomSheet?.disableBackdropClick) {
      handleClose();
    }
  };

  useEffect(() => {
    if (bottomSheet?.isOpen) {
      lockBodyScroll();
    }

    return () => {
      unlockBodyScroll();
    };
  }, [bottomSheet?.isOpen, lockBodyScroll, unlockBodyScroll]);

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
      <S.Container isClosing={isClosing} onClick={(e) => e.stopPropagation()}>
        <S.DragHandle />
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
