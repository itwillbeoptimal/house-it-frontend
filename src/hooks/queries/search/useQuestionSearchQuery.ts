import { useInfiniteQuery } from '@tanstack/react-query';
import type { QuestionSearchResult } from '@/apis/search/types';
import { AxiosError } from 'axios';
import { fetchQuestionSearch } from '@/apis/search';

const useQuestionSearchQuery = (keyword: string, size: number = 10) => {
  return useInfiniteQuery<QuestionSearchResult, AxiosError>({
    queryKey: ['search', 'questions', keyword, size],
    queryFn: ({ pageParam = 1 }) =>
      fetchQuestionSearch(keyword, pageParam as number, size),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: keyword.length > 0,
    staleTime: 5 * 60 * 1000,
  });
};

export default useQuestionSearchQuery;
