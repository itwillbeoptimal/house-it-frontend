import { useInfiniteQuery } from '@tanstack/react-query';
import type { MagazineListResponse } from '@/apis/magazine/types';
import { AxiosError } from 'axios';
import { fetchMagazinesByCategory } from '@/apis/magazine';

const useMagazineListQuery = (categoryId: number) => {
  return useInfiniteQuery<MagazineListResponse, AxiosError>({
    queryKey: ['magazines', 'category', categoryId],
    queryFn: ({ pageParam = 1 }) =>
      fetchMagazinesByCategory(categoryId, pageParam as number),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
  });
};

export default useMagazineListQuery;
