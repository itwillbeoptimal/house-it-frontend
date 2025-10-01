import React from 'react';
import type { QnADetail, Answer } from '@/pages/QnADetail/types';
import { formatTimeAgo } from '@/utils/dateUtils';
import * as S from '@/pages/QnADetail/components/ContentCard/ContentCard.styles';
import * as CommonStyles from '@/pages/QnADetail/components/Common.styles';
import Profile from '@/pages/QnADetail/components/Profile';
import MenuIcon from '@/assets/icons/menu.svg?react';
import CommentIcon from '@/assets/icons/comment.svg?react';
import QuestionIcon from '@/assets/icons/question.svg?react';
import SparkleIcon from '@/assets/icons/sparkle.svg?react';

interface ContentCardProps {
  data: QnADetail | Answer;
  type: 'question' | 'answer';
  onCommentsClick: () => void;
  onFollowUpClick?: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({
  data,
  type,
  onCommentsClick,
  onFollowUpClick,
}) => {
  const isQuestion = type === 'question';
  const isAnswer = type === 'answer';
  const answerData = data as Answer;
  const questionData = data as QnADetail;

  return (
    <S.Container>
      <S.Header>
        <S.AuthorInfo>
          <Profile
            profileUrl={data.authorProfileUrl}
            authorName={data.author}
          />
          <S.AuthorMeta>
            <CommonStyles.AuthorName>
              {isAnswer && answerData.isAI && (
                <S.AIBadge>
                  <SparkleIcon />
                  AI
                </S.AIBadge>
              )}
              {data.author}
            </CommonStyles.AuthorName>
            <CommonStyles.CreatedAt>
              {formatTimeAgo(data.createdAt)}
            </CommonStyles.CreatedAt>
          </S.AuthorMeta>
        </S.AuthorInfo>
        <S.MenuButton>
          <MenuIcon />
        </S.MenuButton>
      </S.Header>
      {isQuestion && <S.Title>{questionData.title}</S.Title>}
      <S.Content>{data.content}</S.Content>
      {data.images && data.images.length > 0 && (
        <S.ImageGallery>
          {data.images.map((image, index) => (
            <S.ContentImage
              key={image}
              src={image}
              alt={`${isQuestion ? '질문' : '답변'} 이미지 ${index}`}
            />
          ))}
        </S.ImageGallery>
      )}
      <S.ActionBar>
        <S.ActionButton onClick={onCommentsClick}>
          <CommentIcon />
          댓글 {data.commentCount}
        </S.ActionButton>
        {isAnswer && onFollowUpClick && (
          <S.ActionButton onClick={onFollowUpClick}>
            <QuestionIcon />
            추가 질문 {answerData.followUpQuestionCount}
          </S.ActionButton>
        )}
      </S.ActionBar>
    </S.Container>
  );
};

export default ContentCard;
