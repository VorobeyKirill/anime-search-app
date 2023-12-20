import { useState } from 'react';
import { SearchInput } from './components/SearchInput/SearchInput';

export interface ISearchState {
  loading: boolean;
  error: null | unknown;
}

export const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchState, setSearchState] = useState<ISearchState>({ loading: false, error: null });

  console.log(searchResults);
  console.log(searchState);

  return (
    <>
      <SearchInput setSearchResults={setSearchResults} setSearchState={setSearchState} />
    </>
  );
};
