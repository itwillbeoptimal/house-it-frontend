import apiClient from '@/apis/core/apiClient';

// eslint-disable-next-line import/prefer-default-export
export const userLogout = async (): Promise<void> => {
  await apiClient.post('/api/auth/logout');
};
