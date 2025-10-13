import React from 'react';
import { useParams } from 'react-router-dom';
import useSubpageHeader from '@/hooks/useSubpageHeader';
import useBottomSheet from '@/hooks/useBottomSheet';
import * as S from '@/pages/QnADetail/QnADetail.styles';
import ContentCard from '@/pages/QnADetail/components/ContentCard';
import AnswerList from '@/pages/QnADetail/components/AnswerList';
import CommentsContent from '@/pages/QnADetail/components/CommentsContent';
import FollowUpContent from '@/pages/QnADetail/components/FollowUpContent';
import {
  QNA_DETAIL_MOCK_DATA,
  QNA_ANSWERS_MOCK_DATA,
  QNA_COMMENTS_MOCK_DATA,
  QNA_FOLLOWUP_QUESTIONS_MOCK_DATA,
} from '@/constants/mockData/qnaDetailData';

const QnADetail: React.FC = () => {
  useSubpageHeader({
    title: '질문 상세',
  });

  const { questionId } = useParams<{ questionId: string }>();
  const numericQuestionId = questionId ? parseInt(questionId, 10) : null;

  const { openBottomSheet } = useBottomSheet();

  if (!numericQuestionId) {
    return null;
  }

  const question = QNA_DETAIL_MOCK_DATA[numericQuestionId];
  const answers = QNA_ANSWERS_MOCK_DATA[numericQuestionId] || [];

  const handleQuestionComments = () => {
    const comments = QNA_COMMENTS_MOCK_DATA[`question-${question.id}`] || [];
    openBottomSheet({
      id: 'question-comments',
      title: '댓글',
      content: (
        <CommentsContent
          targetId={question.id}
          targetType="question"
          comments={comments}
        />
      ),
      hasMaxHeight: true,
    });
  };

  const handleAnswerComments = (answerId: number) => {
    const comments = QNA_COMMENTS_MOCK_DATA[`answer-${answerId}`] || [];
    openBottomSheet({
      id: 'answer-comments',
      title: '댓글',
      content: (
        <CommentsContent
          targetId={answerId}
          targetType="answer"
          comments={comments}
        />
      ),
      hasMaxHeight: true,
    });
  };

  const handleAnswerFollowUp = (answerId: number) => {
    const followUpQuestions =
      QNA_FOLLOWUP_QUESTIONS_MOCK_DATA[`answer-${answerId}`] || [];
    openBottomSheet({
      id: 'answer-followup',
      title: '추가 질문',
      content: (
        <FollowUpContent
          answerId={answerId}
          followUpQuestions={followUpQuestions}
        />
      ),
    });
  };

  return (
    <S.Container>
      <ContentCard
        data={question}
        type="question"
        onCommentsClick={handleQuestionComments}
      />
      <AnswerList
        answers={answers}
        onAnswerComments={handleAnswerComments}
        onAnswerFollowUp={handleAnswerFollowUp}
      />
    </S.Container>
  );
};

export default QnADetail;
