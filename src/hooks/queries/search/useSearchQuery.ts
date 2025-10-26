import { useQuery } from '@tanstack/react-query';
import type { SearchResult } from '@/apis/search/types';
import { AxiosError } from 'axios';
import { fetchSearchResults } from '@/apis/search';

const useSearchQuery = (
  keyword: string,
  page: number = 1,
  size: number = 5,
) => {
  return useQuery<SearchResult, AxiosError>({
    queryKey: ['search', keyword, page, size],
    queryFn: () => fetchSearchResults(keyword, page, size),
    enabled: keyword.length > 0,
    staleTime: 5 * 60 * 1000,
  });
};

export default useSearchQuery;
