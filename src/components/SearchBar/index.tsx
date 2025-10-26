import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as S from '@/components/SearchBar/SearchBar.styles';
import SearchIcon from '@/assets/icons/search-active.svg?react';

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSubmit }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    value || searchParams.get('q') || '',
  );

  useEffect(() => {
    if (value !== undefined) {
      setSearchValue(value);
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    onChange?.(newValue);
  };

  const handleSearch = () => {
    if (onSubmit) {
      onSubmit();
    } else if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <S.Container>
      <S.SearchInput
        type="text"
        placeholder="궁금한 게 있으신가요?"
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <S.SearchButton onClick={handleSearch}>
        <SearchIcon />
      </S.SearchButton>
    </S.Container>
  );
};

export default SearchBar;
