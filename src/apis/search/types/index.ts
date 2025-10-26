export type SearchType = 'all' | 'magazine' | 'question';

export interface SearchResult {
  questions: QuestionSearchItem[];
  magazines: MagazineSearchItem[];
  questionHasNext: boolean;
  magazineHasNext: boolean;
}

export interface MagazineSearchResult {
  magazineListItems: MagazineSearchItem[];
  currentPage: number;
  hasNext: boolean;
}

export interface QuestionSearchResult {
  questionListItems: QuestionSearchItem[];
  hasNext: boolean;
  currentPage: number;
  totalPageNum: number;
}

export interface QuestionSearchItem {
  questionId: number;
  questionCategoryId: number;
  questionWriterName: string;
  questionWriterProfile: string;
  questionTitle: string;
  questionContent: string;
  questionUrgency: boolean;
  questionAnswerType: string;
  isAnswered: boolean;
  answerCount: number;
  createdAt: string;
}

export interface MagazineSearchItem {
  magazineId: number;
  magazineCategoryId: number;
  magazineTitle: string;
  magazineSubtitle: string;
  magazineAuthor: string;
  authorProfileUrl: string;
  magazineThumbnailUrl: string;
  createdAt: string;
}

export interface RecommendTermsResponse {
  terms: string[];
}

export interface AutocompleteResponse {
  query: string;
  results: Array<{
    keyword: string;
    answer_count: number;
    popularity_score: number;
  }>;
  total: number;
  search_type: string;
  took_ms: number;
}
