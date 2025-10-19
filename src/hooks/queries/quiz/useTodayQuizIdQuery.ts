import { useQuery } from '@tanstack/react-query';
import type { TodayQuizResponse } from '@/apis/quiz/types';
import { AxiosError } from 'axios';
import { fetchTodayQuizId } from '@/apis/quiz';

const useTodayQuizIdQuery = () => {
  const hasToken = !!localStorage.getItem('accessToken');

  return useQuery<TodayQuizResponse, AxiosError>({
    queryKey: ['quiz', 'today', 'id'],
    queryFn: fetchTodayQuizId,
    enabled: hasToken,
    staleTime: 0,
    gcTime: 0,
    retry: false,
  });
};

export default useTodayQuizIdQuery;
