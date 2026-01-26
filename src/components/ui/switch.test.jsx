import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Switch } from './switch'

describe('Switch', () => {
  it('renders a switch', () => {
    render(<Switch aria-label="Test switch" />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Switch ref={ref} aria-label="Test switch" />)
    expect(ref.current).not.toBeNull()
  })

  it('can be toggled on and off', async () => {
    const user = userEvent.setup()
    render(<Switch aria-label="Toggle switch" />)

    const switchElement = screen.getByRole('switch')
    expect(switchElement).toHaveAttribute('data-state', 'unchecked')

    await user.click(switchElement)
    expect(switchElement).toHaveAttribute('data-state', 'checked')

    await user.click(switchElement)
    expect(switchElement).toHaveAttribute('data-state', 'unchecked')
  })

  it('handles defaultChecked state', () => {
    render(<Switch defaultChecked aria-label="Checked switch" />)
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'checked')
  })

  it('handles controlled checked state', () => {
    const { rerender } = render(<Switch checked={false} aria-label="Controlled switch" />)
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'unchecked')

    rerender(<Switch checked={true} aria-label="Controlled switch" />)
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'checked')
  })

  it('can be disabled', () => {
    render(<Switch disabled aria-label="Disabled switch" />)
    expect(screen.getByRole('switch')).toBeDisabled()
  })

  it('applies different sizes', () => {
    const { rerender } = render(<Switch size="sm" aria-label="Small switch" />)
    expect(screen.getByRole('switch')).toHaveAttribute('data-size', 'sm')

    rerender(<Switch size="lg" aria-label="Large switch" />)
    expect(screen.getByRole('switch')).toHaveAttribute('data-size', 'lg')
  })

  it('applies aria-label', () => {
    render(<Switch aria-label="My switch label" />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-label', 'My switch label')
  })

  it('calls onCheckedChange when toggled', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(<Switch onCheckedChange={handleChange} aria-label="Callback switch" />)
    await user.click(screen.getByRole('switch'))

    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('applies custom className', () => {
    render(<Switch className="custom-class" aria-label="Custom switch" />)
    expect(screen.getByRole('switch')).toHaveClass('custom-class')
  })
})
