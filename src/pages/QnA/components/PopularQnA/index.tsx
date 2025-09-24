import React from 'react';
import type { PopularQnAItem } from '@/pages/QnA/types';
import QnACard from '@/pages/QnA/components/QnACard';
import * as S from '@/pages/QnA/components/PopularQnA/PopularQnA.styles';

interface PopularQnAProps {
  items: PopularQnAItem[];
  onItemClick?: (id: number) => void;
}

const PopularQnA: React.FC<PopularQnAProps> = ({ items, onItemClick }) => {
  return (
    <S.Container>
      <S.Title>인기있는 질문</S.Title>
      <S.ScrollContainer>
        <S.CardList>
          {items.map((item) => (
            <QnACard key={item.id} {...item} isPopular onClick={onItemClick} />
          ))}
        </S.CardList>
      </S.ScrollContainer>
    </S.Container>
  );
};

export default PopularQnA;
