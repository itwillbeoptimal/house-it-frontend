import React from 'react';
import * as S from '@/pages/Home/components/HomeSkeleton/HomeSkeleton.styles';
import Footer from '@/pages/Home/components/Footer';

const HomeSkeleton: React.FC = () => {
  return (
    <S.Container>
      <S.CarouselSkeleton />
      <S.SectionTitle />
      <S.SectionDescription />
      <S.MagazineCarouselSkeleton>
        <S.MagazineTrack>
          <S.MagazineCard active />
          <S.MagazineCard />
        </S.MagazineTrack>
      </S.MagazineCarouselSkeleton>
      <S.SectionTitle />
      <S.SectionDescription />
      <S.AIAnswerContainer>
        <S.AIAnswerTrack>
          {[1, 2, 3].map((i) => (
            <S.AIAnswerCard key={i}>
              <S.AIAnswerCardInner>
                <S.AIBadge />
                <S.QuestionLine />
                <S.QuestionLine />
                <S.Answer>
                  <S.AnswerLine />
                  <S.AnswerLine />
                  <S.AnswerLine />
                </S.Answer>
                <S.ViewDetailLine />
              </S.AIAnswerCardInner>
            </S.AIAnswerCard>
          ))}
        </S.AIAnswerTrack>
      </S.AIAnswerContainer>
      <Footer />
    </S.Container>
  );
};

export default HomeSkeleton;
