import type FileWithId from '@/types/FileWithId';

export interface QnAPostForm {
  type: 'question' | 'answer';
  categoryId?: number;
  title?: string;
  content: string;
  images: FileWithId[];
  questionId?: number;
}

export interface Category {
  id: number;
  name: string;
}
