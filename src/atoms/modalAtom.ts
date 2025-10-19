import React from 'react';
import { atom } from 'jotai';

export interface ModalState {
  id: string;
  isOpen: boolean;
  type?: 'default' | 'loading' | 'confirm' | 'alert';
  title?: string;
  content?: React.ReactNode;
  loadingText?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  disableBackdropClick?: boolean;
}

export const modalAtom = atom<ModalState | null>(null);

export const openModalAtom = atom(
  null,
  (_get, set, modal: Omit<ModalState, 'isOpen'>) => {
    set(modalAtom, { ...modal, isOpen: true });
  },
);

export const closeModalAtom = atom(null, (get, set, targetId?: string) => {
  const currentModal = get(modalAtom);
  if (currentModal && (!targetId || currentModal.id === targetId)) {
    set(modalAtom, { ...currentModal, isOpen: false });
    setTimeout(() => {
      set(modalAtom, null);
    }, 200);
  }
});
