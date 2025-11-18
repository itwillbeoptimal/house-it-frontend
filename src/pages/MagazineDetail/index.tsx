import React from 'react';
import { useParams } from 'react-router-dom';
import useSubpageHeader from '@/hooks/useSubpageHeader';
import useMagazineDetailQuery from '@/hooks/queries/magazine/useMagazineDetailQuery';
import useMagazineScrapMutation from '@/hooks/mutations/magazine/useMagazineScrapMutation';
import { formatDate } from '@/utils/dateUtils';
import * as S from '@/pages/MagazineDetail/MagazineDetail.styles';
import HTMLContent from '@/pages/MagazineDetail/components/HTMLContent';
import ShareIcon from '@/assets/icons/share.svg?react';
import BookmarkIcon from '@/assets/icons/bookmark.svg?react';
import DefaultProfileImage from '@/assets/images/default-profile.png';

const MagazineDetail: React.FC = () => {
  useSubpageHeader({
    title: '매거진',
  });

  const { magazineId } = useParams<{ magazineId: string }>();
  const numericMagazineId = magazineId ? parseInt(magazineId, 10) : null;

  const { data, isError } = useMagazineDetailQuery(numericMagazineId!);
  const scrapMutation = useMagazineScrapMutation();

  const handleShare = async () => {
    await navigator.share({
      title: data?.magazineTitle,
      url: window.location.href,
    });
  };

  const handleScrapToggle = async () => {
    if (!numericMagazineId) return;
    await scrapMutation.mutateAsync(numericMagazineId);
  };

  if (!numericMagazineId || !data || isError) {
    return null;
  }

  const isBookmarked = data.isScrap === true;

  return (
    <S.Container>
      <S.Header>
        <S.HeaderContent>
          <S.Title>{data.magazineTitle}</S.Title>
          <S.Subtitle>{data.magazineSubtitle}</S.Subtitle>
        </S.HeaderContent>
        <S.ActionButtonsWrapper>
          <S.ShareButton onClick={handleShare}>
            <ShareIcon />
            공유
          </S.ShareButton>
          <S.BookmarkButton
            isBookmarked={isBookmarked}
            onClick={handleScrapToggle}
            disabled={scrapMutation.isPending}
          >
            <BookmarkIcon />
          </S.BookmarkButton>
        </S.ActionButtonsWrapper>
      </S.Header>
      <S.AuthorInfo>
        <S.ProfileWrapper>
          <S.ProfileImage
            src={data.authorProfileUrl || DefaultProfileImage}
            alt={`${data.magazineAuthor} 프로필`}
          />
        </S.ProfileWrapper>
        <S.AuthorMeta>
          <S.AuthorName>{data.magazineAuthor}</S.AuthorName>
          <S.CreatedAt>{formatDate(data.createdAt)}</S.CreatedAt>
        </S.AuthorMeta>
      </S.AuthorInfo>
      <S.ThumbnailWrapper>
        <S.ThumbnailImage
          src={data.magazineThumbnailUrl}
          alt={data.magazineTitle}
        />
      </S.ThumbnailWrapper>
      <S.ContentWrapper>
        <HTMLContent content={data.magazineContent} />
      </S.ContentWrapper>
    </S.Container>
  );
};

export default MagazineDetail;
