import React from 'react';
import { atom } from 'jotai';

export interface BottomSheetState {
  id: string;
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode;
  onClose?: () => void;
  disableBackdropClick?: boolean;
}

export const bottomSheetAtom = atom<BottomSheetState | null>(null);

export const openBottomSheetAtom = atom(
  null,
  (_get, set, bottomSheet: Omit<BottomSheetState, 'isOpen'>) => {
    set(bottomSheetAtom, { ...bottomSheet, isOpen: true });
  },
);

export const closeBottomSheetAtom = atom(null, (get, set) => {
  const currentBottomSheet = get(bottomSheetAtom);
  if (currentBottomSheet) {
    set(bottomSheetAtom, { ...currentBottomSheet, isOpen: false });
    setTimeout(() => {
      set(bottomSheetAtom, null);
    }, 200);
  }
});
