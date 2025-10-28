import React from 'react';
import { createPortal } from 'react-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import * as S from '@/pages/QuizPlay/components/CorrectMessage/CorrectMessage.styles';
import CorrectLottie from '@/assets/lotties/correct.lottie';

interface CorrectMessageProps {
  onClose: () => void;
}

const CorrectMessage: React.FC<CorrectMessageProps> = ({ onClose }) => {
  return createPortal(
    <S.Backdrop onClick={onClose}>
      <S.LottieWrapper>
        <DotLottieReact src={CorrectLottie} autoplay />
      </S.LottieWrapper>
    </S.Backdrop>,
    document.body,
  );
};

export default CorrectMessage;
