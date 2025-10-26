import React from 'react';
import type { Comment } from '@/pages/QnADetail/types';
import { formatTimeAgo } from '@/utils/dateUtils';
import * as S from '@/pages/QnADetail/components/CommentItem/CommentItem.styles';
import * as CommonStyles from '@/pages/QnADetail/components/Common.styles';
import Dropdown from '@/components/Dropdown';
import Profile from '@/pages/QnADetail/components/Profile';
import MenuIcon from '@/assets/icons/menu.svg?react';

interface CommentItemProps {
  comment: Comment;
  onDelete?: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onDelete }) => {
  const showMenu = comment.canModify || comment.canDelete || !comment.canModify;

  const menuItems = [];
  if (comment.canDelete && onDelete) {
    menuItems.push({
      label: '삭제',
      onClick: onDelete,
    });
  }

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
      {showMenu && menuItems.length > 0 && (
        <S.MenuIconWrapper>
          <Dropdown
            trigger={<MenuIcon width={16} height={16} />}
            items={menuItems}
          />
        </S.MenuIconWrapper>
      )}
    </S.Container>
  );
};

export default CommentItem;
