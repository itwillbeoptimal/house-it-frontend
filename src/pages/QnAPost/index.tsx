import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import type { QnAPostForm } from '@/pages/QnAPost/types';
import useSubpageHeader from '@/hooks/useSubpageHeader';
import useModal from '@/hooks/useModal';
import useQnAPost from '@/pages/QnAPost/hooks/useQnAPost';
import {
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
} from '@/hooks/mutations/qna/useQuestionMutations';
import {
  useCreateAnswerMutation,
  useUpdateAnswerMutation,
} from '@/hooks/mutations/qna/useAnswerMutations';
import useQuestionDetailQuery from '@/hooks/queries/qna/useQuestionDetailQuery';
import * as S from '@/pages/QnAPost/QnAPost.styles';
import Select from '@/components/Select';
import Input from '@/components/Input';
import ImageUpload from '@/pages/QnAPost/components/ImageUpload';
import Button from '@/components/Button';
import {
  TITLE_MAX_LENGTH,
  CONTENT_MAX_LENGTH,
} from '@/pages/QnAPost/constants';
import { QNA_CATEGORIES } from '@/constants/categories';
import RequiredIcon from '@/assets/icons/required.svg?react';

interface QnAPostProps {
  mode?: 'create' | 'edit';
  initialData?: Partial<QnAPostForm>;
  onSubmit?: (data: QnAPostForm) => Promise<void>;
}

interface ImageDetail {
  imageId: number;
  imageUrl: string;
}

interface AnswerData {
  responseId: number;
  responseContent: string;
  images: ImageDetail[];
}

