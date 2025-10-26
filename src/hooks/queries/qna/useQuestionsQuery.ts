import { useInfiniteQuery } from '@tanstack/react-query';
import type { QuestionListResponse } from '@/apis/qna/types';
import { AxiosError } from 'axios';
import { fetchQuestions } from '@/apis/qna';

const useQuestionsQuery = (
  categoryIds?: number[],
  keyword?: string,
  size: number = 5,
  isAnswered: boolean = false,
) => {
  return useInfiniteQuery<QuestionListResponse, AxiosError>({
    queryKey: ['questions', categoryIds, keyword, size, isAnswered],
    queryFn: ({ pageParam = 1 }) =>
      fetchQuestions(
        categoryIds,
        keyword,
        pageParam as number,
        size,
        isAnswered,
      ),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext && lastPage.currentPage !== null
        ? lastPage.currentPage + 1
        : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
  });
};

export default useQuestionsQuery;
