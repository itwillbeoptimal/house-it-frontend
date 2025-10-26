import { atom } from 'jotai';

const previousPathAtom = atom<string | null>(null);

export default previousPathAtom;
