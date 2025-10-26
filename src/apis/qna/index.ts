import type APIResponse from '@/apis/types/APIResponse';
import type {
  QuestionCreateRequest,
  QuestionCreateResponse,
  QuestionUpdateRequest,
  QuestionUpdateResponse,
  QuestionListResponse,
  QuestionDetailResponse,
  QuestionReportRequest,
  QuestionReportResponse,
  CategoryRecommendResponse,
  SimilarQuestionResponse,
  MyQuestionResponse,
  PopularPostResponse,
  AnswerUpdateRequest,
  AnswerUpdateResponse,
  AnswerCreateRequest,
  AnswerCreateResponse,
  AnswerAdoptResponse,
  AnswerRecommendResponse,
  AnswerReportRequest,
  AnswerReportResponse,
  AnswerListResponse,
  CommentListResponse,
  CommentCreateRequest,
  CommentCreateResponse,
  AdditionalQuestionMessageRequest,
  AdditionalQuestionMessageResponse,
  AdditionalQuestionResponse,
  AIBestResponsesResponse,
} from '@/apis/qna/types';
import apiClient from '@/apis/core/apiClient';

export const createQuestion = async (
  data: QuestionCreateRequest,
): Promise<QuestionCreateResponse> => {
  const formData = new FormData();

  formData.append('questionTitle', data.questionTitle);
  formData.append('questionContent', data.questionContent);
  formData.append('questionCategory', String(data.questionCategory));
  formData.append('questionAnswerType', data.questionAnswerType);
  formData.append('questionDisclosureType', data.questionDisclosureType);

  if (data.images && data.images.length > 0) {
    data.images.forEach((file) => {
      formData.append('images', file);
    });
  }

  const response = await apiClient.post<APIResponse<QuestionCreateResponse>>(
    '/api/questions',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data.result;
};

export const updateQuestion = async (
  questionId: number,
  data: QuestionUpdateRequest,
): Promise<QuestionUpdateResponse> => {
  const formData = new FormData();

  if (data.content !== undefined) {
    formData.append('content', data.content);
  }

  if (data.title !== undefined) {
    formData.append('title', data.title);
  }

  if (data.questionCategoryId !== undefined) {
    formData.append('questionCategoryId', String(data.questionCategoryId));
  }

  if (data.deleteIds && data.deleteIds.length > 0) {
    data.deleteIds.forEach((id) => {
      formData.append('deleteIds', String(id));
    });
  }

  if (data.images && data.images.length > 0) {
    data.images.forEach((file) => {
      formData.append('images', file);
    });
  }

  const response = await apiClient.put<APIResponse<QuestionUpdateResponse>>(
    `/api/questions/${questionId}/modify`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data.result;
};

export const deleteQuestion = async (questionId: number): Promise<string> => {
  const response = await apiClient.delete<APIResponse<string>>(
    `/api/questions/${questionId}`,
  );
  return response.data.result;
};

export const fetchQuestions = async (
  categoryIds?: number[],
  keyword?: string,
  page: number = 0,
  size: number = 5,
  isAnswered: boolean = false,
): Promise<QuestionListResponse> => {
  const params: Record<string, string | number> = {
    page,
    size,
    isAnswered: isAnswered.toString(),
  };

  if (categoryIds && categoryIds.length > 0) {
    params.categoryIds = categoryIds.join(',');
  }

  if (keyword) {
    params.keyword = keyword;
  }

  const response = await apiClient.get<APIResponse<QuestionListResponse>>(
    '/api/questions',
    { params },
  );
  return response.data.result;
};

export const fetchQuestionDetail = async (
  questionId: number,
): Promise<QuestionDetailResponse> => {
  const response = await apiClient.get<APIResponse<QuestionDetailResponse>>(
    `/api/questions/${questionId}`,
  );
  return response.data.result;
};

export const reportQuestion = async (
  questionId: number,
  data: QuestionReportRequest,
): Promise<QuestionReportResponse> => {
  const response = await apiClient.post<APIResponse<QuestionReportResponse>>(
    `/api/questions/${questionId}/report`,
    data,
  );
  return response.data.result;
};

export const fetchCategoryRecommend = async (
  title: string,
): Promise<CategoryRecommendResponse> => {
  const response = await apiClient.get<APIResponse<CategoryRecommendResponse>>(
    '/api/questions/categories/recommend',
    {
      params: { title },
    },
  );
  return response.data.result;
};

export const fetchSimilarQuestions = async (
  title: string,
  content: string,
): Promise<SimilarQuestionResponse> => {
  const response = await apiClient.get<APIResponse<SimilarQuestionResponse>>(
    '/api/questions/similar',
    {
      params: { title, content },
    },
  );
  return response.data.result;
};

export const fetchMyQuestions = async (
  pageNum: number = 1,
  size: number = 5,
): Promise<MyQuestionResponse> => {
  const response = await apiClient.get<APIResponse<MyQuestionResponse>>(
    '/api/questions/my',
    {
      params: { pageNum, size },
    },
  );
  return response.data.result;
};

export const fetchPopularPosts = async (): Promise<PopularPostResponse> => {
  const response = await apiClient.get<APIResponse<PopularPostResponse>>(
    '/api/questions/popular-post',
  );
  return response.data.result;
};

export const updateAnswer = async (
  responseId: number,
  data: AnswerUpdateRequest,
): Promise<AnswerUpdateResponse> => {
  const formData = new FormData();

  if (data.content !== undefined) {
    formData.append('content', data.content);
  }

  if (data.deleteIds && data.deleteIds.length > 0) {
    data.deleteIds.forEach((id) => {
      formData.append('deleteIds', String(id));
    });
  }

  if (data.images && data.images.length > 0) {
    data.images.forEach((file) => {
      formData.append('images', file);
    });
  }

  const response = await apiClient.put<APIResponse<AnswerUpdateResponse>>(
    `/api/responses/answers/${responseId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data.result;
};

export const deleteAnswer = async (responseId: number): Promise<string> => {
  const response = await apiClient.delete<APIResponse<string>>(
    `/api/responses/answers/${responseId}`,
  );
  return response.data.result;
};

export const createAnswer = async (
  data: AnswerCreateRequest,
): Promise<AnswerCreateResponse> => {
  const formData = new FormData();

  formData.append('questionId', String(data.questionId));
  formData.append('responseContent', data.responseContent);

  if (data.images && data.images.length > 0) {
    data.images.forEach((file) => {
      formData.append('images', file);
    });
  }

  const response = await apiClient.post<APIResponse<AnswerCreateResponse>>(
    '/api/responses/answers',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data.result;
};

export const adoptAnswer = async (
  responseId: number,
): Promise<AnswerAdoptResponse> => {
  const response = await apiClient.post<APIResponse<AnswerAdoptResponse>>(
    `/api/responses/answers/${responseId}/adopt`,
  );
  return response.data.result;
};

export const recommendAnswer = async (
  responseId: number,
): Promise<AnswerRecommendResponse> => {
  const response = await apiClient.post<APIResponse<AnswerRecommendResponse>>(
    `/api/responses/answers/${responseId}/recommend`,
  );
  return response.data.result;
};

export const reportAnswer = async (
  responseId: number,
  data: AnswerReportRequest,
): Promise<AnswerReportResponse> => {
  const response = await apiClient.post<APIResponse<AnswerReportResponse>>(
    `/api/responses/answers/${responseId}/report`,
    data,
  );
  return response.data.result;
};

export const fetchAnswers = async (
  questionId: number,
  pageNum: number = 1,
  size: number = 5,
): Promise<AnswerListResponse> => {
  const response = await apiClient.get<APIResponse<AnswerListResponse>>(
    `/api/responses/${questionId}/responses`,
    {
      params: { pageNum, size },
    },
  );
  return response.data.result;
};

export const fetchComments = async (
  targetId: number,
  targetType: 'QUESTION' | 'RESPONSE',
  pageNum: number = 1,
  size: number = 5,
): Promise<CommentListResponse> => {
  const response = await apiClient.get<APIResponse<CommentListResponse>>(
    `/api/comments/${targetId}`,
    {
      params: { targetType, pageNum, size },
    },
  );
  return response.data.result;
};

export const createComment = async (
  data: CommentCreateRequest,
): Promise<CommentCreateResponse> => {
  const response = await apiClient.post<APIResponse<CommentCreateResponse>>(
    '/api/comments',
    data,
  );
  return response.data.result;
};

export const deleteComment = async (
  commentId: number,
  commentType: 'QUESTION' | 'RESPONSE',
): Promise<void> => {
  await apiClient.delete(`/api/comments/${commentId}`, {
    data: new URLSearchParams({ commentType }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const createAdditionalQuestionMessage = async (
  data: AdditionalQuestionMessageRequest,
): Promise<AdditionalQuestionMessageResponse> => {
  const formData = new FormData();

  formData.append('questionId', String(data.questionId));
  formData.append('responseId', String(data.responseId));
  formData.append('content', data.content);

  if (data.images && data.images.length > 0) {
    data.images.forEach((file) => {
      formData.append('images', file);
    });
  }

  const response = await apiClient.post<
    APIResponse<AdditionalQuestionMessageResponse>
  >('/api/additional-question/message', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.result;
};

export const fetchAdditionalQuestion = async (
  followUpRoomId: number,
  questionId: number,
): Promise<AdditionalQuestionResponse> => {
  const response = await apiClient.get<APIResponse<AdditionalQuestionResponse>>(
    `/api/additional-question/${followUpRoomId}`,
    {
      params: { questionId },
    },
  );
  return response.data.result;
};

export const fetchAIBestResponses =
  async (): Promise<AIBestResponsesResponse> => {
    const response =
      await apiClient.get<APIResponse<AIBestResponsesResponse>>(
        '/api/responses/ai',
      );
    return response.data.result;
  };
