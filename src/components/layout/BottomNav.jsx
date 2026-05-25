import { NavLink } from 'react-router-dom';
import { CATEGORIES } from '../../router/routes';

export default function BottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-elevated/95 backdrop-blur-md border-t border-border">
      <div className="flex">
        {Object.entries(CATEGORIES).map(([key, cat]) => (
          <NavLink
            key={key}
            to={cat.path}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center py-2 px-1 text-xs transition-all duration-200
              ${isActive ? `${cat.text} font-medium` : 'text-on-surface-muted'}`
            }
          >
            <span className="text-lg leading-tight">{cat.icon}</span>
            <span className="leading-tight mt-0.5 hidden xs:block">{cat.label.split(' ')[0]}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
