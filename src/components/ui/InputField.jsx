export default function InputField({ label, value, onChange, unit, unitPosition = 'right', type = 'number', min, max, step, placeholder, helper, id }) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-on-surface-muted">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {unit && unitPosition === 'left' && (
          <span className="absolute left-4 text-on-surface-muted font-medium select-none">{unit}</span>
        )}
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          className={`calc-input ${unit && unitPosition === 'left' ? 'pl-10' : ''} ${unit && unitPosition === 'right' ? 'pr-16' : ''}`}
        />
        {unit && unitPosition === 'right' && (
          <span className="absolute right-4 text-on-surface-muted font-medium text-sm select-none">{unit}</span>
        )}
      </div>
      {helper && <p className="text-xs text-on-surface-muted">{helper}</p>}
    </div>
  );
}
