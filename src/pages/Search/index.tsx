import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { SearchType } from '@/apis/search/types';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useRecommendTermsQuery from '@/hooks/queries/search/useRecommendTermsQuery';
import useAutocompleteQuery from '@/hooks/queries/search/useAutocompleteQuery';
import useSearchQuery from '@/hooks/queries/search/useSearchQuery';
import useMagazineSearchQuery from '@/hooks/queries/search/useMagazineSearchQuery';
import useQuestionSearchQuery from '@/hooks/queries/search/useQuestionSearchQuery';
import * as S from '@/pages/Search/Search.styles';
import SearchHeader from '@/components/Header/SearchHeader';
import Loader from '@/components/Loader';
import SearchResultCard from '@/pages/Search/components/SearchResultCard';
import ArrowIcon from '@/assets/icons/arrow.svg?react';

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('q') || '';
  const type = (searchParams.get('type') as SearchType) || 'all';
  const [searchTerm, setSearchTerm] = useState(keyword);
  const [searchType, setSearchType] = useState<SearchType>(type);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  const { data: recommendTerms } = useRecommendTermsQuery();
  const { data: autocompleteData } = useAutocompleteQuery(searchTerm, 10);
  const { data: searchData, isLoading: isSearchLoading } = useSearchQuery(
    keyword,
    1,
    5,
  );
  const {
    data: magazineData,
    isLoading: isMagazineLoading,
    fetchNextPage: fetchNextMagazinePage,
    hasNextPage: hasNextMagazinePage,
    isFetchingNextPage: isFetchingNextMagazinePage,
  } = useMagazineSearchQuery(keyword, 10);
  const {
    data: questionData,
    isLoading: isQuestionLoading,
    fetchNextPage: fetchNextQuestionPage,
    hasNextPage: hasNextQuestionPage,
    isFetchingNextPage: isFetchingNextQuestionPage,
  } = useQuestionSearchQuery(keyword, 10);

  const filteredSuggestions =
    autocompleteData?.results?.filter((item) => item && item.keyword) || [];

  const magazineObserverRef = useInfiniteScroll({
    hasNextPage: searchType === 'magazine' ? hasNextMagazinePage : false,
    isFetchingNextPage: isFetchingNextMagazinePage,
    fetchNextPage: fetchNextMagazinePage,
  });

  const questionObserverRef = useInfiniteScroll({
    hasNextPage: searchType === 'question' ? hasNextQuestionPage : false,
    isFetchingNextPage: isFetchingNextQuestionPage,
    fetchNextPage: fetchNextQuestionPage,
  });

  useEffect(() => {
    setSearchTerm(keyword);
  }, [keyword]);

  useEffect(() => {
    setSearchType(type);
  }, [type]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target as Node)
      ) {
        setShowAutocomplete(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setShowAutocomplete(value.length > 0);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      setShowAutocomplete(false);
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowAutocomplete(false);
    navigate(`/search?q=${encodeURIComponent(suggestion)}&type=${searchType}`);
  };

  const handleTagClick = (term: string) => {
    setSearchTerm(term);
    navigate(`/search?q=${encodeURIComponent(term)}&type=${searchType}`);
  };

  const handleMagazineClick = (magazineId: number) => {
    navigate(`/magazine/${magazineId}`);
  };

  const handleQuestionClick = (questionId: number) => {
    navigate(`/qna/${questionId}`);
  };

  const handleViewMoreMagazines = () => {
    navigate(`/search?q=${encodeURIComponent(keyword)}&type=magazine`);
  };

  const handleViewMoreQuestions = () => {
    navigate(`/search?q=${encodeURIComponent(keyword)}&type=question`);
  };

  const highlightText = (text: string, highlight: string) => {
    if (!text || !highlight.trim()) {
      return <span>{text}</span>;
    }

    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    let highlightCount = 0;
    let textCount = 0;

    return (
      <span>
        {parts.map((part) => {
          if (regex.test(part)) {
            highlightCount += 1;
            return (
              <S.HighlightText key={`${text}-highlight-${highlightCount}`}>
                {part}
              </S.HighlightText>
            );
          }
          textCount += 1;
          return <span key={`${text}-text-${textCount}`}>{part}</span>;
        })}
      </span>
    );
  };

  const renderIntegratedSearch = () => {
    const questions = searchData?.questions || [];
    const magazines = searchData?.magazines || [];
    const hasResults = questions.length > 0 || magazines.length > 0;

    if (isSearchLoading) {
      return (
        <S.EmptyState>
          <Loader />
        </S.EmptyState>
      );
    }

    if (!hasResults) {
      return (
        <S.EmptyState>
          <S.EmptyMessage>
            <S.SearchKeyword>&apos;{keyword}&apos;</S.SearchKeyword>에 대한 검색
            결과가 없습니다.
          </S.EmptyMessage>
        </S.EmptyState>
      );
    }

    return (
      <>
        {questions.length > 0 && (
          <>
            <S.SectionHeader>
              <S.SectionTitle>질문</S.SectionTitle>
              {searchData?.questionHasNext && (
                <S.ViewMoreButton onClick={handleViewMoreQuestions}>
                  더보기
                  <ArrowIcon />
                </S.ViewMoreButton>
              )}
            </S.SectionHeader>
            <S.ContentArea>
              {questions.map((question) => (
                <SearchResultCard
                  key={question.questionId}
                  type="question"
                  id={question.questionId}
                  title={question.questionTitle}
                  content={question.questionContent}
                  author={question.questionWriterName}
                  authorProfileUrl={question.questionWriterProfile}
                  createdAt={question.createdAt}
                  onClick={handleQuestionClick}
                />
              ))}
            </S.ContentArea>
          </>
        )}
        {magazines.length > 0 && (
          <>
            <S.SectionHeader hasTopPadding={questions.length > 0}>
              <S.SectionTitle>매거진</S.SectionTitle>
              {searchData?.magazineHasNext && (
                <S.ViewMoreButton onClick={handleViewMoreMagazines}>
                  더보기
                  <ArrowIcon />
                </S.ViewMoreButton>
              )}
            </S.SectionHeader>
            <S.ContentArea>
              {magazines.map((magazine) => (
                <SearchResultCard
                  key={magazine.magazineId}
                  type="magazine"
                  id={magazine.magazineId}
                  title={magazine.magazineTitle}
                  subtitle={magazine.magazineSubtitle}
                  author={magazine.magazineAuthor}
                  authorProfileUrl={magazine.authorProfileUrl}
                  createdAt={magazine.createdAt}
                  thumbnailUrl={magazine.magazineThumbnailUrl}
                  onClick={handleMagazineClick}
                />
              ))}
            </S.ContentArea>
          </>
        )}
        <S.ObserverTrigger ref={magazineObserverRef} />
      </>
    );
  };

  const renderMagazineSearch = () => {
    const magazines =
      magazineData?.pages.flatMap((page) => page.magazineListItems) || [];

    if (isMagazineLoading) {
      return (
        <S.EmptyState>
          <Loader />
        </S.EmptyState>
      );
    }

    if (magazines.length === 0) {
      return (
        <S.EmptyState>
          <S.EmptyMessage>
            <S.SearchKeyword>&apos;{keyword}&apos;</S.SearchKeyword>에 대한
            매거진 검색 결과가 없습니다.
          </S.EmptyMessage>
        </S.EmptyState>
      );
    }

    return (
      <>
        <S.SectionHeader>
          <S.SectionTitle>매거진</S.SectionTitle>
        </S.SectionHeader>
        <S.ContentArea>
          {magazines.map((magazine) => (
            <SearchResultCard
              key={magazine.magazineId}
              type="magazine"
              id={magazine.magazineId}
              title={magazine.magazineTitle}
              subtitle={magazine.magazineSubtitle}
              author={magazine.magazineAuthor}
              authorProfileUrl={magazine.authorProfileUrl}
              createdAt={magazine.createdAt}
              thumbnailUrl={magazine.magazineThumbnailUrl}
              onClick={handleMagazineClick}
            />
          ))}
        </S.ContentArea>
        <S.ObserverTrigger ref={magazineObserverRef} />
        {isFetchingNextMagazinePage && (
          <S.EmptyState>
            <Loader />
          </S.EmptyState>
        )}
      </>
    );
  };

  const renderQuestionSearch = () => {
    const questions =
      questionData?.pages.flatMap((page) => page.questionListItems) || [];

    if (isQuestionLoading) {
      return (
        <S.EmptyState>
          <Loader />
        </S.EmptyState>
      );
    }

    if (questions.length === 0) {
      return (
        <S.EmptyState>
          <S.EmptyMessage>
            <S.SearchKeyword>&apos;{keyword}&apos;</S.SearchKeyword>에 대한 질문
            검색 결과가 없습니다.
          </S.EmptyMessage>
        </S.EmptyState>
      );
    }

    return (
      <>
        <S.SectionHeader>
          <S.SectionTitle>질문</S.SectionTitle>
        </S.SectionHeader>
        <S.ContentArea>
          {questions.map((question) => (
            <SearchResultCard
              key={question.questionId}
              type="question"
              id={question.questionId}
              title={question.questionTitle}
              content={question.questionContent}
              author={question.questionWriterName}
              authorProfileUrl={question.questionWriterProfile}
              createdAt={question.createdAt}
              onClick={handleQuestionClick}
            />
          ))}
        </S.ContentArea>
        <S.ObserverTrigger ref={questionObserverRef} />
        {isFetchingNextQuestionPage && (
          <S.EmptyState>
            <Loader />
          </S.EmptyState>
        )}
      </>
    );
  };

  const renderSearchResults = () => {
    switch (searchType) {
      case 'magazine':
        return renderMagazineSearch();
      case 'question':
        return renderQuestionSearch();
      default:
        return renderIntegratedSearch();
    }
  };

  return (
    <>
      <SearchHeader
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <S.Container>
        <S.AutocompleteWrapper
          ref={autocompleteRef}
          isVisible={showAutocomplete && filteredSuggestions.length > 0}
        >
          <S.AutocompleteList>
            {filteredSuggestions.map((item) => (
              <S.AutocompleteItem
                key={item?.keyword || Math.random()}
                onClick={() => handleSuggestionClick(item?.keyword || '')}
              >
                {highlightText(item?.keyword || '', searchTerm)}
              </S.AutocompleteItem>
            ))}
          </S.AutocompleteList>
        </S.AutocompleteWrapper>
        {keyword ? (
          renderSearchResults()
        ) : (
          <>
            <S.SectionHeader>
              <S.SectionTitle>인기 검색어</S.SectionTitle>
            </S.SectionHeader>
            <S.TagList>
              {recommendTerms?.terms.map((term) => (
                <S.Tag key={term} onClick={() => handleTagClick(term)}>
                  {term}
                </S.Tag>
              ))}
            </S.TagList>
          </>
        )}
      </S.Container>
    </>
  );
};

export default Search;
