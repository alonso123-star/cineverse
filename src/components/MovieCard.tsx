import { Heart, Star } from "lucide-react";
import { Movie, getGenreNames } from "@/types/movie";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
  onSelect: (movie: Movie) => void;
  index?: number;
}

export const MovieCard = ({
  movie,
  isFavorite,
  onToggleFavorite,
  onSelect,
  index = 0,
}: MovieCardProps) => {
  const genres = getGenreNames(movie.genre_ids).slice(0, 2);

  return (
    <article
      className="group relative cursor-pointer animate-slide-up"
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={() => onSelect(movie)}
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover-lift">
        {/* Poster */}
        <img
          src={movie.poster_path}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-lg glass-effect">
          <Star className="w-3.5 h-3.5 text-primary fill-primary" />
          <span className="text-sm font-semibold">{movie.vote_average.toFixed(1)}</span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(movie);
          }}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full transition-all duration-300",
            isFavorite
              ? "bg-primary text-primary-foreground scale-100"
              : "bg-background/80 text-foreground opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground"
          )}
          aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          <Heart
            className={cn("w-4 h-4 transition-all", isFavorite && "fill-current")}
          />
        </button>

        {/* Info on Hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex flex-wrap gap-1.5">
            {genres.map((genre) => (
              <span
                key={genre}
                className="px-2 py-0.5 text-xs font-medium rounded-md bg-primary/20 text-primary"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="mt-3 px-1">
        <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {new Date(movie.release_date).getFullYear()}
        </p>
      </div>
    </article>
  );
};
