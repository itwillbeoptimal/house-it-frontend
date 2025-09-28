import React from 'react';
import { Outlet } from 'react-router-dom';
import * as S from '@/components/Layout/Layout.styles';
import SubpageHeader from '@/components/Header/SubpageHeader';
import BottomTab from '@/components/BottomTab';

const SubpageLayout: React.FC = () => {
  return (
    <S.LayoutContainer>
      <SubpageHeader />
      <S.Content>
        <Outlet />
      </S.Content>
      <BottomTab />
    </S.LayoutContainer>
  );
};

export default SubpageLayout;
