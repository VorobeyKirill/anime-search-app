import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { IAnimeItem } from '../../types/interfaces';

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
    return <span>Loading...</span>;
  }

  if (error) {
    return (
      <div>
        <span>
          Oops! Something went wrong. Please, try to run search again...
        </span>
        <p>Error: {(error as { message: string }).message}</p>
      </div>
    );
  }

  return (
    <>
      {!!data && (
        <>
          <img src={data?.images.jpg.image_url} />
          <h2>{data.title}</h2>
          <p>{data.synopsis}</p>
        </>
      )}
    </>
  );
};
