import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import ResultCard from '../../components/ui/ResultCard';
import ResultRow from '../../components/ui/ResultRow';
import FormulaInfo from '../../components/calculator/FormulaInfo';
import { monthlyPayment } from '../../utils/financial';

export default function LoanCalculator() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const p = parseFloat(amount), r = parseFloat(rate), y = parseFloat(years);
    if (isNaN(p) || isNaN(r) || isNaN(y) || p <= 0 || y <= 0) return;
    const mp = monthlyPayment(p, r, y);
    const total = mp * y * 12;
    setResult({ monthly: mp, total, interest: total - p, p });
  };

  return (
    <PageWrapper>
      <CalculatorLayout title="Loan Calculator" description="Calculate monthly payments for personal loans." category="financial">
        <div className="space-y-5">
          <InputField label="Loan amount" value={amount} onChange={setAmount} unit="$" unitPosition="left" placeholder="Enter loan amount" />
          <InputField label="Annual interest rate" value={rate} onChange={setRate} unit="%" placeholder="e.g. 8.5" />
          <InputField label="Loan term" value={years} onChange={setYears} unit="years" placeholder="e.g. 5" />
          <Button onClick={calculate} className="w-full">Calculate</Button>
          <ResultCard show={result !== null}>
            <ResultRow label="Monthly payment" value={result?.monthly} prefix="$" decimals={2} highlight />
            <ResultRow label="Total amount paid" value={result?.total} prefix="$" decimals={2} />
            <ResultRow label="Total interest" value={result?.interest} prefix="$" decimals={2} />
            <ResultRow label="Loan amount" value={result?.p} prefix="$" decimals={2} />
          </ResultCard>
        </div>
        <FormulaInfo>
          <p>M = P[r(1+r)^n] / [(1+r)^n - 1]</p>
        </FormulaInfo>
      </CalculatorLayout>
    </PageWrapper>
  );
}
