import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '@/pages/Home/Home.styles';
import Carousel from '@/pages/Home/components/Carousel';
import MagazineCarousel from '@/pages/Home/components/MagazineCarousel';
import AIAnswerHighlight from '@/pages/Home/components/AIAnswerHighlight';
import HomeSkeleton from '@/pages/Home/components/HomeSkeleton';
import Footer from '@/pages/Home/components/Footer';
import useRecommendedMagazinesQuery from '@/hooks/queries/magazine/useRecommendedMagazinesQuery';
import useAIBestResponsesQuery from '@/hooks/queries/qna/useAIBestResponsesQuery';
import type { MagazineItem } from '@/pages/Magazine/types';

const CAROUSEL_DATA = [
  {
    id: 1,
    imageUrl: `${import.meta.env.VITE_SERVER_FILE_URL}/slide1.jpg`,
  },
  {
    id: 2,
    imageUrl: `${import.meta.env.VITE_SERVER_FILE_URL}/slide2.jpg`,
  },
  {
    id: 3,
    imageUrl: `${import.meta.env.VITE_SERVER_FILE_URL}/slide3.jpg`,
  },
];

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { data: magazineData, isLoading: isMagazineLoading } =
    useRecommendedMagazinesQuery();
  const { data: aiAnswersData, isLoading: isAILoading } =
    useAIBestResponsesQuery();

  const magazines: MagazineItem[] =
    magazineData?.recommendedMagazineItems.map((item) => ({
      id: item.magazineId,
      categoryId: 0,
      title: item.magazineTitle,
      subtitle: item.magazineSubtitle,
      author: '',
      authorProfileUrl: '',
      thumbnailUrl: item.magazineThumbnailUrl,
      createdAt: item.createdAt,
    })) || [];

  const aiAnswers =
    aiAnswersData?.aiBestResponseItemList.map((item) => ({
      id: item.responseId,
      questionId: item.questionId,
      categoryId: 0,
      question: item.title,
      answer: item.content,
    })) || [];

  useEffect(() => {
    const loadImages = async () => {
      const imageUrls = [
        ...CAROUSEL_DATA.map((item) => item.imageUrl),
        ...magazines.map((item) => item.thumbnailUrl),
      ];

      const imagePromises = imageUrls.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      });

      try {
        await Promise.all(imagePromises);
        setIsLoading(false);
      } catch (error) {
        console.error('이미지 로딩 실패:', error);
        setIsLoading(false);
      }
    };

    if (!isMagazineLoading && !isAILoading) {
      if (magazines.length > 0) {
        loadImages();
      } else {
        setIsLoading(false);
      }
    }
  }, [magazines, isMagazineLoading, isAILoading]);

  const handleMagazineClick = (magazineId: number) => {
    navigate(`/magazine/${magazineId}`);
  };

  if (isLoading || isMagazineLoading || isAILoading) {
    return <HomeSkeleton />;
  }

  return (
    <S.Container>
      <Carousel items={CAROUSEL_DATA} />
      <S.SectionTitle>매거진 추천</S.SectionTitle>
      <S.SectionDescription>하우스잇이 큐레이팅 한 매거진</S.SectionDescription>
      <MagazineCarousel items={magazines} onSlideClick={handleMagazineClick} />
      <S.SectionTitle>AI 답변 하이라이트</S.SectionTitle>
      <S.SectionDescription>빠르고 정확한 하우스잇 AI</S.SectionDescription>
      <AIAnswerHighlight answers={aiAnswers} />
      <Footer />
    </S.Container>
  );
};

export default Home;
