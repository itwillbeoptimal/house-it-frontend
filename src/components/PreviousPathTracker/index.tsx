import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import previousPathAtom from '@/atoms/previousPathAtom';

const PreviousPathTracker = () => {
  const location = useLocation();
  const setPreviousPath = useSetAtom(previousPathAtom);
  const prevLocationRef = useRef<string | null>(null);

  useEffect(() => {
    if (prevLocationRef.current !== null) {
      setPreviousPath(prevLocationRef.current);
    }
    prevLocationRef.current = location.pathname;
  }, [location, setPreviousPath]);

  return null;
};

export default PreviousPathTracker;
