import React, { useState } from 'react';
import * as S from '@/components/CategoryTab/CategoryTab.styles';
import {
  MAGAZINE_CATEGORIES,
  QNA_CATEGORIES,
  QUIZ_CATEGORIES,
} from '@/constants/categories';

interface CategoryTabProps {
  activeTab: 'magazine' | 'qna' | 'quiz';
  onFilterChange: (categoryId: number) => void;
}

const CategoryTab: React.FC<CategoryTabProps> = ({
  activeTab,
  onFilterChange,
}) => {
  const [activeFilter, setActiveFilter] = useState<number>(1);

  const getTabCategories = () => {
    if (activeTab === 'magazine') {
      return MAGAZINE_CATEGORIES;
    }
    if (activeTab === 'qna') {
      return QNA_CATEGORIES;
    }
    return Object.fromEntries(
      Object.entries(QUIZ_CATEGORIES).map(([key, value]) => [key, value.title]),
    );
  };

  const handleFilterClick = (categoryId: number) => {
    setActiveFilter(categoryId);
    onFilterChange(categoryId);
  };

  return (
    <S.Container>
      {Object.entries(getTabCategories()).map(([id, label]) => (
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
