import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 20px;
  background-color: white;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[2]};
  border-radius: 12px;
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

export const MenuWrapper = styled.div`
  position: relative;
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 88px;
  margin-top: 8px;
  background-color: white;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[2]};
  border-radius: 8px;
  z-index: 10;
`;

export const DropdownItem = styled.button`
  width: 100%;
  padding: 12px 16px;
  text-align: center;

  &:hover {
    background: ${(props) => props.theme.COLORS.GRAY[1]};
  }

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }

  &:only-child {
    border-radius: 8px;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 14px;
`;

export const AIBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  margin-right: 4px;
  background: linear-gradient(135deg, #b721ff 0%, #21d4fd 100%);
  border-radius: 12px;
  color: white;
  font-size: 10px;
  font-weight: 500;
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
