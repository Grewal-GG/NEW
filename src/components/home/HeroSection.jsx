import { motion } from 'framer-motion';
import { ROUTES } from '../../router/routes';

export default function HeroSection() {
  return (
    <div className="text-center py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary flex items-center justify-center text-white text-4xl font-bold shadow-result"
      >
        ∑
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-4xl sm:text-5xl font-bold text-on-surface mb-4"
      >
        Calculator Hub
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-on-surface-muted text-lg max-w-xl mx-auto mb-6"
      >
        Free online calculators for math, finance, health, unit conversion, and more.
        <span className="font-semibold text-primary"> {ROUTES.length}+ calculators</span> at your fingertips.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="flex justify-center gap-2 flex-wrap text-sm text-on-surface-muted"
      >
        {['Math', 'Finance', 'Health', 'Unit Conversion', 'Date & Time'].map(tag => (
          <span key={tag} className="px-3 py-1 rounded-full bg-elevated border border-border">
            {tag}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
