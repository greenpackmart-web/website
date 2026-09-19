import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'

function renderNavbar() {
  return render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  )
}

describe('Navbar', () => {
  test('shows the brand logo and main links', () => {
    renderNavbar()
    expect(
      screen.getByRole('img', { name: /greenpackmart logo/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Products' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Export' })).toBeInTheDocument()
  })

  test('starts with the mobile menu closed', () => {
    renderNavbar()
    const toggle = screen.getByRole('button', { name: /toggle menu/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  test('opens the mobile menu on hamburger click and closes on link click', async () => {
    renderNavbar()
    const user = userEvent.setup()
    const toggle = screen.getByRole('button', { name: /toggle menu/i })

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    const aboutLinks = screen.getAllByRole('link', { name: 'About' })
    await user.click(aboutLinks[aboutLinks.length - 1])
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
})
