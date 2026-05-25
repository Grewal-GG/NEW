import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import ResultCard from '../../components/ui/ResultCard';
import ResultRow from '../../components/ui/ResultRow';
import FormulaInfo from '../../components/calculator/FormulaInfo';

export default function ExponentCalculator() {
  const [base, setBase] = useState('');
  const [exp, setExp] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const b = parseFloat(base), e = parseFloat(exp);
    if (isNaN(b) || isNaN(e)) return;
    setResult({ value: b ** e, base: b, exp: e });
  };

  return (
    <PageWrapper>
      <CalculatorLayout title="Exponent Calculator" description="Calculate base raised to any power (bⁿ)." category="math">
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Base (b)" value={base} onChange={setBase} placeholder="e.g. 2" />
            <InputField label="Exponent (n)" value={exp} onChange={setExp} placeholder="e.g. 10" />
          </div>
          <Button onClick={calculate} className="w-full">Calculate</Button>
          <ResultCard show={result !== null}>
            <ResultRow label={`${result?.base}^${result?.exp}`} value={result?.value} decimals={6} highlight />
          </ResultCard>
        </div>
        <FormulaInfo>
          <p>b^n means b multiplied by itself n times. For negative exponents: b^(-n) = 1/b^n</p>
        </FormulaInfo>
      </CalculatorLayout>
    </PageWrapper>
  );
}
