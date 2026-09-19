import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import RequestSamplesPage from './RequestSamplesPage'

function renderPage() {
  return render(
    <MemoryRouter>
      <RequestSamplesPage />
    </MemoryRouter>
  )
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

  test('toggles category chips and submits successfully', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.type(screen.getByLabelText(/your name/i), 'Maria Lopez')
    await user.type(screen.getByLabelText(/^email/i), 'maria@buyfood.com')
    await user.type(screen.getByLabelText(/company/i), 'BuyFood Inc')
    await user.type(screen.getByLabelText(/^country/i), 'Spain')
    await user.type(screen.getByLabelText(/shipping address/i), 'Calle Verde 5, Madrid')
    await user.click(screen.getByText('Bowls'))
    await user.click(screen.getByText('Eco Bags'))

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
})
