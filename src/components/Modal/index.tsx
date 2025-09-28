import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import useModal from '@/hooks/useModal';
import { lockBodyScroll, unlockBodyScroll } from '@/utils/bodyScrollUtils';
import * as S from '@/components/Modal/Modal.styles';
import Button from '@/components/Button';
import Loader from '@/components/Loader';

const Modal: React.FC = () => {
  const { modal, closeModal } = useModal();
  const handleClose = () => {
    modal?.onClose?.();
    closeModal();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !modal?.disableBackdropClick) {
      handleClose();
    }
  };

  const handleConfirm = () => {
    modal?.onConfirm?.();
    closeModal();
  };

  useEffect(() => {
    if (modal?.isOpen) {
      lockBodyScroll();
    }
    return () => {
      unlockBodyScroll();
    };
  }, [modal?.isOpen, lockBodyScroll, unlockBodyScroll]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modal?.isOpen) {
        handleClose();
      }
    };

    if (modal?.isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [modal?.isOpen]);

  const hasTitle = Boolean(modal?.title);

  const renderContent = () => {
    if (modal?.loadingText !== undefined) {
      return (
        <S.LoadingContent>
          <Loader />
          {modal.loadingText && (
            <S.LoadingText>{modal.loadingText}</S.LoadingText>
          )}
        </S.LoadingContent>
      );
    }
    return modal?.content;
  };

  const isLoadingModal = modal?.loadingText !== undefined;

  if (!modal?.isOpen) return null;

  return createPortal(
    <S.Backdrop onClick={handleBackdropClick}>
      {isLoadingModal ? (
        renderContent()
      ) : (
        <S.Container onClick={(e) => e.stopPropagation()}>
          {hasTitle && (
            <S.ModalHeader hasTitle={hasTitle}>
              <S.ModalTitle>{modal.title}</S.ModalTitle>
            </S.ModalHeader>
          )}
          <S.ModalContent hasHeader={hasTitle}>
            {renderContent()}
          </S.ModalContent>
          {(modal.onConfirm || modal.confirmText) && (
            <S.ModalFooter>
              {modal.cancelText && (
                <S.FooterButtonWrapper>
                  <Button variant="secondary" onClick={handleClose} fullWidth>
                    {modal.cancelText}
                  </Button>
                </S.FooterButtonWrapper>
              )}
              <S.FooterButtonWrapper>
                <Button variant="primary" onClick={handleConfirm} fullWidth>
                  {modal.confirmText || '확인'}
                </Button>
              </S.FooterButtonWrapper>
            </S.ModalFooter>
          )}
        </S.Container>
      )}
    </S.Backdrop>,
    document.body,
  );
};

export default Modal;
