import styled from '@emotion/styled';

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;
`;

export const ThumbnailWrapper = styled.figure`
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

export const Title = styled.h1`
  display: -webkit-box;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Subtitle = styled.h2`
  display: -webkit-box;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
