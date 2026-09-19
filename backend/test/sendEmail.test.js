import { describe, test, expect } from 'vitest'
import { buildEmail } from '../src/sendEmail.js'

describe('buildEmail', () => {
  test('builds a quote enquiry email with reply-to', () => {
    const email = buildEmail('enquiry', {
      name: 'Maria Lopez',
      email: 'maria@buyfood.com',
      company: 'BuyFood Inc',
      country: 'Spain',
      category: 'Bowls',
      quantity: '25000',
      message: 'Need by March',
    })

    expect(email.subject).toBe('Quote request: Bowls — Maria Lopez (Spain)')
    expect(email.replyTo).toBe('maria@buyfood.com')
    expect(email.text).toContain('Company: BuyFood Inc')
    expect(email.text).toContain('Estimated quantity: 25000')
    expect(email.text).toContain('Message: Need by March')
  })

  test('builds a sample request email listing interests', () => {
    const email = buildEmail('sample-request', {
      name: 'Maria Lopez',
      email: 'maria@buyfood.com',
      company: '',
      country: 'Spain',
      address: 'Calle Verde 5, Madrid',
      interests: ['Bowls', 'Eco Bags'],
      message: '',
    })

    expect(email.subject).toBe('Sample request — Maria Lopez (Spain)')
    expect(email.text).toContain('Categories of interest: Bowls, Eco Bags')
    expect(email.text).not.toContain('Company')
  })
})
