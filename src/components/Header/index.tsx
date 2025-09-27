import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { headerButtonAtom } from '@/atoms/headerAtom';
import * as S from '@/components/Header/Header.styles';
import LogoSVG from '@/assets/logo.svg?react';
import MyIcon from '@/assets/icons/my.svg?react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const leftAction = useAtomValue(headerButtonAtom);

  return (
    <S.Container>
      <S.LogoButton
        onClick={() => {
          navigate('/');
        }}
      >
        <LogoSVG />
      </S.LogoButton>
      {leftAction && <S.ButtonsWrapper>{leftAction}</S.ButtonsWrapper>}
      <S.MyButton
        onClick={() => {
          navigate('/my');
        }}
      >
        <MyIcon />
      </S.MyButton>
    </S.Container>
  );
};

export default Header;
