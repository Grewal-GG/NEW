import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import Button from '../../components/ui/Button';
import ResultCard from '../../components/ui/ResultCard';
import ResultRow from '../../components/ui/ResultRow';
import RadioGroup from '../../components/ui/RadioGroup';
import { addTime, subtractTime } from '../../utils/datetime';

function TimeInput({ label, h, m, s, onH, onM, onS }) {
  return (
    <div>
      <span className="text-sm font-medium text-on-surface-muted block mb-2">{label}</span>
      <div className="flex gap-2 items-center">
        <input type="number" value={h} onChange={e => onH(e.target.value)} placeholder="HH" min="0" className="calc-input text-center w-20" />
        <span className="text-on-surface-muted font-bold">:</span>
        <input type="number" value={m} onChange={e => onM(e.target.value)} placeholder="MM" min="0" max="59" className="calc-input text-center w-20" />
        <span className="text-on-surface-muted font-bold">:</span>
        <input type="number" value={s} onChange={e => onS(e.target.value)} placeholder="SS" min="0" max="59" className="calc-input text-center w-20" />
      </div>
    </div>
  );
}

export default function TimeCalculator() {
  const [op, setOp] = useState('add');
  const [h1, setH1] = useState(''); const [m1, setM1] = useState(''); const [s1, setS1] = useState('');
  const [h2, setH2] = useState(''); const [m2, setM2] = useState(''); const [s2, setS2] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const parse = (v) => parseInt(v) || 0;
    const fn = op === 'add' ? addTime : subtractTime;
    setResult(fn(parse(h1), parse(m1), parse(s1), parse(h2), parse(m2), parse(s2)));
  };

  return (
    <PageWrapper>
      <CalculatorLayout title="Time Calculator" description="Add or subtract hours, minutes, and seconds." category="datetime">
        <div className="space-y-6">
          <RadioGroup label="Operation" options={[{ value: 'add', label: 'Add times' }, { value: 'subtract', label: 'Subtract times' }]} value={op} onChange={setOp} />
          <TimeInput label="First time" h={h1} m={m1} s={s1} onH={setH1} onM={setM1} onS={setS1} />
          <TimeInput label="Second time" h={h2} m={m2} s={s2} onH={setH2} onM={setM2} onS={setS2} />
          <Button onClick={calculate} className="w-full">Calculate</Button>
          <ResultCard show={result !== null} title="Result">
            {result && (
              <div className="text-center py-2">
                <div className="text-4xl font-mono font-bold text-primary">
                  {String(result.hours).padStart(2,'0')}:{String(result.minutes).padStart(2,'0')}:{String(result.seconds).padStart(2,'0')}
                </div>
                <p className="text-on-surface-muted text-sm mt-2">{result.totalSeconds.toLocaleString()} total seconds</p>
              </div>
            )}
          </ResultCard>
        </div>
      </CalculatorLayout>
    </PageWrapper>
  );
}
