import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { SearchPage } from './SearchPage';

jest.mock('./components/SearchInput/SearchInput', () => ({
  SearchInput: jest.fn(() => null),
}));

jest.mock('./components/SearchResults/SearchResults', () => ({
  SearchResults: jest.fn(() => null),
}));

describe('SearchPage', () => {
  it('should match snapshot', () => {
    expect(render(<SearchPage />)).toMatchSnapshot();
  });

  it('should not contain loading indicator by default', () => {
    const { container } = render(<SearchPage />);

    expect(
      container.querySelector('.search__loading-indicator')
    ).not.toBeInTheDocument();
  });

  it('should not contain error message by default', () => {
    const { container } = render(<SearchPage />);

    expect(container.querySelector('.search__error')).not.toBeInTheDocument();
  });
});
