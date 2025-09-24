import React from 'react';
import type { QnAItem } from '@/pages/QnA/types';
import { QNA_CATEGORIES } from '@/constants/categories';
import * as S from '@/pages/QnA/components/QnACard/QnACard.styles';

interface QnACardProps extends QnAItem {
  showCategoryBadge?: boolean;
  isPopular?: boolean;
  onClick?: (id: number) => void;
}

const formatTimeAgo = (isoString: string): string => {
  const now = new Date();
  const createdAt = new Date(isoString);
  const diffInMinutes = Math.floor(
    (now.getTime() - createdAt.getTime()) / (1000 * 60),
  );

  if (diffInMinutes < 1) return '방금 전';
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}시간 전`;

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}일 전`;
};

const truncateContent = (content: string, maxLength: number = 100): string => {
  if (content.length <= maxLength) return content;
  return content.slice(0, maxLength);
};

const QnACard: React.FC<QnACardProps> = ({
  id,
  categoryId,
  title,
  content,
  author,
  authorProfileUrl,
  createdAt,
  answerCount,
  isAnswered,
  showCategoryBadge = true,
  isPopular = false,
  onClick,
}) => {
  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <S.Container isPopular={isPopular} onClick={handleClick}>
      {showCategoryBadge && (
        <S.CategoryBadge>
          {QNA_CATEGORIES[categoryId as keyof typeof QNA_CATEGORIES]}
        </S.CategoryBadge>
      )}
      <S.AuthorInfo>
        <S.ProfileWrapper>
          {authorProfileUrl ? (
            <S.ProfileImage src={authorProfileUrl} alt={`${author} 프로필`} />
          ) : (
            <S.DefaultProfile />
          )}
        </S.ProfileWrapper>
        <S.AuthorMeta>
          <S.AuthorName>{author}</S.AuthorName>
          <S.CreatedAt>{formatTimeAgo(createdAt)}</S.CreatedAt>
        </S.AuthorMeta>
      </S.AuthorInfo>
      <S.Title>{title}</S.Title>
      <S.Content>{truncateContent(content)}</S.Content>
      <S.Footer>
        <S.AnswerInfo>
          <S.AnswerBadge isAnswered={isAnswered}>
            {isAnswered ? '답변완료' : '답변대기'}
          </S.AnswerBadge>
          <S.AnswerCount>답변 {answerCount}</S.AnswerCount>
        </S.AnswerInfo>
      </S.Footer>
    </S.Container>
  );
};

export default QnACard;
