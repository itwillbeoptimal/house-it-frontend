import React from 'react';
import { useParams } from 'react-router-dom';
import useSubpageHeader from '@/hooks/useSubpageHeader';
import { formatDate } from '@/utils/dateUtils';
import * as S from '@/pages/MagazineDetail/MagazineDetail.styles';
import HTMLContent from '@/pages/MagazineDetail/components/HTMLContent';
import BookmarkIcon from '@/assets/icons/bookmark.svg?react';
import DefaultProfileImage from '@/assets/images/default-profile.png';
import { MAGAZINE_DETAIL_MOCK_DATA } from '@/constants/mockData/magazineDetailData';

const MagazineDetail: React.FC = () => {
  useSubpageHeader({
    title: '매거진',
  });

  const { magazineId } = useParams<{ magazineId: string }>();
  const numericMagazineId = magazineId ? parseInt(magazineId, 10) : null;

  if (!numericMagazineId) {
    return null;
  }

  const magazine = MAGAZINE_DETAIL_MOCK_DATA.find(
    (m) => m.id === numericMagazineId,
  );

  if (!magazine) {
    return null;
  }

  return (
    <S.Container>
      <S.Header>
        <S.HeaderContent>
          <S.Title>{magazine.title}</S.Title>
          <S.Subtitle>{magazine.subtitle}</S.Subtitle>
        </S.HeaderContent>
        <S.BookmarkButton isBookmarked>
          <BookmarkIcon />
        </S.BookmarkButton>
      </S.Header>
      <S.AuthorInfo>
        <S.ProfileWrapper>
          <S.ProfileImage
            src={magazine.authorProfileUrl || DefaultProfileImage}
            alt={`${magazine.author} 프로필`}
          />
        </S.ProfileWrapper>
        <S.AuthorMeta>
          <S.AuthorName>{magazine.author}</S.AuthorName>
          <S.CreatedAt>{formatDate(magazine.createdAt)}</S.CreatedAt>
        </S.AuthorMeta>
      </S.AuthorInfo>
      <S.ThumbnailWrapper>
        <S.ThumbnailImage src={magazine.thumbnailUrl} alt={magazine.title} />
      </S.ThumbnailWrapper>
      <S.ContentWrapper>
        <HTMLContent content={magazine.content} />
      </S.ContentWrapper>
    </S.Container>
  );
};

export default MagazineDetail;
