import { useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

const useImageZoom = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const scaleRef = useRef(1);
  const positionRef = useRef<Position>({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef<Position>({ x: 0, y: 0 });
  const lastDistanceRef = useRef<number>(0);

  const applyTransform = () => {
    if (!imageRef.current) return;
    const { x, y } = positionRef.current;
    const scale = scaleRef.current;
    imageRef.current.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`;
  };

  const getConstrainedPosition = (
    x: number,
    y: number,
    currentScale: number,
  ): Position => {
    if (currentScale <= 1 || !imageRef.current) {
      return { x: 0, y: 0 };
    }

    const img = imageRef.current;
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    const imageWidth = img.offsetWidth * currentScale;
    const imageHeight = img.offsetHeight * currentScale;

    const maxX = Math.max(0, (imageWidth - containerWidth) / 2);
    const maxY = Math.max(0, (imageHeight - containerHeight) / 2);

    return {
      x: Math.min(Math.max(x, -maxX), maxX),
      y: Math.min(Math.max(y, -maxY), maxY),
    };
  };

  const updateScale = (newScale: number) => {
    const clampedScale = Math.min(Math.max(1, newScale), 5);
    scaleRef.current = clampedScale;

    if (clampedScale === 1) {
      positionRef.current = { x: 0, y: 0 };
    }

    applyTransform();
  };

  const updatePosition = (x: number, y: number) => {
    const constrained = getConstrainedPosition(x, y, scaleRef.current);
    positionRef.current = constrained;
    applyTransform();
  };

  const startDrag = (clientX: number, clientY: number) => {
    if (scaleRef.current > 1) {
      isDraggingRef.current = true;
      dragStartRef.current = {
        x: clientX - positionRef.current.x,
        y: clientY - positionRef.current.y,
      };
      if (imageRef.current) {
        imageRef.current.style.transition = 'none';
        imageRef.current.style.cursor = 'grabbing';
      }
    }
  };

  const moveDrag = (clientX: number, clientY: number) => {
    if (isDraggingRef.current && scaleRef.current > 1) {
      const newX = clientX - dragStartRef.current.x;
      const newY = clientY - dragStartRef.current.y;
      updatePosition(newX, newY);
    }
  };

  const endDrag = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      if (imageRef.current) {
        imageRef.current.style.transition = 'transform 0.1s ease-out';
        imageRef.current.style.cursor =
          scaleRef.current > 1 ? 'grab' : 'default';
      }
      updatePosition(positionRef.current.x, positionRef.current.y);
    }
  };

  const initializePinchZoom = (distance: number) => {
    lastDistanceRef.current = distance;
    if (imageRef.current) {
      imageRef.current.style.transition = 'none';
    }
  };

  const updatePinchZoom = (distance: number) => {
    if (lastDistanceRef.current === 0) return;

    const delta = distance - lastDistanceRef.current;
    const scaleChange = delta * 0.005;
    lastDistanceRef.current = distance;

    updateScale(scaleRef.current + scaleChange);
  };

  const endPinchZoom = () => {
    lastDistanceRef.current = 0;
    if (imageRef.current) {
      imageRef.current.style.transition = 'transform 0.1s ease-out';
    }
    updatePosition(positionRef.current.x, positionRef.current.y);
  };

  const getScale = () => scaleRef.current;

  return {
    imageRef,
    updateScale,
    startDrag,
    moveDrag,
    endDrag,
    initializePinchZoom,
    updatePinchZoom,
    endPinchZoom,
    getScale,
  };
};

export default useImageZoom;
