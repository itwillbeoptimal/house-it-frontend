import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import useSubpageHeader from '@/hooks/useSubpageHeader';
import useModal from '@/hooks/useModal';
import useBottomSheet from '@/hooks/useBottomSheet';
import useQuizQuery from '@/hooks/queries/quiz/useQuizQuery';
import useQuizByCategoryIdQuery from '@/hooks/queries/quiz/useQuizByCategoryIdQuery';
import useTodayQuizIdQuery from '@/hooks/queries/quiz/useTodayQuizIdQuery';
import useQuizSubmitMutation from '@/hooks/mutations/quiz/useQuizSubmitMutation';
import useQuizPlay from '@/pages/QuizPlay/hooks/useQuizPlay';
import * as S from '@/pages/QuizPlay/QuizPlay.styles';
import Button from '@/components/Button';
import CorrectSheetContent from '@/pages/QuizPlay/components/CorrectSheetContent';
import CorrectMessage from '@/pages/QuizPlay/components/CorrectMessage';
import OIcon from '@/assets/icons/o.svg?react';
import XIcon from '@/assets/icons/x.svg?react';
import { QUIZ_CATEGORIES } from '@/constants/categories';

const QuizPlay: React.FC = () => {
  const { categoryId, quizId } = useParams<{
    categoryId: string;
    quizId: string;
  }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { alert, loading, closeModal } = useModal();
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();
  const [isReady, setIsReady] = useState(false);
  const [showCorrectMessage, setShowCorrectMessage] = useState(false);
  const [quizResult, setQuizResult] = useState<{ hasNext: boolean } | null>(
    null,
  );
  const correctMessageTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const isTodayQuiz = location.pathname === '/quiz/play/today';
  const isSolvedQuiz = location.pathname === '/quiz/play/solved';
  const numericCategoryId = categoryId ? Number(categoryId) : 0;

  let numericQuizId = 0;
  if (isSolvedQuiz) {
    numericQuizId = (location.state as { quizId?: number })?.quizId || 0;
  } else if (quizId) {
    numericQuizId = Number(quizId);
  }

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

  const { data: solvedQuiz, isLoading: isSolvedQuizLoading } =
    useQuizQuery(numericQuizId);

  let quiz;
  let isLoading;
  let refetch;

  if (isSolvedQuiz) {
    quiz = solvedQuiz;
    isLoading = isSolvedQuizLoading;
    refetch = undefined;
  } else if (isTodayQuiz) {
    quiz = todayQuiz;
    isLoading = isTodayIdLoading || isTodayQuizLoading;
    refetch = refetchTodayQuiz;
  } else {
    quiz = categoryQuiz;
    isLoading = isCategoryQuizLoading;
    refetch = refetchCategoryQuiz;
  }

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

  let headerTitle;
  if (isSolvedQuiz) {
    headerTitle = '퀴즈 다시 풀기';
  } else if (isTodayQuiz) {
    headerTitle = '오늘의 퀴즈';
  } else {
    headerTitle = `퀴즈 (${categoryTitle})`;
  }

  useSubpageHeader({
    title: headerTitle,
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

  useEffect(() => {
    return () => {
      if (correctMessageTimerRef.current) {
        clearTimeout(correctMessageTimerRef.current);
      }
    };
  }, []);

  const handleAnswerClick = (answerIndex: number) => {
    selectAnswer(answerIndex);
  };

  const handleSubmitSuccess = (hasNext: boolean) => {
    closeBottomSheet();
    if (hasNext) {
      nextQuestion();
      if (refetch) {
        refetch();
      }
    } else {
      navigate('/quiz');
    }
  };

  const openExplanationSheetWithResult = (result: { hasNext: boolean }) => {
    if (!quiz) return;

    const sheetContent = (
      <CorrectSheetContent
        explanation={quiz.explanation}
        onConfirm={
          isTodayQuiz || isSolvedQuiz
            ? undefined
            : () => handleSubmitSuccess(result.hasNext)
        }
        onClose={() => {
          closeBottomSheet();
          if (isSolvedQuiz) {
            navigate(-1);
          } else {
            navigate('/quiz');
          }
        }}
      />
    );

    openBottomSheet({
      id: 'quiz-correct',
      title: '정답 해설',
      content: sheetContent,
      disableBackdropClick: true,
    });
  };

  const handleCorrectMessageClose = () => {
    if (correctMessageTimerRef.current) {
      clearTimeout(correctMessageTimerRef.current);
      correctMessageTimerRef.current = null;
    }
    setShowCorrectMessage(false);
    if (quizResult) {
      openExplanationSheetWithResult(quizResult);
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

        setQuizResult(result);
        setShowCorrectMessage(true);

        correctMessageTimerRef.current = setTimeout(() => {
          setShowCorrectMessage(false);
          openExplanationSheetWithResult(result);
        }, 2500);
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
  const displayQuestionNumber = isSolvedQuiz ? 1 : questionNumber;

  return (
    <S.Container>
      {showCorrectMessage && (
        <CorrectMessage onClose={handleCorrectMessageClose} />
      )}
      <S.QuestionNumber>문제 {displayQuestionNumber}.</S.QuestionNumber>
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
          disabled={
            selectedAnswer === null ||
            (!isSolvedQuiz && submitMutation.isPending)
          }
          onClick={handleNextClick}
        >
          확인
        </Button>
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default QuizPlay;
