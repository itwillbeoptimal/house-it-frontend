import apiClient from '@/apis/core/apiClient';
import type APIResponse from '@/apis/types/APIResponse';
import type {
  SearchResult,
  RecommendTermsResponse,
  AutocompleteResponse,
  MagazineSearchResult,
  QuestionSearchResult,
} from '@/apis/search/types';

export const fetchSearchResults = async (
  keyword: string,
  page: number = 1,
  size: number = 5,
): Promise<SearchResult> => {
  const response = await apiClient.get<APIResponse<SearchResult>>(
    '/api/search',
    {
      params: { keyword, page, size },
    },
  );
  return response.data.result;
};

export const fetchMagazineSearch = async (
  keyword: string,
  page: number = 1,
  size: number = 5,
): Promise<MagazineSearchResult> => {
  const response = await apiClient.get<APIResponse<MagazineSearchResult>>(
    '/api/search/magazines',
    {
      params: { keyword, page, size },
    },
  );
  return response.data.result;
};

export const fetchQuestionSearch = async (
  keyword: string,
  page: number = 1,
  size: number = 5,
): Promise<QuestionSearchResult> => {
  const response = await apiClient.get<APIResponse<QuestionSearchResult>>(
    '/api/search/questions',
    {
      params: { keyword, page, size },
    },
  );
  return response.data.result;
};

export const fetchRecommendTerms =
  async (): Promise<RecommendTermsResponse> => {
    const response = await apiClient.get<APIResponse<RecommendTermsResponse>>(
      '/api/search/recommend',
    );
    return response.data.result;
  };

export const fetchAutocomplete = async (
  query: string,
  limit: number = 10,
): Promise<AutocompleteResponse> => {
  const response = await apiClient.get<AutocompleteResponse>(
    '/api/search/autocomplete',
    {
      params: { query, limit },
    },
  );
  return response.data;
};
