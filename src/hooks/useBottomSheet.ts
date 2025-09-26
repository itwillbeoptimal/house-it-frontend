import { useAtom } from 'jotai';
import {
  bottomSheetAtom,
  openBottomSheetAtom,
  closeBottomSheetAtom,
  type BottomSheetState,
} from '@/atoms/bottomSheetAtom';

const useBottomSheet = () => {
  const [bottomSheet] = useAtom(bottomSheetAtom);
  const [, setOpenBottomSheet] = useAtom(openBottomSheetAtom);
  const [, setCloseBottomSheet] = useAtom(closeBottomSheetAtom);

  const openBottomSheet = (
    bottomSheetConfig: Omit<BottomSheetState, 'isOpen'>,
  ) => {
    setOpenBottomSheet(bottomSheetConfig);
  };

  const closeBottomSheet = () => {
    setCloseBottomSheet();
  };

  return {
    bottomSheet,
    openBottomSheet,
    closeBottomSheet,
    isOpen: bottomSheet?.isOpen ?? false,
  };
};

export default useBottomSheet;
