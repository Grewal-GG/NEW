export default function RadioGroup({ label, options, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <span className="text-sm font-medium text-on-surface-muted">{label}</span>}
      <div className="inline-flex rounded-xl border border-border overflow-hidden bg-elevated">
        {options.map((opt, i) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex-1 px-4 py-2.5 text-sm font-medium transition-all duration-200
              ${value === opt.value
                ? 'bg-primary text-white'
                : 'text-on-surface-muted hover:text-on-surface hover:bg-surface'
              }
              ${i > 0 ? 'border-l border-border' : ''}
            `}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
