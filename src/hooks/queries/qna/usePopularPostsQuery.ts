import { useQuery } from '@tanstack/react-query';
import type { PopularPostResponse } from '@/apis/qna/types';
import { AxiosError } from 'axios';
import { fetchPopularPosts } from '@/apis/qna';

const usePopularPostsQuery = () => {
  return useQuery<PopularPostResponse, AxiosError>({
    queryKey: ['questions', 'popular'],
    queryFn: fetchPopularPosts,
    staleTime: 10 * 60 * 1000,
  });
};

export default usePopularPostsQuery;
