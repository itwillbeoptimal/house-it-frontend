import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { subpageTitleAtom } from '@/atoms/headerAtom';
import previousPathAtom from '@/atoms/previousPathAtom';
import * as S from '@/components/Header/SubpageHeader.styles';
import BackIcon from '@/assets/icons/back.svg?react';

const SubpageHeader: React.FC = () => {
  const navigate = useNavigate();
  const title = useAtomValue(subpageTitleAtom);
  const prevPath = useAtomValue(previousPathAtom);

  const handleBack = () => {
    if (prevPath === '/oauth/callback') {
      navigate('/');
    } else if (prevPath === '/qna/post' || prevPath?.includes('edit')) {
      navigate('/qna');
    } else {
      navigate(-1);
    }
  };

  return (
    <S.Container>
      <S.BackButton onClick={handleBack}>
        <BackIcon />
      </S.BackButton>
      {title && <S.Title>{title}</S.Title>}
    </S.Container>
  );
};

export default SubpageHeader;
