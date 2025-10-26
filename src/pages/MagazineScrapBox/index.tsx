import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useSubpageHeader from '@/hooks/useSubpageHeader';
import useScrapBoxQuery from '@/hooks/queries/magazine/useScrapBoxQuery';
import * as S from '@/pages/MagazineScrapBox/MagazineScrapBox.styles';
import ScrapMagazineCard from '@/pages/MagazineScrapBox/components/ScrapMagazineCard';
import Loader from '@/components/Loader';

const MagazineScrapBox: React.FC = () => {
  useSubpageHeader({ title: '스크랩한 매거진' });

  const navigate = useNavigate();
  const observerRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useScrapBoxQuery();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleMagazineClick = (magazineId: number) => {
    navigate(`/magazine/${magazineId}`);
  };

  if (isLoading) {
    return (
      <S.Container>
        <S.EmptyState>
          <Loader />
        </S.EmptyState>
      </S.Container>
    );
  }

  if (isError) {
    return (
      <S.Container>
        <S.EmptyState>
          <S.EmptyMessage>
            스크랩한 매거진을 불러오는 중 오류가 발생했습니다.
          </S.EmptyMessage>
        </S.EmptyState>
      </S.Container>
    );
  }

  const magazines = data?.pages.flatMap((page) => page.scrapBoxItems) || [];

  return (
    <S.Container>
      <S.ContentArea>
        {magazines.length > 0 ? (
          <>
            <S.MagazineGrid>
              {magazines.map((magazine) => (
                <ScrapMagazineCard
                  key={magazine.magazineId}
                  id={magazine.magazineId}
                  title={magazine.magazineTitle}
                  subtitle={magazine.magazineSubtitle}
                  thumbnailUrl={magazine.magazineThumbnailUrl}
                  onClick={handleMagazineClick}
                />
              ))}
            </S.MagazineGrid>
            {isFetchingNextPage && (
              <S.EmptyState>
                <Loader />
              </S.EmptyState>
            )}
          </>
        ) : (
          <S.EmptyState>
            <S.EmptyMessage>스크랩한 매거진이 없습니다.</S.EmptyMessage>
          </S.EmptyState>
        )}
      </S.ContentArea>
      <S.ObserverTrigger ref={observerRef} />
    </S.Container>
  );
};

export default MagazineScrapBox;
