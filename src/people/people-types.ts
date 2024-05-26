import type { DateString, Id, Maybe } from '@/common/common-types';
import type { SearchResultType } from '@/medias/media-enums';
import type { TImage } from '@/medias/media-types';
import type { MovieListItem } from '@/movies/movie-types';
import type { Gender } from './people-utils';

export type PersonBase = {
  id: Id;
  name: string;
  profile_path: string;
  gender: Gender;
  adult: boolean;
  popularity: number;
};

export type PersonListItem = PersonBase & {
  biography: Maybe<string>;
  known_for_department: string;
  birthday: DateString;
  place_of_birth: string;
  official_site: Maybe<string>;
  also_known_as: Maybe<string[]>;
  imdb_id: Maybe<string>;
  media_type: SearchResultType;
};

type PersonCasting = MovieListItem & { character: string };
type PersonCrew = MovieListItem & { job: string };
type PersonCredits = { cast: PersonCasting[]; crew: PersonCrew[] };

export type PersonDetails = PersonListItem & {
  images: { profiles: TImage[] };
  credits: PersonCredits;
};
