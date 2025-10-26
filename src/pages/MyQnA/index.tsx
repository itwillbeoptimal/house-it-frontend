import React from 'react';
import type { QnAItem } from '@/pages/QnA/types';
import useSubpageHeader from '@/hooks/useSubpageHeader';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useMyQuestionsQuery from '@/hooks/queries/qna/useMyQuestionsQuery';
import * as S from '@/pages/MyQnA/MyQnA.styles';
import Loader from '@/components/Loader';
import QnACard from '@/pages/QnA/components/QnACard';

const MyQnA: React.FC = () => {
  useSubpageHeader({
    title: '나의 Q&A',
  });

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMyQuestionsQuery();

  const observerRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  if (isLoading) {
    return (
      <S.Container>
        <S.EmptyState>
          <Loader />
        </S.EmptyState>
      </S.Container>
    );
  }

  if (isError) {
    return (
      <S.Container>
        <S.EmptyState>
          <S.EmptyMessage>
            질문을 불러오는 중 오류가 발생했습니다.
          </S.EmptyMessage>
        </S.EmptyState>
      </S.Container>
    );
  }

  const questions = data?.pages.flatMap((page) => page.questions) || [];

  const mappedQuestions: QnAItem[] = questions.map((question) => ({
    id: question.questionId,
    categoryId: question.categoryId,
    title: question.title,
    content: question.content,
    author: question.nickname,
    authorProfileUrl: question.profileUrl || undefined,
    createdAt: question.createdAt,
    answerCount: question.answerCount,
    isAnswered: question.isAnswered,
  }));

  return (
    <S.Container>
      {mappedQuestions.length > 0 ? (
        <>
          <S.QnAList>
            {mappedQuestions.map((question) => (
              <QnACard
                key={question.id}
                {...question}
                showCategoryBadge={false}
                isPopular={false}
              />
            ))}
          </S.QnAList>
          {isFetchingNextPage && (
            <S.EmptyState>
              <Loader />
            </S.EmptyState>
          )}
        </>
      ) : (
        <S.EmptyState>
          <S.EmptyMessage>작성한 질문이 없습니다.</S.EmptyMessage>
        </S.EmptyState>
      )}
      <S.ObserverTrigger ref={observerRef} />
    </S.Container>
  );
};

export default MyQnA;
