import React from 'react';
import * as S from '@/pages/MagazineScrapBox/components/ScrapMagazineCard/ScrapMagazineCard.styles';

interface ScrapMagazineCardProps {
  id: number;
  title: string;
  subtitle: string;
  thumbnailUrl: string;
  onClick?: (id: number) => void;
}

const ScrapMagazineCard: React.FC<ScrapMagazineCardProps> = ({
  id,
  title,
  subtitle,
  thumbnailUrl,
  onClick,
}) => {
  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <S.Container onClick={handleClick}>
      <S.ThumbnailWrapper>
        <S.ThumbnailImage src={thumbnailUrl} alt={title} />
      </S.ThumbnailWrapper>
      <S.ContentWrapper>
        <S.Title>{title}</S.Title>
        <S.Subtitle>{subtitle}</S.Subtitle>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default ScrapMagazineCard;
