import { motion } from 'framer-motion';

const variants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.32, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.18 } },
};

export default function PageWrapper({ children }) {
  return (
    <motion.div variants={variants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}
