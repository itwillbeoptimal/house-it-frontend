import { useQuery } from '@tanstack/react-query';
import type { SolvedQuizResponse } from '@/apis/quiz/types';
import { AxiosError } from 'axios';
import { fetchSolvedQuizzes } from '@/apis/quiz';

const useSolvedQuizzesQuery = (categoryIds: number[], pageNum: number = 0) => {
  const hasToken = !!localStorage.getItem('accessToken');

  return useQuery<SolvedQuizResponse, AxiosError>({
    queryKey: ['quiz', 'solved', categoryIds, pageNum],
    queryFn: () => fetchSolvedQuizzes(categoryIds, pageNum),
    enabled: hasToken && categoryIds.length > 0,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

export default useSolvedQuizzesQuery;
