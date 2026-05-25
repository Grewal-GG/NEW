import { useCountUp } from '../../hooks/useCountUp';

export default function ResultRow({ label, value, prefix = '', suffix = '', decimals = 2, highlight = false, rawValue }) {
  const animated = useCountUp(typeof value === 'number' ? value : null, { decimals });

  const displayValue = rawValue !== undefined
    ? rawValue
    : typeof value === 'number'
      ? `${prefix}${animated}${suffix}`
      : value;

  return (
    <div className={`flex items-center justify-between py-2.5 px-1 rounded-lg
      ${highlight ? 'bg-primary/10 px-3' : 'border-b border-border/50 last:border-0'}`}
    >
      <span className="text-sm text-on-surface-muted">{label}</span>
      <span className={`font-mono font-semibold ${highlight ? 'text-primary text-xl' : 'text-on-surface text-base'}`}>
        {displayValue}
      </span>
    </div>
  );
}
