import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-top: 16px;
`;

export const CarouselTrack = styled.div`
  display: flex;
  user-select: none;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

export const Slide = styled.div<{ active: boolean }>`
  flex-shrink: 0;
  width: 85%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.active ? 1 : 0.5)};
  transform: scale(${(props) => (props.active ? 1 : 0.9)});
`;

export const ThumbnailWrapper = styled.div<{ active: boolean }>`
  position: relative;
  width: 100%;
  height: 320px;
  border-radius: 16px;
  overflow: hidden;
  background-color: ${(props) => props.theme.COLORS.GRAY[2]};
  transition: height 0.3s ease;

  ${(props) =>
    props.active &&
    `
      box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);
  `}
`;

export const ThumbnailImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  user-select: none;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 55%,
    rgba(0, 0, 0, 0.3) 70%,
    rgba(0, 0, 0, 0.95) 100%
  );
  pointer-events: none;
`;

export const MagazineContent = styled.div`
  position: absolute;
  bottom: 24px;
  width: 100%;
  padding: 0 24px;
`;

export const Title = styled.h2`
  color: white;
  font-weight: 600;
  word-break: keep-all;
`;

export const Subtitle = styled.h3`
  color: white;
  opacity: 0.7;
  font-weight: 500;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
