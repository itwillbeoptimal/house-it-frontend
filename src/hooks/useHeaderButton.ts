import React, { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { headerButtonAtom } from '@/atoms/headerAtom';

const useHeaderButton = (buttons: React.ReactNode) => {
  const setHeaderButton = useSetAtom(headerButtonAtom);

  useEffect(() => {
    setHeaderButton(buttons);

    return () => {
      setHeaderButton(null);
    };
  }, [buttons, setHeaderButton]);
};

export default useHeaderButton;
