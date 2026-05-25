import { motion } from 'framer-motion';

export default function Button({ children, onClick, variant = 'primary', type = 'button', className = '', disabled = false, size = 'md' }) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  const variants = {
    primary: 'bg-primary hover:bg-primary-hover text-white focus:ring-primary/50',
    secondary: 'bg-elevated hover:bg-border text-on-surface border border-border focus:ring-primary/30',
    ghost: 'text-on-surface-muted hover:text-on-surface hover:bg-elevated focus:ring-primary/30',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500/50',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      transition={{ duration: 0.1 }}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
