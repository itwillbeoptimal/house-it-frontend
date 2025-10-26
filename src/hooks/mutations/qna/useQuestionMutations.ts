import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  QuestionCreateRequest,
  QuestionUpdateRequest,
} from '@/apis/qna/types';
import { createQuestion, updateQuestion, deleteQuestion } from '@/apis/qna';

export const useCreateQuestionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: QuestionCreateRequest) => createQuestion(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
  });
};

export const useUpdateQuestionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      questionId,
      data,
    }: {
      questionId: number;
      data: QuestionUpdateRequest;
    }) => updateQuestion(questionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      queryClient.invalidateQueries({ queryKey: ['question'] });
    },
  });
};

export const useDeleteQuestionMutation = () => {
  return useMutation({
    mutationFn: (questionId: number) => deleteQuestion(questionId),
  });
};
