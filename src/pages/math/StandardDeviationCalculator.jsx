import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import Button from '../../components/ui/Button';
import ResultCard from '../../components/ui/ResultCard';
import ResultRow from '../../components/ui/ResultRow';
import RadioGroup from '../../components/ui/RadioGroup';
import FormulaInfo from '../../components/calculator/FormulaInfo';
import { arithmeticMean, variance, stdDev } from '../../utils/math';

export default function StandardDeviationCalculator() {
  const [input, setInput] = useState('');
  const [type, setType] = useState('sample');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const nums = input.split(/[\s,;]+/).map(Number).filter(n => !isNaN(n));
    if (nums.length < 2) return;
    const population = type === 'population';
    setResult({
      mean: arithmeticMean(nums),
      variance: variance(nums, population),
      stdDev: stdDev(nums, population),
      count: nums.length,
      min: Math.min(...nums),
      max: Math.max(...nums),
    });
  };

  return (
    <PageWrapper>
      <CalculatorLayout title="Standard Deviation Calculator" description="Calculate mean, variance and standard deviation for a data set." category="math">
        <div className="space-y-5">
          <RadioGroup
            label="Type"
            options={[{ value: 'sample', label: 'Sample (n-1)' }, { value: 'population', label: 'Population (n)' }]}
            value={type}
            onChange={setType}
          />
          <div>
            <label className="text-sm font-medium text-on-surface-muted block mb-1.5">
              Data values (separate with commas, spaces or new lines)
            </label>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="e.g. 10, 20, 30, 40, 50"
              rows={4}
              className="calc-input resize-none w-full"
            />
          </div>
          <Button onClick={calculate} className="w-full">Calculate</Button>
          <ResultCard show={result !== null}>
            <ResultRow label="Mean (average)" value={result?.mean} decimals={6} highlight />
            <ResultRow label="Standard deviation" value={result?.stdDev} decimals={6} />
            <ResultRow label="Variance" value={result?.variance} decimals={6} />
            <ResultRow label="Count (n)" value={result?.count} decimals={0} />
            <ResultRow label="Min" value={result?.min} decimals={4} />
            <ResultRow label="Max" value={result?.max} decimals={4} />
          </ResultCard>
        </div>
        <FormulaInfo>
          <ul className="space-y-1 list-disc pl-4">
            <li>Mean = Σx / n</li>
            <li>Sample variance = Σ(x-mean)² / (n-1)</li>
            <li>Population variance = Σ(x-mean)² / n</li>
            <li>Standard deviation = √variance</li>
          </ul>
        </FormulaInfo>
      </CalculatorLayout>
    </PageWrapper>
  );
}
