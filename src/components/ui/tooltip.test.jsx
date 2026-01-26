import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './tooltip'

describe('Tooltip', () => {
  it('renders tooltip trigger', () => {
    render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>
    )
    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  it('shows tooltip on hover', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>
    )

    await user.hover(screen.getByText('Hover me'))

    await waitFor(() => {
      // Radix renders tooltip content - check for the text appearing
      expect(screen.getAllByText('Tooltip text').length).toBeGreaterThan(0)
    })
  })

  it('updates trigger data-state on hover', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip>
        <TooltipTrigger data-testid="trigger">Hover me</TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>
    )

    const trigger = screen.getByTestId('trigger')
    // Initial state should be closed
    expect(trigger).toHaveAttribute('data-state', 'closed')

    await user.hover(trigger)
    await waitFor(() => {
      // After hover, state changes to delayed-open or instant-open
      expect(trigger.getAttribute('data-state')).not.toBe('closed')
    })
  })

  it('shows tooltip on focus', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip>
        <TooltipTrigger asChild>
          <button>Focus me</button>
        </TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>
    )

    await user.tab()

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument()
    })
  })

  it('applies custom className to TooltipContent', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent className="custom-tooltip">Tooltip text</TooltipContent>
      </Tooltip>
    )

    await user.hover(screen.getByText('Hover me'))

    await waitFor(() => {
      // Check for the content element with data-slot and custom class
      const content = document.querySelector('[data-slot="tooltip-content"]')
      expect(content).toHaveClass('custom-tooltip')
    })
  })

  it('renders with custom sideOffset', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent sideOffset={10}>Tooltip text</TooltipContent>
      </Tooltip>
    )

    await user.hover(screen.getByText('Hover me'))

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument()
    })
  })

  it('renders tooltip provider with custom delay', async () => {
    const user = userEvent.setup()
    render(
      <TooltipProvider delayDuration={500}>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    await user.hover(screen.getByText('Hover me'))
    // Tooltip should appear after delay
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument()
    }, { timeout: 1000 })
  })

  it('passes through additional props to trigger', () => {
    render(
      <Tooltip>
        <TooltipTrigger data-testid="trigger" aria-label="Help">?</TooltipTrigger>
        <TooltipContent>Help information</TooltipContent>
      </Tooltip>
    )
    expect(screen.getByTestId('trigger')).toHaveAttribute('aria-label', 'Help')
  })
})
