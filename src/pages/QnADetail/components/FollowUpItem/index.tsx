import React from 'react';
import type { FollowUpQuestion } from '@/pages/QnADetail/types';
import { formatTimeAgo } from '@/utils/dateUtils';
import * as S from '@/pages/QnADetail/components/FollowUpItem/FollowUpItem.styles';
import * as CommonStyles from '@/pages/QnADetail/components/Common.styles';
import Profile from '@/pages/QnADetail/components/Profile';
import SparkleIcon from '@/assets/icons/sparkle.svg?react';

interface FollowUpItemProps {
  followUpQuestion: FollowUpQuestion;
}

const FollowUpItem: React.FC<FollowUpItemProps> = ({ followUpQuestion }) => {
  return (
    <S.FollowUpContainer>
      <S.QuestionSection>
        <Profile
          profileUrl={followUpQuestion.authorProfileUrl}
          authorName={followUpQuestion.author}
        />
        <S.QuestionContent>
          <S.QuestionHeader>
            <CommonStyles.AuthorName>
              {followUpQuestion.author}
            </CommonStyles.AuthorName>
            <CommonStyles.CreatedAt>
              {formatTimeAgo(followUpQuestion.createdAt)}
            </CommonStyles.CreatedAt>
          </S.QuestionHeader>
          <S.QuestionText>{followUpQuestion.content}</S.QuestionText>
        </S.QuestionContent>
      </S.QuestionSection>
      {followUpQuestion.answer ? (
        <S.AnswerSection>
          <S.AnswerHeader>
            {followUpQuestion.answer.isAI && (
              <S.AIBadge>
                <SparkleIcon />
                AI
              </S.AIBadge>
            )}
            <CommonStyles.AuthorName>
              {followUpQuestion.answer.author}
            </CommonStyles.AuthorName>
            <CommonStyles.CreatedAt>
              {formatTimeAgo(followUpQuestion.answer.createdAt)}
            </CommonStyles.CreatedAt>
          </S.AnswerHeader>
          <S.AnswerText>{followUpQuestion.answer.content}</S.AnswerText>
        </S.AnswerSection>
      ) : (
        <S.PendingAnswer>답변을 기다리고 있어요</S.PendingAnswer>
      )}
    </S.FollowUpContainer>
  );
};

export default FollowUpItem;
