import styled from '@emotion/styled';

export const Container = styled.article`
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 12px;
  background-color: white;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[2]};
  border-radius: 12px;
  cursor: pointer;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ProfileWrapper = styled.div`
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  overflow: hidden;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const AuthorName = styled.span`
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 11px;
`;

export const Separator = styled.span`
  color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
  font-size: 11px;
`;

export const CreatedAt = styled.span`
  color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
  font-size: 11px;
`;

export const Title = styled.h3`
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const Content = styled.p`
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ThumbnailWrapper = styled.figure`
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border-radius: 8px;
  overflow: hidden;
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
