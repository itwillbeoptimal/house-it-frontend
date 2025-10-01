import React, { useState } from 'react';
import * as S from '@/pages/QnADetail/components/CommentInput/CommentInput.styles';
import SendIcon from '@/assets/icons/send.svg?react';

interface CommentInputProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

const CommentInput: React.FC<CommentInputProps> = ({
  onSubmit,
  placeholder,
  isLoading = false,
}) => {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!content.trim() || isLoading) return;

    onSubmit(content.trim());
    setContent('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);

    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
  };

  return (
    <S.Container>
      <S.CommentTextarea
        value={content}
        onChange={handleTextareaChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isLoading}
        rows={1}
      />
      <S.SendButton
        onClick={handleSubmit}
        disabled={!content.trim() || isLoading}
      >
        <SendIcon />
      </S.SendButton>
    </S.Container>
  );
};

export default CommentInput;
