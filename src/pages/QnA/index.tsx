import React, { useState, useMemo } from 'react';
import type { QnAItem } from '@/pages/QnA/types';
import * as S from '@/pages/QnA/QnA.styles';
import CategoryTab from '@/components/CategoryTab';
import QnACard from '@/pages/QnA/components/QnACard';
import PopularQnA from '@/pages/QnA/components/PopularQnA';
import CheckedIcon from '@/assets/icons/checked.svg?react';
import UncheckedIcon from '@/assets/icons/unchecked.svg?react';
import ArrowIcon from '@/assets/icons/arrow.svg?react';
import {
  POPULAR_QNA_MOCK_DATA,
  QNA_MOCK_DATA,
} from '@/constants/mockData/qnaData';

const QnA: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);
  const [showCompleteOnly, setShowCompleteOnly] = useState<boolean>(false);

  const filteredQnA = useMemo((): QnAItem[] => {
    let filtered = QNA_MOCK_DATA.filter(
      (qna) => qna.categoryId === selectedCategoryId,
    );

    if (showCompleteOnly) {
      filtered = filtered.filter((qna) => qna.isAnswered);
    }

    return filtered;
  }, [selectedCategoryId, showCompleteOnly]);

  const handleFilterChange = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  const handleCompleteFilterToggle = () => {
    setShowCompleteOnly(!showCompleteOnly);
  };

  return (
    <S.Container>
      <PopularQnA items={POPULAR_QNA_MOCK_DATA} />
      <S.TabWrapper>
        <CategoryTab activeTab="qna" onFilterChange={handleFilterChange} />
        <S.ActionBar>
          <S.CompleteFilter onClick={handleCompleteFilterToggle}>
            {showCompleteOnly ? <CheckedIcon /> : <UncheckedIcon />}
            답변 완료만 보기
          </S.CompleteFilter>
          <S.MyQnAButton>
            나의 Q&A
            <ArrowIcon />
          </S.MyQnAButton>
        </S.ActionBar>
      </S.TabWrapper>
      <S.ContentArea>
        {filteredQnA.length > 0 ? (
          <S.QnAList>
            {filteredQnA.map((qna) => (
              <QnACard
                key={qna.id}
                {...qna}
                showCategoryBadge={false}
                isPopular={false}
              />
            ))}
          </S.QnAList>
        ) : (
          <S.EmptyState>
            <S.EmptyMessage>해당 카테고리의 질문이 없습니다.</S.EmptyMessage>
          </S.EmptyState>
        )}
      </S.ContentArea>
    </S.Container>
  );
};

export default QnA;
