import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useSubpageHeader from '@/hooks/useSubpageHeader';
import useSolvedQuizzesQuery from '@/hooks/queries/quiz/useSolvedQuizzesQuery';
import * as S from '@/pages/QuizArchive/QuizArchive.styles';
import CategoryTab from '@/components/CategoryTab';
import QuizCard from '@/pages/QuizArchive/components/QuizCard';
import Loader from '@/components/Loader';

const QuizArchive: React.FC = () => {
  useSubpageHeader({ title: '퀴즈 보관함' });

  const navigate = useNavigate();
  const observerRef = useRef<HTMLDivElement>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);

  const categoryIds = useMemo(() => {
    if (selectedCategoryId === 0) {
      return [1, 2, 3, 4, 5, 6, 7, 8];
    }
    return [selectedCategoryId];
  }, [selectedCategoryId]);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSolvedQuizzesQuery(categoryIds);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleFilterChange = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  const handleQuizClick = (quizId: number) => {
    navigate('/quiz/play/solved', { state: { quizId } });
  };

  if (isLoading) {
    return (
      <S.Container>
        <S.TabWrapper>
          <CategoryTab activeTab="quiz" onFilterChange={handleFilterChange} />
        </S.TabWrapper>
        <S.EmptyState>
          <Loader />
        </S.EmptyState>
      </S.Container>
    );
  }

  if (isError) {
    return (
      <S.Container>
        <S.TabWrapper>
          <CategoryTab activeTab="quiz" onFilterChange={handleFilterChange} />
        </S.TabWrapper>
        <S.EmptyState>
          <S.EmptyMessage>
            퀴즈를 불러오는 중 오류가 발생했습니다.
          </S.EmptyMessage>
        </S.EmptyState>
      </S.Container>
    );
  }

  const quizzes = data?.pages.flatMap((page) => page.attemptQuiz) || [];

  return (
    <S.Container>
      <S.TabWrapper>
        <CategoryTab activeTab="quiz" onFilterChange={handleFilterChange} />
      </S.TabWrapper>
      <S.ContentArea>
        {quizzes.length > 0 ? (
          <>
            <S.QuizList>
              {quizzes.map((quiz) => (
                <QuizCard
                  key={quiz.quizId}
                  id={quiz.quizId}
                  title={quiz.quizTitle}
                  onClick={handleQuizClick}
                />
              ))}
            </S.QuizList>
            {isFetchingNextPage && (
              <S.EmptyState>
                <Loader />
              </S.EmptyState>
            )}
          </>
        ) : (
          <S.EmptyState>
            <S.EmptyMessage>풀었던 퀴즈가 없습니다.</S.EmptyMessage>
          </S.EmptyState>
        )}
      </S.ContentArea>
      <S.ObserverTrigger ref={observerRef} />
    </S.Container>
  );
};

export default QuizArchive;
