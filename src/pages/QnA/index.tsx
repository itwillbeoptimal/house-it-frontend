import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useHeaderButton from '@/hooks/useHeaderButton';
import usePopularPostsQuery from '@/hooks/queries/qna/usePopularPostsQuery';
import useQuestionsQuery from '@/hooks/queries/qna/useQuestionsQuery';
import * as S from '@/pages/QnA/QnA.styles';
import Loader from '@/components/Loader';
import CategoryTab from '@/components/CategoryTab';
import QnACard from '@/pages/QnA/components/QnACard';
import PopularQnA from '@/pages/QnA/components/PopularQnA';
import PostIcon from '@/assets/icons/post.svg?react';
import CheckedIcon from '@/assets/icons/checked.svg?react';
import UncheckedIcon from '@/assets/icons/unchecked.svg?react';
import ArrowIcon from '@/assets/icons/arrow.svg?react';

const QnA: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);
  const [showCompleteOnly, setShowCompleteOnly] = useState<boolean>(false);
  const observerRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useHeaderButton(
    <button
      type="button"
      onClick={() => {
        navigate('/qna/post');
      }}
    >
      <PostIcon />
    </button>,
  );

  const { data: popularData, isLoading: isLoadingPopular } =
    usePopularPostsQuery();

  const {
    data: questionsData,
    isLoading: isLoadingQuestions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useQuestionsQuery([selectedCategoryId], undefined, 5, showCompleteOnly);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const questions = useMemo(() => {
    return questionsData?.pages.flatMap((page) => page.questionListItems) || [];
  }, [questionsData]);

  const isInitialLoading = isLoadingQuestions && !questionsData;

  const popularPosts = useMemo(() => {
    if (!popularData?.popularPostList) return [];
    return popularData.popularPostList.map((post) => ({
      id: post.questionId,
      categoryId: post.categoryId,
      title: post.title,
      content: post.content,
      author: post.nickname,
      authorProfileUrl: post.profileUrl || undefined,
      createdAt: post.createdAt,
      answerCount: post.answerCount,
      isAnswered: post.isAnswered,
    }));
  }, [popularData]);

  const handleFilterChange = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  const handleCompleteFilterToggle = () => {
    setShowCompleteOnly(!showCompleteOnly);
  };

  const handleMyQnAClick = () => {
    navigate('/qna/my');
  };

  if (isLoadingPopular) {
    return (
      <S.Container>
        <S.EmptyState>
          <Loader />
        </S.EmptyState>
      </S.Container>
    );
  }

  return (
    <S.Container>
      {popularPosts.length > 0 && <PopularQnA items={popularPosts} />}
      <S.TabWrapper>
        <CategoryTab activeTab="qna" onFilterChange={handleFilterChange} />
        <S.ActionBar>
          <S.CompleteFilter onClick={handleCompleteFilterToggle}>
            {showCompleteOnly ? <CheckedIcon /> : <UncheckedIcon />}
            답변 완료만 보기
          </S.CompleteFilter>
          <S.MyQnAButton onClick={handleMyQnAClick}>
            나의 Q&A
            <ArrowIcon />
          </S.MyQnAButton>
        </S.ActionBar>
      </S.TabWrapper>
      <S.ContentArea>
        {isInitialLoading ? (
          <S.EmptyState>
            <Loader />
          </S.EmptyState>
        ) : questions.length > 0 ? (
          <>
            <S.QnAList>
              {questions.map((qna) => (
                <QnACard
                  key={qna.questionId}
                  id={qna.questionId}
                  categoryId={qna.questionCategoryId}
                  title={qna.questionTitle}
                  content={qna.questionContent}
                  author={qna.questionWriterName}
                  authorProfileUrl={qna.questionWriterProfile}
                  createdAt={qna.createdAt}
                  answerCount={qna.answerCount}
                  isAnswered={qna.isAnswered}
                  showCategoryBadge={false}
                  isPopular={false}
                />
              ))}
            </S.QnAList>
            <S.ObserverTrigger ref={observerRef} />
            {isFetchingNextPage && (
              <S.EmptyState>
                <Loader />
              </S.EmptyState>
            )}
          </>
        ) : (
          <S.EmptyState>
            <S.EmptyMessage>해당 카테고리의 질문이 없습니다.</S.EmptyMessage>
          </S.EmptyState>
        )}
      </S.ContentArea>
    </S.Container>
  );
};

export default QnA;
