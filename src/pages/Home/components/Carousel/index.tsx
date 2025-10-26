import React, { useEffect, useState } from 'react';
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
  const [dragDistance, setDragDistance] = useState(0);

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
    const posX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const posY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    startDragging(posX, posY);
    setDragDistance(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const posX = e.clientX;
    const posY = e.clientY;
    moveDragging(posX, posY);

    if (isDragging) {
      setDragDistance(Math.abs(currentTranslate - prevTranslate));
    }
  };

  const handleTouchEnd = () => {
    endDragging();
  };

  const handleSlideClick = (id: number) => {
    if (dragDistance < 10) {
      onSlideClick?.(id);
    }
  };

  const getRealIndex = (index: number) => {
    return (index - 1 + items.length) % items.length;
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleTouchMovePassive = (e: TouchEvent) => {
      const posX = e.touches[0].clientX;
      const posY = e.touches[0].clientY;
      const shouldPreventDefault = moveDragging(posX, posY);

      if (shouldPreventDefault) {
        e.preventDefault();
        setDragDistance(Math.abs(currentTranslate - prevTranslate));
      }
    };

    track.addEventListener('touchmove', handleTouchMovePassive, {
      passive: false,
    });

    // eslint-disable-next-line consistent-return
    return () => {
      track.removeEventListener('touchmove', handleTouchMovePassive);
    };
  }, [moveDragging, currentTranslate, prevTranslate]);

  return (
    <S.Container>
      <S.CarouselTrack
        ref={trackRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleMouseMove}
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
