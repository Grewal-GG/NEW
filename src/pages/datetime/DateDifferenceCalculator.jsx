import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import Button from '../../components/ui/Button';
import ResultCard from '../../components/ui/ResultCard';
import ResultRow from '../../components/ui/ResultRow';
import { dateDifference } from '../../utils/datetime';

export default function DateDifferenceCalculator() {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!date1 || !date2) return;
    setResult(dateDifference(date1, date2));
  };

  return (
    <PageWrapper>
      <CalculatorLayout title="Date Difference Calculator" description="Calculate the exact number of days, weeks, months and years between two dates." category="datetime">
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-on-surface-muted block mb-1.5">Start date</label>
              <input type="date" value={date1} onChange={e => setDate1(e.target.value)} className="calc-input" />
            </div>
            <div>
              <label className="text-sm font-medium text-on-surface-muted block mb-1.5">End date</label>
              <input type="date" value={date2} onChange={e => setDate2(e.target.value)} className="calc-input" />
            </div>
          </div>
          <Button onClick={calculate} className="w-full">Calculate difference</Button>
          <ResultCard show={result !== null}>
            <ResultRow label="Total days" value={result?.totalDays} decimals={0} highlight />
            <ResultRow label="Weeks" value={result?.weeks} decimals={0} />
            <ResultRow label="Months (approx.)" value={result?.months} decimals={0} />
            <ResultRow label="Years (approx.)" value={result?.years} decimals={0} />
          </ResultCard>
        </div>
      </CalculatorLayout>
    </PageWrapper>
  );
}
