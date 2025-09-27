import React from 'react';
import useHeaderButton from '@/hooks/useHeaderButton';
import * as S from '@/pages/Quiz/Quiz.styles';
import Banner from '@/pages/Quiz/components/Banner';
import QuizCategoryCard from '@/pages/Quiz/components/QuizCategoryCard';
import BoxIcon from '@/assets/icons/box.svg?react';
import { QUIZ_CATEGORIES } from '@/constants/categories';
import { QUIZ_PROGRESS_MOCK_DATA } from '@/constants/mockData/quizData';

const Quiz: React.FC = () => {
  useHeaderButton(
    <button type="button">
      <BoxIcon />
    </button>,
  );

  return (
    <S.Container>
      <Banner />
      <S.CategoryGrid>
        {Object.entries(QUIZ_PROGRESS_MOCK_DATA).map(([id, progress]) => {
          const categoryId = Number(id);
          const category =
            QUIZ_CATEGORIES[categoryId as keyof typeof QUIZ_CATEGORIES];

          return (
            <QuizCategoryCard
              key={id}
              id={categoryId}
              title={category?.title}
              iconUrl={category?.iconUrl}
              solvedCount={progress.solvedCount}
              totalCount={progress.totalCount}
            />
          );
        })}
      </S.CategoryGrid>
    </S.Container>
  );
};

export default Quiz;
