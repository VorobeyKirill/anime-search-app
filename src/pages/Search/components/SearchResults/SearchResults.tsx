import { useNavigate } from 'react-router-dom';
import { IAnimeItem } from '../../../../types/interfaces';

interface ISearchResultsProps {
  animeItems: IAnimeItem[];
}

export const SearchResults = ({ animeItems }: ISearchResultsProps) => {
  const navigate = useNavigate();

  return (
    <ul className="search-results-container">
      {animeItems.map((animeItem) => (
        <li
          key={animeItem.mal_id}
          className="search-results-card"
          onClick={() => navigate(`/details/${animeItem.mal_id}`)}
        >
          <img
            src={animeItem.images.jpg.image_url}
            className="search-results-card__image"
            alt={animeItem.title + ' cover image'}
          />
          <span className="search-results-card__title">{animeItem.title}</span>
        </li>
      ))}
    </ul>
  );
};
