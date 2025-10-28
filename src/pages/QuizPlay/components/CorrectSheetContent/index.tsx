import React from 'react';
import * as S from '@/pages/QuizPlay/components/CorrectSheetContent/CorrectSheetContent.styles';
import Button from '@/components/Button';

interface CorrectSheetContentProps {
  explanation: React.ReactNode;
  onConfirm?: () => void;
  onClose: () => void;
}

const CorrectSheetContent: React.FC<CorrectSheetContentProps> = ({
  explanation,
  onConfirm,
  onClose,
}) => {
  return (
    <S.Container>
      <S.Content>{explanation}</S.Content>
      <S.Footer>
        {onConfirm ? (
          <>
            <Button variant="secondary" onClick={onClose} fullWidth>
              그만하기
            </Button>
            <Button variant="primary" onClick={onConfirm} fullWidth>
              계속하기
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={onClose} fullWidth>
            확인
          </Button>
        )}
      </S.Footer>
    </S.Container>
  );
};

export default CorrectSheetContent;
