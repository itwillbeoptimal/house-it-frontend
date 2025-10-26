import { useQuery } from '@tanstack/react-query';
import type { AutocompleteResponse } from '@/apis/search/types';
import { AxiosError } from 'axios';
import { fetchAutocomplete } from '@/apis/search';

const useAutocompleteQuery = (query: string, limit: number = 10) => {
  return useQuery<AutocompleteResponse, AxiosError>({
    queryKey: ['search', 'autocomplete', query, limit],
    queryFn: () => fetchAutocomplete(query, limit),
    enabled: query.length > 0,
    staleTime: 5 * 60 * 1000,
  });
};

export default useAutocompleteQuery;
