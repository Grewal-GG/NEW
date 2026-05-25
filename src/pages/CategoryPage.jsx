import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import { CATEGORIES, ROUTES } from '../router/routes';

const container = { animate: { transition: { staggerChildren: 0.06 } } };
const item = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function CategoryPage() {
  const { category } = useParams();
  const cat = CATEGORIES[category];
  if (!cat) return <Navigate to="/" replace />;

  const routes = ROUTES.filter(r => r.category === category);

  return (
    <PageWrapper>
      <div className="mb-8">
        <Link to="/" className="text-xs text-on-surface-muted hover:text-on-surface mb-4 inline-block">
          ← All categories
        </Link>
        <div className={`w-14 h-14 rounded-2xl ${cat.iconBg} flex items-center justify-center text-3xl mb-4`}>
          {cat.icon}
        </div>
        <h1 className={`text-3xl font-bold mb-2 ${cat.text}`}>{cat.label} Calculators</h1>
        <p className="text-on-surface-muted">{cat.description}</p>
      </div>

      <motion.div
        variants={container}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        {routes.map(route => (
          <motion.div key={route.path} variants={item}>
            <Link
              to={route.path}
              className={`block p-5 rounded-2xl border ${cat.border} ${cat.bg} hover:shadow-card-hover transition-all duration-200 group`}
            >
              <h3 className={`font-semibold ${cat.text} group-hover:underline`}>{route.title}</h3>
              <p className="text-sm text-on-surface-muted mt-1">{route.description}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </PageWrapper>
  );
}
