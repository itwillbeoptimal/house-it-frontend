import React from 'react';
import type { FollowUpQuestion } from '@/pages/QnADetail/types';
import { formatTimeAgo } from '@/utils/dateUtils';
import * as S from '@/pages/QnADetail/components/FollowUpItem/FollowUpItem.styles';
import * as CommonStyles from '@/pages/QnADetail/components/Common.styles';

interface FollowUpItemProps {
  followUpQuestion: FollowUpQuestion;
}

const FollowUpItem: React.FC<FollowUpItemProps> = ({ followUpQuestion }) => {
  return (
    <S.FollowUpContainer>
      <S.QuestionSection>
        <CommonStyles.AuthorName>질문자</CommonStyles.AuthorName>
        <S.Comment>{followUpQuestion.content}</S.Comment>
        <CommonStyles.CreatedAt>
          {formatTimeAgo(followUpQuestion.createdAt)}
        </CommonStyles.CreatedAt>
      </S.QuestionSection>
      {followUpQuestion.answer && (
        <S.AnswerSection>
          <CommonStyles.AuthorName>답변자</CommonStyles.AuthorName>
          <S.Comment>{followUpQuestion.answer.content}</S.Comment>
          <CommonStyles.CreatedAt>
            {formatTimeAgo(followUpQuestion.answer.createdAt)}
          </CommonStyles.CreatedAt>
        </S.AnswerSection>
      )}
    </S.FollowUpContainer>
  );
};

export default FollowUpItem;
