import { motion, AnimatePresence } from 'framer-motion';

export default function ResultCard({ children, title = 'Results', show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="result-card mt-6"
        >
          <h3 className="text-lg font-semibold text-on-surface mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            {title}
          </h3>
          <div className="space-y-3">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
