import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
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

function stubClipboard() {
  if (!navigator.clipboard) {
    Object.defineProperty(navigator, 'clipboard', {
      value: {},
      configurable: true,
    })
  }
  return vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined)
}

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

  test('a valid submit opens the mail client with interests pre-filled', async () => {
    const user = userEvent.setup()
    renderPage()

    await fillValidForm(user)
    await user.click(
      screen.getByRole('button', { name: /request my samples/i })
    )

    expect(
      screen.getByText('Your email app should have opened')
    ).toBeInTheDocument()

    const reopen = screen.getByRole('link', { name: /open the email again/i })
    expect(reopen).toHaveAttribute(
      'href',
      expect.stringContaining('Bowls%2C%20Eco%20Bags')
    )
  })

  test('the copy button copies the composed message', async () => {
    const user = userEvent.setup()
    const writeText = stubClipboard()
    renderPage()

    await fillValidForm(user)
    await user.click(
      screen.getByRole('button', { name: /request my samples/i })
    )
    await user.click(screen.getByRole('button', { name: /copy message text/i }))

    expect(writeText).toHaveBeenCalledWith(
      expect.stringContaining('Categories of interest: Bowls, Eco Bags')
    )
  })
})
