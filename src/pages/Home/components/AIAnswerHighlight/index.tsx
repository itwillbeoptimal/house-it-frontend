import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '@/pages/Home/components/AIAnswerHighlight/AIAnswerHighlight.styles';
import SparkleIcon from '@/assets/icons/sparkle.svg?react';
import ArrowIcon from '@/assets/icons/arrow.svg?react';

interface AIAnswer {
  id: number;
  questionId: number;
  categoryId: number;
  question: string;
  answer: string;
}

interface AIAnswerHighlightProps {
  answers: AIAnswer[];
}

const AIAnswerHighlight: React.FC<AIAnswerHighlightProps> = ({ answers }) => {
  const navigate = useNavigate();

  const handleCardClick = (questionId: number) => {
    navigate(`/qna/${questionId}`);
  };

  return (
    <S.Container>
      <S.CardList>
        {answers.map((item) => (
          <S.Card
            key={item.id}
            onClick={() => handleCardClick(item.questionId)}
          >
            <S.CardInner>
              <S.AIBadge>
                <SparkleIcon />
                AI
              </S.AIBadge>
              <S.Question>{item.question}</S.Question>
              <S.AnswerWrapper>
                <S.Answer>{item.answer}</S.Answer>
              </S.AnswerWrapper>
              <S.ViewDetail>
                자세히 보기
                <ArrowIcon />
              </S.ViewDetail>
            </S.CardInner>
          </S.Card>
        ))}
      </S.CardList>
    </S.Container>
  );
};

export default AIAnswerHighlight;
