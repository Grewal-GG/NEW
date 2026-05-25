export default function SelectField({ label, value, onChange, options, id }) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-on-surface-muted">
          {label}
        </label>
      )}
      <select
        id={selectId}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="calc-input appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2364748b%22 stroke-width=%222%22><polyline points=%226 9 12 15 18 9%22></polyline></svg>')] bg-no-repeat bg-[right_1rem_center] pr-10 cursor-pointer"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
