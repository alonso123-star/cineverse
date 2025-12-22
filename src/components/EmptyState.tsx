import { Film, Heart, Search } from "lucide-react";

type EmptyStateType = "search" | "favorites" | "error";

interface EmptyStateProps {
  type: EmptyStateType;
  searchQuery?: string;
}

const states = {
  search: {
    icon: Search,
    title: "Sin resultados",
    description: "No encontramos películas que coincidan con tu búsqueda.",
  },
  favorites: {
    icon: Heart,
    title: "Sin favoritos aún",
    description: "Explora películas y añade tus favoritas aquí.",
  },
  error: {
    icon: Film,
    title: "Algo salió mal",
    description: "No pudimos cargar las películas. Intenta de nuevo.",
  },
};

export const EmptyState = ({ type, searchQuery }: EmptyStateProps) => {
  const state = states[type];
  const Icon = state.icon;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
      <div className="w-20 h-20 rounded-full bg-card flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{state.title}</h3>
      <p className="text-muted-foreground text-center max-w-sm">
        {type === "search" && searchQuery
          ? `No encontramos resultados para "${searchQuery}".`
          : state.description}
      </p>
    </div>
  );
};
