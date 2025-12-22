import { Heart, ChevronRight } from "lucide-react";
import { Movie } from "@/types/movie";
import { MovieCard } from "./MovieCard";
import { EmptyState } from "./EmptyState";

interface FavoritesSectionProps {
  favorites: Movie[];
  onToggleFavorite: (movie: Movie) => void;
  onSelectMovie: (movie: Movie) => void;
}

export const FavoritesSection = ({
  favorites,
  onToggleFavorite,
  onSelectMovie,
}: FavoritesSectionProps) => {
  return (
    <section className="mt-16 pt-12 border-t border-border">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-primary/10">
          <Heart className="w-5 h-5 text-primary fill-primary" />
        </div>
        <h2 className="text-2xl font-bold">Mis Favoritos</h2>
        {favorites.length > 0 && (
          <span className="px-2 py-0.5 text-sm font-medium rounded-full bg-primary/20 text-primary">
            {favorites.length}
          </span>
        )}
      </div>

      {favorites.length === 0 ? (
        <EmptyState type="favorites" />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {favorites.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onSelect={onSelectMovie}
              index={index}
            />
          ))}
        </div>
      )}
    </section>
  );
};
