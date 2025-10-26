import {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import eventManager from '@/utils/eventManager';

const showAlert = () => {
  eventManager.emit('alert', {
    title: '세션 만료',
    content: '로그인 세션이 만료되었습니다. 다시 로그인해주세요.',
    onConfirm: () => {
      window.location.href = '/login';
    },
  });
};

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null,
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const retryRequests = new WeakSet<InternalAxiosRequestConfig>();

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
      const originalRequest = error.config as InternalAxiosRequestConfig;
      const responseData = error.response?.data as {
        errorCode?: string;
      };

      const errorCode = responseData?.errorCode;

      if (originalRequest.url === '/api/auth/refresh') {
        if (
          errorCode === 'AUTH_ERR_002' ||
          errorCode === 'AUTH_ERR_003' ||
          errorCode === 'AUTH_ERR_013' ||
          errorCode === 'AUTH_ERR_014' ||
          error.response?.status === 403
        ) {
          localStorage.removeItem('accessToken');
          showAlert();
        }
        return Promise.reject(error);
      }

      if (errorCode === 'AUTH_ERR_002' || errorCode === 'AUTH_ERR_003') {
        if (retryRequests.has(originalRequest)) {
          return Promise.reject(error);
        }

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => {
              const accessToken = localStorage.getItem('accessToken');
              if (originalRequest?.headers && accessToken) {
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              }
              return instance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        retryRequests.add(originalRequest);
        isRefreshing = true;

        try {
          const refreshResponse = await instance.post('/api/auth/refresh');
          const newAccessToken = refreshResponse.data.result.accessToken;

          localStorage.setItem('accessToken', newAccessToken);

          if (originalRequest?.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          processQueue(null, newAccessToken);
          isRefreshing = false;

          return await instance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError as AxiosError, null);
          isRefreshing = false;
          localStorage.removeItem('accessToken');
          showAlert();
          return Promise.reject(refreshError);
        }
      }

      if (errorCode === 'AUTH_ERR_013' || errorCode === 'AUTH_ERR_014') {
        localStorage.removeItem('accessToken');
        showAlert();
      }

      return Promise.reject(error);
    },
  );
};

export default setupInterceptors;
