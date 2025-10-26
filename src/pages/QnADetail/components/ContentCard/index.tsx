import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { QnADetail, Answer } from '@/pages/QnADetail/types';
import { formatTimeAgo } from '@/utils/dateUtils';
import * as S from '@/pages/QnADetail/components/ContentCard/ContentCard.styles';
import * as CommonStyles from '@/pages/QnADetail/components/Common.styles';
import Profile from '@/pages/QnADetail/components/Profile';
import ImageViewerModal from '@/pages/QnADetail/components/ImageViewerModal';
import MenuIcon from '@/assets/icons/menu.svg?react';
import CommentIcon from '@/assets/icons/comment.svg?react';
import QuestionIcon from '@/assets/icons/question.svg?react';
import SparkleIcon from '@/assets/icons/sparkle.svg?react';

interface ContentCardProps {
  data: QnADetail | Answer;
  type: 'question' | 'answer';
  onCommentsClick: () => void;
  onFollowUpClick?: () => void;
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
  onEdit,
  onDelete,
  onReport,
  onAdopt,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEdit = () => {
    setIsMenuOpen(false);
    onEdit?.();
  };

  const handleDelete = () => {
    setIsMenuOpen(false);
    onDelete?.();
  };

  const handleReport = () => {
    setIsMenuOpen(false);
    onReport?.();
  };

  const handleAdopt = () => {
    setIsMenuOpen(false);
    onAdopt?.();
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

  const showMenu = canModify || canDelete || !canModify;

  return (
    <>
      <S.Container>
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
          {showMenu && (
            <S.MenuWrapper ref={menuRef}>
              <S.MenuButton onClick={handleMenuClick}>
                <MenuIcon />
              </S.MenuButton>
              {isMenuOpen && (
                <S.Dropdown>
                  {canModify && (
                    <S.DropdownItem onClick={handleEdit}>수정</S.DropdownItem>
                  )}
                  {canDelete && (
                    <S.DropdownItem onClick={handleDelete}>삭제</S.DropdownItem>
                  )}
                  {!canModify && !canDelete && (
                    <S.DropdownItem onClick={handleReport}>신고</S.DropdownItem>
                  )}
                  {canAdopt && (
                    <S.DropdownItem onClick={handleAdopt}>채택</S.DropdownItem>
                  )}
                </S.Dropdown>
              )}
            </S.MenuWrapper>
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
          {isAnswer && onFollowUpClick && (
            <S.ActionButton onClick={onFollowUpClick}>
              <QuestionIcon />
              추가 질문 {answerData.additionalMessageNum}
            </S.ActionButton>
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
