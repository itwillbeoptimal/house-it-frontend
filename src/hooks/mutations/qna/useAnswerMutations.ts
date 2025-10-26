import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  AnswerCreateRequest,
  AnswerUpdateRequest,
} from '@/apis/qna/types';
import {
  createAnswer,
  updateAnswer,
  deleteAnswer,
  adoptAnswer,
  recommendAnswer,
} from '@/apis/qna';

export const useCreateAnswerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AnswerCreateRequest) => createAnswer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['answers'] });
      queryClient.invalidateQueries({ queryKey: ['question'] });
    },
  });
};

export const useUpdateAnswerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      responseId,
      data,
    }: {
      responseId: number;
      data: AnswerUpdateRequest;
    }) => updateAnswer(responseId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['answers'] });
    },
  });
};

export const useDeleteAnswerMutation = () => {
  return useMutation({
    mutationFn: (responseId: number) => deleteAnswer(responseId),
  });
};

export const useAdoptAnswerMutation = () => {
  return useMutation({
    mutationFn: (responseId: number) => adoptAnswer(responseId),
  });
};

export const useRecommendAnswerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (responseId: number) => recommendAnswer(responseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['answers'] });
    },
  });
};
