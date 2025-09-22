import styled from '@emotion/styled';

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  overflow: hidden;
  cursor: pointer;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 8px;
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

export const DefaultProfile = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.COLORS.GRAY[3]};
  border-radius: 50%;
`;

export const AuthorMeta = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AuthorName = styled.span`
  font-weight: 500;
`;

export const CreatedAt = styled.span`
  font-size: 10px;
  color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
`;

export const Title = styled.h2`
  font-size: 21px;
  font-weight: 600;
  color: ${(props) => props.theme.COLORS.LABEL.PRIMARY};
  margin-bottom: 4px;
`;

export const Subtitle = styled.p`
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
