import React from 'react';
import type { PopularQnAItem } from '@/pages/QnA/types';
import QnACard from '@/pages/QnA/components/QnACard';
import * as S from '@/pages/QnA/components/PopularQnA/PopularQnA.styles';

interface PopularQnAProps {
  items: PopularQnAItem[];
}

const PopularQnA: React.FC<PopularQnAProps> = ({ items }) => {
  return (
    <S.Container>
      <S.Title>인기있는 질문</S.Title>
      <S.ScrollContainer>
        <S.CardList>
          {items.map((item) => (
            <QnACard key={item.id} {...item} isPopular />
          ))}
        </S.CardList>
      </S.ScrollContainer>
    </S.Container>
  );
};

export default PopularQnA;
