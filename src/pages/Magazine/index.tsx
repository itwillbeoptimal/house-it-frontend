import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useMagazineListQuery from '@/hooks/queries/magazine/useMagazineListQuery';
import * as S from '@/pages/Magazine/Magazine.styles';
import CategoryTab from '@/components/CategoryTab';
import MagazineCard from '@/pages/Magazine/components/MagazineCard';
import Loader from '@/components/Loader';

const Magazine: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);
  const observerRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMagazineListQuery(selectedCategoryId);

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

  const handleFilterChange = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  const handleMagazineClick = (magazineId: number) => {
    navigate(`/magazine/${magazineId}`);
  };

  if (isLoading) {
    return (
      <S.Container>
        <S.TabWrapper>
          <CategoryTab
            activeTab="magazine"
            onFilterChange={handleFilterChange}
          />
        </S.TabWrapper>
        <S.EmptyState>
          <Loader />
        </S.EmptyState>
      </S.Container>
    );
  }

  if (isError) {
    return (
      <S.Container>
        <S.TabWrapper>
          <CategoryTab
            activeTab="magazine"
            onFilterChange={handleFilterChange}
          />
        </S.TabWrapper>
        <S.EmptyState>
          <S.EmptyMessage>
            매거진을 불러오는 중 오류가 발생했습니다.
          </S.EmptyMessage>
        </S.EmptyState>
      </S.Container>
    );
  }

  const magazines = data?.pages.flatMap((page) => page.magazineListItems) || [];

  return (
    <S.Container>
      <S.TabWrapper>
        <CategoryTab activeTab="magazine" onFilterChange={handleFilterChange} />
      </S.TabWrapper>
      <S.ContentArea>
        {magazines.length > 0 ? (
          <>
            <S.MagazineGrid>
              {magazines.map((magazine) => (
                <MagazineCard
                  key={magazine.magazineId}
                  id={magazine.magazineId}
                  categoryId={magazine.magazineCategoryId}
                  title={magazine.magazineTitle}
                  subtitle={magazine.magazineSubtitle}
                  author={magazine.magazineAuthor}
                  authorProfileUrl={magazine.authorProfileUrl}
                  createdAt={magazine.createdAt}
                  thumbnailUrl={magazine.magazineThumbnailUrl}
                  onClick={handleMagazineClick}
                />
              ))}
            </S.MagazineGrid>
            <S.ObserverTrigger ref={observerRef} />
            {isFetchingNextPage && (
              <S.EmptyState>
                <Loader />
              </S.EmptyState>
            )}
          </>
        ) : (
          <S.EmptyState>
            <S.EmptyMessage>해당 카테고리의 매거진이 없습니다.</S.EmptyMessage>
          </S.EmptyState>
        )}
      </S.ContentArea>
    </S.Container>
  );
};

export default Magazine;
