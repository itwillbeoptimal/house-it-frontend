import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AdditionalQuestionMessageRequest } from '@/apis/qna/types';
import { createAdditionalQuestionMessage } from '@/apis/qna';

// eslint-disable-next-line import/prefer-default-export
export const useCreateAdditionalQuestionMessageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AdditionalQuestionMessageRequest) =>
      createAdditionalQuestionMessage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['additional-question'] });
    },
  });
};
