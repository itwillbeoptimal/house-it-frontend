import { useQuery } from '@tanstack/react-query';
import type { AdditionalQuestionResponse } from '@/apis/qna/types';
import { AxiosError } from 'axios';
import { fetchAdditionalQuestion } from '@/apis/qna';

const useAdditionalQuestionQuery = (
  followUpRoomId: number,
  questionId: number,
) => {
  return useQuery<AdditionalQuestionResponse, AxiosError>({
    queryKey: ['additional-question', followUpRoomId, questionId],
    queryFn: () => fetchAdditionalQuestion(followUpRoomId, questionId),
    enabled: !!followUpRoomId && !!questionId,
    staleTime: 5 * 60 * 1000,
  });
};

export default useAdditionalQuestionQuery;
