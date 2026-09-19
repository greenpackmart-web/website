import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi, beforeEach, afterEach } from 'vitest'
import RequestSamplesPage from './RequestSamplesPage'

function renderPage() {
  return render(
    <MemoryRouter>
      <RequestSamplesPage />
    </MemoryRouter>
  )
}

async function fillValidForm(user) {
  await user.type(screen.getByLabelText(/your name/i), 'Maria Lopez')
  await user.type(screen.getByLabelText(/^email/i), 'maria@buyfood.com')
  await user.type(screen.getByLabelText(/company/i), 'BuyFood Inc')
  await user.type(screen.getByLabelText(/^country/i), 'Spain')
  await user.type(
    screen.getByLabelText(/shipping address/i),
    'Calle Verde 5, Madrid'
  )
  await user.click(screen.getByText('Bowls'))
  await user.click(screen.getByText('Eco Bags'))
}

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: true })))
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('RequestSamplesPage', () => {
  test('shows validation errors when submitted empty', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(
      screen.getByRole('button', { name: /request my samples/i })
    )

    expect(screen.getByText('Your name is required')).toBeInTheDocument()
    expect(screen.getByText('Email is required')).toBeInTheDocument()
    expect(screen.getByText('Country is required')).toBeInTheDocument()
    expect(
      screen.getByText('Shipping address is required')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Select at least one category')
    ).toBeInTheDocument()
  })

  test('sends the request to the API and shows the success screen', async () => {
    const user = userEvent.setup()
    renderPage()

    await fillValidForm(user)
    await user.click(
      screen.getByRole('button', { name: /request my samples/i })
    )

    expect(
      screen.getByText('Thank you — your sample request is with us')
    ).toBeInTheDocument()
    expect(fetch).toHaveBeenCalledWith(
      '/api/sample-request',
      expect.objectContaining({ method: 'POST' })
    )
  })

  test('falls back to a pre-filled email when the API fails', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('network'))))
    const user = userEvent.setup()
    renderPage()

    await fillValidForm(user)
    await user.click(
      screen.getByRole('button', { name: /request my samples/i })
    )

    expect(
      screen.getByText("We couldn't send it automatically")
    ).toBeInTheDocument()
    const reopen = screen.getByRole('link', {
      name: /open the pre-filled email/i,
    })
    expect(reopen).toHaveAttribute(
      'href',
      expect.stringContaining('Bowls%2C%20Eco%20Bags')
    )
  })
})
