import type APIResponse from '@/apis/types/APIResponse';
import type {
  MagazineListResponse,
  MagazineDetailResponse,
  MagazineScrapResponse,
  ScrapBoxResponse,
  RecommendedMagazineResponse,
} from '@/apis/magazine/types';
import apiClient from '@/apis/core/apiClient';

export const fetchMagazinesByCategory = async (
  categoryId: number,
  pageNum: number = 1,
): Promise<MagazineListResponse> => {
  const response = await apiClient.get<APIResponse<MagazineListResponse>>(
    `/api/magazine/category/${categoryId}`,
    { params: { pageNum } },
  );
  return response.data.result;
};

export const fetchMagazineDetail = async (
  magazineId: number,
): Promise<MagazineDetailResponse> => {
  const response = await apiClient.get<APIResponse<MagazineDetailResponse>>(
    `/api/magazine/${magazineId}`,
  );
  return response.data.result;
};

export const toggleMagazineScrap = async (
  magazineId: number,
): Promise<MagazineScrapResponse> => {
  const response = await apiClient.post<APIResponse<MagazineScrapResponse>>(
    `/api/magazine/${magazineId}/scrap`,
  );
  return response.data.result;
};

export const fetchScrapBox = async (
  pageNum: number = 1,
): Promise<ScrapBoxResponse> => {
  const response = await apiClient.get<APIResponse<ScrapBoxResponse>>(
    '/api/magazine/scrap-box',
    { params: { pageNum } },
  );
  return response.data.result;
};

export const fetchRecommendedMagazines =
  async (): Promise<RecommendedMagazineResponse> => {
    const response = await apiClient.get<
      APIResponse<RecommendedMagazineResponse>
    >('/api/magazine/recommend');
    return response.data.result;
  };
