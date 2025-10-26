import type { QnAPostForm } from '@/pages/QnAPost/types';
import {
  TITLE_MAX_LENGTH,
  CONTENT_MAX_LENGTH,
  MAX_IMAGES,
} from '@/pages/QnAPost/constants';

export interface ValidationResult {
  isValid: boolean;
  errors: {
    title?: string;
    content?: string;
    categoryId?: string;
    images?: string;
  };
}

export const validateQnAPost = (formData: QnAPostForm): ValidationResult => {
  const errors: ValidationResult['errors'] = {};

  if (formData.type === 'question') {
    if (!formData.title?.trim()) {
      errors.title = '제목을 입력해 주세요';
    } else if (formData.title.length > TITLE_MAX_LENGTH) {
      errors.title = `제목은 ${TITLE_MAX_LENGTH}자 이하로 입력해 주세요`;
    }
  }

  if (!formData.content.trim()) {
    errors.content = '내용을 입력해 주세요';
  } else if (formData.content.length > CONTENT_MAX_LENGTH) {
    errors.content = `내용은 ${CONTENT_MAX_LENGTH}자 이하로 입력해 주세요`;
  }

  if (formData.images.length > MAX_IMAGES) {
    errors.images = `이미지는 최대 ${MAX_IMAGES}개까지 업로드할 수 있습니다`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
