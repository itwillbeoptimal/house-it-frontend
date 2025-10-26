import React from 'react';
import { formatTimeAgo } from '@/utils/dateUtils';
import * as S from '@/pages/Search/components/SearchResultCard/SearchResultCard.styles';
import DefaultProfileImage from '@/assets/images/default-profile.png';

interface SearchResultCardProps {
  type: 'question' | 'magazine';
  id: number;
  title: string;
  content?: string;
  subtitle?: string;
  author: string;
  authorProfileUrl?: string;
  createdAt: string;
  thumbnailUrl?: string;
  onClick: (id: number) => void;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({
  type,
  id,
  title,
  content,
  subtitle,
  author,
  authorProfileUrl,
  createdAt,
  thumbnailUrl,
  onClick,
}) => {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <S.Container onClick={handleClick}>
      <S.ContentWrapper>
        <S.Header>
          <S.AuthorInfo>
            <S.ProfileWrapper>
              <S.ProfileImage
                src={authorProfileUrl || DefaultProfileImage}
                alt={`${author} 프로필`}
              />
            </S.ProfileWrapper>
            <S.AuthorName>{author}</S.AuthorName>
            <S.Separator>·</S.Separator>
            <S.CreatedAt>{formatTimeAgo(createdAt)}</S.CreatedAt>
          </S.AuthorInfo>
        </S.Header>
        <S.Title>{title}</S.Title>
        {type === 'question' && content && <S.Content>{content}</S.Content>}
        {type === 'magazine' && subtitle && <S.Content>{subtitle}</S.Content>}
      </S.ContentWrapper>
      {type === 'magazine' && thumbnailUrl && (
        <S.ThumbnailWrapper>
          <S.ThumbnailImage src={thumbnailUrl} alt={title} />
        </S.ThumbnailWrapper>
      )}
    </S.Container>
  );
};

export default SearchResultCard;
