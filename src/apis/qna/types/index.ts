export interface ImageItem {
  imageId: number;
  imageUrl: string;
}

export interface QuestionCreateRequest {
  questionTitle: string;
  questionContent: string;
  questionCategory: number;
  questionAnswerType: 'INSTANT' | 'COMMUNITY';
  questionDisclosureType: 'PUBLIC' | 'PRIVATE';
  images?: File[];
}

export interface QuestionCreateResponse {
  questionId: number;
  questionTitle: string;
  questionContent: string;
  questionCategory: number;
  questionAnswerType: 'INSTANT' | 'COMMUNITY';
  questionWriterId: number;
  questionWriterName: string;
  images?: ImageItem[];
  createdAt: string;
}

export interface QuestionUpdateRequest {
  content?: string;
  deleteIds?: number[];
  title?: string;
  questionCategoryId?: number;
  images?: File[];
}

export interface QuestionUpdateResponse {
  questionId: number;
  questionTitle: string;
  questionContent: string;
  questionCategory: number;
  questionUrgency: boolean;
  questionAnswerType: string;
  questionDisclosureType: string;
  questionWriterId: number;
  questionWriterName: string;
  questionWriterProfile: string | null;
  images: ImageItem[];
  createdAt: string;
  commentNum: number | null;
}

export interface QuestionListItem {
  questionId: number;
  questionCategoryId: number;
  questionWriterName: string;
  questionWriterProfile: string;
  questionTitle: string;
  questionContent: string;
  questionAnswerType: 'INSTANT' | 'COMMUNITY';
  isAnswered: boolean;
  answerCount: number;
  createdAt: string;
}

export interface QuestionListResponse {
  questionListItems: QuestionListItem[];
  hasNext: boolean;
  currentPage: number | null;
  totalPageNum: number | null;
}

export interface QuestionDetailResponse {
  question: {
    questionId: number;
    questionTitle: string;
    questionContent: string;
    questionCategory: number;
    questionAnswerType: 'INSTANT' | 'COMMUNITY';
    questionWriterId: number;
    questionWriterName: string;
    questionWriterProfile: string;
    images?: ImageItem[];
    createdAt: string;
    commentNum: number;
  };
  authority: {
    canModify: boolean;
    canDelete: boolean;
    canWrite: boolean;
  };
}

export interface QuestionReportRequest {
  questionReportReason: number;
  questionReportContent: string;
}

export interface QuestionReportResponse {
  questionId: number;
  questionReportId: number;
  questionReportReason: number;
  questionReportContent: string;
  questionReportWriterId: number;
  createdAt: string;
}

export interface CategoryRecommendResponse {
  questionCategoryId: number;
  questionCategoryName: string;
}

export interface SimilarQuestionItem {
  questionId: number;
  questionTitle: string;
  questionContent: string;
  questionCategory: number;
  questionAnswerType: 'INSTANT' | 'COMMUNITY';
  isAnswered: boolean;
  createdAt: string;
}

export interface SimilarQuestionResponse {
  similarQuestionResponseDto: SimilarQuestionItem[];
}

export interface MyQuestionItem {
  questionId: number;
  categoryId: number;
  profileUrl: string | null;
  nickname: string;
  createdAt: string;
  title: string;
  content: string;
  isAnswered: boolean;
  answerCount: number;
}

export interface MyQuestionResponse {
  questions: MyQuestionItem[];
  hasNext: boolean;
  currentPage: number | null;
  totalPageNum: number | null;
}

export interface PopularPostItem {
  questionId: number;
  categoryId: number;
  profileUrl: string | null;
  nickname: string;
  createdAt: string;
  title: string;
  content: string;
  isAnswered: boolean;
  answerCount: number;
}

export interface PopularPostResponse {
  popularPostList: PopularPostItem[];
}

export interface AnswerUpdateRequest {
  content?: string;
  deleteIds?: number[];
  images?: File[];
}

export interface AnswerUpdateResponse {
  responseId: number;
  responseContent: string;
  questionId: number;
  responseWriterId: number;
  images: ImageItem[];
  createdAt: string;
}

export interface AnswerCreateRequest {
  questionId: number;
  responseContent: string;
  images?: File[];
}

export interface AnswerCreateResponse {
  responseId: number;
  responseContent: string;
  questionId: number;
  responseWriterId: number;
  createdAt: string;
}

export interface AnswerAdoptResponse {
  responseId: number;
  isAdopted: boolean;
}

export interface AnswerRecommendResponse {
  responseId: number;
  isRecommended: boolean;
  recommendCount: number;
}

export interface AnswerReportRequest {
  responseReportReason: number;
  responseReportContent: string;
}

export interface AnswerReportResponse {
  responseReportId: number;
  responseId: number;
  responseReportReason: number;
  responseReportContent: string;
  responseReportWriterId: number;
  createdAt: string;
}

export interface AnswerItem {
  responseId: number;
  responseWriterId: number;
  responseWriterName: string;
  responseWriterProfile: string;
  responseContent: string;
  responseAdopt: boolean;
  images?: ImageItem[];
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  isAi: boolean;
  commentNum: number;
  additionalMessageNum: number;
  authority: {
    canAdopt: boolean;
    canModify: boolean;
    canDelete: boolean;
  };
}

export interface AnswerListResponse {
  responses: AnswerItem[];
  hasNext: boolean;
  currentPage: number | null;
  totalPageNum: number | null;
}

export interface CommentItem {
  commentId: number;
  content: string;
  nickname: string;
  profileImage: string;
  createdAt: string;
  authority: {
    canModify: boolean;
    canDelete: boolean;
  };
}

export interface CommentListResponse {
  commentItemList: CommentItem[];
  hasNext: boolean;
  currentPage: number;
  totalPageNum: number;
}

export interface CommentCreateRequest {
  targetId: number;
  commentType: 'QUESTION' | 'RESPONSE';
  content: string;
}

export interface CommentCreateResponse {
  commentId: number;
  content: string;
  userName: string;
  createdAt: string;
}

export interface AdditionalQuestionMessageRequest {
  questionId: number;
  responseId: number;
  content: string;
  images?: File[];
}

export interface AdditionalQuestionMessageResponse {
  followUpRoomId: number;
  message: {
    isQuestioner: boolean;
    messageId: number;
    content: string;
    images?: string[];
    createdAt: string;
  };
}

export interface AdditionalQuestionMessage {
  isQuestioner: boolean;
  messageId: number;
  content: string;
  images?: string[];
  createdAt: string;
}

export interface AdditionalQuestionResponse {
  followUpRoomId: number;
  messageList: AdditionalQuestionMessage[];
  authority: {
    isThirdParty: boolean;
    canWrite: boolean;
  };
}

export interface AIBestResponseItem {
  questionId: number;
  responseId: number;
  title: string;
  content: string;
}

export interface AIBestResponsesResponse {
  aiBestResponseItemList: AIBestResponseItem[];
}
