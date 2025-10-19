import { useState } from 'react';

const useQuizPlay = () => {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [animatingButton, setAnimatingButton] = useState<number | null>(null);

  const resetAnswerState = () => {
    setSelectedAnswer(null);
    setAnimatingButton(null);
  };

  const nextQuestion = () => {
    setQuestionNumber((prev) => prev + 1);
    resetAnswerState();
  };

  const selectAnswer = (answerIndex: number | null) => {
    setSelectedAnswer(answerIndex);
  };

  const startAnimation = (buttonIndex: number) => {
    setAnimatingButton(buttonIndex);
  };

  const stopAnimation = () => {
    setAnimatingButton(null);
  };

  return {
    questionNumber,
    selectedAnswer,
    animatingButton,
    resetAnswerState,
    nextQuestion,
    selectAnswer,
    startAnimation,
    stopAnimation,
  };
};

export default useQuizPlay;
