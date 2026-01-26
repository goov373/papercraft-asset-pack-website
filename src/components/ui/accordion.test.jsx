import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './accordion'

describe('Accordion', () => {
  it('renders accordion component', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    expect(screen.getByRole('button', { name: 'Section 1' })).toBeInTheDocument()
  })

  it('expands item on click', async () => {
    const user = userEvent.setup()
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    await user.click(screen.getByRole('button', { name: 'Section 1' }))
    expect(screen.getByText('Content 1')).toBeVisible()
  })

  it('collapses item on second click when collapsible', async () => {
    const user = userEvent.setup()
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    const trigger = screen.getByRole('button', { name: 'Section 1' })
    await user.click(trigger)
    await user.click(trigger)
    expect(trigger).toHaveAttribute('data-state', 'closed')
  })

  it('renders multiple accordion items', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    expect(screen.getByRole('button', { name: 'Section 1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Section 2' })).toBeInTheDocument()
  })

  it('supports multiple type for multiple open items', async () => {
    const user = userEvent.setup()
    render(
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    await user.click(screen.getByRole('button', { name: 'Section 1' }))
    await user.click(screen.getByRole('button', { name: 'Section 2' }))

    expect(screen.getByRole('button', { name: 'Section 1' })).toHaveAttribute('data-state', 'open')
    expect(screen.getByRole('button', { name: 'Section 2' })).toHaveAttribute('data-state', 'open')
  })

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup()
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    const trigger1 = screen.getByRole('button', { name: 'Section 1' })
    trigger1.focus()
    await user.keyboard('{ArrowDown}')

    expect(screen.getByRole('button', { name: 'Section 2' })).toHaveFocus()
  })

  it('expands with Enter key', async () => {
    const user = userEvent.setup()
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    const trigger = screen.getByRole('button', { name: 'Section 1' })
    trigger.focus()
    await user.keyboard('{Enter}')

    expect(trigger).toHaveAttribute('data-state', 'open')
  })

  it('applies custom className to AccordionItem', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="custom-item" data-testid="item">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    expect(screen.getByTestId('item')).toHaveClass('custom-item')
  })

  it('applies custom className to AccordionTrigger', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="custom-trigger">Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    expect(screen.getByRole('button', { name: 'Section 1' })).toHaveClass('custom-trigger')
  })

  it('applies custom className to AccordionContent', async () => {
    const user = userEvent.setup()
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent className="custom-content">Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    await user.click(screen.getByRole('button', { name: 'Section 1' }))
    // The custom class is applied to the inner div that wraps the content
    const contentText = screen.getByText('Content 1')
    // Check that custom-content class exists somewhere in the content hierarchy
    expect(contentText.closest('.custom-content')).toBeInTheDocument()
  })

  it('renders with defaultValue', () => {
    render(
      <Accordion type="single" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    expect(screen.getByRole('button', { name: 'Section 1' })).toHaveAttribute('data-state', 'open')
  })
})
