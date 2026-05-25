import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import ResultCard from '../../components/ui/ResultCard';
import ResultRow from '../../components/ui/ResultRow';
import FormulaInfo from '../../components/calculator/FormulaInfo';
import { futureValue } from '../../utils/financial';

export default function RetirementCalculator() {
  const [age, setAge] = useState('30');
  const [retireAge, setRetireAge] = useState('65');
  const [saved, setSaved] = useState('');
  const [monthly, setMonthly] = useState('');
  const [rate, setRate] = useState('7');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const currentAge = parseInt(age), retire = parseInt(retireAge);
    const s = parseFloat(saved) || 0, m = parseFloat(monthly) || 0, r = parseFloat(rate);
    if (isNaN(currentAge) || isNaN(retire) || retire <= currentAge) return;
    const years = retire - currentAge;
    const fv = futureValue(s, r, years, m);
    const contributions = s + m * years * 12;
    setResult({ fv, contributions, gains: fv - contributions, years });
  };

  return (
    <PageWrapper>
      <CalculatorLayout title="Retirement Calculator" description="Estimate how much you'll have saved when you retire." category="financial">
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Current age" value={age} onChange={setAge} unit="yrs" />
            <InputField label="Retirement age" value={retireAge} onChange={setRetireAge} unit="yrs" />
          </div>
          <InputField label="Current savings" value={saved} onChange={setSaved} unit="$" unitPosition="left" placeholder="0" />
          <InputField label="Monthly contribution" value={monthly} onChange={setMonthly} unit="$" unitPosition="left" placeholder="500" />
          <InputField label="Expected annual return" value={rate} onChange={setRate} unit="%" />
          <Button onClick={calculate} className="w-full">Calculate</Button>
          <ResultCard show={result !== null}>
            <ResultRow label="Retirement nest egg" value={result?.fv} prefix="$" decimals={2} highlight />
            <ResultRow label="Years to retirement" value={result?.years} decimals={0} />
            <ResultRow label="Total contributions" value={result?.contributions} prefix="$" decimals={2} />
            <ResultRow label="Investment growth" value={result?.gains} prefix="$" decimals={2} />
          </ResultCard>
        </div>
        <FormulaInfo>
          <p>Uses compound interest with monthly contributions. Assumes constant return rate.</p>
        </FormulaInfo>
      </CalculatorLayout>
    </PageWrapper>
  );
}
