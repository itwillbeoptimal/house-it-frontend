import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import useSubpageHeader from '@/hooks/useSubpageHeader';
import useModal from '@/hooks/useModal';
import useQuizQuery from '@/hooks/queries/quiz/useQuizQuery';
import useQuizByCategoryIdQuery from '@/hooks/queries/quiz/useQuizByCategoryIdQuery';
import useTodayQuizIdQuery from '@/hooks/queries/quiz/useTodayQuizIdQuery';
import useQuizSubmitMutation from '@/hooks/mutations/quiz/useQuizSubmitMutation';
import useQuizPlay from '@/pages/QuizPlay/hooks/useQuizPlay';
import * as S from '@/pages/QuizPlay/QuizPlay.styles';
import Button from '@/components/Button';
import CorrectModalContent from '@/pages/QuizPlay/components/CorrectModalContent';
import OIcon from '@/assets/icons/o.svg?react';
import XIcon from '@/assets/icons/x.svg?react';
import CorrectImage from '@/assets/images/correct.png';
import { QUIZ_CATEGORIES } from '@/constants/categories';

const QuizPlay: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { openModal, closeModal, alert, loading } = useModal();
  const [isReady, setIsReady] = useState(false);

  const isTodayQuiz = location.pathname === '/quiz/play/today';
  const numericCategoryId = categoryId ? Number(categoryId) : 0;

  const { data: todayQuizId, isLoading: isTodayIdLoading } =
    useTodayQuizIdQuery();

  const {
    data: todayQuiz,
    isLoading: isTodayQuizLoading,
    refetch: refetchTodayQuiz,
  } = useQuizQuery(todayQuizId?.quizId || 0);

  const {
    data: categoryQuiz,
    isLoading: isCategoryQuizLoading,
    refetch: refetchCategoryQuiz,
    isError: isCategoryQuizError,
    error: categoryQuizError,
  } = useQuizByCategoryIdQuery(numericCategoryId);

  const quiz = isTodayQuiz ? todayQuiz : categoryQuiz;
  const isLoading = isTodayQuiz
    ? isTodayIdLoading || isTodayQuizLoading
    : isCategoryQuizLoading;
  const refetch = isTodayQuiz ? refetchTodayQuiz : refetchCategoryQuiz;

  const submitMutation = useQuizSubmitMutation();

  const {
    questionNumber,
    selectedAnswer,
    animatingButton,
    nextQuestion,
    selectAnswer,
    startAnimation,
    stopAnimation,
  } = useQuizPlay();

  const categoryTitle =
    QUIZ_CATEGORIES[numericCategoryId as keyof typeof QUIZ_CATEGORIES]?.title;

  useSubpageHeader({
    title: isTodayQuiz ? '오늘의 퀴즈' : `퀴즈 (${categoryTitle})`,
  });

  useEffect(() => {
    if (isCategoryQuizError && categoryQuizError) {
      const { errorCode } = categoryQuizError.response?.data as {
        errorCode?: string;
      };
      if (errorCode === 'QUIZ_ERR_003') {
        alert({
          title: '알림',
          content: '해당 카테고리의 퀴즈를 모두 풀었습니다.',
          onConfirm: () => navigate('/quiz'),
        });
      }
    }
  }, [isCategoryQuizError, categoryQuizError]);

  useEffect(() => {
    if (isLoading) {
      const startTime = Date.now();
      setIsReady(false);
      loading({
        loadingText: '문제를 불러오고 있어요.',
        disableBackdropClick: true,
      });

      return () => {
        const elapsed = Date.now() - startTime;
        setTimeout(
          () => {
            closeModal('loading-modal');
            setIsReady(true);
          },
          Math.max(0, 500 - elapsed),
        );
      };
    }
    return undefined;
  }, [isLoading]);

  useEffect(() => {
    if (quiz && isReady) {
      selectAnswer(null);
      stopAnimation();
    }
  }, [quiz, isReady]);

  const handleAnswerClick = (answerIndex: number) => {
    selectAnswer(answerIndex);
  };

  const handleSubmitSuccess = (hasNext: boolean) => {
    closeModal();
    if (hasNext) {
      nextQuestion();
      refetch();
    } else {
      navigate('/quiz');
    }
  };

  const handleNextClick = async () => {
    if (selectedAnswer === null || !quiz) return;

    const userAnswer = String(selectedAnswer);
    const isCorrect = userAnswer === quiz.correctAnswer;

    if (isCorrect) {
      try {
        const result = await submitMutation.mutateAsync({
          quizId: quiz.id,
          answer: userAnswer,
        });
        const modalContent = (
          <CorrectModalContent
            title="정답입니다!"
            image={CorrectImage}
            explanation={quiz.explanation}
            onConfirm={
              isTodayQuiz
                ? undefined
                : () => handleSubmitSuccess(result.hasNext)
            }
            onClose={() => {
              closeModal();
              navigate('/quiz');
            }}
          />
        );
        openModal({
          id: 'quiz-correct',
          content: modalContent,
          disableBackdropClick: true,
        });
      } catch {
        alert({
          title: '퀴즈 제출 실패',
          content: '퀴즈를 제출하는 중 오류가 발생했습니다.',
        });
      }
    } else {
      startAnimation(selectedAnswer);
      setTimeout(() => {
        stopAnimation();
      }, 500);
    }
  };

  if (!isReady || !quiz) {
    return null;
  }

  const isOXQuiz = quiz.type === 'OX';

  return (
    <S.Container>
      <S.QuestionNumber>문제 {questionNumber}.</S.QuestionNumber>
      <S.Question>{quiz.question}</S.Question>
      <S.AnswerGrid type={isOXQuiz ? 'ox' : 'multiple'}>
        {isOXQuiz ? (
          <>
            <S.AnswerButton
              onClick={() => handleAnswerClick(0)}
              animate={animatingButton === 0}
              isOX
              isSelected={selectedAnswer === 0}
            >
              <OIcon />
            </S.AnswerButton>
            <S.AnswerButton
              onClick={() => handleAnswerClick(1)}
              animate={animatingButton === 1}
              isOX
              isSelected={selectedAnswer === 1}
            >
              <XIcon />
            </S.AnswerButton>
          </>
        ) : (
          quiz.options?.map((option: string, index: number) => (
            <S.AnswerButton
              key={`${quiz.id}-${option}`}
              onClick={() => handleAnswerClick(index)}
              animate={animatingButton === index}
              isSelected={selectedAnswer === index}
            >
              {option}
            </S.AnswerButton>
          ))
        )}
      </S.AnswerGrid>
      <S.ButtonWrapper>
        <Button
          fullWidth
          size="large"
          disabled={selectedAnswer === null || submitMutation.isPending}
          onClick={handleNextClick}
        >
          다음
        </Button>
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default QuizPlay;
