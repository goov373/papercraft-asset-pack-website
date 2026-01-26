import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './card'

describe('Card', () => {
  it('renders a card', () => {
    render(<Card data-testid="card">Card content</Card>)
    expect(screen.getByTestId('card')).toBeInTheDocument()
  })

  it('applies default variant styles', () => {
    render(<Card data-testid="card">Content</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('bg-card')
  })

  it('applies custom className', () => {
    render(<Card className="custom-class" data-testid="card">Content</Card>)
    expect(screen.getByTestId('card')).toHaveClass('custom-class')
  })

  it('passes through additional props', () => {
    render(<Card data-testid="card" aria-label="Test card">Content</Card>)
    expect(screen.getByTestId('card')).toHaveAttribute('aria-label', 'Test card')
  })
})

describe('CardHeader', () => {
  it('renders card header', () => {
    render(
      <Card>
        <CardHeader data-testid="header">Header</CardHeader>
      </Card>
    )
    expect(screen.getByTestId('header')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Card>
        <CardHeader className="custom-header" data-testid="header">Header</CardHeader>
      </Card>
    )
    expect(screen.getByTestId('header')).toHaveClass('custom-header')
  })
})

describe('CardTitle', () => {
  it('renders card title', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>My Title</CardTitle>
        </CardHeader>
      </Card>
    )
    expect(screen.getByText('My Title')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle className="custom-title">Title</CardTitle>
        </CardHeader>
      </Card>
    )
    expect(screen.getByText('Title')).toHaveClass('custom-title')
  })
})

describe('CardDescription', () => {
  it('renders card description', () => {
    render(
      <Card>
        <CardHeader>
          <CardDescription>My description</CardDescription>
        </CardHeader>
      </Card>
    )
    expect(screen.getByText('My description')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Card>
        <CardHeader>
          <CardDescription className="custom-desc">Description</CardDescription>
        </CardHeader>
      </Card>
    )
    expect(screen.getByText('Description')).toHaveClass('custom-desc')
  })
})

describe('CardContent', () => {
  it('renders card content', () => {
    render(
      <Card>
        <CardContent data-testid="content">Content here</CardContent>
      </Card>
    )
    expect(screen.getByTestId('content')).toBeInTheDocument()
    expect(screen.getByText('Content here')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Card>
        <CardContent className="custom-content" data-testid="content">Content</CardContent>
      </Card>
    )
    expect(screen.getByTestId('content')).toHaveClass('custom-content')
  })
})

describe('CardFooter', () => {
  it('renders card footer', () => {
    render(
      <Card>
        <CardFooter data-testid="footer">Footer</CardFooter>
      </Card>
    )
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Card>
        <CardFooter className="custom-footer" data-testid="footer">Footer</CardFooter>
      </Card>
    )
    expect(screen.getByTestId('footer')).toHaveClass('custom-footer')
  })
})

describe('Card composition', () => {
  it('renders complete card structure', () => {
    render(
      <Card data-testid="full-card">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description text</CardDescription>
        </CardHeader>
        <CardContent>Main content goes here</CardContent>
        <CardFooter>Footer actions</CardFooter>
      </Card>
    )

    expect(screen.getByTestId('full-card')).toBeInTheDocument()
    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card description text')).toBeInTheDocument()
    expect(screen.getByText('Main content goes here')).toBeInTheDocument()
    expect(screen.getByText('Footer actions')).toBeInTheDocument()
  })
})
