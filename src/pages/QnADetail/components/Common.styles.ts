import styled from '@emotion/styled';

export const ProfileWrapper = styled.div`
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
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

export const AuthorName = styled.span`
  font-weight: 500;
  font-size: 14px;
`;

export const CreatedAt = styled.span`
  color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
  font-size: 12px;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

export const EmptyMessage = styled.p`
  margin-bottom: 4px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-weight: 600;
  font-size: 16px;
`;

export const EmptySubMessage = styled.p`
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
`;
