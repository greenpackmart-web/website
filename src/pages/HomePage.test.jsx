import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'

function renderHomePage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  )
}

describe('HomePage', () => {
  test('shows the hero pitch with both CTAs', () => {
    renderHomePage()
    expect(
      screen.getByRole('heading', {
        name: /eco-friendly tableware the world can compost/i,
      })
    ).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'Get a Quote' })).toHaveLength(
      2
    )
    expect(
      screen.getByRole('link', { name: 'Browse Products' })
    ).toBeInTheDocument()
  })

  test('shows all four stats', () => {
    renderHomePage()
    expect(screen.getByText('12+')).toBeInTheDocument()
    expect(screen.getByText('40+')).toBeInTheDocument()
    expect(screen.getByText('90')).toBeInTheDocument()
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  test('lists all product categories plus the full catalogue card', () => {
    renderHomePage()
    expect(screen.getByText('Round Plates')).toBeInTheDocument()
    expect(screen.getByText('Eco Bags')).toBeInTheDocument()
    expect(screen.getByText('Full Catalogue')).toBeInTheDocument()
  })
})
