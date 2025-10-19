import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserInfo } from '@/apis/user';
import type { UpdateUserInfoRequest } from '@/apis/user/types';

const useUpdateUserInfoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserInfoRequest) => updateUserInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });
};

export default useUpdateUserInfoMutation;
