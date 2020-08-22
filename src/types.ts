export type Maybe<T> = T | null | undefined;

export type ID = number;

type DateString = string;

export interface ItemWithId {
  id: ID;
}

export interface APIConfiguration {
  images: {
    secure_base_url: string;
  };
}

export interface Genre {
  id: ID;
  name: string;
}

export interface Movie extends ItemWithId {
  title: string;
  overview: string;
  tagline: Maybe<string>;
  poster_path: string;
  backdrop_path: string;
  imdb_id: Maybe<string>;
  release_date: DateString;
  vote_average: number;
  genres: Genre[];
}

export interface BasePerson extends ItemWithId {
  name: string;
  profile_path: string;
}

export interface Person extends BasePerson {
  biography: Maybe<string>;

  gender: number;
  known_for_department: string;
  birthday: DateString;
  place_of_birth: string;
  official_site: Maybe<string>;
  also_known_as: Maybe<string[]>;
  imdb_id: Maybe<string>;
}

export type MovieCast = BasePerson & {
  character: string;
};

export interface MovieImage {
  file_path: string;
}

export type PersonImage = MovieImage;

export interface MovieVideo extends ItemWithId {
  key: string;
  name: string;
  type: string;
}

export type SuggestionType = 'movie' | 'person';
export type SearchType = SuggestionType;

export type Suggestion = (Movie | Person) & {
  suggestionType: SuggestionType;
};

export interface InfiniteFetchResponse<Data> {
  results: Data[];
}
