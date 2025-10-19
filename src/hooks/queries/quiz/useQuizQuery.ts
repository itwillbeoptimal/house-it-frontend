import { useQuery } from '@tanstack/react-query';
import type { QuizResponse } from '@/apis/quiz/types';
import { AxiosError } from 'axios';
import { fetchQuiz } from '@/apis/quiz';

const useQuizQuery = (quizId: number) => {
  const hasToken = !!localStorage.getItem('accessToken');

  return useQuery<QuizResponse, AxiosError>({
    queryKey: ['quiz', 'quizId', quizId],
    queryFn: () => fetchQuiz(quizId),
    enabled: hasToken && !!quizId,
    staleTime: 0,
    gcTime: 0,
    retry: false,
  });
};

export default useQuizQuery;
