import { useState } from 'react'
import PageHero from '../components/PageHero'
import TextField from '../components/form/TextField'
import TextAreaField from '../components/form/TextAreaField'
import CheckboxGroup from '../components/form/CheckboxGroup'
import EnquiryFallback from '../components/form/EnquiryFallback'
import { productCategories } from '../data/products'
import { site } from '../data/site'

const initialFields = {
  name: '',
  email: '',
  company: '',
  country: '',
  address: '',
  interests: [],
  message: '',
  website: '',
}

function validate(fields) {
  const errors = {}

  if (!fields.name.trim()) errors.name = 'Your name is required'
  if (!fields.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Enter a valid email address'
  }
  if (!fields.country.trim()) errors.country = 'Country is required'
  if (!fields.address.trim()) errors.address = 'Shipping address is required'
  if (fields.interests.length === 0) {
    errors.interests = 'Select at least one category'
  }

  return errors
}

function buildMailto(fields) {
  const lines = [
    `Name: ${fields.name}`,
    fields.company && `Company: ${fields.company}`,
    `Email: ${fields.email}`,
    `Country: ${fields.country}`,
    `Shipping address: ${fields.address}`,
    `Categories of interest: ${fields.interests.join(', ')}`,
    fields.message && `Message: ${fields.message}`,
  ].filter(Boolean)

  return `mailto:${site.email}?subject=${encodeURIComponent(
    'Sample request'
  )}&body=${encodeURIComponent(lines.join('\n'))}`
}

function RequestSamplesPage() {
  const [fields, setFields] = useState(initialFields)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [mailtoHref, setMailtoHref] = useState(null)

  function handleChange(event) {
    const { name, value } = event.target
    setFields((previous) => ({ ...previous, [name]: value }))
  }

  function handleInterestsChange(interests) {
    setFields((previous) => ({ ...previous, interests }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(fields)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')
    try {
      const response = await fetch('/api/sample-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      if (!response.ok) throw new Error(`Request failed: ${response.status}`)
      setStatus('success')
    } catch {
      const href = buildMailto(fields)
      window.location.href = href
      setMailtoHref(href)
      setStatus('error')
    }
  }

  const categoryNames = productCategories.map((category) => category.name)

  return (
    <>
      <PageHero
        eyebrow="Request Samples"
        title="Check the quality before you commit"
        text="Tell us which categories interest you and where to ship — we'll send a sample kit."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
          {status === 'success' && (
            <div className="rounded-3xl border border-mist bg-cream p-8 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-forest">
                Thank you — your sample request is with us
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-pine/70">
                We reply with sample kit details within one business day.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFields(initialFields)
                  setStatus('idle')
                }}
                className="mt-6 text-sm font-medium text-sage transition hover:text-forest"
              >
                Submit another request
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="rounded-3xl border border-mist bg-cream p-8 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-forest">
                We couldn't send it automatically
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-pine/70">
                Your email app should have opened with everything pre-filled —
                just press send there. If it didn't:
              </p>
              <a
                href={mailtoHref}
                className="mt-6 inline-block rounded-full bg-leaf px-8 py-3 font-heading font-semibold text-white shadow-lg shadow-leaf/30 transition hover:bg-forest"
              >
                Open the pre-filled email
              </a>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-4 block w-full text-sm font-medium text-sage transition hover:text-forest"
              >
                Try the form again
              </button>
            </div>
          )}

          {(status === 'idle' || status === 'submitting') && (
            <>
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <input
                  type="text"
                  name="website"
                  value={fields.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
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
                    label="Country"
                    name="country"
                    value={fields.country}
                    onChange={handleChange}
                    error={errors.country}
                    required
                  />
                </div>
                <TextAreaField
                  label="Shipping address"
                  name="address"
                  value={fields.address}
                  onChange={handleChange}
                  error={errors.address}
                  rows={2}
                  required
                />
                <CheckboxGroup
                  label="Categories of interest"
                  options={categoryNames}
                  values={fields.interests}
                  onChange={handleInterestsChange}
                  error={errors.interests}
                />
                <TextAreaField
                  label="Message (optional)"
                  name="message"
                  value={fields.message}
                  onChange={handleChange}
                  error={errors.message}
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full rounded-full bg-leaf px-8 py-3 font-heading font-semibold text-white shadow-lg shadow-leaf/30 transition hover:bg-forest disabled:opacity-60"
                >
                  {status === 'submitting' ? 'Sending…' : 'Request my samples'}
                </button>
              </form>
              <div className="mt-8">
                <EnquiryFallback subject="Sample request" />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}

export default RequestSamplesPage
