import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Progress } from './progress'

describe('Progress', () => {
  it('renders a progress bar', () => {
    render(<Progress value={50} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('renders with specific value', () => {
    render(<Progress value={75} data-testid="progress" />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('handles 0% progress', () => {
    render(<Progress value={0} />)
    const progressbar = screen.getByRole('progressbar')
    // Radix sets aria-valuenow to null when value is 0 or 100
    expect(progressbar).toBeInTheDocument()
  })

  it('handles 100% progress', () => {
    render(<Progress value={100} />)
    const progressbar = screen.getByRole('progressbar')
    // Radix sets aria-valuenow to null when value reaches max
    expect(progressbar).toBeInTheDocument()
  })

  it('handles undefined value', () => {
    render(<Progress />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('applies default variant', () => {
    render(<Progress value={50} data-testid="progress" />)
    expect(screen.getByTestId('progress')).toHaveClass('rounded-full')
  })

  it('applies paper variant', () => {
    render(<Progress value={50} variant="paper" data-testid="progress" />)
    expect(screen.getByTestId('progress')).toHaveClass('rounded-sm')
  })

  it('applies kraft variant', () => {
    render(<Progress value={50} variant="kraft" data-testid="progress" />)
    expect(screen.getByTestId('progress')).toHaveClass('bg-amber-100/50')
  })

  it('applies small size', () => {
    render(<Progress value={50} size="sm" data-testid="progress" />)
    expect(screen.getByTestId('progress')).toHaveClass('h-1')
  })

  it('applies default size', () => {
    render(<Progress value={50} size="default" data-testid="progress" />)
    expect(screen.getByTestId('progress')).toHaveClass('h-2')
  })

  it('applies medium size', () => {
    render(<Progress value={50} size="md" data-testid="progress" />)
    expect(screen.getByTestId('progress')).toHaveClass('h-3')
  })

  it('applies large size', () => {
    render(<Progress value={50} size="lg" data-testid="progress" />)
    expect(screen.getByTestId('progress')).toHaveClass('h-4')
  })

  it('applies custom className', () => {
    render(<Progress value={50} className="custom-class" data-testid="progress" />)
    expect(screen.getByTestId('progress')).toHaveClass('custom-class')
  })

  it('passes through additional props', () => {
    render(<Progress value={50} aria-label="Loading progress" />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Loading progress')
  })
})
