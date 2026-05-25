import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import InputField from '../../components/ui/InputField';
import SelectField from '../../components/ui/SelectField';
import { convertTemperature, TEMPERATURE_UNITS } from '../../utils/converters';
import { roundTo } from '../../utils/formatters';

export default function TemperatureConverter() {
  const [value, setValue] = useState('');
  const [from, setFrom] = useState('celsius');
  const [to, setTo] = useState('fahrenheit');

  const options = Object.entries(TEMPERATURE_UNITS).map(([k, v]) => ({ value: k, label: v }));
  const result = value !== '' && !isNaN(Number(value))
    ? convertTemperature(Number(value), from, to)
    : null;

  const allResults = value !== '' && !isNaN(Number(value))
    ? Object.keys(TEMPERATURE_UNITS).map(unit => ({
        unit,
        label: TEMPERATURE_UNITS[unit],
        value: convertTemperature(Number(value), from, unit),
      }))
    : [];

  return (
    <PageWrapper>
      <CalculatorLayout title="Temperature Converter" description="Convert between Celsius, Fahrenheit and Kelvin." category="converters">
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField label="From" value={from} onChange={setFrom} options={options} />
            <SelectField label="To" value={to} onChange={setTo} options={options} />
          </div>
          <InputField label={`Temperature (${TEMPERATURE_UNITS[from]})`} value={value} onChange={setValue} placeholder="Enter temperature" />
          {result !== null && (
            <div className="result-card">
              <div className="text-3xl font-bold font-mono text-primary">
                {roundTo(result, 4)}
              </div>
              <div className="text-on-surface-muted text-sm mt-1">{TEMPERATURE_UNITS[to]}</div>
            </div>
          )}
          {allResults.length > 0 && (
            <div className="space-y-1">
              {allResults.map(r => (
                <div key={r.unit} className={`flex justify-between text-sm py-1.5 px-2 rounded-lg ${r.unit === to ? 'bg-primary/10 font-medium' : 'hover:bg-surface'}`}>
                  <span className="text-on-surface-muted">{r.label}</span>
                  <span className="font-mono text-on-surface">{roundTo(r.value, 4)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </CalculatorLayout>
    </PageWrapper>
  );
}
