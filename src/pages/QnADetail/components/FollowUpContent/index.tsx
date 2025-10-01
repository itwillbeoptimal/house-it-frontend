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
  answerId: number;
  followUpQuestions: FollowUpQuestion[];
}

const FollowUpContent: React.FC<FollowUpContentProps> = ({
  followUpQuestions,
}) => {
  const handleFollowUpSubmit = async () => {};

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
              아직 추가 질문이 없습니다
            </CommonStyles.EmptyMessage>
            <CommonStyles.EmptySubMessage>
              궁금한 점을 추가로 질문해 보세요!
            </CommonStyles.EmptySubMessage>
          </CommonStyles.EmptyState>
        )}
      </FollowUpList>
      <CommentInput
        onSubmit={handleFollowUpSubmit}
        placeholder="추가 질문을 입력하세요"
      />
    </>
  );
};

export default FollowUpContent;
