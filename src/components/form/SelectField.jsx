function SelectField({ label, name, value, onChange, error, required, options }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1 block text-sm font-medium text-forest"
      >
        {label}
        {required && <span className="text-leaf"> *</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`w-full rounded-2xl border bg-white px-4 py-2.5 text-sm text-pine outline-none transition focus:border-leaf ${
          error ? 'border-error' : 'border-mist'
        }`}
      >
        <option value="">Select a category</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${name}-error`} className="mt-1 text-xs text-error">
          {error}
        </p>
      )}
    </div>
  )
}

export default SelectField
