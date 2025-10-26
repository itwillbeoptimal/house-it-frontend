import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCategoryStatisticsQuery from '@/hooks/queries/quiz/useCategoryStatisticsQuery';
import * as S from '@/pages/Quiz/Quiz.styles';
import Banner from '@/pages/Quiz/components/Banner';
import QuizCategoryCard from '@/pages/Quiz/components/QuizCategoryCard';
import { QUIZ_CATEGORIES } from '@/constants/categories';

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const { data: statistics, isLoading: isLoadingStatistics } =
    useCategoryStatisticsQuery();

  const handleBannerClick = () => {
    navigate('/quiz/play/today');
  };

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/quiz/play/${categoryId}`);
  };

  if (isLoadingStatistics) {
    return null;
  }

  const stats = statistics || [];

  return (
    <S.Container>
      <Banner onClick={handleBannerClick} />
      <S.CategoryGrid>
        {stats.map((stat) => {
          const category =
            QUIZ_CATEGORIES[stat.categoryId as keyof typeof QUIZ_CATEGORIES];

          if (!category) return null;

          return (
            <QuizCategoryCard
              key={stat.categoryId}
              id={stat.categoryId}
              title={category.title}
              iconUrl={category.iconUrl}
              solvedCount={stat.quizSolvedNum}
              totalCount={stat.quizTotalNum}
              onClick={handleCategoryClick}
            />
          );
        })}
      </S.CategoryGrid>
    </S.Container>
  );
};

export default Quiz;
