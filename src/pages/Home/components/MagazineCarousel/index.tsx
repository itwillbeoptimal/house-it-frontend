import React, { useState, useRef, useCallback, useEffect } from 'react';
import type { MagazineItem } from '@/pages/Magazine/types';
import * as S from './MagazineCarousel.styles';

interface MagazineCarouselProps {
  items: MagazineItem[];
  onSlideClick?: (id: number) => void;
}

const MagazineCarousel: React.FC<MagazineCarouselProps> = ({
  items,
  onSlideClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [startY, setStartY] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);

  const getSlideWidth = useCallback(() => {
    if (!trackRef.current) return 0;
    const slide = trackRef.current.querySelector('[data-slide]') as HTMLElement;
    if (!slide) return 0;
    return slide.offsetWidth;
  }, []);

  const moveToSlide = useCallback(
    (index: number) => {
      const slideWidth = getSlideWidth();
      const containerWidth = trackRef.current?.parentElement?.offsetWidth || 0;
      const centerOffset = (containerWidth - slideWidth) / 2;
      const newOffset = -(index * slideWidth) + centerOffset;

      if (trackRef.current) {
        trackRef.current.style.transition = 'transform 0.3s ease-out';
        trackRef.current.style.transform = `translateX(${newOffset}px)`;
      }

      setCurrentTranslate(newOffset);
      setPrevTranslate(newOffset);
    },
    [getSlideWidth],
  );

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const posX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const posY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setIsDragging(true);
    setStartPos(posX);
    setStartY(posY);
    setPrevTranslate(currentTranslate);
    setDragDistance(0);

    if (trackRef.current) {
      trackRef.current.style.transition = 'none';
    }
  };

  const handleTouchMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const currentPosX = e.clientX;

    const diff = currentPosX - startPos;
    const newTranslate = prevTranslate + diff;

    setCurrentTranslate(newTranslate);
    setDragDistance(Math.abs(diff));

    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${newTranslate}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    const diff = currentTranslate - prevTranslate;
    const slideWidth = getSlideWidth();

    let newIndex = currentIndex;

    if (diff < -slideWidth / 3 && currentIndex < items.length - 1) {
      newIndex = currentIndex + 1;
    } else if (diff > slideWidth / 3 && currentIndex > 0) {
      newIndex = currentIndex - 1;
    }

    setCurrentIndex(newIndex);
    moveToSlide(newIndex);
  };

  const handleSlideClick = (id: number) => {
    if (dragDistance < 10) {
      onSlideClick?.(id);
    }
  };

  useEffect(() => {
    moveToSlide(0);
  }, [moveToSlide]);

  useEffect(() => {
    const handleResize = () => {
      moveToSlide(currentIndex);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentIndex, moveToSlide]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleTouchMovePassive = (e: TouchEvent) => {
      if (!isDragging) return;

      const currentPosX = e.touches[0].clientX;
      const currentPosY = e.touches[0].clientY;

      const diffX = Math.abs(currentPosX - startPos);
      const diffY = Math.abs(currentPosY - startY);

      if (diffY > diffX) {
        return;
      }

      e.preventDefault();

      const diff = currentPosX - startPos;
      const newTranslate = prevTranslate + diff;

      setCurrentTranslate(newTranslate);
      setDragDistance(Math.abs(diff));

      if (track) {
        track.style.transform = `translateX(${newTranslate}px)`;
      }
    };

    track.addEventListener('touchmove', handleTouchMovePassive, {
      passive: false,
    });

    // eslint-disable-next-line consistent-return
    return () => {
      track.removeEventListener('touchmove', handleTouchMovePassive);
    };
  }, [isDragging, startPos, startY, prevTranslate]);

  return (
    <S.Container>
      <S.CarouselTrack
        ref={trackRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={() => isDragging && handleTouchEnd()}
      >
        {items.map((item, index) => (
          <S.Slide
            key={item.id}
            data-slide
            active={currentIndex === index}
            onClick={() => handleSlideClick(item.id)}
          >
            <S.ThumbnailWrapper active={currentIndex === index}>
              <S.ThumbnailImage src={item.thumbnailUrl} alt={item.title} />
              <S.Overlay />
              <S.MagazineContent>
                <S.Title>{item.title}</S.Title>
                <S.Subtitle>{item.subtitle}</S.Subtitle>
              </S.MagazineContent>
            </S.ThumbnailWrapper>
          </S.Slide>
        ))}
      </S.CarouselTrack>
    </S.Container>
  );
};

export default MagazineCarousel;
