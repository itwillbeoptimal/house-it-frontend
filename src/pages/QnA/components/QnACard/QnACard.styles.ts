import styled from '@emotion/styled';

export const Container = styled.article<{ isPopular?: boolean }>`
  display: flex;
  flex-direction: column;
  flex-shrink: ${(props) => (props.isPopular ? '0' : 'initial')};
  width: ${(props) => (props.isPopular ? '280px' : 'auto')};
  padding: 16px;
  background-color: white;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[2]};
  border-radius: 12px;
  cursor: pointer;
`;

export const CategoryBadge = styled.span`
  display: inline-block;
  width: fit-content;
  padding: 4px 8px;
  margin-bottom: 8px;
  background-color: ${(props) => props.theme.COLORS.MAIN.TERTIARY};
  border-radius: 4px;
  color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  font-size: 10px;
  font-weight: 500;
`;

export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const ProfileWrapper = styled.div`
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  margin-right: 6px;
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
  align-items: center;
  gap: 6px;
`;

export const AuthorName = styled.span`
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 12px;
`;

export const CreatedAt = styled.span`
  color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
  font-size: 12px;
`;

export const Title = styled.h2`
  display: -webkit-box;
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 15px;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Content = styled.p`
  display: -webkit-box;
  margin-bottom: 12px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 13px;
  line-height: 1.4;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AnswerInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const AnswerBadge = styled.span<{ isAnswered: boolean }>`
  padding: 2px 6px;
  margin-right: 6px;
  background-color: ${(props) =>
    props.isAnswered
      ? props.theme.COLORS.MAIN.PRIMARY
      : props.theme.COLORS.GRAY[2]};
  border-radius: 4px;
  color: ${(props) =>
    props.isAnswered ? 'white' : props.theme.COLORS.LABEL.SECONDARY};
  font-size: 10px;
  font-weight: 500;
`;

export const AnswerCount = styled.span`
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 11px;
`;
