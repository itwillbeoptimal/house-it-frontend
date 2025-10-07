import React, { useState, useMemo } from 'react';
import type { MagazineItem } from '@/pages/Magazine/types';
import * as S from '@/pages/Magazine/Magazine.styles';
import CategoryTab from '@/components/CategoryTab';
import MagazineCard from '@/pages/Magazine/components/MagazineCard';
import { MAGAZINE_MOCK_DATA } from '@/constants/mockData/magazineData';

const Magazine: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);

  const filterMagazinesByCategory = (
    magazines: MagazineItem[],
    categoryId?: number,
  ): MagazineItem[] => {
    if (!categoryId) {
      return magazines;
    }
    return magazines.filter((magazine) => magazine.categoryId === categoryId);
  };

  const filteredMagazines = useMemo((): MagazineItem[] => {
    return filterMagazinesByCategory(MAGAZINE_MOCK_DATA, selectedCategoryId);
  }, [selectedCategoryId]);

  const handleFilterChange = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <S.Container>
      <S.TabWrapper>
        <CategoryTab activeTab="magazine" onFilterChange={handleFilterChange} />
      </S.TabWrapper>
      <S.ContentArea>
        {filteredMagazines.length > 0 ? (
          <S.MagazineGrid>
            {filteredMagazines.map((magazine) => (
              <MagazineCard key={magazine.id} {...magazine} />
            ))}
          </S.MagazineGrid>
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
