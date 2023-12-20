import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useDebounce } from '../../../../hooks/useDebounce';
import { IAnimeItem, ISearchState } from '../../../../types/interfaces';
import { useSearchParams } from 'react-router-dom';

import './SearchInput.scss';

const ANIME_API = 'https://api.jikan.moe/v4/anime';

interface ISearchInputProps {
  setSearchResults: React.Dispatch<React.SetStateAction<IAnimeItem[]>>;
  setSearchState: React.Dispatch<React.SetStateAction<ISearchState>>;
}

async function fetchAnimes(searchValue: string): Promise<IAnimeItem[]> {
  const response = await fetch(`${ANIME_API}?q=${searchValue}&sfw`);
  const data = await response.json();

  return data.data;
}

export const SearchInput = ({
  setSearchResults,
  setSearchState,
}: ISearchInputProps) => {
  const [searchValue, setSearchValue] = useState('');

  const [queryParams, setQueryParams] = useSearchParams();

  const debouncedSearchValue = useDebounce(searchValue, 500);
  const { data, isLoading, error } = useQuery(
    ['anime', debouncedSearchValue],
    () => fetchAnimes(debouncedSearchValue),
    { enabled: !!debouncedSearchValue }
  );

  // useEffect to send data to the parent component
  useEffect(() => {
    setSearchResults(data || []);
    setSearchState({
      loading: isLoading,
      error: error as null | { message: string },
    });
  }, [data, error, isLoading]);

  // useEffect to check queryParams for existing searchValue on component first render
  useEffect(() => {
    if (queryParams.get('search')) {
      setSearchValue(queryParams.get('search') || '');
    }
  }, [queryParams]);

  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search..."
      value={searchValue}
      onChange={(event) => {
        setSearchValue(event.target.value);
        setQueryParams({ search: event.target.value });
      }}
    />
  );
};
