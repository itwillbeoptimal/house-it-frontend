import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { subpageTitleAtom } from '@/atoms/headerAtom';
import * as S from '@/components/Header/SubpageHeader.styles';
import BackIcon from '@/assets/icons/back.svg?react';

const SubpageHeader: React.FC = () => {
  const navigate = useNavigate();
  const title = useAtomValue(subpageTitleAtom);

  return (
    <S.Container>
      <S.BackButton
        onClick={() => {
          navigate(-1);
        }}
      >
        <BackIcon />
      </S.BackButton>
      {title && <S.Title>{title}</S.Title>}
    </S.Container>
  );
};

export default SubpageHeader;
