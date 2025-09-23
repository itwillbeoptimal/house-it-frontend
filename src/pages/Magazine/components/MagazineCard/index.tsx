import React from 'react';
import type { MagazineItem } from '@/pages/Magazine/types';
import * as S from '@/pages/Magazine/components/MagazineCard/MagazineCard.styles';

interface MagazineCardProps extends MagazineItem {
  imageAlt?: string;
  onClick?: (id: number) => void;
}

const MagazineCard: React.FC<MagazineCardProps> = ({
  id,
  title,
  subtitle,
  author,
  authorProfileUrl,
  createdAt,
  thumbnailUrl,
  imageAlt = '',
  onClick,
}) => {
  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <S.Container onClick={handleClick}>
      <S.ContentWrapper>
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
            <S.CreatedAt>{createdAt}</S.CreatedAt>
          </S.AuthorMeta>
        </S.AuthorInfo>
        <S.Title>{title}</S.Title>
        <S.Subtitle>{subtitle}</S.Subtitle>
      </S.ContentWrapper>
      <S.ThumbnailWrapper>
        <S.ThumbnailImage src={thumbnailUrl} alt={imageAlt} />
      </S.ThumbnailWrapper>
    </S.Container>
  );
};

export default MagazineCard;
