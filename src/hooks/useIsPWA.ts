import { useState, useEffect } from 'react';

declare global {
  interface Navigator {
    standalone?: boolean;
  }
}

const useIsPWA = () => {
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    const checkPWA = () => {
      const isStandalone = window.matchMedia(
        '(display-mode: standalone)',
      ).matches;
      const isIOSStandalone = window.navigator.standalone === true;

      setIsPWA(isStandalone || isIOSStandalone);
    };

    checkPWA();

    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    mediaQuery.addEventListener('change', checkPWA);

    return () => mediaQuery.removeEventListener('change', checkPWA);
  }, []);

  return isPWA;
};

export default useIsPWA;
