import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import ResultCard from '../../components/ui/ResultCard';
import ResultRow from '../../components/ui/ResultRow';
import FormulaInfo from '../../components/calculator/FormulaInfo';
import { futureValue } from '../../utils/financial';

export default function InvestmentCalculator() {
  const [initial, setInitial] = useState('');
  const [monthly, setMonthly] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const i = parseFloat(initial) || 0, m = parseFloat(monthly) || 0;
    const r = parseFloat(rate), y = parseFloat(years);
    if (isNaN(r) || isNaN(y)) return;
    const fv = futureValue(i, r, y, m);
    const totalContributions = i + m * y * 12;
    setResult({ fv, totalContributions, gains: fv - totalContributions });
  };

  return (
    <PageWrapper>
      <CalculatorLayout title="Investment Calculator" description="Calculate future value with initial investment and monthly contributions." category="financial">
        <div className="space-y-5">
          <InputField label="Initial investment" value={initial} onChange={setInitial} unit="$" unitPosition="left" placeholder="0" />
          <InputField label="Monthly contribution" value={monthly} onChange={setMonthly} unit="$" unitPosition="left" placeholder="0" />
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Annual return rate" value={rate} onChange={setRate} unit="%" placeholder="e.g. 7" />
            <InputField label="Time horizon" value={years} onChange={setYears} unit="years" />
          </div>
          <Button onClick={calculate} className="w-full">Calculate</Button>
          <ResultCard show={result !== null}>
            <ResultRow label="Future value" value={result?.fv} prefix="$" decimals={2} highlight />
            <ResultRow label="Total contributions" value={result?.totalContributions} prefix="$" decimals={2} />
            <ResultRow label="Investment gains" value={result?.gains} prefix="$" decimals={2} />
          </ResultCard>
        </div>
        <FormulaInfo>
          <p>FV = PV×(1+r)^n + PMT×[((1+r)^n − 1) / r]</p>
          <p className="mt-1 text-xs">Where r = monthly rate, n = total months</p>
        </FormulaInfo>
      </CalculatorLayout>
    </PageWrapper>
  );
}
