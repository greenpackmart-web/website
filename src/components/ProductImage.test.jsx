import { render, screen } from '@testing-library/react'
import ProductImage from './ProductImage'

describe('ProductImage', () => {
  test('shows a styled placeholder when no image is set', () => {
    render(<ProductImage name="Round Plates" image={null} />)
    expect(screen.getByText('R')).toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  test('shows the photo when an image path is set', () => {
    render(<ProductImage name="Bowls" image="/images/products/bowls.jpg" />)
    const img = screen.getByRole('img', { name: 'Bowls' })
    expect(img).toHaveAttribute('src', '/images/products/bowls.jpg')
    expect(img).toHaveAttribute('alt', 'Bowls')
  })
})
