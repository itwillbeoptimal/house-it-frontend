import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import useSubpageHeader from '@/hooks/useSubpageHeader';
import useModal from '@/hooks/useModal';
import useBottomSheet from '@/hooks/useBottomSheet';
import useQuestionDetailQuery from '@/hooks/queries/qna/useQuestionDetailQuery';
import useAnswersQuery from '@/hooks/queries/qna/useAnswersQuery';
import useCommentsQuery from '@/hooks/queries/qna/useCommentsQuery';
import useAdditionalQuestionQuery from '@/hooks/queries/qna/useAdditionalQuestionQuery';
import {
  useDeleteAnswerMutation,
  useAdoptAnswerMutation,
  useRecommendAnswerMutation,
} from '@/hooks/mutations/qna/useAnswerMutations';
import { useDeleteQuestionMutation } from '@/hooks/mutations/qna/useQuestionMutations';
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
} from '@/hooks/mutations/qna/useCommentMutations';
import { useCreateAdditionalQuestionMessageMutation } from '@/hooks/mutations/qna/useAdditionalQuestionMutations';
import * as S from '@/pages/QnADetail/QnADetail.styles';
import ContentCard from '@/pages/QnADetail/components/ContentCard';
import AnswerList from '@/pages/QnADetail/components/AnswerList';
import CommentsContent from '@/pages/QnADetail/components/CommentsContent';
import FollowUpContent from '@/pages/QnADetail/components/FollowUpContent';
import WriteIcon from '@/assets/icons/write.svg?react';

