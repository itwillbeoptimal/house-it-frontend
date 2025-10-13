import apiClient from '@/apis/core/apiClient';

export const userLogout = async (): Promise<void> => {
  await apiClient.post('/api/auth/logout');
};
