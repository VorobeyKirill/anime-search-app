import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { IAnimeItem } from '../../types/interfaces';

import './DetailsPage.scss';

const ANIME_API = 'https://api.jikan.moe/v4/anime';

async function fetchAnimeDataById(
  animeId: string | undefined
): Promise<IAnimeItem> {
  const response = await fetch(`${ANIME_API}/${animeId}`);
  const animeData = await response.json();

  return animeData.data;
}

export const DetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(
    ['animeData'],
    () => fetchAnimeDataById(id),
    { enabled: !!id }
  );

  if (isLoading) {
    return <span className="details__loading-indicator">Loading...</span>;
  }

  if (error) {
    return (
      <div className="details__error">
        <span>
          Oops! Something went wrong. Please, try to run search again...
        </span>
        <p>Error: {(error as { message: string })?.message}</p>
      </div>
    );
  }

  return (
    <>
      {!!data && (
        <div className="details-container">
          <h2 className="details__title">{data.title}</h2>
          <img
            src={data?.images.jpg.large_image_url}
            alt={data.title + ' cover image'}
            className="details__image"
          />
          <div className="details__divider"></div>
          <p className="details__description">{data.synopsis}</p>
        </div>
      )}
    </>
  );
};
