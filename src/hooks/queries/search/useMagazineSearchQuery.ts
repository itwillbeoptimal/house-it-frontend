import { useInfiniteQuery } from '@tanstack/react-query';
import type { MagazineSearchResult } from '@/apis/search/types';
import { AxiosError } from 'axios';
import { fetchMagazineSearch } from '@/apis/search';

const useMagazineSearchQuery = (keyword: string, size: number = 10) => {
  return useInfiniteQuery<MagazineSearchResult, AxiosError>({
    queryKey: ['search', 'magazines', keyword, size],
    queryFn: ({ pageParam = 1 }) =>
      fetchMagazineSearch(keyword, pageParam as number, size),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.currentPage + 1 : undefined;
    },
    enabled: keyword.length > 0,
    staleTime: 5 * 60 * 1000,
  });
};

export default useMagazineSearchQuery;
