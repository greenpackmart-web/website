import { useState } from 'react'
import PageHero from '../components/PageHero'
import TextField from '../components/form/TextField'
import SelectField from '../components/form/SelectField'
import TextAreaField from '../components/form/TextAreaField'
import EnquiryFallback from '../components/form/EnquiryFallback'
import MailtoSuccess from '../components/form/MailtoSuccess'
import { productCategories } from '../data/products'
import { site } from '../data/site'

const initialFields = {
  name: '',
  email: '',
  company: '',
  country: '',
  category: '',
  quantity: '',
  message: '',
}

function validate(fields) {
  const errors = {}

  if (!fields.name.trim()) errors.name = 'Your name is required'
  if (!fields.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Enter a valid email address'
  }
  if (!fields.country.trim()) errors.country = 'Destination country is required'
  if (!fields.category) errors.category = 'Select a product category'
  if (!fields.quantity.trim()) errors.quantity = 'Estimated quantity is required'

  return errors
}

function buildMessage(fields) {
  return [
    `Name: ${fields.name}`,
    fields.company && `Company: ${fields.company}`,
    `Email: ${fields.email}`,
    `Country: ${fields.country}`,
    `Product category: ${fields.category}`,
    `Estimated quantity: ${fields.quantity}`,
    fields.message && `Message: ${fields.message}`,
  ]
    .filter(Boolean)
    .join('\n')
}

function buildMailto(fields) {
  return `mailto:${site.email}?subject=${encodeURIComponent(
    `Quote request: ${fields.category}`
  )}&body=${encodeURIComponent(buildMessage(fields))}`
}

function GetQuotePage() {
  const [fields, setFields] = useState(initialFields)
  const [errors, setErrors] = useState({})
  const [result, setResult] = useState(null)

  function handleChange(event) {
    const { name, value } = event.target
    setFields((previous) => ({ ...previous, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(fields)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    window.location.href = buildMailto(fields)
    setResult({ href: buildMailto(fields), text: buildMessage(fields) })
  }

  const categoryNames = productCategories.map((category) => category.name)

  return (
    <>
      <PageHero
        eyebrow="Get a Quote"
        title="Tell us what you need"
        text="Fill this in and we reply with pricing within one business day."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
          {result ? (
            <MailtoSuccess
              mailtoHref={result.href}
              messageText={result.text}
              onReset={() => {
                setFields(initialFields)
                setResult(null)
              }}
              resetLabel="Fill the form again"
            />
          ) : (
            <>
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField
                    label="Your name"
                    name="name"
                    value={fields.name}
                    onChange={handleChange}
                    error={errors.name}
                    required
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={fields.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                  />
                  <TextField
                    label="Company"
                    name="company"
                    value={fields.company}
                    onChange={handleChange}
                    error={errors.company}
                  />
                  <TextField
                    label="Destination country"
                    name="country"
                    value={fields.country}
                    onChange={handleChange}
                    error={errors.country}
                    required
                  />
                  <SelectField
                    label="Product category"
                    name="category"
                    value={fields.category}
                    onChange={handleChange}
                    error={errors.category}
                    options={categoryNames}
                    required
                  />
                  <TextField
                    label="Estimated quantity"
                    name="quantity"
                    value={fields.quantity}
                    onChange={handleChange}
                    error={errors.quantity}
                    required
                  />
                </div>
                <TextAreaField
                  label="Anything else? (sizes, target price, timeline)"
                  name="message"
                  value={fields.message}
                  onChange={handleChange}
                  error={errors.message}
                />
                <button
                  type="submit"
                  className="w-full rounded-full bg-leaf px-8 py-3 font-heading font-semibold text-white shadow-lg shadow-leaf/30 transition hover:bg-forest"
                >
                  Get my quote
                </button>
              </form>
              <div className="mt-8">
                <EnquiryFallback subject="Quote request" />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}

export default GetQuotePage