const QnAPost: React.FC<QnAPostProps> = ({
  mode = 'create',
  initialData,
  onSubmit,
}) => {
  const { questionId, answerId } = useParams<{
    questionId?: string;
    answerId?: string;
  }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { alert } = useModal();

  const createQuestionMutation = useCreateQuestionMutation();
  const updateQuestionMutation = useUpdateQuestionMutation();
  const createAnswerMutation = useCreateAnswerMutation();
  const updateAnswerMutation = useUpdateAnswerMutation();

  const numericQuestionId = questionId ? parseInt(questionId, 10) : undefined;
  const numericAnswerId = answerId ? parseInt(answerId, 10) : undefined;

  const { data: questionData } = useQuestionDetailQuery(numericQuestionId || 0);

  const answerData = React.useMemo((): AnswerData | null => {
    const stateData = location.state?.answerData;
    if (stateData) {
      return {
        responseId: stateData.id,
        responseContent: stateData.content,
        images: stateData.imageDetails || [],
      };
    }
    return null;
  }, [location.state]);

  const getPostType = () => {
    if (initialData?.type) return initialData.type;
    if (mode === 'edit' && answerId) return 'answer';
    if (mode === 'edit' && !answerId) return 'question';
    if (questionId) return 'answer';
    return 'question';
  };

  const postType = getPostType();
  const isEditMode = mode === 'edit';

  const editInitialData = React.useMemo(() => {
    if (!isEditMode) return initialData;

    if (postType === 'question' && questionData) {
      return {
        type: 'question' as const,
        categoryId: questionData.question.questionCategory,
        title: questionData.question.questionTitle,
        content: questionData.question.questionContent,
        images: questionData.question.images
          ? questionData.question.images.map((img, idx) => ({
              id: img.imageId || idx,
              file: new File([], img.imageUrl),
              preview: img.imageUrl,
            }))
          : [],
        questionId: numericQuestionId,
        ...initialData,
      };
    }

    if (postType === 'answer' && answerData) {
      return {
        type: 'answer' as const,
        content: answerData.responseContent,
        images: answerData.images
          ? answerData.images.map((img: ImageDetail, idx: number) => ({
              id: img.imageId || idx,
              file: new File([], img.imageUrl),
              preview: img.imageUrl,
            }))
          : [],
        questionId: numericQuestionId,
        ...initialData,
      };
    }

    return initialData;
  }, [
    isEditMode,
    postType,
    questionData,
    answerData,
    initialData,
    numericQuestionId,
  ]);

  const getHeaderTitle = () => {
    if (isEditMode) {
      return postType === 'question' ? '질문 수정' : '답변 수정';
    }
    return postType === 'question' ? '질문 작성' : '답변 작성';
  };

  useSubpageHeader({
    title: getHeaderTitle(),
  });

  const {
    formData,
    validationErrors,
    handleInputChange,
    handleSubmit,
    isSubmitDisabled,
  } = useQnAPost({
    initialType: postType,
    questionId: numericQuestionId,
    initialData: editInitialData,
    onSubmit: async (data) => {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        try {
          let targetQuestionId = numericQuestionId;

          if (data.type === 'question') {
            if (!data.title || !data.categoryId) {
              throw new Error('필수 항목을 입력해주세요.');
            }

            if (isEditMode && numericQuestionId) {
              const existingImageIds = data.images
                .filter((img) => typeof img.id === 'number' && img.id > 0)
                .map((img) => img.id);

              const deleteIds =
                questionData?.question.images
                  ?.filter(
                    (img: ImageDetail) =>
                      !existingImageIds.includes(img.imageId),
                  )
                  .map((img: ImageDetail) => img.imageId) || [];

              const newImages = data.images.filter(
                (img) => !existingImageIds.includes(img.id),
              );

              await updateQuestionMutation.mutateAsync({
                questionId: numericQuestionId,
                data: {
                  title: data.title,
                  content: data.content,
                  questionCategoryId: data.categoryId,
                  ...(deleteIds.length > 0 && { deleteIds }),
                  ...(newImages.length > 0 && {
                    images: newImages.map((img) => img.file),
                  }),
                },
              });
            } else {
              const response = await createQuestionMutation.mutateAsync({
                questionTitle: data.title,
                questionContent: data.content,
                questionCategory: data.categoryId,
                questionAnswerType: 'COMMUNITY',
                questionDisclosureType: 'PUBLIC',
                ...(data.images.length > 0 && {
                  images: data.images.map((img) => img.file),
                }),
              });

              targetQuestionId = response.questionId;
            }
          } else {
            if (!numericQuestionId) {
              throw new Error('질문 ID가 필요합니다.');
            }

            if (isEditMode && numericAnswerId) {
              const existingImageIds = data.images
                .filter((img) => typeof img.id === 'number' && img.id > 0)
                .map((img) => img.id);

              const deleteIds =
                answerData?.images
                  ?.filter((img) => !existingImageIds.includes(img.imageId))
                  .map((img) => img.imageId) || [];

              const newImages = data.images.filter(
                (img) => !existingImageIds.includes(img.id),
              );

              await updateAnswerMutation.mutateAsync({
                responseId: numericAnswerId,
                data: {
                  content: data.content,
                  ...(deleteIds.length > 0 && { deleteIds }),
                  ...(newImages.length > 0 && {
                    images: newImages.map((img) => img.file),
                  }),
                },
              });
            } else {
              await createAnswerMutation.mutateAsync({
                questionId: numericQuestionId,
                responseContent: data.content,
                ...(data.images.length > 0 && {
                  images: data.images.map((img) => img.file),
                }),
              });
            }
          }

          const actionType = isEditMode ? '수정' : '등록';
          const contentType = data.type === 'question' ? '질문' : '답변';
          alert({
            title: `${contentType} ${actionType} 완료`,
            content: `${contentType}이 성공적으로 ${actionType}되었습니다.`,
            onConfirm: () => {
              navigate(`/qna/${targetQuestionId}`);
            },
          });
        } catch {
          alert({
            title: '오류',
            content: '작성 중 오류가 발생했습니다.',
          });
        }
      }
    },
  });

  const handleCancel = () => {
    navigate(-1);
  };

  const isQuestionForm = postType === 'question';
  const titleLength = formData.title?.length || 0;
  const contentLength = formData.content.length;

  return (
    <S.Container>
      <S.FormContainer>
        {isQuestionForm && (
          <S.FormSection>
            <S.LabelContainer>
              <S.Label>
                카테고리
                <S.Required>
                  <RequiredIcon />
                </S.Required>
              </S.Label>
            </S.LabelContainer>
            <Select
              value={formData.categoryId || ''}
              onChange={(e) =>
                handleInputChange('categoryId', parseInt(e.target.value, 10))
              }
            >
              <option value="">카테고리를 선택하세요</option>
              {Object.entries(QNA_CATEGORIES).map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Select>
            {validationErrors.categoryId && (
              <S.ErrorMessage>{validationErrors.categoryId}</S.ErrorMessage>
            )}
          </S.FormSection>
        )}
        {isQuestionForm && (
          <S.FormSection>
            <S.LabelContainer>
              <S.Label>
                제목
                <S.Required>
                  <RequiredIcon />
                </S.Required>
              </S.Label>
              <S.CharacterCount isOverLimit={titleLength > TITLE_MAX_LENGTH}>
                {titleLength}/{TITLE_MAX_LENGTH}
              </S.CharacterCount>
            </S.LabelContainer>
            <Input
              type="text"
              placeholder="질문의 제목을 입력하세요"
              value={formData.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
              maxLength={TITLE_MAX_LENGTH + 10}
              hasError={!!validationErrors.title}
            />
            {validationErrors.title && (
              <S.ErrorMessage>{validationErrors.title}</S.ErrorMessage>
            )}
          </S.FormSection>
        )}
        <S.FormSection>
          <S.LabelContainer>
            <S.Label>
              내용
              <S.Required>
                <RequiredIcon />
              </S.Required>
            </S.Label>
            <S.CharacterCount isOverLimit={contentLength > CONTENT_MAX_LENGTH}>
              {contentLength}/{CONTENT_MAX_LENGTH}
            </S.CharacterCount>
          </S.LabelContainer>
          <S.TextArea
            placeholder={
              isQuestionForm
                ? '궁금한 내용을 자세히 설명해주세요. 상황과 맥락을 포함하면 더 정확한 답변을 받을 수 있습니다.'
                : '도움이 될 수 있는 답변을 작성해주세요. 구체적이고 명확한 설명을 포함해주세요.'
            }
            value={formData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            maxLength={CONTENT_MAX_LENGTH + 10}
            hasError={!!validationErrors.content}
          />
          {validationErrors.content && (
            <S.ErrorMessage>{validationErrors.content}</S.ErrorMessage>
          )}
        </S.FormSection>
        <S.FormSection>
          <S.Label>이미지 첨부</S.Label>
          <S.ImageUploadWrapper>
            <ImageUpload
              images={formData.images}
              onImagesChange={(images) => handleInputChange('images', images)}
              accept="image/*"
            />
          </S.ImageUploadWrapper>
          {validationErrors.images && (
            <S.ErrorMessage>{validationErrors.images}</S.ErrorMessage>
          )}
        </S.FormSection>
        <S.ButtonsWrapper>
          <S.ButtonWrapper>
            <Button variant="secondary" fullWidth onClick={handleCancel}>
              취소
            </Button>
          </S.ButtonWrapper>
          <S.ButtonWrapper>
            <Button
              variant="primary"
              fullWidth
              onClick={handleSubmit}
              disabled={isSubmitDisabled}
            >
              {isEditMode ? '수정' : '등록'}
            </Button>
          </S.ButtonWrapper>
        </S.ButtonsWrapper>
      </S.FormContainer>
    </S.Container>
  );
};

export default QnAPost;
