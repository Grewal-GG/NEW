import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import Button from '../../components/ui/Button';
import ResultCard from '../../components/ui/ResultCard';
import ResultRow from '../../components/ui/ResultRow';

const letterGrade = (pct) => {
  if (pct >= 97) return 'A+'; if (pct >= 93) return 'A'; if (pct >= 90) return 'A-';
  if (pct >= 87) return 'B+'; if (pct >= 83) return 'B'; if (pct >= 80) return 'B-';
  if (pct >= 77) return 'C+'; if (pct >= 73) return 'C'; if (pct >= 70) return 'C-';
  if (pct >= 67) return 'D+'; if (pct >= 63) return 'D'; if (pct >= 60) return 'D-';
  return 'F';
};

export default function GradeCalculator() {
  const [assignments, setAssignments] = useState([
    { name: 'Homework', score: '', max: '100', weight: '20' },
    { name: 'Midterm', score: '', max: '100', weight: '30' },
    { name: 'Final Exam', score: '', max: '100', weight: '50' },
  ]);
  const [result, setResult] = useState(null);

  const update = (i, field, value) => {
    setAssignments(prev => prev.map((a, idx) => idx === i ? { ...a, [field]: value } : a));
  };

  const addRow = () => setAssignments(prev => [...prev, { name: '', score: '', max: '100', weight: '' }]);
  const removeRow = (i) => setAssignments(prev => prev.filter((_, idx) => idx !== i));

  const calculate = () => {
    const valid = assignments.filter(a => a.score !== '' && a.max !== '' && a.weight !== '');
    if (!valid.length) return;
    const totalWeight = valid.reduce((s, a) => s + Number(a.weight), 0);
    const weighted = valid.reduce((s, a) => s + (Number(a.score) / Number(a.max)) * Number(a.weight), 0);
    const pct = (weighted / totalWeight) * 100;
    setResult({ pct, letter: letterGrade(pct) });
  };

  return (
    <PageWrapper>
      <CalculatorLayout title="Grade Calculator" description="Calculate weighted grades and your final percentage." category="other">
        <div className="space-y-4">
          <AnimatePresence>
            {assignments.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid grid-cols-4 gap-2 items-end"
              >
                <input value={a.name} onChange={e => update(i, 'name', e.target.value)} placeholder="Assignment" className="calc-input text-sm" />
                <input type="number" value={a.score} onChange={e => update(i, 'score', e.target.value)} placeholder="Score" className="calc-input text-sm" />
                <input type="number" value={a.max} onChange={e => update(i, 'max', e.target.value)} placeholder="Max" className="calc-input text-sm" />
                <div className="flex gap-1">
                  <input type="number" value={a.weight} onChange={e => update(i, 'weight', e.target.value)} placeholder="Weight%" className="calc-input text-sm flex-1" />
                  <button onClick={() => removeRow(i)} className="px-2 py-3 text-red-400 hover:text-red-600 text-lg">×</button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={addRow} size="sm">+ Add row</Button>
            <Button onClick={calculate}>Calculate grade</Button>
          </div>
          <ResultCard show={result !== null}>
            <div className="flex items-center justify-between">
              <ResultRow label="Final grade" value={result?.pct} suffix="%" decimals={2} highlight />
              <span className="text-3xl font-bold text-primary ml-4">{result?.letter}</span>
            </div>
          </ResultCard>
        </div>
      </CalculatorLayout>
    </PageWrapper>
  );
}
