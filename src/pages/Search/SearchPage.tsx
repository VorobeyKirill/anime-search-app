import { useState } from 'react';
import { SearchInput } from './components/SearchInput/SearchInput';
import { SearchResults } from './components/SearchResults/SearchResults';
import { IAnimeItem, ISearchState } from '../../types/interfaces';

export const SearchPage = () => {
  const [searchResults, setSearchResults] = useState<IAnimeItem[]>([]);
  const [searchState, setSearchState] = useState<ISearchState>({
    loading: false,
    error: null,
  });

  return (
    <>
      <SearchInput
        setSearchResults={setSearchResults}
        setSearchState={setSearchState}
      />
      {searchState.loading && <span>Loading results...</span>}
      {searchState.error && (
        <div>
          <span>
            Oops! Something went wrong. Please, try to run search again...
          </span>
          <p>Error: {searchState.error.message}</p>
        </div>
      )}
      {!!searchResults.length && <SearchResults animeItems={searchResults} />}
    </>
  );
};
