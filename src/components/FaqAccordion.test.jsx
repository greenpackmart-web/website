import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FaqAccordion from './FaqAccordion'

describe('FaqAccordion', () => {
  test('renders every question with answers hidden', () => {
    render(<FaqAccordion />)
    expect(
      screen.getByText('What is your minimum order quantity (MOQ)?')
    ).toBeInTheDocument()
    expect(
      screen.queryByText(/mixed-category orders are welcome/)
    ).not.toBeInTheDocument()
  })

  test('reveals the answer when a question is clicked', async () => {
    const user = userEvent.setup()
    render(<FaqAccordion />)

    const firstQuestion = screen.getByText(
      'What is your minimum order quantity (MOQ)?'
    )
    await user.click(firstQuestion)

    expect(
      screen.getByText(/mixed-category orders are welcome/)
    ).toBeInTheDocument()
    expect(firstQuestion.closest('button')).toHaveAttribute(
      'aria-expanded',
      'true'
    )
  })

  test('hides the answer when clicked again', async () => {
    const user = userEvent.setup()
    render(<FaqAccordion />)

    const firstQuestion = screen.getByText(
      'What is your minimum order quantity (MOQ)?'
    )
    await user.click(firstQuestion)
    await user.click(firstQuestion)

    expect(
      screen.queryByText(/mixed-category orders are welcome/)
    ).not.toBeInTheDocument()
  })
})
