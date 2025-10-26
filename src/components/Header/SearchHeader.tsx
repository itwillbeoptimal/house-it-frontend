import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '@/components/Header/SearchHeader.styles';
import SearchBar from '@/components/SearchBar';
import BackIcon from '@/assets/icons/back.svg?react';

interface SearchHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit?: () => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
}) => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.BackButton onClick={() => navigate(-1)}>
        <BackIcon />
      </S.BackButton>
      <SearchBar
        value={searchTerm}
        onChange={onSearchChange}
        onSubmit={onSearchSubmit}
      />
    </S.Container>
  );
};

export default SearchHeader;
