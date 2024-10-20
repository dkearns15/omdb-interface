// shamelessly adapted from https://github.com/thblt-thlgn/omdb/tree/master/src/typing
export default interface Title {
  Title: string;
  StartYear: string;
  EndYear: string;
  Year: string;
  Rated?: RatingType;
  Released?: string;
  Runtime?: string;
  Genre?: GenreType;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster: string;
  Ratings?: Rating[];
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  imdbID: string;
  Type: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response?: string;
}

interface Rating {
  Source: string;
  Value: string;
}

type RatingType = 'PG' | 'TV-MA' | string;
type GenreType = 'Animation' | 'Adventure' | 'Comedy' | 'Family' | 'Fantasy' | string;
