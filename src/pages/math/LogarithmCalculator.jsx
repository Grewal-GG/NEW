import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import ResultCard from '../../components/ui/ResultCard';
import ResultRow from '../../components/ui/ResultRow';
import FormulaInfo from '../../components/calculator/FormulaInfo';
import { logBase } from '../../utils/math';

export default function LogarithmCalculator() {
  const [value, setValue] = useState('');
  const [base, setBase] = useState('10');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const v = parseFloat(value), b = parseFloat(base);
    if (isNaN(v) || isNaN(b) || v <= 0 || b <= 0 || b === 1) return;
    setResult({
      log: logBase(v, b),
      ln: Math.log(v),
      log10: Math.log10(v),
      log2: Math.log2(v),
    });
  };

  return (
    <PageWrapper>
      <CalculatorLayout title="Logarithm Calculator" description="Calculate logarithms with any base including natural log (ln)." category="math">
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Number (x)" value={value} onChange={setValue} placeholder="Enter positive number" min="0.001" />
            <InputField label="Base" value={base} onChange={setBase} placeholder="e.g. 10" />
          </div>
          <Button onClick={calculate} className="w-full">Calculate</Button>
          <ResultCard show={result !== null}>
            <ResultRow label={`log base ${base}(${value})`} value={result?.log} decimals={8} highlight />
            <ResultRow label="Natural log ln(x)" value={result?.ln} decimals={8} />
            <ResultRow label="log₁₀(x)" value={result?.log10} decimals={8} />
            <ResultRow label="log₂(x)" value={result?.log2} decimals={8} />
          </ResultCard>
        </div>
        <FormulaInfo>
          <p>log_b(x) = ln(x) / ln(b). The natural log uses base e ≈ 2.71828.</p>
        </FormulaInfo>
      </CalculatorLayout>
    </PageWrapper>
  );
}
