import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CommentCreateRequest } from '@/apis/qna/types';
import { createComment, deleteComment } from '@/apis/qna';

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CommentCreateRequest) => createComment(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['comments', variables.commentType, variables.targetId],
      });
    },
  });
};

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      commentType,
    }: {
      commentId: number;
      commentType: 'QUESTION' | 'RESPONSE';
    }) => deleteComment(commentId, commentType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};
