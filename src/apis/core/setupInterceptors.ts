import {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import eventManager from '@/utils/eventManager';

const removeTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

const showAlert = () => {
  eventManager.emit('alert', {
    title: '세션 만료',
    content: '로그인 세션이 만료되었습니다. 다시 로그인해주세요.',
    onConfirm: () => {
      window.location.href = '/login';
    },
  });
};

const setupInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken && config.headers) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config;
      const responseData = error.response?.data as {
        errorCodeResponse?: string;
      };

      const errorCode = responseData?.errorCodeResponse;

      if (errorCode === 'INVALID_TOKEN' || errorCode === 'EXPIRED_TOKEN') {
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const refreshResponse = await instance.post('/api/auth/refresh', {
            refreshToken,
          });
          const newAccessToken = refreshResponse.data.result.accessToken;
          const newRefreshToken = refreshResponse.data.result.refreshToken;

          localStorage.setItem('accessToken', newAccessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          if (originalRequest?.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return await instance(originalRequest);
          }
        } catch (refreshError) {
          removeTokens();
          showAlert();
          return Promise.reject(refreshError);
        }
      }

      if (
        errorCode === 'INVALID_REFRESH_TOKEN' ||
        errorCode === 'EXPIRED_REFRESH_TOKEN'
      ) {
        removeTokens();
        showAlert();
      }

      return Promise.reject(error);
    },
  );
};

export default setupInterceptors;
