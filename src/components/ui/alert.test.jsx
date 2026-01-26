import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Alert, AlertTitle, AlertDescription } from './alert'

describe('Alert', () => {
  it('renders an alert with role="alert"', () => {
    render(<Alert>Alert content</Alert>)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders with default variant', () => {
    render(<Alert data-testid="alert">Default alert</Alert>)
    const alert = screen.getByTestId('alert')
    expect(alert).toHaveClass('bg-card')
  })

  it('renders with destructive variant', () => {
    render(<Alert variant="destructive" data-testid="alert">Error alert</Alert>)
    const alert = screen.getByTestId('alert')
    expect(alert).toHaveClass('bg-destructive/10')
  })

  it('renders with info variant', () => {
    render(<Alert variant="info" data-testid="alert">Info alert</Alert>)
    const alert = screen.getByTestId('alert')
    expect(alert).toHaveClass('bg-blue-50')
  })

  it('renders with success variant', () => {
    render(<Alert variant="success" data-testid="alert">Success alert</Alert>)
    const alert = screen.getByTestId('alert')
    expect(alert).toHaveClass('bg-green-50')
  })

  it('renders with warning variant', () => {
    render(<Alert variant="warning" data-testid="alert">Warning alert</Alert>)
    const alert = screen.getByTestId('alert')
    expect(alert).toHaveClass('bg-amber-50')
  })

  it('renders with sticky variant', () => {
    render(<Alert variant="sticky" data-testid="alert">Sticky note</Alert>)
    const alert = screen.getByTestId('alert')
    expect(alert).toHaveClass('bg-amber-100')
  })

  it('renders with kraft variant', () => {
    render(<Alert variant="kraft" data-testid="alert">Kraft paper</Alert>)
    const alert = screen.getByTestId('alert')
    expect(alert).toHaveClass('bg-amber-100/80')
  })

  it('applies custom className', () => {
    render(<Alert className="custom-class" data-testid="alert">Custom alert</Alert>)
    expect(screen.getByTestId('alert')).toHaveClass('custom-class')
  })
})

describe('AlertTitle', () => {
  it('renders title text', () => {
    render(
      <Alert>
        <AlertTitle>Alert Title</AlertTitle>
      </Alert>
    )
    expect(screen.getByText('Alert Title')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Alert>
        <AlertTitle className="custom-title">Title</AlertTitle>
      </Alert>
    )
    expect(screen.getByText('Title')).toHaveClass('custom-title')
  })
})

describe('AlertDescription', () => {
  it('renders description text', () => {
    render(
      <Alert>
        <AlertDescription>Alert description here</AlertDescription>
      </Alert>
    )
    expect(screen.getByText('Alert description here')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Alert>
        <AlertDescription className="custom-desc">Description</AlertDescription>
      </Alert>
    )
    expect(screen.getByText('Description')).toHaveClass('custom-desc')
  })
})

describe('Alert composition', () => {
  it('renders full alert with title and description', () => {
    render(
      <Alert>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong.</AlertDescription>
      </Alert>
    )

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument()
  })
})
