import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitQuizAnswer } from '@/apis/quiz';

const useQuizSubmitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ quizId, answer }: { quizId: number; answer: string }) =>
      submitQuizAnswer(quizId, answer),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['quiz', 'statistics'],
      });
      queryClient.invalidateQueries({
        queryKey: ['quiz', variables.quizId],
      });
      queryClient.invalidateQueries({
        queryKey: ['quiz', 'solved'],
      });
    },
  });
};

export default useQuizSubmitMutation;
