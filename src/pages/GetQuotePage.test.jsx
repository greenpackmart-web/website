import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import GetQuotePage from './GetQuotePage'

function renderPage() {
  return render(
    <MemoryRouter>
      <GetQuotePage />
    </MemoryRouter>
  )
}

async function fillValidForm(user) {
  await user.type(screen.getByLabelText(/your name/i), 'Maria Lopez')
  await user.type(screen.getByLabelText(/^email/i), 'maria@buyfood.com')
  await user.type(screen.getByLabelText(/company/i), 'BuyFood Inc')
  await user.type(screen.getByLabelText(/destination country/i), 'Spain')
  await user.selectOptions(screen.getByLabelText(/product category/i), 'Bowls')
  await user.type(screen.getByLabelText(/estimated quantity/i), '25000')
}

describe('GetQuotePage', () => {
  test('shows validation errors when submitted empty', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: /get my quote/i }))

    expect(screen.getByText('Your name is required')).toBeInTheDocument()
    expect(screen.getByText('Email is required')).toBeInTheDocument()
    expect(
      screen.getByText('Destination country is required')
    ).toBeInTheDocument()
    expect(screen.getByText('Select a product category')).toBeInTheDocument()
    expect(
      screen.getByText('Estimated quantity is required')
    ).toBeInTheDocument()
  })

  test('rejects an invalid email format', async () => {
    const user = userEvent.setup()
    renderPage()

    await fillValidForm(user)
    await user.clear(screen.getByLabelText(/^email/i))
    await user.type(screen.getByLabelText(/^email/i), 'not-an-email')

    await user.click(screen.getByRole('button', { name: /get my quote/i }))

    expect(screen.getByText('Enter a valid email address')).toBeInTheDocument()
  })

  test('a valid submit shows the success screen with a pre-filled email', async () => {
    const user = userEvent.setup()
    renderPage()

    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: /get my quote/i }))

    expect(
      screen.getByText('Your email app should have opened')
    ).toBeInTheDocument()

    const reopen = screen.getByRole('link', { name: /open the email again/i })
    expect(reopen).toHaveAttribute(
      'href',
      expect.stringContaining('maria%40buyfood.com')
    )
    expect(reopen).toHaveAttribute(
      'href',
      expect.stringContaining('Spain')
    )
    expect(reopen).toHaveAttribute(
      'href',
      expect.stringContaining('Quote%20request%3A%20Bowls')
    )
  })
})
