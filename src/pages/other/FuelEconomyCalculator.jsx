import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import ResultCard from '../../components/ui/ResultCard';
import ResultRow from '../../components/ui/ResultRow';
import RadioGroup from '../../components/ui/RadioGroup';
import FormulaInfo from '../../components/calculator/FormulaInfo';

export default function FuelEconomyCalculator() {
  const [unit, setUnit] = useState('imperial');
  const [distance, setDistance] = useState('');
  const [fuel, setFuel] = useState('');
  const [fuelPrice, setFuelPrice] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const d = parseFloat(distance), f = parseFloat(fuel), fp = parseFloat(fuelPrice);
    if (isNaN(d) || isNaN(f) || d <= 0 || f <= 0) return;
    if (unit === 'imperial') {
      const mpg = d / f;
      const costPerMile = fp ? (fp / mpg) : null;
      setResult({ mpg, kpl: mpg * 0.425144, l100km: 235.215 / mpg, costPerMile, unit });
    } else {
      const lper100 = (f / d) * 100;
      const mpg = 235.215 / lper100;
      const kpl = 100 / lper100;
      const costPer100km = fp ? fp * f / (d / 100) : null;
      setResult({ lper100, mpg, kpl, costPer100km, unit });
    }
  };

  return (
    <PageWrapper>
      <CalculatorLayout title="Fuel Economy Calculator" description="Calculate MPG, L/100km and fuel cost per mile or km." category="other">
        <div className="space-y-5">
          <RadioGroup label="Unit system" options={[{ value: 'imperial', label: 'Imperial (MPG)' }, { value: 'metric', label: 'Metric (L/100km)' }]} value={unit} onChange={v => { setUnit(v); setResult(null); }} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label={unit === 'imperial' ? 'Distance (miles)' : 'Distance (km)'} value={distance} onChange={setDistance} unit={unit === 'imperial' ? 'mi' : 'km'} />
            <InputField label={unit === 'imperial' ? 'Fuel used (gallons)' : 'Fuel used (liters)'} value={fuel} onChange={setFuel} unit={unit === 'imperial' ? 'gal' : 'L'} />
          </div>
          <InputField label={`Fuel price (per ${unit === 'imperial' ? 'gallon' : 'liter'})`} value={fuelPrice} onChange={setFuelPrice} unit="$" unitPosition="left" placeholder="Optional" />
          <Button onClick={calculate} className="w-full">Calculate</Button>
          <ResultCard show={result !== null}>
            {result?.unit === 'imperial' ? (
              <>
                <ResultRow label="Miles per gallon (MPG)" value={result?.mpg} decimals={2} highlight />
                <ResultRow label="Km per liter (kpl)" value={result?.kpl} decimals={2} />
                <ResultRow label="L/100km" value={result?.l100km} decimals={2} />
                {result?.costPerMile && <ResultRow label="Cost per mile" value={result.costPerMile} prefix="$" decimals={3} />}
              </>
            ) : (
              <>
                <ResultRow label="L/100km" value={result?.lper100} decimals={2} highlight />
                <ResultRow label="Km per liter (kpl)" value={result?.kpl} decimals={2} />
                <ResultRow label="MPG equivalent" value={result?.mpg} decimals={2} />
                {result?.costPer100km && <ResultRow label="Cost per 100km" value={result.costPer100km} prefix="$" decimals={2} />}
              </>
            )}
          </ResultCard>
        </div>
        <FormulaInfo>
          <p>MPG = distance (miles) / fuel (gallons)</p>
          <p className="mt-1">L/100km = (fuel in liters / distance in km) × 100</p>
          <p>MPG ↔ L/100km: 235.215 / MPG</p>
        </FormulaInfo>
      </CalculatorLayout>
    </PageWrapper>
  );
}
