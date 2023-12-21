import '@testing-library/jest-dom';
import { IAnimeItem } from '../../../../types/interfaces';
import { SearchInput } from './SearchInput';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

const mockedAnimeItems: IAnimeItem[] = [
  {
    synopsis: 'synopsis',
    title: 'title',
    mal_id: 1,
    images: {
      jpg: {
        image_url: 'url',
        large_image_url: 'large_url',
      },
    },
  },
];

jest.mock('react-query', () => ({
  ...jest.requireActual('react-router-dom'),
  useQuery: () => ({
    data: mockedAnimeItems,
    isLoading: false,
    error: null,
  }),
}));

const setSearchResultsMock = () => jest.fn();
const setSearchStateMock = () => jest.fn();

describe('SearchInput', () => {
  it('should match snapshot', () => {
    expect(
      render(
        <SearchInput
          setSearchResults={setSearchResultsMock}
          setSearchState={setSearchStateMock}
        />,
      ),
    ).toMatchSnapshot();
  });

  it('should contain input element by default', () => {
    const { container } = render(
      <SearchInput
        setSearchResults={setSearchResultsMock}
        setSearchState={setSearchStateMock}
      />,
    );

    expect(container.querySelector('.search-input')).toBeInTheDocument();
  });

  it('input value should be empty by default if no search query param in the URL exists', () => {
    const { container } = render(
      <SearchInput
        setSearchResults={setSearchResultsMock}
        setSearchState={setSearchStateMock}
      />,
    );

    expect(
      (container.querySelector('.search-input') as HTMLInputElement).value,
    ).toEqual('');
  });

  it('should update searchValue on input change', async () => {
    const { container } = render(
      <MemoryRouter>
        <SearchInput
          setSearchResults={setSearchResultsMock}
          setSearchState={setSearchStateMock}
        />
      </MemoryRouter>,
    );

    const inputElement = container.querySelector(
      '.search-input',
    ) as HTMLInputElement;

    await act(async () => {
      userEvent.type(inputElement, 'Naruto');
    });

    expect(inputElement.value).toBe('Naruto');
  });
});
