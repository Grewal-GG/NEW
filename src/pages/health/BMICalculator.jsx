import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import ResultCard from '../../components/ui/ResultCard';
import ResultRow from '../../components/ui/ResultRow';
import RadioGroup from '../../components/ui/RadioGroup';
import FormulaInfo from '../../components/calculator/FormulaInfo';
import { bmiValue, bmiCategory, lbsToKg, inchesToM, cmToM } from '../../utils/health';
import { motion, AnimatePresence } from 'framer-motion';

export default function BMICalculator() {
  const [unit, setUnit] = useState('metric');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    let wkg, hm;
    if (unit === 'metric') {
      wkg = parseFloat(weight);
      hm = cmToM(parseFloat(height));
    } else {
      wkg = lbsToKg(parseFloat(weight));
      hm = inchesToM((parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0));
    }
    if (isNaN(wkg) || isNaN(hm) || hm <= 0) return;
    const bmi = bmiValue(wkg, hm);
    setResult({ bmi, category: bmiCategory(bmi) });
  };

  const bmiPercent = result ? Math.min(100, Math.max(0, ((result.bmi - 10) / 30) * 100)) : 0;

  return (
    <PageWrapper>
      <CalculatorLayout title="BMI Calculator" description="Calculate your Body Mass Index and weight category." category="health">
        <div className="space-y-5">
          <RadioGroup
            label="Unit system"
            options={[{ value: 'metric', label: 'Metric (kg/cm)' }, { value: 'imperial', label: 'Imperial (lbs/ft)' }]}
            value={unit}
            onChange={v => { setUnit(v); setResult(null); }}
          />
          {unit === 'metric' ? (
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Weight" value={weight} onChange={setWeight} unit="kg" placeholder="e.g. 70" />
              <InputField label="Height" value={height} onChange={setHeight} unit="cm" placeholder="e.g. 175" />
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              <InputField label="Weight" value={weight} onChange={setWeight} unit="lbs" placeholder="e.g. 154" />
              <InputField label="Height (ft)" value={heightFt} onChange={setHeightFt} unit="ft" placeholder="5" />
              <InputField label="Height (in)" value={heightIn} onChange={setHeightIn} unit="in" placeholder="9" />
            </div>
          )}
          <Button onClick={calculate} className="w-full">Calculate BMI</Button>
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className="result-card"
              >
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold font-mono text-primary">{result.bmi.toFixed(1)}</div>
                  <div className={`text-lg font-semibold mt-1 ${result.category.color}`}>{result.category.label}</div>
                </div>
                <div className="relative h-4 bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-500 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ left: 0 }}
                    animate={{ left: `${bmiPercent}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    className="absolute top-0 bottom-0 w-3 -ml-1.5 bg-white border-2 border-on-surface rounded-full"
                  />
                </div>
                <div className="flex justify-between text-xs text-on-surface-muted mt-1">
                  <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <FormulaInfo>
          <p>BMI = weight(kg) / height(m)²</p>
          <ul className="mt-2 space-y-0.5 list-disc pl-4">
            <li>Below 18.5: Underweight</li>
            <li>18.5–24.9: Normal weight</li>
            <li>25–29.9: Overweight</li>
            <li>30+: Obese</li>
          </ul>
        </FormulaInfo>
      </CalculatorLayout>
    </PageWrapper>
  );
}
