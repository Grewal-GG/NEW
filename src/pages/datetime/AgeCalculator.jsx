import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import Button from '../../components/ui/Button';
import ResultCard from '../../components/ui/ResultCard';
import ResultRow from '../../components/ui/ResultRow';
import { calculateAge } from '../../utils/datetime';

export default function AgeCalculator() {
  const [dob, setDob] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!dob) return;
    setResult(calculateAge(dob));
  };

  return (
    <PageWrapper>
      <CalculatorLayout title="Age Calculator" description="Calculate exact age in years, months, and days from a birthdate." category="datetime">
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-on-surface-muted block mb-1.5">Date of birth</label>
            <input
              type="date"
              value={dob}
              onChange={e => setDob(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="calc-input"
            />
          </div>
          <Button onClick={calculate} className="w-full">Calculate age</Button>
          <ResultCard show={result !== null}>
            <div className="flex gap-4 justify-center flex-wrap py-2">
              {[
                { label: 'Years', value: result?.years },
                { label: 'Months', value: result?.months },
                { label: 'Days', value: result?.days },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <div className="text-4xl font-bold font-mono text-primary">{value ?? '—'}</div>
                  <div className="text-sm text-on-surface-muted mt-1">{label}</div>
                </div>
              ))}
            </div>
            <ResultRow label="Total days lived" value={result?.totalDays} decimals={0} />
          </ResultCard>
        </div>
      </CalculatorLayout>
    </PageWrapper>
  );
}
