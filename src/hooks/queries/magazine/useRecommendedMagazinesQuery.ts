import { useQuery } from '@tanstack/react-query';
import type { RecommendedMagazineResponse } from '@/apis/magazine/types';
import { AxiosError } from 'axios';
import { fetchRecommendedMagazines } from '@/apis/magazine';

const useRecommendedMagazinesQuery = () => {
  return useQuery<RecommendedMagazineResponse, AxiosError>({
    queryKey: ['magazines', 'recommended'],
    queryFn: fetchRecommendedMagazines,
    staleTime: 10 * 60 * 1000,
    retry: false,
  });
};

export default useRecommendedMagazinesQuery;
