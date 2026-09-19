import { describe, test, expect, vi, beforeEach } from 'vitest'
import { handle } from '../src/handler.js'
import { resetRateLimits } from '../src/rateLimit.js'
import { sendEnquiryEmail } from '../src/sendEmail.js'

vi.mock('../src/sendEmail.js', () => ({
  sendEnquiryEmail: vi.fn().mockResolvedValue({ delivered: false }),
}))

const validEnquiry = {
  name: 'Maria Lopez',
  email: 'maria@buyfood.com',
  company: 'BuyFood Inc',
  country: 'Spain',
  category: 'Bowls',
  quantity: '25000',
  message: '',
  website: '',
}

const validSampleRequest = {
  name: 'Maria Lopez',
  email: 'maria@buyfood.com',
  company: '',
  country: 'Spain',
  address: 'Calle Verde 5, Madrid',
  interests: ['Bowls', 'Eco Bags'],
  message: '',
  website: '',
}

function post(path, body, ip = '203.0.113.10') {
  return handle(
    new Request(`http://localhost${path}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-forwarded-for': ip,
      },
      body: JSON.stringify(body),
    })
  )
}

beforeEach(() => {
  resetRateLimits()
  vi.clearAllMocks()
})

describe('handle', () => {
  test('returns 405 for non-POST methods', async () => {
    const response = await handle(
      new Request('http://localhost/api/enquiry', { method: 'GET' })
    )
    expect(response.status).toBe(405)
  })

  test('returns 404 for unknown paths', async () => {
    const response = await post('/api/nothing', validEnquiry)
    expect(response.status).toBe(404)
  })

  test('returns 400 with field errors for an invalid enquiry', async () => {
    const response = await post('/api/enquiry', {
      name: '',
      email: 'not-an-email',
      country: '',
      category: '',
      quantity: '',
    })
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.errors.name).toBe('Your name is required')
    expect(data.errors.email).toBe('A valid email is required')
  })

  test('silently accepts a honeypot submission without emailing', async () => {
    const response = await post('/api/enquiry', {
      ...validEnquiry,
      website: 'http://spam.example',
    })
    expect(response.status).toBe(202)
    expect(sendEnquiryEmail).not.toHaveBeenCalled()
  })

  test('delivers a valid enquiry and returns 202', async () => {
    const response = await post('/api/enquiry', validEnquiry)
    expect(response.status).toBe(202)
    expect(sendEnquiryEmail).toHaveBeenCalledWith('enquiry', validEnquiry)
  })

  test('delivers a valid sample request and returns 202', async () => {
    const response = await post('/api/sample-request', validSampleRequest)
    expect(response.status).toBe(202)
    expect(sendEnquiryEmail).toHaveBeenCalledWith(
      'sample-request',
      validSampleRequest
    )
  })

  test('returns 502 when email delivery fails', async () => {
    sendEnquiryEmail.mockRejectedValueOnce(new Error('SMTP down'))
    const response = await post('/api/enquiry', validEnquiry)
    expect(response.status).toBe(502)
  })

  test('rate limits after 5 submissions from the same IP', async () => {
    for (let i = 0; i < 5; i++) {
      const response = await post('/api/enquiry', validEnquiry)
      expect(response.status).toBe(202)
    }
    const sixth = await post('/api/enquiry', validEnquiry)
    expect(sixth.status).toBe(429)
  })

  test('rate limit is per endpoint', async () => {
    for (let i = 0; i < 5; i++) {
      await post('/api/enquiry', validEnquiry)
    }
    const other = await post('/api/sample-request', validSampleRequest)
    expect(other.status).toBe(202)
  })
})
