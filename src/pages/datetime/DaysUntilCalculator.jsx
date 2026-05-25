import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import Button from '../../components/ui/Button';
import { daysUntil } from '../../utils/datetime';
import { formatDate } from '../../utils/formatters';
import { motion, AnimatePresence } from 'framer-motion';

const QUICK_EVENTS = [
  { label: "New Year's", getDate: () => { const d = new Date(); d.setFullYear(d.getFullYear() + (d.getMonth() === 0 && d.getDate() === 1 ? 1 : 0)); d.setMonth(11); d.setDate(31); return d.toISOString().split('T')[0]; } },
  { label: 'Christmas', getDate: () => { const d = new Date(); d.setMonth(11); d.setDate(25); if (d < new Date()) d.setFullYear(d.getFullYear() + 1); return d.toISOString().split('T')[0]; } },
];

export default function DaysUntilCalculator() {
  const [targetDate, setTargetDate] = useState('');
  const [result, setResult] = useState(null);
  const [label, setLabel] = useState('');

  const calculate = (date = targetDate, lbl = '') => {
    if (!date) return;
    const days = daysUntil(date);
    setResult({ days, date, label: lbl });
    setLabel(lbl);
  };

  return (
    <PageWrapper>
      <CalculatorLayout title="Days Until Calculator" description="Countdown the days until any future date." category="datetime">
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-on-surface-muted block mb-1.5">Target date</label>
            <input type="date" value={targetDate} onChange={e => setTargetDate(e.target.value)} className="calc-input" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {QUICK_EVENTS.map(ev => (
              <button
                key={ev.label}
                onClick={() => { const d = ev.getDate(); setTargetDate(d); calculate(d, ev.label); }}
                className="px-3 py-1.5 rounded-lg border border-border text-sm text-on-surface-muted hover:text-primary hover:border-primary transition-all"
              >
                {ev.label}
              </button>
            ))}
          </div>
          <Button onClick={() => calculate()} className="w-full">Calculate countdown</Button>
          <AnimatePresence>
            {result !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className="result-card text-center"
              >
                {result.label && <p className="text-on-surface-muted text-sm mb-1">{result.label}</p>}
                <div className="text-6xl font-bold font-mono text-primary">{Math.max(0, result.days)}</div>
                <div className="text-on-surface-muted mt-2">
                  {result.days < 0 ? 'days ago' : result.days === 0 ? "It's today!" : 'days remaining'}
                </div>
                <p className="text-sm text-on-surface-muted mt-2">{formatDate(new Date(result.date + 'T00:00:00'))}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CalculatorLayout>
    </PageWrapper>
  );
}
