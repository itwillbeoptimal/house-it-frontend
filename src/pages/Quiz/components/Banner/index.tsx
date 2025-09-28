import * as S from '@/pages/Quiz/components/Banner/Banner.styles';
import BackgroundImage from '@/assets/images/banner-background.webp';
import QuizIcon from '@/assets/icons/quiz.svg?react';

const Banner = () => {
  return (
    <S.BannerCard>
      <S.BackgroundImage src={BackgroundImage} alt="오늘의 퀴즈" />
      <S.Content>
        <S.TextSection>
          <S.SubTitle>매일 쌓이는 생활 지식</S.SubTitle>
          <S.Title>오늘의 퀴즈 풀기</S.Title>
        </S.TextSection>
      </S.Content>
      <S.IconWrapper>
        <QuizIcon />
      </S.IconWrapper>
    </S.BannerCard>
  );
};

export default Banner;
