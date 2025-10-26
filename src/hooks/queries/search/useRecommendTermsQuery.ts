import { useQuery } from '@tanstack/react-query';
import type { RecommendTermsResponse } from '@/apis/search/types';
import { AxiosError } from 'axios';
import { fetchRecommendTerms } from '@/apis/search';

const useRecommendTermsQuery = () => {
  return useQuery<RecommendTermsResponse, AxiosError>({
    queryKey: ['search', 'recommend'],
    queryFn: fetchRecommendTerms,
    staleTime: 10 * 60 * 1000,
  });
};

export default useRecommendTermsQuery;
