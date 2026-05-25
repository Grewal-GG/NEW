import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';

export default function RandomNumberGenerator() {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [count, setCount] = useState('1');
  const [numbers, setNumbers] = useState([]);

  const generate = () => {
    const mn = parseInt(min), mx = parseInt(max), cnt = Math.min(parseInt(count), 100);
    if (isNaN(mn) || isNaN(mx) || mn >= mx || isNaN(cnt)) return;
    const arr = Array.from({ length: cnt }, () => Math.floor(Math.random() * (mx - mn + 1)) + mn);
    setNumbers(arr);
  };

  return (
    <PageWrapper>
      <CalculatorLayout title="Random Number Generator" description="Generate one or many random numbers within a range." category="math">
        <div className="space-y-5">
          <div className="grid grid-cols-3 gap-4">
            <InputField label="Min" value={min} onChange={setMin} />
            <InputField label="Max" value={max} onChange={setMax} />
            <InputField label="Count" value={count} onChange={setCount} min="1" max="100" />
          </div>
          <Button onClick={generate} className="w-full">Generate</Button>
          <AnimatePresence>
            {numbers.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className="result-card"
              >
                {numbers.length === 1 ? (
                  <div className="text-center">
                    <div className="text-6xl font-bold font-mono text-primary">{numbers[0]}</div>
                    <p className="text-on-surface-muted text-sm mt-2">Random number between {min} and {max}</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-medium text-on-surface-muted mb-3">{numbers.length} random numbers</p>
                    <div className="flex flex-wrap gap-2">
                      {numbers.map((n, i) => (
                        <span key={i} className="font-mono font-semibold text-primary bg-primary/10 px-3 py-1 rounded-lg text-sm">
                          {n}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-border/50 flex gap-6 text-sm text-on-surface-muted">
                      <span>Sum: <strong className="text-on-surface">{numbers.reduce((a, b) => a + b, 0)}</strong></span>
                      <span>Avg: <strong className="text-on-surface">{(numbers.reduce((a, b) => a + b, 0) / numbers.length).toFixed(2)}</strong></span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CalculatorLayout>
    </PageWrapper>
  );
}
