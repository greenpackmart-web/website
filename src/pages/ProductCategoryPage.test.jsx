import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ProductCategoryPage from './ProductCategoryPage'

function renderAt(url) {
  return render(
    <MemoryRouter initialEntries={[url]}>
      <Routes>
        <Route path="/products/:slug" element={<ProductCategoryPage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('ProductCategoryPage', () => {
  test('renders the correct category from the URL slug', () => {
    renderAt('/products/round-plates')
    expect(
      screen.getByRole('heading', { name: 'Round Plates' })
    ).toBeInTheDocument()
    expect(screen.getByText('7 inch')).toBeInTheDocument()
    expect(screen.getByText('50 pcs/pack')).toBeInTheDocument()
  })

  test('pre-fills the enquiry email with the category name', () => {
    renderAt('/products/bags')
    const mailto = screen.getByRole('link', {
      name: /email us about eco bags/i,
    })
    expect(mailto).toHaveAttribute(
      'href',
      expect.stringContaining('Bulk%20enquiry%3A%20Eco%20Bags')
    )
  })

  test('shows the 404 page for an unknown slug', () => {
    renderAt('/products/not-a-real-product')
    expect(screen.getByText('Page not found')).toBeInTheDocument()
  })
})
