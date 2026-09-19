function CheckboxGroup({ label, options, values, onChange, error }) {
  function toggle(option) {
    if (values.includes(option)) {
      onChange(values.filter((value) => value !== option))
    } else {
      onChange([...values, option])
    }
  }

  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-medium text-forest">
        {label}
        <span className="text-leaf"> *</span>
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option}
            className="cursor-pointer select-none rounded-full border border-mist bg-white px-4 py-2 text-sm font-medium text-forest transition hover:border-leaf/60"
          >
            <input
              type="checkbox"
              checked={values.includes(option)}
              onChange={() => toggle(option)}
              className="peer sr-only"
            />
            <span
              className={
                values.includes(option)
                  ? 'rounded-full text-leaf'
                  : 'text-forest'
              }
            >
              {option}
            </span>
            <span
              aria-hidden="true"
              className={`ml-1 ${values.includes(option) ? 'text-leaf' : 'text-sage'}`}
            >
              {values.includes(option) ? '✓' : '+'}
            </span>
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </fieldset>
  )
}

export default CheckboxGroup
