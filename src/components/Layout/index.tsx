import React from 'react';
import { Outlet } from 'react-router-dom';
import * as S from '@/components/Layout/Layout.styles';
import Header from '@/components/Header';
import BottomTab from '@/components/BottomTab';

const Layout: React.FC = () => {
  return (
    <S.LayoutContainer>
      <Header />
      <S.Content>
        <Outlet />
      </S.Content>
      <BottomTab />
    </S.LayoutContainer>
  );
};

export default Layout;
