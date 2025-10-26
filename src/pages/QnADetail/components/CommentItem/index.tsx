import React, { useState, useRef, useEffect } from 'react';
import type { Comment } from '@/pages/QnADetail/types';
import { formatTimeAgo } from '@/utils/dateUtils';
import * as S from '@/pages/QnADetail/components/CommentItem/CommentItem.styles';
import * as CommonStyles from '@/pages/QnADetail/components/Common.styles';
import Profile from '@/pages/QnADetail/components/Profile';
import MenuIcon from '@/assets/icons/menu.svg?react';
import styled from '@emotion/styled';

const MenuWrapper = styled.div`
  position: relative;
  align-self: center;
`;

const MenuButton = styled.button`
  display: flex;
  padding: 4px;

  & svg {
    width: auto;
    height: 12px;
  }
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

const DropdownItem = styled.button`
  width: 100%;
  padding: 12px 16px;
  text-align: center;
  font-size: 14px;

  &:hover {
    background: ${(props) => props.theme.COLORS.GRAY[1]};
  }

  &:first-of-type {
    border-radius: 8px 8px 0 0;
  }

  &:last-of-type {
    border-radius: 0 0 8px 8px;
  }

  &:only-child {
    border-radius: 8px;
  }
`;

interface CommentItemProps {
  comment: Comment;
  onDelete?: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDelete = () => {
    setIsMenuOpen(false);
    onDelete?.();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const showMenu = comment.canModify || comment.canDelete || !comment.canModify;

  return (
    <S.Container>
      <Profile
        profileUrl={comment.authorProfileUrl}
        authorName={comment.author}
      />
      <S.Content>
        <S.Header>
          <CommonStyles.AuthorName>{comment.author}</CommonStyles.AuthorName>
          <CommonStyles.CreatedAt>
            {formatTimeAgo(comment.createdAt)}
          </CommonStyles.CreatedAt>
        </S.Header>
        <S.CommentText>{comment.content}</S.CommentText>
      </S.Content>
      {showMenu && (
        <MenuWrapper ref={menuRef}>
          <MenuButton onClick={handleMenuClick}>
            <MenuIcon width={16} height={16} />
          </MenuButton>
          {isMenuOpen && (
            <Dropdown>
              {comment.canDelete && (
                <DropdownItem onClick={handleDelete}>삭제</DropdownItem>
              )}
            </Dropdown>
          )}
        </MenuWrapper>
      )}
    </S.Container>
  );
};

export default CommentItem;
