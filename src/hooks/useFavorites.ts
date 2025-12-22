import { useState, useEffect, useCallback } from "react";
import { Movie } from "@/types/movie";

const FAVORITES_KEY = "cineverse_favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {
        setFavorites([]);
      }
    }
  }, []);

  const saveFavorites = useCallback((movies: Movie[]) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(movies));
    setFavorites(movies);
  }, []);

  const addFavorite = useCallback(
    (movie: Movie) => {
      const exists = favorites.some((f) => f.id === movie.id);
      if (!exists) {
        saveFavorites([...favorites, movie]);
      }
    },
    [favorites, saveFavorites]
  );

  const removeFavorite = useCallback(
    (movieId: number) => {
      saveFavorites(favorites.filter((f) => f.id !== movieId));
    },
    [favorites, saveFavorites]
  );

  const toggleFavorite = useCallback(
    (movie: Movie) => {
      const exists = favorites.some((f) => f.id === movie.id);
      if (exists) {
        removeFavorite(movie.id);
      } else {
        addFavorite(movie);
      }
    },
    [favorites, addFavorite, removeFavorite]
  );

  const isFavorite = useCallback(
    (movieId: number) => {
      return favorites.some((f) => f.id === movieId);
    },
    [favorites]
  );

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
};
