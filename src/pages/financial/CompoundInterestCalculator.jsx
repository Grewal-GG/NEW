import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import InputField from '../../components/ui/InputField';
import SelectField from '../../components/ui/SelectField';
import Button from '../../components/ui/Button';
import ResultCard from '../../components/ui/ResultCard';
import ResultRow from '../../components/ui/ResultRow';
import FormulaInfo from '../../components/calculator/FormulaInfo';
import { compoundInterest } from '../../utils/financial';

const COMPOUND_OPTIONS = [
  { value: '1', label: 'Annually' },
  { value: '2', label: 'Semi-annually' },
  { value: '4', label: 'Quarterly' },
  { value: '12', label: 'Monthly' },
  { value: '365', label: 'Daily' },
];

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [n, setN] = useState('12');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const p = parseFloat(principal), r = parseFloat(rate), y = parseFloat(years), nv = parseInt(n);
    if ([p, r, y, nv].some(isNaN) || p <= 0 || y <= 0) return;
    const total = compoundInterest(p, r, nv, y);
    setResult({ total, interest: total - p, principal: p });
  };

  return (
    <PageWrapper>
      <CalculatorLayout title="Compound Interest Calculator" description="Calculate how your money grows with compound interest." category="financial">
        <div className="space-y-5">
          <InputField label="Principal amount" value={principal} onChange={setPrincipal} unit="$" unitPosition="left" placeholder="Initial investment" />
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Annual interest rate" value={rate} onChange={setRate} unit="%" />
            <InputField label="Time period" value={years} onChange={setYears} unit="years" />
          </div>
          <SelectField label="Compound frequency" value={n} onChange={setN} options={COMPOUND_OPTIONS} />
          <Button onClick={calculate} className="w-full">Calculate</Button>
          <ResultCard show={result !== null}>
            <ResultRow label="Final amount" value={result?.total} prefix="$" decimals={2} highlight />
            <ResultRow label="Principal" value={result?.principal} prefix="$" decimals={2} />
            <ResultRow label="Interest earned" value={result?.interest} prefix="$" decimals={2} />
          </ResultCard>
        </div>
        <FormulaInfo>
          <p>A = P(1 + r/n)^(nt)</p>
          <p className="mt-1 text-xs">P=principal, r=annual rate, n=compounds/year, t=years</p>
        </FormulaInfo>
      </CalculatorLayout>
    </PageWrapper>
  );
}
