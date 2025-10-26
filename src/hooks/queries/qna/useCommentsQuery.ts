import { useInfiniteQuery } from '@tanstack/react-query';
import type { CommentListResponse } from '@/apis/qna/types';
import { AxiosError } from 'axios';
import { fetchComments } from '@/apis/qna';

const useCommentsQuery = (
  targetId: number,
  targetType: 'QUESTION' | 'RESPONSE',
  size: number = 5,
) => {
  return useInfiniteQuery<CommentListResponse, AxiosError>({
    queryKey: ['comments', targetType, targetId, size],
    queryFn: ({ pageParam = 1 }) =>
      fetchComments(targetId, targetType, pageParam as number, size),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!targetId,
    staleTime: 5 * 60 * 1000,
  });
};

export default useCommentsQuery;
