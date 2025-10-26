import React from 'react';
import styled from '@emotion/styled';
import type { FollowUpQuestion } from '@/pages/QnADetail/types';
import * as CommonStyles from '@/pages/QnADetail/components/Common.styles';
import FollowUpItem from '@/pages/QnADetail/components/FollowUpItem';
import CommentInput from '@/pages/QnADetail/components/CommentInput';

const FollowUpList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

interface FollowUpContentProps {
  followUpQuestions: FollowUpQuestion[];
  onMessageSubmit: (content: string) => Promise<void>;
  showInput?: boolean;
}

const FollowUpContent: React.FC<FollowUpContentProps> = ({
  followUpQuestions,
  onMessageSubmit,
  showInput = true,
}) => {
  return (
    <>
      <FollowUpList>
        {followUpQuestions.length > 0 ? (
          followUpQuestions.map((followUpQuestion) => (
            <FollowUpItem
              key={followUpQuestion.id}
              followUpQuestion={followUpQuestion}
            />
          ))
        ) : (
          <CommonStyles.EmptyState>
            <CommonStyles.EmptyMessage>
              추가 질문이 없습니다
            </CommonStyles.EmptyMessage>
          </CommonStyles.EmptyState>
        )}
      </FollowUpList>
      {showInput && (
        <CommentInput
          onSubmit={onMessageSubmit}
          placeholder="추가 질문을 입력하세요"
        />
      )}
    </>
  );
};

export default FollowUpContent;
