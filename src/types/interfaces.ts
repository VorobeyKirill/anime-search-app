export interface ISearchState {
  loading: boolean;
  error: null | { message: string };
}

export interface IAnimeItem {
  synopsis: string;
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    }
  };
}
