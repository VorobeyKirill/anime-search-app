import { SearchInput } from './components/SearchInput/SearchInput';
import { SearchResults } from './components/SearchResults/SearchResults';
import { IAnimeItem } from '../../types/interfaces';

import './SearchPage.scss';
import { useDebounce } from '../../hooks/useDebounce';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

const ANIME_API = 'https://api.jikan.moe/v4/anime';

async function fetchAnimes(searchValue: string): Promise<IAnimeItem[]> {
  const response = await fetch(`${ANIME_API}?q=${searchValue}&sfw`);
  const data = await response.json();

  return data.data;
}

export const SearchPage = () => {
  const [queryParams] = useSearchParams();
  const searchText = queryParams.get('search') || '';

  const debouncedSearchValue = useDebounce(searchText, 500);
  const { data, isLoading, error } = useQuery(
    ['anime', debouncedSearchValue],
    () => fetchAnimes(debouncedSearchValue),
    { enabled: !!debouncedSearchValue }
  );

  return (
    <>
      <SearchInput />
      {isLoading && (
        <span className="search__loading-indicator">Loading results...</span>
      )}
      {error && (
        <div className="search__error">
          <span>
            Oops! Something went wrong. Please, try to run search again...
          </span>
          <p>Error: {(error as null | { message: string })?.message}</p>
        </div>
      )}
      {!!data && <SearchResults animeItems={data} />}
    </>
  );
};
