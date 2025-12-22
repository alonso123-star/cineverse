import { useState, useEffect, useCallback } from "react";
import { Movie } from "@/types/movie";
import { searchMovies, getPopularMovies } from "@/data/movies";
import { useFavorites } from "@/hooks/useFavorites";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { MovieGrid } from "@/components/MovieGrid";
import { MovieDetail } from "@/components/MovieDetail";
import { FavoritesSection } from "@/components/FavoritesSection";
import { LoadingGrid } from "@/components/LoadingGrid";
import { EmptyState } from "@/components/EmptyState";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(false);

  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();

  const loadMovies = useCallback(async (query: string = "") => {
    setIsLoading(true);
    setError(false);
    try {
      const results = query ? await searchMovies(query) : await getPopularMovies();
      setMovies(results);
    } catch {
      setError(true);
      toast({
        title: "Error",
        description: "No pudimos cargar las películas. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    loadMovies(query);
  };

  const handleToggleFavorite = (movie: Movie) => {
    const wasFavorite = isFavorite(movie.id);
    toggleFavorite(movie);
    toast({
      title: wasFavorite ? "Eliminado de favoritos" : "Añadido a favoritos",
      description: movie.title,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 bg-gradient-hero">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
            Descubre tu próxima
            <span className="text-gradient block mt-2">película favorita</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "100ms" }}>
            Explora miles de películas, guarda tus favoritas y encuentra tu próxima aventura cinematográfica.
          </p>
          <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Results Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              {searchQuery ? `Resultados para "${searchQuery}"` : "Películas Populares"}
            </h2>
            {!isLoading && movies.length > 0 && (
              <span className="text-sm text-muted-foreground">
                {movies.length} película{movies.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {isLoading ? (
            <LoadingGrid />
          ) : error ? (
            <EmptyState type="error" />
          ) : movies.length === 0 ? (
            <EmptyState type="search" searchQuery={searchQuery} />
          ) : (
            <MovieGrid
              movies={movies}
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
              onSelectMovie={setSelectedMovie}
            />
          )}
        </section>

        {/* Favorites Section */}
        <FavoritesSection
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectMovie={setSelectedMovie}
        />
      </main>

      {/* Movie Detail Modal */}
      {selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          isFavorite={isFavorite(selectedMovie.id)}
          onToggleFavorite={handleToggleFavorite}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default Index;
