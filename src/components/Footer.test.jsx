import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Footer from './Footer'

describe('Footer', () => {
  test('shows social media placeholders until profile links are available', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('img', { name: 'Instagram (coming soon)' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'Facebook (coming soon)' })
    ).toBeInTheDocument()
  })
})
