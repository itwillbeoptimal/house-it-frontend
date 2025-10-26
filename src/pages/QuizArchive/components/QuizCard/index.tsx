import React from 'react';
import * as S from '@/pages/QuizArchive/components/QuizCard/QuizCard.styles';
import ArrowIcon from '@/assets/icons/arrow.svg?react';

interface QuizCardProps {
  id: number;
  title: string;
  onClick?: (id: number) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ id, title, onClick }) => {
  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <S.Container onClick={handleClick}>
      <S.Title>{title}</S.Title>
      <S.IconWrapper>
        <ArrowIcon />
      </S.IconWrapper>
    </S.Container>
  );
};

export default QuizCard;
