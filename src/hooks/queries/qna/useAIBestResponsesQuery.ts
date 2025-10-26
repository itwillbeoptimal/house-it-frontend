import { useQuery } from '@tanstack/react-query';
import type { AIBestResponsesResponse } from '@/apis/qna/types';
import { AxiosError } from 'axios';
import { fetchAIBestResponses } from '@/apis/qna';

const useAIBestResponsesQuery = () => {
  return useQuery<AIBestResponsesResponse, AxiosError>({
    queryKey: ['responses', 'ai', 'best'],
    queryFn: fetchAIBestResponses,
    staleTime: 10 * 60 * 1000,
  });
};

export default useAIBestResponsesQuery;
