import { Movie } from "@/types/movie";
import { MovieCard } from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  isFavorite: (movieId: number) => boolean;
  onToggleFavorite: (movie: Movie) => void;
  onSelectMovie: (movie: Movie) => void;
}

export const MovieGrid = ({
  movies,
  isFavorite,
  onToggleFavorite,
  onSelectMovie,
}: MovieGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={isFavorite(movie.id)}
          onToggleFavorite={onToggleFavorite}
          onSelect={onSelectMovie}
          index={index}
        />
      ))}
    </div>
  );
};
