import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import ResultCard from '../../components/ui/ResultCard';
import ResultRow from '../../components/ui/ResultRow';
import FormulaInfo from '../../components/calculator/FormulaInfo';
import { monthlyPayment } from '../../utils/financial';

export default function AutoLoanCalculator() {
  const [price, setPrice] = useState('');
  const [down, setDown] = useState('');
  const [tradeIn, setTradeIn] = useState('');
  const [rate, setRate] = useState('');
  const [months, setMonths] = useState('60');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const p = parseFloat(price), d = parseFloat(down) || 0, t = parseFloat(tradeIn) || 0;
    const r = parseFloat(rate), m = parseInt(months);
    if (isNaN(p) || isNaN(r) || isNaN(m)) return;
    const loanAmount = p - d - t;
    const mp = monthlyPayment(loanAmount, r, m / 12);
    const total = mp * m;
    setResult({ monthly: mp, total, interest: total - loanAmount, loanAmount });
  };

  return (
    <PageWrapper>
      <CalculatorLayout title="Auto Loan Calculator" description="Calculate car loan payments with trade-in and down payment." category="financial">
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Vehicle price" value={price} onChange={setPrice} unit="$" unitPosition="left" />
            <InputField label="Down payment" value={down} onChange={setDown} unit="$" unitPosition="left" />
            <InputField label="Trade-in value" value={tradeIn} onChange={setTradeIn} unit="$" unitPosition="left" />
            <InputField label="Annual interest rate" value={rate} onChange={setRate} unit="%" />
          </div>
          <div>
            <label className="text-sm font-medium text-on-surface-muted block mb-2">Loan term</label>
            <div className="flex gap-2 flex-wrap">
              {['24', '36', '48', '60', '72', '84'].map(m => (
                <button
                  key={m}
                  onClick={() => setMonths(m)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${months === m ? 'bg-primary text-white border-primary' : 'border-border text-on-surface-muted hover:border-primary'}`}
                >
                  {m} mo
                </button>
              ))}
            </div>
          </div>
          <Button onClick={calculate} className="w-full">Calculate</Button>
          <ResultCard show={result !== null}>
            <ResultRow label="Monthly payment" value={result?.monthly} prefix="$" decimals={2} highlight />
            <ResultRow label="Loan amount" value={result?.loanAmount} prefix="$" decimals={2} />
            <ResultRow label="Total paid" value={result?.total} prefix="$" decimals={2} />
            <ResultRow label="Total interest" value={result?.interest} prefix="$" decimals={2} />
          </ResultCard>
        </div>
        <FormulaInfo>
          <p>Loan amount = Vehicle price - Down payment - Trade-in value</p>
          <p className="mt-1">Monthly payment uses standard amortization formula.</p>
        </FormulaInfo>
      </CalculatorLayout>
    </PageWrapper>
  );
}
