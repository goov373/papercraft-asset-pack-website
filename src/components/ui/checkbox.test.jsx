import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Checkbox } from './checkbox'

describe('Checkbox', () => {
  it('renders a checkbox', () => {
    render(<Checkbox aria-label="Test checkbox" />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Checkbox ref={ref} aria-label="Test checkbox" />)
    expect(ref.current).not.toBeNull()
  })

  it('can be checked and unchecked', async () => {
    const user = userEvent.setup()
    render(<Checkbox aria-label="Toggle checkbox" />)

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)
    expect(checkbox).toBeChecked()

    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it('handles defaultChecked state', () => {
    render(<Checkbox defaultChecked aria-label="Checked checkbox" />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('handles controlled checked state', () => {
    const { rerender } = render(<Checkbox checked={false} aria-label="Controlled checkbox" />)
    expect(screen.getByRole('checkbox')).not.toBeChecked()

    rerender(<Checkbox checked={true} aria-label="Controlled checkbox" />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('can be disabled', () => {
    render(<Checkbox disabled aria-label="Disabled checkbox" />)
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })

  it('applies aria-label', () => {
    render(<Checkbox aria-label="My checkbox label" />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-label', 'My checkbox label')
  })

  it('calls onCheckedChange when toggled', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(<Checkbox onCheckedChange={handleChange} aria-label="Callback checkbox" />)
    await user.click(screen.getByRole('checkbox'))

    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('applies custom className', () => {
    render(<Checkbox className="custom-class" aria-label="Custom checkbox" />)
    expect(screen.getByRole('checkbox')).toHaveClass('custom-class')
  })
})
