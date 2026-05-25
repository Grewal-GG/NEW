import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import ResultCard from '../../components/ui/ResultCard';
import ResultRow from '../../components/ui/ResultRow';
import RadioGroup from '../../components/ui/RadioGroup';
import FormulaInfo from '../../components/calculator/FormulaInfo';
import { bodyFatMale, bodyFatFemale, bodyFatCategory } from '../../utils/health';

export default function BodyFatCalculator() {
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [waist, setWaist] = useState('');
  const [neck, setNeck] = useState('');
  const [hip, setHip] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const h = parseFloat(height), w = parseFloat(waist), n = parseFloat(neck), hp = parseFloat(hip);
    if (gender === 'male') {
      if ([h, w, n].some(isNaN) || w <= n) return;
      const bf = bodyFatMale(w, n, h);
      setResult({ bf, category: bodyFatCategory(bf, 'male'), leanMass: null });
    } else {
      if ([h, w, n, hp].some(isNaN) || w + hp <= n) return;
      const bf = bodyFatFemale(w, hp, n, h);
      setResult({ bf, category: bodyFatCategory(bf, 'female'), leanMass: null });
    }
  };

  return (
    <PageWrapper>
      <CalculatorLayout title="Body Fat Calculator" description="Estimate body fat percentage using the US Navy method." category="health">
        <div className="space-y-5">
          <RadioGroup label="Gender" options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]} value={gender} onChange={v => { setGender(v); setResult(null); }} />
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Height" value={height} onChange={setHeight} unit="cm" />
            <InputField label="Waist circumference" value={waist} onChange={setWaist} unit="cm" />
            <InputField label="Neck circumference" value={neck} onChange={setNeck} unit="cm" />
            {gender === 'female' && <InputField label="Hip circumference" value={hip} onChange={setHip} unit="cm" />}
          </div>
          <Button onClick={calculate} className="w-full">Calculate</Button>
          <ResultCard show={result !== null}>
            <ResultRow label="Body fat %" value={result?.bf} suffix="%" decimals={1} highlight />
            <ResultRow label="Category" rawValue={result?.category} />
          </ResultCard>
        </div>
        <FormulaInfo>
          <p>US Navy Method (all measurements in cm):</p>
          <p className="mt-1">Male: 86.01×log10(waist−neck) − 70.04×log10(height) + 36.76</p>
          <p>Female: 163.2×log10(waist+hip−neck) − 97.68×log10(height) − 78.39</p>
        </FormulaInfo>
      </CalculatorLayout>
    </PageWrapper>
  );
}
