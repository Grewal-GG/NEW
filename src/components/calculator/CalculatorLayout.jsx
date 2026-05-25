import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../router/routes';

export default function CalculatorLayout({ title, description, category, children }) {
  const cat = CATEGORIES[category];
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-2 text-xs text-on-surface-muted mb-4">
        <Link to="/" className="hover:text-on-surface transition-colors">Home</Link>
        <span>/</span>
        <Link to={cat?.path} className={`hover:text-on-surface transition-colors ${cat?.text}`}>{cat?.label}</Link>
        <span>/</span>
        <span className="text-on-surface">{title}</span>
      </div>

      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4 ${cat?.bg} ${cat?.text} ${cat?.border} border`}>
        <span>{cat?.icon}</span>
        {cat?.label}
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-on-surface mb-2">{title}</h1>
      {description && <p className="text-on-surface-muted mb-8">{description}</p>}

      <div className="bg-elevated rounded-2xl border border-border shadow-card p-6 sm:p-8">
        {children}
      </div>
    </div>
  );
}
