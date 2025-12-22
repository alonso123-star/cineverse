import { Film } from "lucide-react";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass-effect">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Film className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-bold text-gradient">CineVerse</span>
        </a>
        <p className="text-sm text-muted-foreground hidden sm:block">
          Tu universo de películas
        </p>
      </div>
    </header>
  );
};
