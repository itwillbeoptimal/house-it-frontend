import React from 'react';
import type { MagazineItem } from '@/pages/Magazine/types';
import { formatDate } from '@/utils/dateUtils';
import * as S from '@/pages/Magazine/components/MagazineCard/MagazineCard.styles';
import DefaultProfileImage from '@/assets/images/default-profile.png';

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
            <S.ProfileImage
              src={authorProfileUrl || DefaultProfileImage}
              alt={`${author} 프로필`}
            />
          </S.ProfileWrapper>
          <S.AuthorMeta>
            <S.AuthorName>{author}</S.AuthorName>
            <S.CreatedAt>{formatDate(createdAt)}</S.CreatedAt>
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
