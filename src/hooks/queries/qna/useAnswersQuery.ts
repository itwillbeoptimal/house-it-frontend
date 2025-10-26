import { useInfiniteQuery } from '@tanstack/react-query';
import type { AnswerListResponse } from '@/apis/qna/types';
import { AxiosError } from 'axios';
import { fetchAnswers } from '@/apis/qna';

const useAnswersQuery = (
  questionId: number,
  size: number = 5,
  enabled: boolean = true,
) => {
  return useInfiniteQuery<AnswerListResponse, AxiosError>({
    queryKey: ['answers', questionId, size],
    queryFn: ({ pageParam = 1 }) =>
      fetchAnswers(questionId, pageParam as number, size),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext && lastPage.currentPage !== null
        ? lastPage.currentPage + 1
        : undefined;
    },
    initialPageParam: 1,
    enabled: !!questionId && enabled,
    staleTime: 5 * 60 * 1000,
  });
};

export default useAnswersQuery;
