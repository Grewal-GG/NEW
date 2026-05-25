import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import ResultCard from '../../components/ui/ResultCard';
import ResultRow from '../../components/ui/ResultRow';
import RadioGroup from '../../components/ui/RadioGroup';
import FormulaInfo from '../../components/calculator/FormulaInfo';
import { idealWeightMale, idealWeightFemale, kgToLbs } from '../../utils/health';

export default function IdealWeightCalculator() {
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState('metric');
  const [result, setResult] = useState(null);

  const calculate = () => {
    let heightInches;
    if (unit === 'metric') {
      heightInches = parseFloat(height) / 2.54;
    } else {
      heightInches = parseFloat(height);
    }
    if (isNaN(heightInches) || heightInches < 60) return;
    const idealKg = gender === 'male' ? idealWeightMale(heightInches) : idealWeightFemale(heightInches);
    setResult({ idealKg, idealLbs: kgToLbs(idealKg) });
  };

  return (
    <PageWrapper>
      <CalculatorLayout title="Ideal Weight Calculator" description="Calculate ideal body weight using the Devine formula." category="health">
        <div className="space-y-5">
          <div className="flex gap-4 flex-wrap">
            <RadioGroup label="Gender" options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]} value={gender} onChange={setGender} />
            <RadioGroup label="Height unit" options={[{ value: 'metric', label: 'cm' }, { value: 'imperial', label: 'inches' }]} value={unit} onChange={setUnit} />
          </div>
          <InputField label={`Height (${unit === 'metric' ? 'cm' : 'inches, min 60"}'})`} value={height} onChange={setHeight} unit={unit === 'metric' ? 'cm' : 'in'} />
          <Button onClick={calculate} className="w-full">Calculate</Button>
          <ResultCard show={result !== null}>
            <ResultRow label="Ideal weight (kg)" value={result?.idealKg} suffix=" kg" decimals={1} highlight />
            <ResultRow label="Ideal weight (lbs)" value={result?.idealLbs} suffix=" lbs" decimals={1} />
          </ResultCard>
        </div>
        <FormulaInfo>
          <p>Devine Formula:</p>
          <ul className="mt-1 list-disc pl-4 space-y-0.5">
            <li>Male: 50 kg + 2.3 kg per inch over 5 feet</li>
            <li>Female: 45.5 kg + 2.3 kg per inch over 5 feet</li>
          </ul>
        </FormulaInfo>
      </CalculatorLayout>
    </PageWrapper>
  );
}
