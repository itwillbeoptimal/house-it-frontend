import { useQuery } from '@tanstack/react-query';
import type { MagazineDetailResponse } from '@/apis/magazine/types';
import { AxiosError } from 'axios';
import { fetchMagazineDetail } from '@/apis/magazine';

const useMagazineDetailQuery = (magazineId: number) => {
  const hasToken = !!localStorage.getItem('accessToken');

  return useQuery<MagazineDetailResponse, AxiosError>({
    queryKey: ['magazine', magazineId],
    queryFn: () => fetchMagazineDetail(magazineId),
    enabled: !!magazineId,
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error) => {
      if (hasToken) {
        return failureCount < 3;
      }
      if (error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export default useMagazineDetailQuery;
