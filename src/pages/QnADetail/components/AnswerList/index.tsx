import React from 'react';
import type { Answer } from '@/pages/QnADetail/types';
import * as S from '@/pages/QnADetail/components/AnswerList/AnswerList.styles';
import * as CommonStyles from '@/pages/QnADetail/components/Common.styles';
import ContentCard from '@/pages/QnADetail/components/ContentCard';

interface AnswerListProps {
  answers: Answer[];
  onAnswerComments: (answerId: number) => void;
  onAnswerFollowUp: (answerId: number) => void;
  onAnswerRecommend: (answerId: number) => void;
  onAnswerEdit: (answerId: number) => void;
  onAnswerDelete: (answerId: number) => void;
  onAnswerAdopt: (answerId: number) => void;
  onAnswerReport: (answerId: number) => void;
}

const AnswerList: React.FC<AnswerListProps> = ({
  answers,
  onAnswerComments,
  onAnswerFollowUp,
  onAnswerRecommend,
  onAnswerEdit,
  onAnswerDelete,
  onAnswerAdopt,
  onAnswerReport,
}) => {
  return (
    <S.AnswersSection>
      {answers.length > 0 ? (
        <>
          <S.SectionTitle>답변 {answers.length}개</S.SectionTitle>
          {answers.map((answer) => (
            <ContentCard
              key={answer.id}
              data={answer}
              type="answer"
              onCommentsClick={() => onAnswerComments(answer.id)}
              onFollowUpClick={() => onAnswerFollowUp(answer.id)}
              onRecommendClick={() => onAnswerRecommend(answer.id)}
              onEdit={() => onAnswerEdit(answer.id)}
              onDelete={() => onAnswerDelete(answer.id)}
              onAdopt={() => onAnswerAdopt(answer.id)}
              onReport={() => onAnswerReport(answer.id)}
            />
          ))}
        </>
      ) : (
        <CommonStyles.EmptyState>
          <CommonStyles.EmptyMessage>답변이 없습니다</CommonStyles.EmptyMessage>
          <CommonStyles.EmptySubMessage>
            첫 번째 답변을 달아보세요!
          </CommonStyles.EmptySubMessage>
        </CommonStyles.EmptyState>
      )}
    </S.AnswersSection>
  );
};

export default AnswerList;
