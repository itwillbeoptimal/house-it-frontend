export interface CategoryStatistic {
  categoryId: number;
  quizTotalNum: number;
  quizSolvedNum: number;
}

export type CategoryStatisticsResponse = CategoryStatistic[];

export interface QuizResponse {
  id: number;
  categoryId: number;
  question: string;
  type: 'MULTIPLE' | 'OX';
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface QuizSubmitResponse {
  hasNext: boolean;
}

export interface TodayQuizResponse {
  quizId: number;
}

export interface AttemptQuizItem {
  quizId: number;
  quizTitle: string;
}

export interface SolvedQuizResponse {
  attemptQuiz: AttemptQuizItem[];
  hasNext: boolean;
}
