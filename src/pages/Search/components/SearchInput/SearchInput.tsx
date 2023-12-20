import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useDebounce } from '../../../../hooks/useDebounce';
import { IAnimeItem, ISearchState } from '../../../../types/interfaces';

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
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const { data, isLoading, error } = useQuery(
    ['anime', debouncedSearchValue],
    () => fetchAnimes(debouncedSearchValue),
    { enabled: !!debouncedSearchValue }
  );

  useEffect(() => {
    setSearchResults(data || []);
    setSearchState({
      loading: isLoading,
      error: error as null | { message: string },
    });
  }, [data, error, isLoading]);

  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search..."
      value={searchValue}
      onChange={(event) => setSearchValue(event.target.value)}
    />
  );
};
