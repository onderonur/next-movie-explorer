import { Id } from '@/common/common-types';
import MovieInfiniteGridList from '@/movies/movie-infinite-grid-list';
import { getMovieRecommendations } from '@/movies/movie-fetchers';

type MovieRecommendationsProps = {
  movieId: Id;
};

export default async function MovieRecommendations({
  movieId,
}: MovieRecommendationsProps) {
  const movieRecommendations = await getMovieRecommendations(movieId, {
    page: 1,
  });

  const infiniteListSearchParams = new URLSearchParams();
  infiniteListSearchParams.set('movieId', movieId.toString());
  infiniteListSearchParams.set('page', '%pageIndex%');

  return (
    <MovieInfiniteGridList
      pageKeyTemplate={`/movies/${movieId}/api?${infiniteListSearchParams.toString()}`}
      firstPage={movieRecommendations}
    />
  );
}
