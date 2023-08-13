import PageTitle from '@/common/page-title';
import MovieSortingSelect from '@/movies/movie-sorting-select';
import FeaturedMovie from '@/movies/featured-movie';
import { getDiscoverMovies, getMovieGenres } from '@/movies/movie-fetchers';
import MovieInfiniteGridList from '@/movies/movie-infinite-grid-list';
import { Divider, Stack } from '@mui/material';
import Padder from '@/common/padder';
import { FIRST_PAGE } from '@/common/common-constants';

// TODO: Hem Next'in hem SWR'nin cache mantığını bi anla.

type DiscoverMoviesPageProps = {
  searchParams: {
    genreId?: string;
    sortBy?: string;
  };
};

export default async function DiscoverMoviesPage({
  searchParams,
}: DiscoverMoviesPageProps) {
  const genreId = Number(searchParams.genreId) || undefined;

  const [genres, firstPage] = await Promise.all([
    getMovieGenres(),
    getDiscoverMovies({
      page: FIRST_PAGE,
      genreId,
      sortBy: searchParams.sortBy,
    }),
  ]);

  const genre = genres.find((genre) => genre.id === genreId);

  const [featuredMovie] = firstPage.results;

  const infiniteListSearchParams = new URLSearchParams(searchParams);
  infiniteListSearchParams.set('page', '%pageIndex%');

  return (
    <>
      <FeaturedMovie movie={featuredMovie} />
      <Padder>
        <Stack spacing={2}>
          <Divider />
          <PageTitle
            title={genre ? `${genre.name} Movies` : 'Discover Movies'}
            extra={<MovieSortingSelect />}
          />
          <MovieInfiniteGridList
            pageKeyTemplate={`/movies/discover/api?${infiniteListSearchParams}`}
            firstPage={firstPage}
            skipFirstMovie
          />
        </Stack>
      </Padder>
    </>
  );
}
