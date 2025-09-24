export interface QnAItem {
  id: number;
  categoryId: number;
  title: string;
  content: string;
  author: string;
  authorProfileUrl?: string;
  createdAt: string;
  answerCount: number;
  isAnswered: boolean;
}

export interface PopularQnAItem {
  id: number;
  categoryId: number;
  title: string;
  content: string;
  author: string;
  authorProfileUrl?: string;
  createdAt: string;
  answerCount: number;
  isAnswered: boolean;
}
