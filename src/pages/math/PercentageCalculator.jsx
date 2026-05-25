import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import ResultCard from '../../components/ui/ResultCard';
import ResultRow from '../../components/ui/ResultRow';
import RadioGroup from '../../components/ui/RadioGroup';
import FormulaInfo from '../../components/calculator/FormulaInfo';
import { percentageOf, percentageWhat, percentageChange } from '../../utils/math';

const MODES = [
  { value: 'of', label: 'X% of Y' },
  { value: 'what', label: 'X is what %' },
  { value: 'change', label: '% change' },
];

export default function PercentageCalculator() {
  const [mode, setMode] = useState('of');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const x = parseFloat(a), y = parseFloat(b);
    if (isNaN(x) || isNaN(y)) return;
    if (mode === 'of') setResult({ value: percentageOf(x, y), label: `${x}% of ${y}` });
    if (mode === 'what') setResult({ value: percentageWhat(x, y), label: `${x} is % of ${y}`, suffix: '%' });
    if (mode === 'change') setResult({ value: percentageChange(x, y), label: `% change from ${x} to ${y}`, suffix: '%' });
  };

  const labels = {
    of: ['Percentage (%)', 'Total value'],
    what: ['Part value', 'Total value'],
    change: ['From value', 'To value'],
  };

  return (
    <PageWrapper>
      <CalculatorLayout title="Percentage Calculator" description="Calculate percentages, ratios and percentage changes." category="math">
        <div className="space-y-5">
          <RadioGroup label="Calculation type" options={MODES} value={mode} onChange={v => { setMode(v); setResult(null); }} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label={labels[mode][0]} value={a} onChange={setA} placeholder="Enter value" />
            <InputField label={labels[mode][1]} value={b} onChange={setB} placeholder="Enter value" />
          </div>
          <Button onClick={calculate} className="w-full">Calculate</Button>
          <ResultCard show={result !== null} title="Result">
            {result && <ResultRow label={result.label} value={result.value} suffix={result.suffix || ''} decimals={4} highlight />}
          </ResultCard>
        </div>
        <FormulaInfo>
          <ul className="space-y-1 list-disc pl-4">
            <li><strong>X% of Y</strong>: (X / 100) × Y</li>
            <li><strong>X is what % of Y</strong>: (X / Y) × 100</li>
            <li><strong>% change</strong>: ((To − From) / From) × 100</li>
          </ul>
        </FormulaInfo>
      </CalculatorLayout>
    </PageWrapper>
  );
}
