import { motion } from 'framer-motion';
import { CATEGORIES } from '../../router/routes';
import CategoryCard from './CategoryCard';

const container = {
  animate: { transition: { staggerChildren: 0.07 } },
};
const item = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function CategoryGrid() {
  return (
    <motion.div
      variants={container}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {Object.entries(CATEGORIES).map(([key, cat]) => (
        <motion.div key={key} variants={item}>
          <CategoryCard catKey={key} cat={cat} />
        </motion.div>
      ))}
    </motion.div>
  );
}
