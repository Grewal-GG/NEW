import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import InputField from '../../components/ui/InputField';
import ResultCard from '../../components/ui/ResultCard';
import ResultRow from '../../components/ui/ResultRow';
import { tipAmount, splitBill } from '../../utils/financial';

const TIP_PRESETS = [10, 15, 18, 20, 25];

export default function TipCalculator() {
  const [bill, setBill] = useState('');
  const [tip, setTip] = useState('18');
  const [people, setPeople] = useState('1');

  const b = parseFloat(bill) || 0;
  const t = parseFloat(tip) || 0;
  const p = parseInt(people) || 1;
  const tipAmt = tipAmount(b, t);
  const total = b + tipAmt;
  const perPerson = splitBill(b, tipAmt, p);

  const show = b > 0;

  return (
    <PageWrapper>
      <CalculatorLayout title="Tip Calculator" description="Calculate tips and split the bill between people." category="financial">
        <div className="space-y-5">
          <InputField label="Bill amount" value={bill} onChange={setBill} unit="$" unitPosition="left" placeholder="Enter bill total" />
          <div>
            <span className="text-sm font-medium text-on-surface-muted block mb-2">Tip %</span>
            <div className="flex gap-2 flex-wrap mb-3">
              {TIP_PRESETS.map(pct => (
                <button
                  key={pct}
                  onClick={() => setTip(String(pct))}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${tip === String(pct) ? 'bg-primary text-white border-primary' : 'border-border text-on-surface-muted hover:border-primary'}`}
                >
                  {pct}%
                </button>
              ))}
            </div>
            <InputField value={tip} onChange={setTip} unit="%" placeholder="Custom %" />
          </div>
          <InputField label="Split between" value={people} onChange={setPeople} unit="people" min="1" />
          <ResultCard show={show}>
            <ResultRow label="Tip amount" value={tipAmt} prefix="$" decimals={2} highlight />
            <ResultRow label="Total bill" value={total} prefix="$" decimals={2} />
            {p > 1 && <ResultRow label={`Per person (${p})`} value={perPerson} prefix="$" decimals={2} />}
          </ResultCard>
        </div>
      </CalculatorLayout>
    </PageWrapper>
  );
}
