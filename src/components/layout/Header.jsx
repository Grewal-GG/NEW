import { Link } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle';
import SearchBar from '../ui/SearchBar';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-elevated/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform duration-200">
            ∑
          </div>
          <span className="font-bold text-on-surface text-lg hidden sm:block">CalcHub</span>
        </Link>

        <div className="flex-1 flex justify-center px-2">
          <SearchBar />
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
