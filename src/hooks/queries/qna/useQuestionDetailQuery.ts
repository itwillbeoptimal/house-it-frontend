import { useQuery } from '@tanstack/react-query';
import type { QuestionDetailResponse } from '@/apis/qna/types';
import { AxiosError } from 'axios';
import { fetchQuestionDetail } from '@/apis/qna';

const useQuestionDetailQuery = (
  questionId: number,
  enabled: boolean = true,
) => {
  return useQuery<QuestionDetailResponse, AxiosError>({
    queryKey: ['question', questionId],
    queryFn: () => fetchQuestionDetail(questionId),
    enabled: !!questionId && enabled,
    staleTime: 5 * 60 * 1000,
  });
};

export default useQuestionDetailQuery;
