export interface QnADetail {
  id: number;
  categoryId: number;
  title: string;
  content: string;
  author: string;
  authorProfileUrl?: string;
  createdAt: string;
  answerCount: number;
  isAnswered: boolean;
  images?: string[];
  commentCount: number;
}

export interface Comment {
  id: number;
  content: string;
  author: string;
  authorProfileUrl?: string;
  createdAt: string;
}

export interface Answer {
  id: number;
  content: string;
  author: string;
  authorProfileUrl?: string;
  createdAt: string;
  images?: string[];
  isAI?: boolean;
  commentCount: number;
  followUpQuestionCount: number;
}

export interface FollowUpQuestion {
  id: number;
  content: string;
  author: string;
  authorProfileUrl?: string;
  createdAt: string;
  isAnswered: boolean;
  answer?: {
    id: number;
    content: string;
    author: string;
    authorProfileUrl?: string;
    createdAt: string;
    isAI?: boolean;
  };
}
