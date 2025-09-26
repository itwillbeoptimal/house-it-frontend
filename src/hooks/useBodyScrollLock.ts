import { useCallback } from 'react';

const useBodyScrollLock = () => {
  const lockBodyScroll = useCallback(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  }, []);

  const unlockBodyScroll = useCallback(() => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.body.style.touchAction = '';
  }, []);

  return { lockBodyScroll, unlockBodyScroll };
};

export default useBodyScrollLock;
