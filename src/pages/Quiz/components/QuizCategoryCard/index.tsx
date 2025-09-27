import React from 'react';
import * as S from '@/pages/Quiz/components/QuizCategoryCard/QuizCategoryCard.styles';

interface QuizCategoryCardProps {
  id: number;
  title: string;
  iconUrl: string;
  solvedCount: number;
  totalCount: number;
  onClick?: (id: number) => void;
}

const QuizCategoryCard: React.FC<QuizCategoryCardProps> = ({
  id,
  title,
  iconUrl,
  solvedCount,
  totalCount,
  onClick,
}) => {
  const handleClick = () => {
    onClick?.(id);
  };

  const percentage =
    totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

  return (
    <S.Container onClick={handleClick}>
      <S.IconImage src={iconUrl} alt={title} />
      <S.CategoryTitle>{title}</S.CategoryTitle>
      <S.ProgressContainer>
        <S.ProgressBar>
          <S.ProgressFill percentage={percentage} />
        </S.ProgressBar>
        <S.ProgressText>
          {solvedCount}/{totalCount}
        </S.ProgressText>
      </S.ProgressContainer>
    </S.Container>
  );
};

export default QuizCategoryCard;
