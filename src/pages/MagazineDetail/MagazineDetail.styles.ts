import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 16px;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  margin-bottom: 2px;
  font-size: 18px;
  font-weight: 600;
`;

export const Subtitle = styled.h2`
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
`;

export const ActionButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 8px;
  gap: 8px;
`;

export const ShareButton = styled.button`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  height: 21px;
  padding: 0 8px;
  gap: 2px;
  background-color: white;
  border: 1.5px solid ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  border-radius: 12px;
  color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  font-weight: 700;
  font-size: 10px;
`;

export const BookmarkButton = styled.button<{ isBookmarked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  & svg {
    width: 28px;
    height: 28px;
    fill: ${(props) =>
      props.isBookmarked ? props.theme.COLORS.MAIN.PRIMARY : 'transparent'};
    stroke: ${(props) =>
      props.isBookmarked
        ? props.theme.COLORS.MAIN.PRIMARY
        : props.theme.COLORS.LABEL.SECONDARY};
  }
`;

export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
`;

export const ProfileWrapper = styled.div`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  margin-right: 8px;
  border-radius: 50%;
  overflow: hidden;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const AuthorMeta = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const AuthorName = styled.span`
  margin-bottom: 4px;
  font-weight: 500;
  line-height: 1;
`;

export const CreatedAt = styled.span`
  color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
  font-size: 10px;
  line-height: 1;
`;

export const ThumbnailWrapper = styled.figure`
  width: 100%;
  aspect-ratio: 16/9;
  margin: 16px 0 12px 0;
  overflow: hidden;
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ContentWrapper = styled.article`
  padding: 0 20px 20px 20px;
`;
