import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { subpageTitleAtom } from '@/atoms/headerAtom';

interface UseSubpageHeaderProps {
  title?: string;
}

const useSubpageHeader = ({ title = '' }: UseSubpageHeaderProps = {}) => {
  const setSubpageTitle = useSetAtom(subpageTitleAtom);

  useEffect(() => {
    setSubpageTitle(title);

    return () => {
      setSubpageTitle('');
    };
  }, [title, setSubpageTitle]);
};

export default useSubpageHeader;
