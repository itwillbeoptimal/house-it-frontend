import { useQuery } from '@tanstack/react-query';
import type { QuizResponse } from '@/apis/quiz/types';
import { AxiosError } from 'axios';
import { fetchQuizByCategoryId } from '@/apis/quiz';

const useQuizByCategoryIdQuery = (categoryId: number) => {
  const hasToken = !!localStorage.getItem('accessToken');

  return useQuery<QuizResponse, AxiosError>({
    queryKey: ['quiz', 'categoryId', categoryId],
    queryFn: () => fetchQuizByCategoryId(categoryId),
    enabled: hasToken && !!categoryId,
    staleTime: 0,
    gcTime: 0,
    retry: false,
  });
};

export default useQuizByCategoryIdQuery;
