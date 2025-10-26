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
  commentNum: number;
  canModify: boolean;
  canDelete: boolean;
  canWrite: boolean;
}

export interface Comment {
  id: number;
  content: string;
  author: string;
  authorProfileUrl?: string;
  createdAt: string;
  canModify: boolean;
  canDelete: boolean;
}

export interface Answer {
  id: number;
  content: string;
  author: string;
  authorProfileUrl?: string;
  createdAt: string;
  images?: string[];
  isAI?: boolean;
  commentNum: number;
  additionalMessageNum: number;
  canAdopt: boolean;
  canModify: boolean;
  canDelete: boolean;
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
