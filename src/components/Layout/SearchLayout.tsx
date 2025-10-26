import React from 'react';
import { Outlet } from 'react-router-dom';
import * as S from '@/components/Layout/SearchLayout.styles';
import BottomTab from '@/components/BottomTab';

const SearchLayout: React.FC = () => {
  return (
    <S.LayoutContainer>
      <S.Content>
        <Outlet />
      </S.Content>
      <BottomTab />
    </S.LayoutContainer>
  );
};

export default SearchLayout;
