import { ReactNode } from 'react';
import { atom } from 'jotai';

export const headerButtonAtom = atom<ReactNode>(null);

export const subpageTitleAtom = atom<string>('');
