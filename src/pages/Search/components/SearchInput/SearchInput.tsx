import { useSearchParams } from 'react-router-dom';

import './SearchInput.scss';

export const SearchInput = () => {
  const [queryParams, setQueryParams] = useSearchParams();
  const searchValue = queryParams.get('search') || '';

  return (
    <input
      className="search-input"
      onChange={(event) => {
        setQueryParams({ search: event.target.value });
      }}
      placeholder="Search..."
      type="text"
      value={searchValue}
    />
  );
};
