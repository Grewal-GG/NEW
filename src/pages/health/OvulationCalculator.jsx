import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import ResultCard from '../../components/ui/ResultCard';
import FormulaInfo from '../../components/calculator/FormulaInfo';
import { ovulationDate } from '../../utils/health';
import { formatDate } from '../../utils/formatters';

export default function OvulationCalculator() {
  const [lmp, setLmp] = useState('');
  const [cycleLength, setCycleLength] = useState('28');
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!lmp) return;
    const ovDay = ovulationDate(lmp, parseInt(cycleLength));
    const fertileStart = new Date(ovDay);
    fertileStart.setDate(fertileStart.getDate() - 5);
    const fertileEnd = new Date(ovDay);
    fertileEnd.setDate(fertileEnd.getDate() + 1);
    setResult({ ovulation: ovDay, fertileStart, fertileEnd });
  };

  return (
    <PageWrapper>
      <CalculatorLayout title="Ovulation Calculator" description="Find your fertile window and ovulation date." category="health">
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-on-surface-muted block mb-1.5">First day of last period (LMP)</label>
            <input type="date" value={lmp} onChange={e => setLmp(e.target.value)} className="calc-input" />
          </div>
          <InputField label="Average cycle length" value={cycleLength} onChange={setCycleLength} unit="days" min="21" max="45" />
          <Button onClick={calculate} className="w-full">Calculate</Button>
          <ResultCard show={result !== null} title="Fertility Window">
            {result && (
              <div className="space-y-3">
                <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-xl p-4 text-center">
                  <p className="text-xs text-rose-600 dark:text-rose-400 font-medium mb-1">Ovulation Day</p>
                  <p className="text-xl font-bold text-rose-700 dark:text-rose-300">{formatDate(result.ovulation)}</p>
                </div>
                <div className="bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800 rounded-xl p-4 text-center">
                  <p className="text-xs text-pink-600 dark:text-pink-400 font-medium mb-1">Fertile Window</p>
                  <p className="text-base font-semibold text-pink-700 dark:text-pink-300">
                    {formatDate(result.fertileStart)} – {formatDate(result.fertileEnd)}
                  </p>
                </div>
              </div>
            )}
          </ResultCard>
        </div>
        <FormulaInfo>
          <p>Ovulation occurs approximately 14 days before the next period.</p>
          <p className="mt-1">Ovulation = LMP + (cycle length - 14 days)</p>
          <p>Fertile window = 5 days before ovulation + ovulation day.</p>
        </FormulaInfo>
      </CalculatorLayout>
    </PageWrapper>
  );
}
