import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import ResultCard from '../../components/ui/ResultCard';
import ResultRow from '../../components/ui/ResultRow';
import FormulaInfo from '../../components/calculator/FormulaInfo';
import { simpleInterest } from '../../utils/financial';

export default function SimpleInterestCalculator() {
  const [p, setP] = useState(''); const [r, setR] = useState(''); const [t, setT] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const pv = parseFloat(p), rv = parseFloat(r), tv = parseFloat(t);
    if ([pv, rv, tv].some(isNaN)) return;
    const interest = simpleInterest(pv, rv, tv);
    setResult({ interest, total: pv + interest, principal: pv });
  };

  return (
    <PageWrapper>
      <CalculatorLayout title="Simple Interest Calculator" description="Calculate simple interest: I = P × r × t" category="financial">
        <div className="space-y-5">
          <InputField label="Principal" value={p} onChange={setP} unit="$" unitPosition="left" />
          <InputField label="Annual rate" value={r} onChange={setR} unit="%" />
          <InputField label="Time" value={t} onChange={setT} unit="years" />
          <Button onClick={calculate} className="w-full">Calculate</Button>
          <ResultCard show={result !== null}>
            <ResultRow label="Interest earned" value={result?.interest} prefix="$" decimals={2} highlight />
            <ResultRow label="Total amount" value={result?.total} prefix="$" decimals={2} />
            <ResultRow label="Principal" value={result?.principal} prefix="$" decimals={2} />
          </ResultCard>
        </div>
        <FormulaInfo>
          <p>I = P × r × t (interest = principal × rate × time)</p>
        </FormulaInfo>
      </CalculatorLayout>
    </PageWrapper>
  );
}
