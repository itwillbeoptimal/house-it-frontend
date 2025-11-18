import type APIResponse from '@/apis/types/APIResponse';
import type {
  UserInfoResponse,
  NicknameCheckResponse,
  UpdateUserInfoRequest,
  UpdateUserInfoResponse,
  UpdateFcmTokenRequest,
} from '@/apis/user/types';
import apiClient from '@/apis/core/apiClient';

export const fetchUserInfo = async (): Promise<UserInfoResponse> => {
  const response =
    await apiClient.get<APIResponse<UserInfoResponse>>('/api/user/info');

  return response.data.result;
};

export const isAvailableNickname = async (
  nickname: string,
): Promise<NicknameCheckResponse> => {
  const response = await apiClient.get<APIResponse<NicknameCheckResponse>>(
    '/api/user/check-nickname',
    { params: { nickname } },
  );

  return response.data.result;
};

export const updateUserInfo = async (
  data: UpdateUserInfoRequest,
): Promise<UpdateUserInfoResponse> => {
  const formData = new FormData();

  if (data.nickname !== undefined) {
    formData.append('nickname', data.nickname);
  }
  if (data.image) {
    formData.append('image', data.image);
  }

  formData.append('isProfileImageDeleted', String(data.isProfileImageDeleted));

  const response = await apiClient.put<APIResponse<UpdateUserInfoResponse>>(
    '/api/user/additional-info',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data.result;
};

export const updateFcmToken = async (data: UpdateFcmTokenRequest) => {
  await apiClient.post('/api/user/device', data);
};

export const deleteUserAccount = async () => {
  await apiClient.post('/api/auth/withdraw');
};
