import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FormulaInfo({ children, title = 'How is this calculated?' }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-6 border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm text-on-surface-muted hover:text-on-surface hover:bg-surface transition-all duration-200"
      >
        <span className="font-medium">{title}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          ▾
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 text-sm text-on-surface-muted leading-relaxed border-t border-border pt-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
