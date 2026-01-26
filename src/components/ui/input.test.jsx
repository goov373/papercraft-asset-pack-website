import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Input } from './input'

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('handles different input types', () => {
    render(<Input type="email" data-testid="email-input" />)
    expect(screen.getByTestId('email-input')).toHaveAttribute('type', 'email')
  })

  it('handles user input', async () => {
    const user = userEvent.setup()
    render(<Input data-testid="test-input" />)

    const input = screen.getByTestId('test-input')
    await user.type(input, 'hello world')

    expect(input).toHaveValue('hello world')
  })

  it('applies aria-invalid attribute', () => {
    render(<Input aria-invalid="true" data-testid="invalid-input" />)
    expect(screen.getByTestId('invalid-input')).toHaveAttribute('aria-invalid', 'true')
  })

  it('applies aria-describedby attribute', () => {
    render(<Input aria-describedby="help-text" data-testid="described-input" />)
    expect(screen.getByTestId('described-input')).toHaveAttribute('aria-describedby', 'help-text')
  })

  it('can be disabled', () => {
    render(<Input disabled data-testid="disabled-input" />)
    expect(screen.getByTestId('disabled-input')).toBeDisabled()
  })

  it('handles onChange callback', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(<Input onChange={handleChange} data-testid="change-input" />)
    await user.type(screen.getByTestId('change-input'), 'a')

    expect(handleChange).toHaveBeenCalled()
  })

  it('applies custom className', () => {
    render(<Input className="custom-class" data-testid="custom-input" />)
    expect(screen.getByTestId('custom-input')).toHaveClass('custom-class')
  })
})
