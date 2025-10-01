import React from 'react';
import type { Comment } from '@/pages/QnADetail/types';
import { formatTimeAgo } from '@/utils/dateUtils';
import * as S from '@/pages/QnADetail/components/CommentItem/CommentItem.styles';
import * as CommonStyles from '@/pages/QnADetail/components/Common.styles';
import Profile from '@/pages/QnADetail/components/Profile';

interface CommentItemProps {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
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
    </S.Container>
  );
};

export default CommentItem;
