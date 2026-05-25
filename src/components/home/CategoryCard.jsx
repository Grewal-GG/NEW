import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '../../router/routes';

export default function CategoryCard({ catKey, cat }) {
  const count = ROUTES.filter(r => r.category === catKey).length;
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <Link
        to={cat.path}
        className={`block p-6 rounded-2xl border ${cat.border} ${cat.bg} transition-colors duration-200 group`}
      >
        <div className={`w-12 h-12 rounded-xl ${cat.iconBg} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-200`}>
          {cat.icon}
        </div>
        <h3 className={`font-bold text-lg ${cat.text} mb-1`}>{cat.label}</h3>
        <p className="text-sm text-on-surface-muted mb-3">{cat.description}</p>
        <span className={`text-xs font-medium ${cat.text} opacity-70`}>{count} calculators →</span>
      </Link>
    </motion.div>
  );
}
