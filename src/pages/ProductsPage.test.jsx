import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProductsPage from './ProductsPage'

describe('ProductsPage', () => {
  test('renders a card for every product category', () => {
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Round Plates')).toBeInTheDocument()
    expect(screen.getByText('Bowls')).toBeInTheDocument()
    expect(screen.getByText('Trays & Meal Trays')).toBeInTheDocument()
    expect(screen.getByText('Cutlery')).toBeInTheDocument()
    expect(screen.getByText('Eco Bags')).toBeInTheDocument()
  })
})
