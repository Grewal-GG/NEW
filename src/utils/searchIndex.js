import { ROUTES } from '../router/routes';

export const SEARCH_INDEX = ROUTES.map(r => ({
  title: r.title,
  path: r.path,
  category: r.category,
  description: r.description,
  keywords: r.keywords,
}));

export const searchCalculators = (query) => {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return SEARCH_INDEX
    .filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.keywords.some(k => k.toLowerCase().includes(q))
    )
    .slice(0, 8);
};
