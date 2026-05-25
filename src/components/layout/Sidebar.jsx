import { NavLink, useParams } from 'react-router-dom';
import { CATEGORIES, ROUTES } from '../../router/routes';

export default function Sidebar() {
  const { category } = useParams();

  return (
    <aside className="hidden lg:flex flex-col w-56 flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin py-6 pr-4">
      {Object.entries(CATEGORIES).map(([key, cat]) => {
        const catRoutes = ROUTES.filter(r => r.category === key);
        return (
          <div key={key} className="mb-6">
            <NavLink
              to={cat.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg mb-1.5 font-semibold text-sm transition-all duration-200
                ${isActive || category === key
                  ? `${cat.bg} ${cat.text}`
                  : 'text-on-surface-muted hover:text-on-surface hover:bg-surface'
                }`
              }
            >
              <span className="text-base">{cat.icon}</span>
              {cat.label}
            </NavLink>
            <div className="pl-3 space-y-0.5">
              {catRoutes.map(route => (
                <NavLink
                  key={route.path}
                  to={route.path}
                  className={({ isActive }) =>
                    `block px-3 py-1.5 rounded-lg text-xs transition-all duration-200
                    ${isActive
                      ? `${cat.bg} ${cat.text} font-medium`
                      : 'text-on-surface-muted hover:text-on-surface hover:bg-surface'
                    }`
                  }
                >
                  {route.title}
                </NavLink>
              ))}
            </div>
          </div>
        );
      })}
    </aside>
  );
}
