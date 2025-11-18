import { useQuery } from '@tanstack/react-query';
import type { CategoryRecommendResponse } from '@/apis/qna/types';
import { AxiosError } from 'axios';
import { fetchCategoryRecommend } from '@/apis/qna';

const useCategoryRecommendQuery = (title: string, enabled: boolean = false) => {
  return useQuery<CategoryRecommendResponse, AxiosError>({
    queryKey: ['categoryRecommend', title],
    queryFn: () => fetchCategoryRecommend(title),
    enabled: enabled && !!title && title.trim().length > 0,
    staleTime: 5 * 60 * 1000,
  });
};

export default useCategoryRecommendQuery;
