import { useInfiniteQuery } from '@tanstack/react-query';
import type { MyQuestionResponse } from '@/apis/qna/types';
import { AxiosError } from 'axios';
import { fetchMyQuestions } from '@/apis/qna';

const useMyQuestionsQuery = (size: number = 5) => {
  const hasToken = !!localStorage.getItem('accessToken');

  return useInfiniteQuery<MyQuestionResponse, AxiosError>({
    queryKey: ['questions', 'my', size],
    queryFn: ({ pageParam = 1 }) => fetchMyQuestions(pageParam as number, size),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext && lastPage.currentPage !== null
        ? lastPage.currentPage + 1
        : undefined;
    },
    initialPageParam: 1,
    enabled: hasToken,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

export default useMyQuestionsQuery;
