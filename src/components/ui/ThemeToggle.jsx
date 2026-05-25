import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      className="relative w-12 h-6 rounded-full bg-border transition-colors duration-300 flex items-center focus:outline-none focus:ring-2 focus:ring-primary/50"
      aria-label="Toggle theme"
    >
      <motion.span
        className="absolute flex items-center justify-center w-5 h-5 rounded-full bg-elevated shadow-sm text-xs"
        animate={{ x: theme === 'dark' ? 26 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </motion.span>
    </motion.button>
  );
}
