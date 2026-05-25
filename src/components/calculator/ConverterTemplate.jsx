import { useState } from 'react';
import CalculatorLayout from './CalculatorLayout';
import InputField from '../ui/InputField';
import SelectField from '../ui/SelectField';
import { convertUnit } from '../../utils/converters';
import { roundTo } from '../../utils/formatters';

export default function ConverterTemplate({ table, title, description, category = 'converters' }) {
  const unitKeys = Object.keys(table.units);
  const [fromUnit, setFromUnit] = useState(unitKeys[0]);
  const [toUnit, setToUnit] = useState(unitKeys[1]);
  const [value, setValue] = useState('');

  const options = unitKeys.map(k => ({ value: k, label: table.units[k].label }));

  const result = value !== '' && !isNaN(Number(value))
    ? convertUnit(Number(value), fromUnit, toUnit, table)
    : null;

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <CalculatorLayout title={title} description={description} category={category}>
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField label="From" value={fromUnit} onChange={setFromUnit} options={options} />
          <SelectField label="To" value={toUnit} onChange={setToUnit} options={options} />
        </div>

        <div className="flex items-end gap-3">
          <div className="flex-1">
            <InputField
              label={`Value (${table.units[fromUnit]?.label})`}
              value={value}
              onChange={setValue}
              placeholder="Enter value"
            />
          </div>
          <button
            type="button"
            onClick={handleSwap}
            className="mb-0 px-4 py-3 rounded-xl border border-border bg-elevated text-on-surface-muted hover:text-primary hover:border-primary transition-all duration-200 text-xl"
            title="Swap units"
          >
            ⇄
          </button>
        </div>

        {result !== null && (
          <div className="result-card">
            <div className="flex items-center justify-between">
              <span className="text-on-surface-muted text-sm">{value} {table.units[fromUnit]?.label} =</span>
            </div>
            <div className="mt-2">
              <span className="text-3xl font-bold font-mono text-primary">
                {roundTo(result, 8).toLocaleString('en-US', { maximumSignificantDigits: 8 })}
              </span>
              <span className="ml-2 text-on-surface-muted">{table.units[toUnit]?.label}</span>
            </div>
          </div>
        )}

        <div className="mt-6">
          <h4 className="text-sm font-semibold text-on-surface-muted mb-3">All conversions</h4>
          {value !== '' && !isNaN(Number(value)) && (
            <div className="space-y-1">
              {unitKeys.map(key => {
                const converted = convertUnit(Number(value), fromUnit, key, table);
                return (
                  <div key={key} className={`flex justify-between text-sm py-1.5 px-2 rounded-lg ${key === toUnit ? 'bg-primary/10 font-medium' : 'hover:bg-surface'}`}>
                    <span className="text-on-surface-muted">{table.units[key].label}</span>
                    <span className="font-mono text-on-surface">
                      {roundTo(converted, 6).toLocaleString('en-US', { maximumSignificantDigits: 8 })}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
