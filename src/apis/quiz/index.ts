import type APIResponse from '@/apis/types/APIResponse';
import type {
  CategoryStatisticsResponse,
  QuizResponse,
  QuizSubmitResponse,
  TodayQuizResponse,
  SolvedQuizResponse,
} from '@/apis/quiz/types';
import apiClient from '@/apis/core/apiClient';

export const fetchCategoryStatistics =
  async (): Promise<CategoryStatisticsResponse> => {
    const response = await apiClient.get<
      APIResponse<CategoryStatisticsResponse>
    >('/api/quiz/categories/statistics');
    return response.data.result;
  };

export const fetchQuiz = async (quizId: number): Promise<QuizResponse> => {
  const response = await apiClient.get<APIResponse<QuizResponse>>(
    `/api/quiz/${quizId}`,
  );
  return response.data.result;
};

export const fetchQuizByCategoryId = async (
  categoryId: number,
): Promise<QuizResponse> => {
  const response = await apiClient.get<APIResponse<QuizResponse>>(
    `/api/quiz/category/${categoryId}`,
  );
  return response.data.result;
};

export const fetchTodayQuizId = async (): Promise<TodayQuizResponse> => {
  const response =
    await apiClient.get<APIResponse<TodayQuizResponse>>('/api/quiz/today');
  return response.data.result;
};

export const submitQuizAnswer = async (
  quizId: number,
  answer: string,
): Promise<QuizSubmitResponse> => {
  const response = await apiClient.post<APIResponse<QuizSubmitResponse>>(
    `/api/quiz/${quizId}/submit`,
    new URLSearchParams({ answer }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
  return response.data.result;
};

export const fetchSolvedQuizzes = async (
  categoryIds: number[],
  pageNum: number = 0,
): Promise<SolvedQuizResponse> => {
  const response = await apiClient.get<APIResponse<SolvedQuizResponse>>(
    '/api/quiz/solved',
    {
      params: {
        categoryIds: categoryIds.join(','),
        pageNum,
      },
    },
  );
  return response.data.result;
};