const QnADetail: React.FC = () => {
  useSubpageHeader({
    title: '질문 상세',
  });

  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const numericQuestionId = questionId ? parseInt(questionId, 10) : null;

  const { closeModal, loading, alert, confirm } = useModal();
  const { openBottomSheet } = useBottomSheet();

  const [isMutating, setIsMutating] = useState(false);

  const { data: questionData, isLoading: isLoadingQuestion } =
    useQuestionDetailQuery(numericQuestionId!, !isMutating);

  const { data: answersData, isLoading: isLoadingAnswers } = useAnswersQuery(
    numericQuestionId!,
    5,
    !isMutating,
  );

  const deleteAnswerMutation = useDeleteAnswerMutation();
  const adoptAnswerMutation = useAdoptAnswerMutation();
  const deleteQuestionMutation = useDeleteQuestionMutation();
  const recommendAnswerMutation = useRecommendAnswerMutation();

  const question = useMemo(() => {
    if (!questionData) return null;
    return {
      id: questionData.question.questionId,
      categoryId: questionData.question.questionCategory,
      title: questionData.question.questionTitle,
      content: questionData.question.questionContent,
      author: questionData.question.questionWriterName,
      authorProfileUrl: questionData.question.questionWriterProfile,
      createdAt: questionData.question.createdAt,
      answerCount: 0,
      isAnswered: false,
      images: questionData.question.images
        ? questionData.question.images.map((img) => img.imageUrl)
        : [],
      commentNum: questionData.question.commentNum,
      isAuthor: questionData.question.isAuthor,
      canModify: questionData.authority.canModify,
      canDelete: questionData.authority.canDelete,
      canWrite: questionData.authority.canWrite,
    };
  }, [questionData]);

  const answers = useMemo(() => {
    return (
      answersData?.pages.flatMap((page) =>
        page.responses.map((response) => ({
          id: response.responseId,
          content: response.responseContent,
          author: response.responseWriterName,
          authorProfileUrl: response.responseWriterProfile,
          createdAt: response.createdAt,
          images: response.images
            ? response.images.map((img) => img.imageUrl)
            : [],
          imageDetails: response.images || [],
          isAI: response.isAi,
          isAdopted: response.responseAdopt,
          commentNum: response.commentNum,
          likeCount: response.likeCount,
          additionalMessageNum: response.additionalMessageNum,
          followUpRoomId: response.followUpRoomId,
          canAdopt: response.authority.canAdopt,
          canModify: response.authority.canModify,
          canDelete: response.authority.canDelete,
        })),
      ) || []
    );
  }, [answersData]);

  useEffect(() => {
    if ((isLoadingQuestion || isLoadingAnswers) && !isMutating) {
      const startTime = Date.now();

      loading({
        loadingText: '게시글을 불러오고 있어요.',
        disableBackdropClick: true,
      });

      return () => {
        const elapsed = Date.now() - startTime;
        setTimeout(
          () => {
            closeModal('loading-modal');
          },
          Math.max(0, 500 - elapsed),
        );
      };
    }
    return undefined;
  }, [isLoadingQuestion, isLoadingAnswers, isMutating]);

  const handleQuestionEdit = () => {
    if (!numericQuestionId) return;
    navigate(`/qna/${numericQuestionId}/edit`);
  };

  const handleQuestionDelete = () => {
    confirm({
      title: '질문 삭제',
      content: '정말 이 질문을 삭제하시겠습니까?',
      onConfirm: async () => {
        if (!numericQuestionId || deleteQuestionMutation.isPending) return;

        try {
          setIsMutating(true);
          await deleteQuestionMutation.mutateAsync(numericQuestionId);

          setTimeout(() => {
            alert({
              title: '삭제 완료',
              content: '질문이 삭제되었습니다.',
              onConfirm: () => {
                setIsMutating(false);
                navigate('/qna');
              },
            });
          }, 250);
        } catch {
          setIsMutating(false);
          setTimeout(() => {
            alert({
              title: '삭제 실패',
              content: '질문 삭제 중 오류가 발생했습니다.',
            });
          }, 250);
        }
      },
    });
  };

  const handleQuestionReport = () => {
    if (!numericQuestionId) return;
    navigate(`/qna/report/question/${numericQuestionId}`);
  };

  const handleAnswerEdit = (answerId: number) => {
    const answerToEdit = answers.find((answer) => answer.id === answerId);
    navigate(`/qna/${numericQuestionId}/edit/answer/${answerId}`, {
      state: { answerData: answerToEdit },
    });
  };

  const handleAnswerDelete = (answerId: number) => {
    confirm({
      title: '답변 삭제',
      content: '정말 이 답변을 삭제하시겠습니까?',
      onConfirm: async () => {
        if (deleteAnswerMutation.isPending) return;

        try {
          setIsMutating(true);
          await deleteAnswerMutation.mutateAsync(answerId);

          setTimeout(() => {
            alert({
              title: '삭제 완료',
              content: '답변이 삭제되었습니다.',
            });
          }, 250);
        } catch {
          setTimeout(() => {
            alert({
              title: '삭제 실패',
              content: '답변 삭제 중 오류가 발생했습니다.',
            });
          }, 250);
        } finally {
          await queryClient.invalidateQueries({ queryKey: ['answers'] });
          await queryClient.invalidateQueries({ queryKey: ['question'] });
          setIsMutating(false);
        }
      },
    });
  };

  const handleAnswerAdopt = (answerId: number) => {
    confirm({
      title: '답변 채택',
      content: '이 답변을 채택하시겠습니까?',
      onConfirm: async () => {
        if (adoptAnswerMutation.isPending) return;

        try {
          setIsMutating(true);
          await adoptAnswerMutation.mutateAsync(answerId);

          setTimeout(() => {
            alert({
              title: '채택 완료',
              content: '답변이 채택되었습니다.',
            });
          }, 250);
        } catch {
          setTimeout(() => {
            alert({
              title: '채택 실패',
              content: '답변 채택 중 오류가 발생했습니다.',
            });
          }, 250);
        } finally {
          await queryClient.invalidateQueries({ queryKey: ['answers'] });
          await queryClient.invalidateQueries({ queryKey: ['question'] });
          await queryClient.invalidateQueries({ queryKey: ['questions'] });
          setIsMutating(false);
        }
      },
    });
  };

  const handleAnswerReport = (answerId: number) => {
    if (!numericQuestionId) return;
    navigate(`/qna/report/answer/${answerId}`);
  };

  const handleQuestionComments = () => {
    if (!question) return;

    openBottomSheet({
      id: 'question-comments',
      title: '댓글',
      content: (
        <CommentsContentWrapper targetId={question.id} targetType="QUESTION" />
      ),
      hasMaxHeight: true,
    });
  };

  const handleAnswerComments = (answerId: number) => {
    openBottomSheet({
      id: 'answer-comments',
      title: '댓글',
      content: (
        <CommentsContentWrapper targetId={answerId} targetType="RESPONSE" />
      ),
      hasMaxHeight: true,
    });
  };

  const handleAnswerFollowUp = (answerId: number) => {
    if (!numericQuestionId) return;

    const answer = answers.find((a) => a.id === answerId);
    const followUpRoomId = answer?.followUpRoomId || null;

    openBottomSheet({
      id: 'answer-followup',
      title: '추가 질문',
      content: (
        <FollowUpContentWrapper
          questionId={numericQuestionId}
          answerId={answerId}
          followUpRoomId={followUpRoomId}
          isQuestionAuthor={question?.isAuthor ?? false}
        />
      ),
      hasMaxHeight: true,
    });
  };

  const handleAnswerRecommend = (answerId: number) => {
    confirm({
      title: '답변 추천',
      content: '이 답변을 추천하시겠습니까?',
      onConfirm: async () => {
        if (recommendAnswerMutation.isPending) return;

        try {
          setIsMutating(true);
          await recommendAnswerMutation.mutateAsync(answerId);
        } catch {
          setTimeout(() => {
            alert({
              title: '추천 실패',
              content: '답변 추천 중 오류가 발생했습니다.',
            });
          }, 250);
        } finally {
          await queryClient.invalidateQueries({ queryKey: ['answers'] });
          await queryClient.invalidateQueries({ queryKey: ['question'] });
          setIsMutating(false);
        }
      },
    });
  };

  const handleWriteAnswer = () => {
    if (!numericQuestionId) return;
    navigate(`/qna/${numericQuestionId}/answer`);
  };

  if (!numericQuestionId || !question) {
    return null;
  }

  return (
    <S.Container>
      <ContentCard
        data={question}
        type="question"
        onCommentsClick={handleQuestionComments}
        onEdit={handleQuestionEdit}
        onDelete={handleQuestionDelete}
        onReport={handleQuestionReport}
      />
      <AnswerList
        answers={answers}
        onAnswerComments={handleAnswerComments}
        onAnswerFollowUp={handleAnswerFollowUp}
        onAnswerRecommend={handleAnswerRecommend}
        onAnswerEdit={handleAnswerEdit}
        onAnswerDelete={handleAnswerDelete}
        onAnswerAdopt={handleAnswerAdopt}
        onAnswerReport={handleAnswerReport}
      />
      {question.canWrite && (
        <S.WriteButton onClick={handleWriteAnswer}>
          <WriteIcon />
        </S.WriteButton>
      )}
    </S.Container>
  );
};

