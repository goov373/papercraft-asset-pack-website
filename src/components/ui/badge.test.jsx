import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Badge } from './badge'

describe('Badge', () => {
  it('renders a badge with text', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('renders as span by default', () => {
    render(<Badge data-testid="badge">Label</Badge>)
    expect(screen.getByTestId('badge').tagName).toBe('SPAN')
  })

  it('applies default variant', () => {
    render(<Badge data-testid="badge">Default</Badge>)
    expect(screen.getByTestId('badge')).toHaveAttribute('data-variant', 'default')
    expect(screen.getByTestId('badge')).toHaveClass('bg-primary')
  })

  it('applies secondary variant', () => {
    render(<Badge variant="secondary" data-testid="badge">Secondary</Badge>)
    expect(screen.getByTestId('badge')).toHaveAttribute('data-variant', 'secondary')
    expect(screen.getByTestId('badge')).toHaveClass('bg-secondary')
  })

  it('applies destructive variant', () => {
    render(<Badge variant="destructive" data-testid="badge">Error</Badge>)
    expect(screen.getByTestId('badge')).toHaveAttribute('data-variant', 'destructive')
    expect(screen.getByTestId('badge')).toHaveClass('bg-destructive')
  })

  it('applies outline variant', () => {
    render(<Badge variant="outline" data-testid="badge">Outline</Badge>)
    expect(screen.getByTestId('badge')).toHaveAttribute('data-variant', 'outline')
    expect(screen.getByTestId('badge')).toHaveClass('border-border')
  })

  it('applies ghost variant', () => {
    render(<Badge variant="ghost" data-testid="badge">Ghost</Badge>)
    expect(screen.getByTestId('badge')).toHaveAttribute('data-variant', 'ghost')
  })

  it('applies sticky variant', () => {
    render(<Badge variant="sticky" data-testid="badge">Sticky</Badge>)
    expect(screen.getByTestId('badge')).toHaveAttribute('data-variant', 'sticky')
    expect(screen.getByTestId('badge')).toHaveClass('bg-amber-200')
  })

  it('applies custom className', () => {
    render(<Badge className="custom-class" data-testid="badge">Custom</Badge>)
    expect(screen.getByTestId('badge')).toHaveClass('custom-class')
  })

  it('renders as child element when asChild is true', () => {
    render(
      <Badge asChild data-testid="badge">
        <a href="/test">Link Badge</a>
      </Badge>
    )
    const badge = screen.getByTestId('badge')
    expect(badge.tagName).toBe('A')
    expect(badge).toHaveAttribute('href', '/test')
  })

  it('passes through additional props', () => {
    render(<Badge data-testid="badge" aria-label="Status badge">Status</Badge>)
    expect(screen.getByTestId('badge')).toHaveAttribute('aria-label', 'Status badge')
  })
})
