import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import InputField from '../../components/ui/InputField';
import SelectField from '../../components/ui/SelectField';
import Button from '../../components/ui/Button';
import ResultCard from '../../components/ui/ResultCard';
import ResultRow from '../../components/ui/ResultRow';
import RadioGroup from '../../components/ui/RadioGroup';
import FormulaInfo from '../../components/calculator/FormulaInfo';
import { bmrMale, bmrFemale, tdee, ACTIVITY_MULTIPLIERS, lbsToKg, inchesToM } from '../../utils/health';

export default function CalorieCalculator() {
  const [gender, setGender] = useState('male');
  const [unit, setUnit] = useState('metric');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState('moderate');
  const [result, setResult] = useState(null);

  const activityOptions = Object.entries(ACTIVITY_MULTIPLIERS).map(([k, v]) => ({ value: k, label: v.label }));

  const calculate = () => {
    let wkg, hcm;
    const a = parseInt(age);
    if (unit === 'metric') {
      wkg = parseFloat(weight);
      hcm = parseFloat(height);
    } else {
      wkg = lbsToKg(parseFloat(weight));
      hcm = parseFloat(height) * 2.54;
    }
    if ([wkg, hcm, a].some(isNaN)) return;
    const bmr = gender === 'male' ? bmrMale(wkg, hcm, a) : bmrFemale(wkg, hcm, a);
    const maintenance = tdee(bmr, activity);
    setResult({
      bmr,
      maintenance,
      mildLoss: maintenance - 250,
      loss: maintenance - 500,
      extreme: maintenance - 1000,
      mildGain: maintenance + 250,
      gain: maintenance + 500,
    });
  };

  return (
    <PageWrapper>
      <CalculatorLayout title="Calorie Calculator" description="Calculate your daily calorie needs (TDEE) based on activity level." category="health">
        <div className="space-y-5">
          <div className="flex gap-4 flex-wrap">
            <RadioGroup label="Gender" options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]} value={gender} onChange={setGender} />
            <RadioGroup label="Units" options={[{ value: 'metric', label: 'Metric' }, { value: 'imperial', label: 'Imperial' }]} value={unit} onChange={setUnit} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <InputField label="Age" value={age} onChange={setAge} unit="yrs" />
            <InputField label="Weight" value={weight} onChange={setWeight} unit={unit === 'metric' ? 'kg' : 'lbs'} />
            <InputField label="Height" value={height} onChange={setHeight} unit={unit === 'metric' ? 'cm' : 'in'} />
          </div>
          <SelectField label="Activity level" value={activity} onChange={setActivity} options={activityOptions} />
          <Button onClick={calculate} className="w-full">Calculate calories</Button>
          <ResultCard show={result !== null} title="Daily Calorie Needs">
            <ResultRow label="Maintain weight" value={result?.maintenance} suffix=" cal/day" decimals={0} highlight />
            <ResultRow label="BMR (base)" value={result?.bmr} suffix=" cal/day" decimals={0} />
            <ResultRow label="Mild weight loss (0.5 lb/wk)" value={result?.mildLoss} suffix=" cal/day" decimals={0} />
            <ResultRow label="Weight loss (1 lb/wk)" value={result?.loss} suffix=" cal/day" decimals={0} />
            <ResultRow label="Mild weight gain (0.5 lb/wk)" value={result?.mildGain} suffix=" cal/day" decimals={0} />
            <ResultRow label="Weight gain (1 lb/wk)" value={result?.gain} suffix=" cal/day" decimals={0} />
          </ResultCard>
        </div>
        <FormulaInfo>
          <p>Uses Harris-Benedict BMR formula × activity multiplier (TDEE).</p>
          <p className="mt-1">Male BMR = 88.4 + 13.4×weight + 4.8×height − 5.68×age</p>
        </FormulaInfo>
      </CalculatorLayout>
    </PageWrapper>
  );
}
