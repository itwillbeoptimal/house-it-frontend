import React, { useState, useMemo } from 'react';
import type { MagazineItem } from '@/pages/Magazine/types';
import * as S from '@/pages/Magazine/Magazine.styles';
import CategoryTab from '@/components/CategoryTab';
import MagazineCard from '@/pages/Magazine/components/MagazineCard';
import { TabWrapper } from '@/pages/Magazine/Magazine.styles';

const Magazine: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);

  const filteredMagazines = useMemo((): MagazineItem[] => {
    return [];
  }, [selectedCategoryId]);

  const handleFilterChange = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <S.Container>
      <TabWrapper>
        <CategoryTab activeTab="magazine" onFilterChange={handleFilterChange} />
      </TabWrapper>
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
