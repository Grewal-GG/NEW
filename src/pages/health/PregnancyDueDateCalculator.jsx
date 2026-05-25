import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import Button from '../../components/ui/Button';
import ResultCard from '../../components/ui/ResultCard';
import FormulaInfo from '../../components/calculator/FormulaInfo';
import { dueDate } from '../../utils/health';
import { formatDate } from '../../utils/formatters';

export default function PregnancyDueDateCalculator() {
  const [lmp, setLmp] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!lmp) return;
    const due = dueDate(lmp);
    const today = new Date();
    const weeksAlong = Math.floor((today - new Date(lmp)) / (7 * 24 * 60 * 60 * 1000));
    const trimester = weeksAlong <= 13 ? '1st' : weeksAlong <= 26 ? '2nd' : '3rd';
    setResult({ due, weeksAlong: Math.max(0, weeksAlong), trimester });
  };

  return (
    <PageWrapper>
      <CalculatorLayout title="Pregnancy Due Date Calculator" description="Calculate your estimated due date from the last menstrual period." category="health">
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-on-surface-muted block mb-1.5">First day of last menstrual period (LMP)</label>
            <input
              type="date"
              value={lmp}
              onChange={e => setLmp(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="calc-input"
            />
          </div>
          <Button onClick={calculate} className="w-full">Calculate</Button>
          <ResultCard show={result !== null} title="Your Due Date">
            {result && (
              <>
                <div className="text-center py-3">
                  <div className="text-2xl font-bold text-primary">{formatDate(result.due)}</div>
                  <p className="text-on-surface-muted text-sm mt-1">Estimated due date (40 weeks)</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="bg-surface rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-on-surface">{result.weeksAlong}</div>
                    <div className="text-xs text-on-surface-muted">Weeks along</div>
                  </div>
                  <div className="bg-surface rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-on-surface">{result.trimester}</div>
                    <div className="text-xs text-on-surface-muted">Trimester</div>
                  </div>
                </div>
              </>
            )}
          </ResultCard>
        </div>
        <FormulaInfo>
          <p>Due date = LMP + 280 days (Naegele's rule: 40 weeks from LMP).</p>
        </FormulaInfo>
      </CalculatorLayout>
    </PageWrapper>
  );
}
