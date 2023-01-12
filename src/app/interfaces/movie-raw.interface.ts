export interface IMovieResponseRaw {
  Response: boolean;
  totalResults: string;
  Search: IMovieItemRaw[];
}

export interface IMovieItemRaw {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}
