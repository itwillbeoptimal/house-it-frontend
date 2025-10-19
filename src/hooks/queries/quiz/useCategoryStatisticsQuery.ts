import { useQuery } from '@tanstack/react-query';
import type { CategoryStatisticsResponse } from '@/apis/quiz/types';
import { AxiosError } from 'axios';
import { fetchCategoryStatistics } from '@/apis/quiz';

const useCategoryStatisticsQuery = () => {
  const hasToken = !!localStorage.getItem('accessToken');

  return useQuery<CategoryStatisticsResponse, AxiosError>({
    queryKey: ['quiz', 'statistics'],
    queryFn: fetchCategoryStatistics,
    enabled: hasToken,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

export default useCategoryStatisticsQuery;
