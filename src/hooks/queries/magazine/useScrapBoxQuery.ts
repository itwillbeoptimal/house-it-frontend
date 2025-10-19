import { useQuery } from '@tanstack/react-query';
import type { ScrapBoxResponse } from '@/apis/magazine/types';
import { AxiosError } from 'axios';
import { fetchScrapBox } from '@/apis/magazine';

const useScrapBoxQuery = (pageNum: number = 1) => {
  const hasToken = !!localStorage.getItem('accessToken');

  return useQuery<ScrapBoxResponse, AxiosError>({
    queryKey: ['magazines', 'scrapBox', pageNum],
    queryFn: () => fetchScrapBox(pageNum),
    enabled: hasToken,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

export default useScrapBoxQuery;
