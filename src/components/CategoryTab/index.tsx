import React, { useState } from 'react';
import * as S from '@/components/CategoryTab/CategoryTab.styles';
import { MAGAZINE_CATEGORIES, QNA_CATEGORIES } from '@/constants/categories';

interface CategoryTabProps {
  activeTab: 'magazine' | 'qna';
  onFilterChange: (categoryId: number) => void;
}

const CategoryTab: React.FC<CategoryTabProps> = ({
  activeTab,
  onFilterChange,
}) => {
  const [activeFilter, setActiveFilter] = useState<number>(1);

  const categories =
    activeTab === 'magazine' ? MAGAZINE_CATEGORIES : QNA_CATEGORIES;

  const handleFilterClick = (categoryId: number) => {
    setActiveFilter(categoryId);
    onFilterChange(categoryId);
  };

  return (
    <S.Container>
      {Object.entries(categories).map(([id, label]) => (
        <S.TabButton
          key={id}
          active={activeFilter === Number(id)}
          onClick={() => handleFilterClick(Number(id))}
        >
          {label}
        </S.TabButton>
      ))}
    </S.Container>
  );
};

export default CategoryTab;
