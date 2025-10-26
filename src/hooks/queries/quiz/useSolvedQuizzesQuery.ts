import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import type { SolvedQuizResponse } from '@/apis/quiz/types';
import { fetchSolvedQuizzes } from '@/apis/quiz';

const useSolvedQuizzesQuery = (categoryIds: number[]) => {
  const hasToken = !!localStorage.getItem('accessToken');

  return useInfiniteQuery<SolvedQuizResponse, AxiosError>({
    queryKey: ['quiz', 'solved', categoryIds],
    queryFn: ({ pageParam = 1 }) =>
      fetchSolvedQuizzes(categoryIds, pageParam as number),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: hasToken && categoryIds.length > 0,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

export default useSolvedQuizzesQuery;
