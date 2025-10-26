import React from 'react';
import styled from '@emotion/styled';
import type { Comment } from '@/pages/QnADetail/types';
import * as CommonStyles from '@/pages/QnADetail/components/Common.styles';
import CommentItem from '@/pages/QnADetail/components/CommentItem';
import CommentInput from '@/pages/QnADetail/components/CommentInput';

const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

interface CommentsContentProps {
  comments: Comment[];
  onCommentSubmit: (content: string) => void;
  onCommentDelete: (commentId: number) => void;
}

const CommentsContent: React.FC<CommentsContentProps> = ({
  comments,
  onCommentSubmit,
  onCommentDelete,
}) => {
  return (
    <>
      <CommentsList>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onDelete={() => onCommentDelete(comment.id)}
            />
          ))
        ) : (
          <CommonStyles.EmptyState>
            <CommonStyles.EmptyMessage>
              댓글이 없습니다
            </CommonStyles.EmptyMessage>
            <CommonStyles.EmptySubMessage>
              첫 번째 댓글을 달아 보세요!
            </CommonStyles.EmptySubMessage>
          </CommonStyles.EmptyState>
        )}
      </CommentsList>
      <CommentInput
        onSubmit={onCommentSubmit}
        placeholder="댓글을 입력하세요"
      />
    </>
  );
};

export default CommentsContent;
