function SelectField({ label, name, value, onChange, error, required, options, placeholder }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1 block text-sm font-medium text-forest"
      >
        {label}
        {required && <span className="text-leaf"> *</span>}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`w-full appearance-none rounded-2xl border bg-white py-2.5 pl-4 pr-10 text-sm text-pine outline-none transition focus:border-leaf ${
            error ? 'border-error' : 'border-mist'
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sage"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" d="M6 9l6 6 6-6" />
        </svg>
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-1 text-xs text-error">
          {error}
        </p>
      )}
    </div>
  )
}

export default SelectField
