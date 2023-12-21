import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { DetailsPage } from './DetailsPage';
import { IAnimeItem } from '../../types/interfaces';

const mockedAnimeItem: IAnimeItem = {
  synopsis: 'synopsis',
  title: 'title',
  mal_id: 1,
  images: {
    jpg: {
      image_url: 'url',
      large_image_url: 'large_url',
    },
  },
};

jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useQuery: () => ({
    data: mockedAnimeItem,
    isLoading: false,
    error: null,
  }),
}));

describe('DetailsPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    expect(render(<DetailsPage />)).toMatchSnapshot();
  });

  it('should not render loading indicator by default', async () => {
    const { container } = render(<DetailsPage />);

    expect(
      container.querySelector('.details__loading-indicator')
    ).not.toBeInTheDocument();
  });

  it('should not render error message by default', async () => {
    const { container } = render(<DetailsPage />);

    expect(container.querySelector('.details__error')).not.toBeInTheDocument();
  });

  it('should render anime title if animeData was returned from useQuery', async () => {
    const { container } = render(<DetailsPage />);

    expect(container.querySelector('.details__title')).toBeInTheDocument();
  });

  it('should render anime title with correct textContent if animeData was returned from useQuery', async () => {
    const { container } = render(<DetailsPage />);

    expect(container.querySelector('.details__title')?.textContent).toEqual(
      mockedAnimeItem.title
    );
  });

  it('should render anime image if animeData was returned from useQuery', async () => {
    const { container } = render(<DetailsPage />);

    expect(container.querySelector('.details__image')).toBeInTheDocument();
  });

  it('should render anime description if animeData was returned from useQuery', async () => {
    const { container } = render(<DetailsPage />);

    expect(
      container.querySelector('.details__description')
    ).toBeInTheDocument();
  });

  it('should render anime description with correct textContent if animeData was returned from useQuery', async () => {
    const { container } = render(<DetailsPage />);

    expect(
      container.querySelector('.details__description')?.textContent
    ).toEqual(mockedAnimeItem.synopsis);
  });
});
