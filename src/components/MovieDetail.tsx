import { Heart, Star, Calendar, X } from "lucide-react";
import { Movie, getGenreNames } from "@/types/movie";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MovieDetailProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
  onClose: () => void;
}

export const MovieDetail = ({
  movie,
  isFavorite,
  onToggleFavorite,
  onClose,
}: MovieDetailProps) => {
  const genres = getGenreNames(movie.genre_ids);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl glass-effect shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-secondary transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Poster */}
          <div className="relative md:w-1/3 flex-shrink-0">
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="w-full h-64 md:h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card md:bg-gradient-to-t" />
          </div>

          {/* Content */}
          <div className="flex-1 p-6 md:p-8 overflow-y-auto max-h-[60vh] md:max-h-[80vh]">
            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{movie.title}</h2>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-1.5 text-primary">
                <Star className="w-5 h-5 fill-primary" />
                <span className="font-semibold text-lg">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{new Date(movie.release_date).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</span>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 text-sm font-medium rounded-full bg-secondary text-secondary-foreground"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Overview */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2 text-foreground">Sinopsis</h3>
              <p className="text-muted-foreground leading-relaxed">{movie.overview}</p>
            </div>

            {/* Actions */}
            <Button
              onClick={() => onToggleFavorite(movie)}
              variant={isFavorite ? "default" : "outline"}
              size="lg"
              className={cn(
                "w-full sm:w-auto gap-2 transition-all duration-300",
                isFavorite && "animate-pulse-glow"
              )}
            >
              <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
              {isFavorite ? "En tus favoritos" : "Añadir a favoritos"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
