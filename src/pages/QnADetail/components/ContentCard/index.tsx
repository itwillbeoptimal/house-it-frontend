import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import type { QnADetail, Answer } from '@/pages/QnADetail/types';
import { formatTimeAgo } from '@/utils/dateUtils';
import * as S from '@/pages/QnADetail/components/ContentCard/ContentCard.styles';
import * as CommonStyles from '@/pages/QnADetail/components/Common.styles';
import Dropdown from '@/components/Dropdown';
import Profile from '@/pages/QnADetail/components/Profile';
import ImageViewerModal from '@/pages/QnADetail/components/ImageViewerModal';
import MenuIcon from '@/assets/icons/menu.svg?react';
import AdoptedIcon from '@/assets/icons/adopted.svg?react';
import CommentIcon from '@/assets/icons/comment.svg?react';
import QuestionIcon from '@/assets/icons/question.svg?react';
import ThumbsUpIcon from '@/assets/icons/thumbs-up.svg?react';
import SparkleIcon from '@/assets/icons/sparkle.svg?react';

interface ContentCardProps {
  data: QnADetail | Answer;
  type: 'question' | 'answer';
  onCommentsClick: () => void;
  onFollowUpClick?: () => void;
  onRecommendClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onReport?: () => void;
  onAdopt?: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({
  data,
  type,
  onCommentsClick,
  onFollowUpClick,
  onRecommendClick,
  onEdit,
  onDelete,
  onReport,
  onAdopt,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const isQuestion = type === 'question';
  const isAnswer = type === 'answer';
  const answerData = data as Answer;
  const questionData = data as QnADetail;

  const canModify = isQuestion ? questionData.canModify : answerData.canModify;
  const canDelete = isQuestion ? questionData.canDelete : answerData.canDelete;
  const canAdopt = isAnswer ? answerData.canAdopt : false;

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseImageViewer = () => {
    setSelectedImage(null);
  };

  const showMenu = canModify || canDelete || !canModify;

  const menuItems = [];
  if (canModify && onEdit) {
    menuItems.push({ label: '수정', onClick: onEdit });
  }
  if (canDelete && onDelete) {
    menuItems.push({ label: '삭제', onClick: onDelete });
  }
  if (!canModify && !canDelete && onReport) {
    menuItems.push({ label: '신고', onClick: onReport });
  }
  if (canAdopt && onAdopt) {
    menuItems.push({ label: '채택', onClick: onAdopt });
  }

  return (
    <>
      <S.Container>
        {answerData.isAdopted && (
          <S.AdoptedAnswer>
            <AdoptedIcon />
            질문 작성자가 채택한 답변입니다.
          </S.AdoptedAnswer>
        )}
        <S.Header>
          <S.AuthorInfo>
            <Profile
              profileUrl={data.authorProfileUrl}
              authorName={data.author}
            />
            <S.AuthorMeta>
              <CommonStyles.AuthorName>
                {isAnswer && answerData.isAI && (
                  <S.AIBadge>
                    <SparkleIcon />
                    AI
                  </S.AIBadge>
                )}
                {data.author}
              </CommonStyles.AuthorName>
              <CommonStyles.CreatedAt>
                {formatTimeAgo(data.createdAt)}
              </CommonStyles.CreatedAt>
            </S.AuthorMeta>
          </S.AuthorInfo>
          {showMenu && menuItems.length > 0 && (
            <Dropdown
              trigger={
                <S.MenuButton>
                  <MenuIcon />
                </S.MenuButton>
              }
              items={menuItems}
            />
          )}
        </S.Header>
        {isQuestion && <S.Title>{questionData.title}</S.Title>}
        <S.Content>{data.content}</S.Content>
        {data.images && data.images.length > 0 && (
          <S.ImageGallery>
            {data.images.map((image, index) => (
              <S.ContentImage
                key={image}
                src={image}
                alt={`${isQuestion ? '질문' : '답변'} 이미지 ${index}`}
                onClick={() => handleImageClick(image)}
              />
            ))}
          </S.ImageGallery>
        )}
        <S.ActionBar>
          <S.ActionButton onClick={onCommentsClick}>
            <CommentIcon />
            댓글 {data.commentNum}
          </S.ActionButton>
          {isAnswer && (
            <>
              <S.ActionButton onClick={onFollowUpClick}>
                <QuestionIcon />
                추가 질문 {answerData.additionalMessageNum}
              </S.ActionButton>
              <S.ActionButton onClick={onRecommendClick}>
                <ThumbsUpIcon />
                추천 {answerData.likeCount}
              </S.ActionButton>
            </>
          )}
        </S.ActionBar>
      </S.Container>
      {selectedImage &&
        createPortal(
          <ImageViewerModal
            imageUrl={selectedImage}
            onClose={handleCloseImageViewer}
          />,
          document.body,
        )}
    </>
  );
};

export default ContentCard;
