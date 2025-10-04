import { useState, useRef, useCallback, useEffect } from 'react';

interface UseCarouselProps {
  itemsLength: number;
  autoPlayInterval?: number;
}

const useCarousel = ({
  itemsLength,
  autoPlayInterval = 10000,
}: UseCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const getSlideWidth = useCallback(() => {
    if (!trackRef.current) return 0;
    const slide = trackRef.current.querySelector('[data-slide]') as HTMLElement;
    if (!slide) return 0;
    return slide.offsetWidth;
  }, []);

  const moveToSlide = useCallback(
    (index: number, withTransition = true) => {
      const GAP = 20;
      const OFFSET = 20;
      const slideWidth = getSlideWidth();
      const newOffset = -(index * (slideWidth + GAP)) + OFFSET;

      if (trackRef.current) {
        trackRef.current.style.transition = withTransition
          ? 'transform 0.3s ease-out'
          : 'none';
        trackRef.current.style.transform = `translateX(${newOffset}px)`;
      }

      setCurrentTranslate(newOffset);
      setPrevTranslate(newOffset);
    },
    [getSlideWidth],
  );

  const resetSlideTransitions = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.style.transition = 'none';
      const slides = trackRef.current.querySelectorAll('[data-slide]');
      slides.forEach((slide) => {
        const element = slide as HTMLElement;
        element.style.transition = 'none';
      });
    }
  }, []);

  const restoreSlideTransitions = useCallback(() => {
    if (trackRef.current) {
      const slides = trackRef.current.querySelectorAll('[data-slide]');
      slides.forEach((slide) => {
        const element = slide as HTMLElement;
        element.style.transition = '';
      });
    }
  }, []);

  const handleInfiniteLoop = useCallback(
    (index: number) => {
      if (index > itemsLength) {
        setTimeout(() => {
          resetSlideTransitions();
          moveToSlide(1, false);
          setCurrentIndex(1);
          requestAnimationFrame(() => {
            restoreSlideTransitions();
          });
        }, 300);
      } else if (index < 1) {
        setTimeout(() => {
          resetSlideTransitions();
          moveToSlide(itemsLength, false);
          setCurrentIndex(itemsLength);
          requestAnimationFrame(() => {
            restoreSlideTransitions();
          });
        }, 300);
      }
    },
    [itemsLength, moveToSlide, resetSlideTransitions, restoreSlideTransitions],
  );

  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        moveToSlide(next, true);
        handleInfiniteLoop(next);
        return next;
      });
    }, autoPlayInterval);
  }, [autoPlayInterval, moveToSlide, handleInfiniteLoop]);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      moveToSlide(index, true);
      handleInfiniteLoop(index);
      resetAutoPlay();
    },
    [moveToSlide, handleInfiniteLoop, resetAutoPlay],
  );

  const startDragging = useCallback(
    (position: number) => {
      setIsDragging(true);
      setStartPos(position);
      setPrevTranslate(currentTranslate);

      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }

      if (trackRef.current) {
        trackRef.current.style.transition = 'none';
      }
    },
    [currentTranslate],
  );

  const moveDragging = useCallback(
    (position: number) => {
      if (!isDragging) return;

      const diff = position - startPos;
      const newTranslate = prevTranslate + diff;

      setCurrentTranslate(newTranslate);

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${newTranslate}px)`;
      }
    },
    [isDragging, startPos, prevTranslate],
  );

  const endDragging = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);

    const dragDistance = currentTranslate - prevTranslate;
    const slideWidth = getSlideWidth();

    if (dragDistance < -slideWidth / 3) {
      goToSlide(currentIndex + 1);
    } else if (dragDistance > slideWidth / 3) {
      goToSlide(currentIndex - 1);
    } else {
      moveToSlide(currentIndex, true);
    }
  }, [
    isDragging,
    currentTranslate,
    prevTranslate,
    currentIndex,
    getSlideWidth,
    goToSlide,
    moveToSlide,
  ]);

  useEffect(() => {
    moveToSlide(1, false);
    setCurrentIndex(1);
  }, [itemsLength, moveToSlide]);

  useEffect(() => {
    resetAutoPlay();
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [resetAutoPlay]);

  useEffect(() => {
    const handleResize = () => {
      moveToSlide(currentIndex, false);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentIndex, moveToSlide]);

  return {
    currentIndex,
    isDragging,
    currentTranslate,
    prevTranslate,
    trackRef,
    goToSlide,
    startDragging,
    moveDragging,
    endDragging,
    getSlideWidth,
  };
};

export default useCarousel;
