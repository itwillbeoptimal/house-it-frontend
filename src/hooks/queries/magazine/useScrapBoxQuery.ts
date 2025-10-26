import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import type { ScrapBoxResponse } from '@/apis/magazine/types';
import { fetchScrapBox } from '@/apis/magazine';

const useScrapBoxQuery = () => {
  const hasToken = !!localStorage.getItem('accessToken');

  return useInfiniteQuery<ScrapBoxResponse, AxiosError>({
    queryKey: ['magazines', 'scrapBox'],
    queryFn: ({ pageParam = 1 }) => fetchScrapBox(pageParam as number),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: hasToken,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

export default useScrapBoxQuery;
