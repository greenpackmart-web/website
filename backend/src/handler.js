import { sendEnquiryEmail } from './sendEmail.js'
import { checkRateLimit } from './rateLimit.js'

const routes = {
  '/api/enquiry': handleEnquiry,
  '/api/sample-request': handleSampleRequest,
}

function json(data, { status = 200 } = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

function isFilled(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function isEmail(value) {
  return isFilled(value) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function validateEnquiry(fields) {
  const errors = {}
  if (!isFilled(fields.name)) errors.name = 'Your name is required'
  if (!isEmail(fields.email)) errors.email = 'A valid email is required'
  if (!isFilled(fields.country)) errors.country = 'Country is required'
  if (!isFilled(fields.category)) errors.category = 'Product category is required'
  if (!isFilled(fields.quantity)) errors.quantity = 'Quantity is required'
  return errors
}

function validateSampleRequest(fields) {
  const errors = {}
  if (!isFilled(fields.name)) errors.name = 'Your name is required'
  if (!isEmail(fields.email)) errors.email = 'A valid email is required'
  if (!isFilled(fields.country)) errors.country = 'Country is required'
  if (!isFilled(fields.address)) errors.address = 'Shipping address is required'
  if (!Array.isArray(fields.interests) || fields.interests.length === 0) {
    errors.interests = 'Select at least one category'
  }
  return errors
}

async function handleEnquiry(fields) {
  const errors = validateEnquiry(fields)
  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 })
  }
  try {
    await sendEnquiryEmail('enquiry', fields)
  } catch (error) {
    console.error('Email delivery failed', error)
    return json({ error: 'Email delivery failed' }, { status: 502 })
  }
  return json({ ok: true }, { status: 202 })
}

async function handleSampleRequest(fields) {
  const errors = validateSampleRequest(fields)
  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 })
  }
  try {
    await sendEnquiryEmail('sample-request', fields)
  } catch (error) {
    console.error('Email delivery failed', error)
    return json({ error: 'Email delivery failed' }, { status: 502 })
  }
  return json({ ok: true }, { status: 202 })
}

export async function handle(request) {
  const url = new URL(request.url)

  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 })
  }

  const route = routes[url.pathname]
  if (!route) {
    return json({ error: 'Not found' }, { status: 404 })
  }

  const forwardedFor = request.headers.get('x-forwarded-for')
  const ip = forwardedFor?.split(',')[0].trim() ?? 'local'
  if (!checkRateLimit(`${ip}:${url.pathname}`)) {
    return json(
      { error: 'Too many requests. Please try again in a few minutes.' },
      { status: 429 }
    )
  }

  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (typeof body === 'object' && body !== null && isFilled(body.website)) {
    return json({ ok: true }, { status: 202 })
  }

  return route(body)
}
