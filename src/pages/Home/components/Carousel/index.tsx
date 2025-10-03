import React from 'react';
import useCarousel from '@/pages/Home/components/Carousel/hooks/useCarousel';
import * as S from '@/pages/Home/components/Carousel/Carousel.styles';

interface CarouselItem {
  id: number;
  imageUrl: string;
}

interface CarouselProps {
  items: CarouselItem[];
  onSlideClick?: (id: number) => void;
}

const Carousel: React.FC<CarouselProps> = ({ items, onSlideClick }) => {
  const {
    currentIndex,
    isDragging,
    currentTranslate,
    prevTranslate,
    trackRef,
    goToSlide,
    startDragging,
    moveDragging,
    endDragging,
  } = useCarousel({
    itemsLength: items.length,
  });

  const extendedItems = [items[items.length - 1], ...items, items[0]].map(
    (item, idx) => ({
      ...item,
      key: `${item.id}-${idx}`,
    }),
  );

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const pos = 'touches' in e ? e.touches[0].clientX : e.clientX;
    startDragging(pos);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    const currentPos = 'touches' in e ? e.touches[0].clientX : e.clientX;
    moveDragging(currentPos);
  };

  const handleTouchEnd = () => {
    endDragging();
  };

  const handleSlideClick = (id: number) => {
    if (Math.abs(currentTranslate - prevTranslate) < 5) {
      onSlideClick?.(id);
    }
  };

  const getRealIndex = (index: number) => {
    return (index - 1 + items.length) % items.length;
  };

  return (
    <S.Container>
      <S.CarouselTrack
        ref={trackRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={() => isDragging && handleTouchEnd()}
      >
        {extendedItems.map((item) => (
          <S.Slide
            key={item.key}
            data-slide
            active={currentIndex === extendedItems.indexOf(item)}
            onClick={() => handleSlideClick(item.id)}
          >
            <S.SlideImage src={item.imageUrl} alt={`슬라이드 ${item.id}`} />
          </S.Slide>
        ))}
      </S.CarouselTrack>
      {items.length > 1 && (
        <S.DotsWrapper>
          {items.map((item) => (
            <S.Dot
              key={item.id}
              active={getRealIndex(currentIndex) === items.indexOf(item)}
              onClick={() => goToSlide(items.length + items.indexOf(item))}
            />
          ))}
        </S.DotsWrapper>
      )}
    </S.Container>
  );
};

export default Carousel;