const CommentsContentWrapper: React.FC<{
  targetId: number;
  targetType: 'QUESTION' | 'RESPONSE';
}> = ({ targetId, targetType }) => {
  const { data: commentsData } = useCommentsQuery(targetId, targetType, 5);
  const createCommentMutation = useCreateCommentMutation();
  const deleteCommentMutation = useDeleteCommentMutation();
  const { alert, confirm } = useModal();

  const comments = useMemo(() => {
    return (
      commentsData?.pages.flatMap((page) =>
        page.commentItemList.map((comment) => ({
          id: comment.commentId,
          content: comment.content,
          author: comment.nickname,
          authorProfileUrl: comment.profileImage,
          createdAt: comment.createdAt,
          canModify: comment.authority.canModify,
          canDelete: comment.authority.canDelete,
        })),
      ) || []
    );
  }, [commentsData]);

  const handleCommentSubmit = async (content: string) => {
    try {
      await createCommentMutation.mutateAsync({
        targetId,
        commentType: targetType,
        content,
      });
    } catch {
      alert({
        title: '댓글 작성 실패',
        content: '댓글 작성 중 오류가 발생했습니다.',
      });
    }
  };

  const handleCommentDelete = (commentId: number) => {
    confirm({
      title: '댓글 삭제',
      content: '정말 이 댓글을 삭제하시겠습니까?',
      onConfirm: async () => {
        if (deleteCommentMutation.isPending) return;

        try {
          await deleteCommentMutation.mutateAsync({
            commentId,
            commentType: targetType,
          });

          setTimeout(() => {
            alert({
              title: '삭제 완료',
              content: '댓글이 삭제되었습니다.',
            });
          }, 250);
        } catch {
          setTimeout(() => {
            alert({
              title: '삭제 실패',
              content: '댓글 삭제 중 오류가 발생했습니다.',
            });
          }, 250);
        }
      },
    });
  };

  return (
    <CommentsContent
      comments={comments}
      onCommentSubmit={handleCommentSubmit}
      onCommentDelete={handleCommentDelete}
    />
  );
};

