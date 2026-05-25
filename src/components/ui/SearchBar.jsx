import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { searchCalculators } from '../../utils/searchIndex';
import { CATEGORIES } from '../../router/routes';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const res = searchCalculators(query);
    setResults(res);
    setOpen(res.length > 0 && query.length > 0);
    setFocused(0);
  }, [query]);

  useEffect(() => {
    const handler = (e) => {
      if (!containerRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (path) => {
    navigate(path);
    setQuery('');
    setOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e) => {
    if (!open) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocused(f => Math.min(f + 1, results.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setFocused(f => Math.max(f - 1, 0)); }
    if (e.key === 'Enter' && results[focused]) handleSelect(results[focused].path);
    if (e.key === 'Escape') { setOpen(false); inputRef.current?.blur(); }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-sm">
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search calculators..."
          className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-border bg-elevated text-on-surface placeholder-on-surface-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200"
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-muted hover:text-on-surface">
            ×
          </button>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-0 right-0 z-50 bg-elevated border border-border rounded-2xl shadow-card-hover overflow-hidden"
          >
            {results.map((item, i) => {
              const cat = CATEGORIES[item.category];
              return (
                <button
                  key={item.path}
                  onClick={() => handleSelect(item.path)}
                  className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors duration-100
                    ${i === focused ? 'bg-primary/10' : 'hover:bg-surface'}
                    ${i < results.length - 1 ? 'border-b border-border/50' : ''}
                  `}
                >
                  <span className={`mt-0.5 w-7 h-7 flex items-center justify-center rounded-lg text-sm flex-shrink-0 ${cat?.iconBg} ${cat?.text}`}>
                    {cat?.icon}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-on-surface">{item.title}</div>
                    <div className="text-xs text-on-surface-muted">{item.description}</div>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
