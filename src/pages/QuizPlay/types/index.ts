export interface QuizQuestion {
  id: number;
  categoryId: number;
  type: 'ox' | 'multiple';
  question: string;
  options?: string[];
  correctAnswer: number;
  explanation: string;
}