const FollowUpContentWrapper: React.FC<{
  questionId: number;
  answerId: number;
  followUpRoomId: number | null;
  isQuestionAuthor: boolean;
}> = ({
  questionId,
  answerId,
  followUpRoomId: initialFollowUpRoomId,
  isQuestionAuthor,
}) => {
  const queryClient = useQueryClient();
  const createAdditionalQuestionMessageMutation =
    useCreateAdditionalQuestionMessageMutation();

  const [followUpRoomId, setFollowUpRoomId] = useState<number | null>(
    initialFollowUpRoomId,
  );

  useEffect(() => {
    setFollowUpRoomId(initialFollowUpRoomId);
  }, [initialFollowUpRoomId]);

  const { data: additionalQuestionData } = useAdditionalQuestionQuery(
    followUpRoomId!,
    questionId,
  );

  const messages = useMemo(() => {
    if (!additionalQuestionData) return [];

    const { messageList } = additionalQuestionData;
    const followUpQuestions = [];

    for (let i = 0; i < messageList.length; i += 2) {
      const questionMessage = messageList[i];
      const answerMessage = messageList[i + 1];

      followUpQuestions.push({
        id: questionMessage.messageId,
        content: questionMessage.content,
        author: '질문자',
        isAnswered: !!answerMessage,
        createdAt: questionMessage.createdAt,
        answer: answerMessage
          ? {
              id: answerMessage.messageId,
              content: answerMessage.content,
              author: '답변자',
              createdAt: answerMessage.createdAt,
              isAI: false,
            }
          : undefined,
      });
    }

    return followUpQuestions;
  }, [additionalQuestionData]);

  let shouldShowInput = false;

  if (additionalQuestionData) {
    const { canWrite, isThirdParty } = additionalQuestionData.authority;

    if (!isThirdParty && canWrite) {
      shouldShowInput = true;
    }
  } else if (isQuestionAuthor) {
    shouldShowInput = true;
  }

  const handleMessageSubmit = async (content: string) => {
    const response = await createAdditionalQuestionMessageMutation.mutateAsync({
      questionId,
      responseId: answerId,
      content,
    });

    if (response.followUpRoomId && response.followUpRoomId !== followUpRoomId) {
      setFollowUpRoomId(response.followUpRoomId);
    }

    await queryClient.invalidateQueries({
      queryKey: ['additional-question', followUpRoomId, questionId],
    });
  };

  return (
    <FollowUpContent
      followUpQuestions={messages}
      onMessageSubmit={handleMessageSubmit}
      showInput={shouldShowInput}
    />
  );
};

export default QnADetail;
