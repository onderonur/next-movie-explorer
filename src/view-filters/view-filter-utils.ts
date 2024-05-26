import type { PaginationResponse } from '@/common/common-types';
import { isOfType } from '@/common/common-utils';
import type { ViewableMovie, ViewablePerson } from './view-filter-types';

export const VIEW_FILTER_LIMIT = {
  minVoteCount: 200,
  minPopularity: 5,
};

export function shouldViewMovie(movie: ViewableMovie) {
  return (
    !movie.adult &&
    movie.vote_count >= VIEW_FILTER_LIMIT.minVoteCount &&
    movie.popularity >= VIEW_FILTER_LIMIT.minPopularity
  );
}

export function filterViewableMovies<T extends ViewableMovie>(movies: T[]) {
  return movies.filter((movie) => shouldViewMovie(movie));
}

export function shouldViewPerson(person: ViewablePerson) {
  return !person.adult && person.popularity >= VIEW_FILTER_LIMIT.minPopularity;
}

export function filterViewablePeople<T extends ViewablePerson>(people: T[]) {
  return people.filter((person) => shouldViewPerson(person));
}

export function filterViewablePageResults<
  T extends ViewableMovie | ViewablePerson,
>(page: PaginationResponse<T>): PaginationResponse<T> {
  const remainingItems = page.results.filter((item) => {
    if (isOfType<ViewableMovie>(item, ['title', 'overview', 'release_date'])) {
      return shouldViewMovie(item);
    }

    if (isOfType<ViewablePerson>(item, ['name', 'gender'])) {
      return shouldViewPerson(item);
    }

    return false;
  });

  const removedItemCount = page.results.length - remainingItems.length;

  let { total_pages } = page;

  if (!remainingItems.length) {
    total_pages = page.page === 1 ? 0 : page.page;
  }

  return {
    ...page,
    results: remainingItems,
    // `total_results` and `total_pages` calculation is not the perfect way to do it.
    // But it's just for demo purposes.
    total_results: page.total_results - removedItemCount,
    // If all of the items are removed, we set this page as the last one
    // to stop infinite loaders.
    total_pages,
  };
}
