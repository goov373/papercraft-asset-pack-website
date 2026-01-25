import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from './button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('applies variant classes', () => {
    render(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'outline')
  })

  it('applies size classes', () => {
    render(<Button size="lg">Large</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('data-size', 'lg')
  })
})
