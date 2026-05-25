import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import Button from '../../components/ui/Button';
import RadioGroup from '../../components/ui/RadioGroup';
import FormulaInfo from '../../components/calculator/FormulaInfo';
import { addFractions, subtractFractions, multiplyFractions, divideFractions } from '../../utils/math';
import { motion, AnimatePresence } from 'framer-motion';

const OPS = [
  { value: 'add', label: 'Add (+)' },
  { value: 'sub', label: 'Subtract (−)' },
  { value: 'mul', label: 'Multiply (×)' },
  { value: 'div', label: 'Divide (÷)' },
];

function FractionInput({ n, d, onN, onD, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-sm text-on-surface-muted mb-2">{label}</span>
      <div className="flex flex-col items-center gap-1">
        <input
          type="number"
          value={n}
          onChange={e => onN(e.target.value)}
          placeholder="Numerator"
          className="calc-input w-28 text-center"
        />
        <div className="h-0.5 w-28 bg-on-surface rounded" />
        <input
          type="number"
          value={d}
          onChange={e => onD(e.target.value)}
          placeholder="Denominator"
          className="calc-input w-28 text-center"
        />
      </div>
    </div>
  );
}

export default function FractionCalculator() {
  const [op, setOp] = useState('add');
  const [n1, setN1] = useState(''); const [d1, setD1] = useState('');
  const [n2, setN2] = useState(''); const [d2, setD2] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const a = parseInt(n1), b = parseInt(d1), c = parseInt(n2), d = parseInt(d2);
    if ([a, b, c, d].some(isNaN)) return;
    if (b === 0 || d === 0) return;
    let res;
    if (op === 'add') res = addFractions(a, b, c, d);
    if (op === 'sub') res = subtractFractions(a, b, c, d);
    if (op === 'mul') res = multiplyFractions(a, b, c, d);
    if (op === 'div') res = divideFractions(a, b, c, d);
    setResult(res);
  };

  const opSymbol = { add: '+', sub: '−', mul: '×', div: '÷' };

  return (
    <PageWrapper>
      <CalculatorLayout title="Fraction Calculator" description="Add, subtract, multiply and divide fractions with simplified results." category="math">
        <div className="space-y-6">
          <RadioGroup label="Operation" options={OPS} value={op} onChange={v => { setOp(v); setResult(null); }} />
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <FractionInput n={n1} d={d1} onN={setN1} onD={setD1} label="First fraction" />
            <span className="text-3xl font-bold text-on-surface-muted mt-6">{opSymbol[op]}</span>
            <FractionInput n={n2} d={d2} onN={setN2} onD={setD2} label="Second fraction" />
          </div>
          <Button onClick={calculate} className="w-full">Calculate</Button>
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className="result-card text-center"
              >
                <p className="text-on-surface-muted text-sm mb-3">Result (simplified)</p>
                <div className="flex flex-col items-center">
                  <span className="font-mono text-3xl font-bold text-primary">{result.numerator}</span>
                  <div className="h-0.5 w-16 bg-primary my-1 rounded" />
                  <span className="font-mono text-3xl font-bold text-primary">{result.denominator}</span>
                </div>
                <p className="text-on-surface-muted mt-3 text-sm">
                  = {(result.numerator / result.denominator).toFixed(6)}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <FormulaInfo>
          <p>Fractions are reduced using the Greatest Common Divisor (GCD).</p>
          <ul className="mt-2 space-y-1 list-disc pl-4">
            <li>Add/Subtract: cross-multiply denominators, then find GCD</li>
            <li>Multiply: multiply numerators and denominators directly, then simplify</li>
            <li>Divide: multiply by the reciprocal of the second fraction</li>
          </ul>
        </FormulaInfo>
      </CalculatorLayout>
    </PageWrapper>
  );
}
