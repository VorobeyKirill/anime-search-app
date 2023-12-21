import '@testing-library/jest-dom';
import { IAnimeItem } from '../../../../types/interfaces';
import { SearchResults } from './SearchResults';
import { render } from '@testing-library/react';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

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

describe('SearchResults', () => {
  it('should match snapshot', () => {
    expect(
      render(<SearchResults animeItems={mockedAnimeItems} />)
    ).toMatchSnapshot();
  });

  it('should contain search result cards if animeItems is not an empty array', () => {
    const { container } = render(
      <SearchResults animeItems={mockedAnimeItems} />
    );

    expect(container.querySelector('.search-results-card')).toBeInTheDocument();
  });

  it('should contain item image in search result card if animeItems is not an empty array', () => {
    const { container } = render(
      <SearchResults animeItems={mockedAnimeItems} />
    );

    expect(
      container.querySelector('.search-results-card__image')
    ).toBeInTheDocument();
  });

  it('should contain item title in search result card if animeItems is not an empty array', () => {
    const { container } = render(
      <SearchResults animeItems={mockedAnimeItems} />
    );

    expect(
      container.querySelector('.search-results-card__title')
    ).toBeInTheDocument();
  });

  it('title should have textContent same as animeItem.title if animeItems is not an empty array', () => {
    const { container } = render(
      <SearchResults animeItems={mockedAnimeItems} />
    );

    expect(
      container.querySelector('.search-results-card__title')?.textContent
    ).toEqual(mockedAnimeItems[0].title);
  });

  it('should not contain search result cards if animeItems is an empty array', () => {
    const { container } = render(<SearchResults animeItems={[]} />);

    expect(
      container.querySelector('.search-results-card')
    ).not.toBeInTheDocument();
  });
});
