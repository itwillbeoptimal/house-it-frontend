import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

export const CarouselTrack = styled.div`
  display: flex;
  gap: 20px;
  user-select: none;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

export const Slide = styled.div<{ active: boolean }>`
  flex-shrink: 0;
  width: calc(100% - 40px);
  aspect-ratio: 16/9;
  background-color: ${(props) => props.theme.COLORS.GRAY[2]};
  border-radius: 16px;
  overflow: hidden;
`;

export const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  user-select: none;
`;

export const DotsWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 16px;
  left: 50%;
  gap: 8px;
  transform: translateX(-50%);
`;

export const Dot = styled.button<{ active: boolean }>`
  width: ${(props) => (props.active ? '20px' : '8px')};
  height: 8px;
  background-color: ${(props) =>
    props.active ? props.theme.COLORS.MAIN.PRIMARY : 'white'};
  opacity: ${(props) => (props.active ? 1 : 0.7)};
  border-radius: 4px;
  transition: all 0.3s ease;
`;
