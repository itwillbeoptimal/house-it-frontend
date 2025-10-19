import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { MagazineDetailResponse } from '@/apis/magazine/types';
import { toggleMagazineScrap } from '@/apis/magazine';

const useMagazineScrapMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (magazineId: number) => toggleMagazineScrap(magazineId),
    onMutate: async (magazineId) => {
      await queryClient.cancelQueries({
        queryKey: ['magazine', magazineId],
      });

      const previousData = queryClient.getQueryData<MagazineDetailResponse>([
        'magazine',
        magazineId,
      ]);

      if (previousData) {
        queryClient.setQueryData<MagazineDetailResponse>(
          ['magazine', magazineId],
          {
            ...previousData,
            isScrap: !previousData.isScrap,
          },
        );
      }

      return { previousData };
    },
    onError: (_, magazineId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ['magazine', magazineId],
          context.previousData,
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['magazines', 'scrapBox'],
      });
    },
  });
};

export default useMagazineScrapMutation;
