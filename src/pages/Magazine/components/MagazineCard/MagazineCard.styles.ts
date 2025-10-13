import styled from '@emotion/styled';

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  overflow: hidden;
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[2]};
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const ProfileWrapper = styled.div`
  width: 32px;
  height: 32px;
  margin-right: 8px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const AuthorMeta = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AuthorName = styled.span`
  font-weight: 500;
  line-height: 1;
  margin-bottom: 4px;
`;

export const CreatedAt = styled.span`
  color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
  font-size: 10px;
  line-height: 1;
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 2px;
`;

export const Subtitle = styled.h2`
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  margin-bottom: 12px;
`;

export const ThumbnailWrapper = styled.figure`
  width: 100%;
  height: 216px;
  border-radius: 12px;
  overflow: hidden;
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
