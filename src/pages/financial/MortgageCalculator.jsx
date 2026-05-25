import { useState, useMemo } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import ResultCard from '../../components/ui/ResultCard';
import ResultRow from '../../components/ui/ResultRow';
import FormulaInfo from '../../components/calculator/FormulaInfo';
import { monthlyPayment, amortizationSchedule } from '../../utils/financial';
import { formatCurrency } from '../../utils/formatters';

export default function MortgageCalculator() {
  const [principal, setPrincipal] = useState('300000');
  const [rate, setRate] = useState('7');
  const [years, setYears] = useState('30');
  const [downPayment, setDownPayment] = useState('60000');
  const [result, setResult] = useState(null);
  const [showTable, setShowTable] = useState(false);

  const calculate = () => {
    const p = parseFloat(principal) - parseFloat(downPayment || 0);
    const r = parseFloat(rate), y = parseInt(years);
    if (isNaN(p) || isNaN(r) || isNaN(y) || p <= 0) return;
    const mp = monthlyPayment(p, r, y);
    const totalPaid = mp * y * 12;
    const totalInterest = totalPaid - p;
    setResult({ monthly: mp, totalPaid, totalInterest, loanAmount: p });
  };

  const schedule = useMemo(() => {
    if (!result) return [];
    const p = parseFloat(principal) - parseFloat(downPayment || 0);
    return amortizationSchedule(p, parseFloat(rate), parseInt(years));
  }, [result]);

  const annualSchedule = useMemo(() => {
    const annual = [];
    for (let y = 0; y < schedule.length; y += 12) {
      const yearRows = schedule.slice(y, y + 12);
      annual.push({
        year: Math.floor(y / 12) + 1,
        interest: yearRows.reduce((s, r) => s + r.interest, 0),
        principal: yearRows.reduce((s, r) => s + r.principalPaid, 0),
        balance: yearRows[yearRows.length - 1]?.balance ?? 0,
      });
    }
    return annual;
  }, [schedule]);

  return (
    <PageWrapper>
      <CalculatorLayout title="Mortgage Calculator" description="Calculate monthly payments and full amortization schedule." category="financial">
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Home price" value={principal} onChange={setPrincipal} unit="$" unitPosition="left" />
            <InputField label="Down payment" value={downPayment} onChange={setDownPayment} unit="$" unitPosition="left" />
            <InputField label="Annual interest rate" value={rate} onChange={setRate} unit="%" />
            <InputField label="Loan term" value={years} onChange={setYears} unit="years" />
          </div>
          <Button onClick={calculate} className="w-full">Calculate</Button>
          <ResultCard show={result !== null} title="Monthly Payment">
            <ResultRow label="Monthly payment" value={result?.monthly} prefix="$" decimals={2} highlight />
            <ResultRow label="Loan amount" value={result?.loanAmount} prefix="$" decimals={2} />
            <ResultRow label="Total paid" value={result?.totalPaid} prefix="$" decimals={2} />
            <ResultRow label="Total interest" value={result?.totalInterest} prefix="$" decimals={2} />
          </ResultCard>

          {result && (
            <div className="mt-4">
              <button
                onClick={() => setShowTable(t => !t)}
                className="text-sm text-primary hover:underline font-medium"
              >
                {showTable ? 'Hide' : 'Show'} amortization schedule
              </button>
              {showTable && (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        {['Year', 'Principal', 'Interest', 'Balance'].map(h => (
                          <th key={h} className="py-2 px-3 text-left text-on-surface-muted font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {annualSchedule.map(row => (
                        <tr key={row.year} className="border-b border-border/50 hover:bg-surface transition-colors">
                          <td className="py-2 px-3 font-mono">{row.year}</td>
                          <td className="py-2 px-3 font-mono text-green-600 dark:text-green-400">{formatCurrency(row.principal)}</td>
                          <td className="py-2 px-3 font-mono text-red-500">{formatCurrency(row.interest)}</td>
                          <td className="py-2 px-3 font-mono">{formatCurrency(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
        <FormulaInfo>
          <p>Monthly payment M = P[r(1+r)^n] / [(1+r)^n - 1]</p>
          <p className="mt-1">where P = principal, r = monthly rate, n = total payments</p>
        </FormulaInfo>
      </CalculatorLayout>
    </PageWrapper>
  );
}
