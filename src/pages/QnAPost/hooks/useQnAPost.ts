import { useState, useCallback } from 'react';
import type { QnAPostForm } from '@/pages/QnAPost/types';
import type FileWithId from '@/types/FileWithId';
import { validateQnAPost } from '@/pages/QnAPost/validators';

interface UseQnAPostProps {
  initialType: 'question' | 'answer';
  questionId?: number;
  initialData?: Partial<QnAPostForm>;
  onSubmit: (data: QnAPostForm) => Promise<void>;
}

interface UseQnAPostReturn {
  formData: QnAPostForm;
  isSubmitting: boolean;
  validationErrors: ReturnType<typeof validateQnAPost>['errors'];
  handleInputChange: (
    field: keyof QnAPostForm,
    value: string | number | FileWithId[],
  ) => void;
  handleSubmit: () => Promise<void>;
  isSubmitDisabled: boolean;
}

const useQnAPost = ({
  initialType,
  questionId,
  initialData,
  onSubmit,
}: UseQnAPostProps): UseQnAPostReturn => {
  const [formData, setFormData] = useState<QnAPostForm>({
    type: initialType,
    categoryId: initialData?.categoryId,
    title: initialData?.title ?? (initialType === 'question' ? '' : undefined),
    content: initialData?.content ?? '',
    images: initialData?.images ?? [],
    questionId,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const validation = validateQnAPost(formData);
  const validationErrors = hasAttemptedSubmit ? validation.errors : {};

  const handleInputChange = useCallback(
    (field: keyof QnAPostForm, value: string | number | FileWithId[]) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    setHasAttemptedSubmit(true);

    if (!validation.isValid) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validation, onSubmit]);

  const isSubmitDisabled = isSubmitting;

  return {
    formData,
    isSubmitting,
    validationErrors,
    handleInputChange,
    handleSubmit,
    isSubmitDisabled,
  };
};

export default useQnAPost;
