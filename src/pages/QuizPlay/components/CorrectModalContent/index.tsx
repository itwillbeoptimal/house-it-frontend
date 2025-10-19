import React from 'react';
import * as S from '@/pages/QuizPlay/components/CorrectModalContent/CorrectModalContent.styles';
import Button from '@/components/Button';

interface CorrectModalContentProps {
  title: string;
  image?: string;
  explanation: React.ReactNode;
  onConfirm?: () => void;
  onClose: () => void;
}

const CorrectModalContent: React.FC<CorrectModalContentProps> = ({
  title,
  image,
  explanation,
  onConfirm,
  onClose,
}) => {
  return (
    <S.Container>
      <S.Header>
        <S.ImageWrapper>
          <S.Image src={image} alt="정답 이미지" />
        </S.ImageWrapper>
        <S.Title>{title}</S.Title>
      </S.Header>
      <S.Content>{explanation}</S.Content>
      <S.Footer>
        {onConfirm ? (
          <>
            <S.FooterButtonWrapper>
              <Button variant="secondary" onClick={onClose} fullWidth>
                그만하기
              </Button>
            </S.FooterButtonWrapper>
            <S.FooterButtonWrapper>
              <Button variant="primary" onClick={onConfirm} fullWidth>
                계속하기
              </Button>
            </S.FooterButtonWrapper>
          </>
        ) : (
          <S.FooterButtonWrapper>
            <Button variant="primary" onClick={onClose} fullWidth>
              확인
            </Button>
          </S.FooterButtonWrapper>
        )}
      </S.Footer>
    </S.Container>
  );
};

export default CorrectModalContent;
