import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 20px;
  background-color: white;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[2]};
  border-radius: 12px;
`;

export const AdoptedAnswer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  gap: 4px;
  margin-bottom: 16px;
  background-color: ${(props) => props.theme.COLORS.MAIN.TERTIARY};
  border: 1px solid ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  border-radius: 8px;
  color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  font-weight: 500;
  font-size: 12px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const AuthorMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const MenuButton = styled.button`
  display: flex;
  align-items: center;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 14px;
`;

export const AIBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  margin-right: 4px;
  background: linear-gradient(135deg, #2575fc, #6a11cb);
  border-radius: 12px;
  color: white;
  font-family: Paperozi;
  font-size: 10px;
  font-weight: 700;
`;

export const Title = styled.h1`
  margin-bottom: 16px;
  font-weight: 600;
  font-size: 20px;
`;

export const Content = styled.div`
  font-size: 15px;
  line-height: 1.6;
  white-space: pre-wrap;
`;

export const ImageGallery = styled.div`
  display: flex;
  gap: 12px;
  margin: 20px 0;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const ContentImage = styled.img`
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  border-radius: 12px;
  object-fit: cover;
  cursor: pointer;
`;

export const ActionBar = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding-top: 20px;
  gap: 16px;
  border-top: 1px solid ${(props) => props.theme.COLORS.GRAY[1]};
`;
