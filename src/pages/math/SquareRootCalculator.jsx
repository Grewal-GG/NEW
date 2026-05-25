import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import ResultCard from '../../components/ui/ResultCard';
import ResultRow from '../../components/ui/ResultRow';
import FormulaInfo from '../../components/calculator/FormulaInfo';
import { nthRoot } from '../../utils/math';

export default function SquareRootCalculator() {
  const [value, setValue] = useState('');
  const [n, setN] = useState('2');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const v = parseFloat(value), nth = parseFloat(n);
    if (isNaN(v) || isNaN(nth) || nth <= 0) return;
    if (v < 0 && nth % 2 === 0) { setResult({ error: true }); return; }
    setResult({ value: nthRoot(v, nth), n: nth });
  };

  return (
    <PageWrapper>
      <CalculatorLayout title="Square Root Calculator" description="Calculate square roots and nth roots of any number." category="math">
        <div className="space-y-5">
          <InputField label="Number" value={value} onChange={setValue} placeholder="Enter a number" />
          <InputField label="Root (n)" value={n} onChange={setN} placeholder="2 for square root, 3 for cube root..." min="1" />
          <Button onClick={calculate} className="w-full">Calculate</Button>
          <ResultCard show={result !== null}>
            {result?.error
              ? <p className="text-red-500 text-sm">Cannot take even root of a negative number.</p>
              : <>
                  <ResultRow label={`${result?.n === 2 ? 'Square' : result?.n === 3 ? 'Cube' : result?.n + 'th'} root`} value={result?.value} decimals={8} highlight />
                  <ResultRow label="Verified (result²)" value={result ? result.value ** result.n : null} decimals={6} />
                </>
            }
          </ResultCard>
        </div>
        <FormulaInfo>
          <p>The nth root of x is x^(1/n). Square root is n=2, cube root is n=3.</p>
        </FormulaInfo>
      </CalculatorLayout>
    </PageWrapper>
  );
}
