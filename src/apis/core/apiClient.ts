import axios from 'axios';
import setupInterceptors from '@/apis/core/setupInterceptors';

const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

setupInterceptors(apiClient);

export default apiClient;
