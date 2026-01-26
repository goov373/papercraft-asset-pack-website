import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Slider } from './slider'

describe('Slider', () => {
  it('renders a slider', () => {
    render(<Slider />)
    expect(screen.getByRole('slider')).toBeInTheDocument()
  })

  it('renders with default value', () => {
    render(<Slider defaultValue={[50]} />)
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '50')
  })

  it('renders with controlled value', () => {
    render(<Slider value={[75]} />)
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '75')
  })

  it('renders with custom min and max', () => {
    render(<Slider min={0} max={200} defaultValue={[100]} />)
    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('aria-valuemin', '0')
    expect(slider).toHaveAttribute('aria-valuemax', '200')
    expect(slider).toHaveAttribute('aria-valuenow', '100')
  })

  it('supports keyboard navigation - increase with ArrowRight', async () => {
    const user = userEvent.setup()
    render(<Slider defaultValue={[50]} />)

    const slider = screen.getByRole('slider')
    slider.focus()
    await user.keyboard('{ArrowRight}')

    expect(slider).toHaveAttribute('aria-valuenow', '51')
  })

  it('supports keyboard navigation - decrease with ArrowLeft', async () => {
    const user = userEvent.setup()
    render(<Slider defaultValue={[50]} />)

    const slider = screen.getByRole('slider')
    slider.focus()
    await user.keyboard('{ArrowLeft}')

    expect(slider).toHaveAttribute('aria-valuenow', '49')
  })

  it('supports step attribute', async () => {
    const user = userEvent.setup()
    render(<Slider defaultValue={[50]} step={10} />)

    const slider = screen.getByRole('slider')
    slider.focus()
    await user.keyboard('{ArrowRight}')

    expect(slider).toHaveAttribute('aria-valuenow', '60')
  })

  it('respects min boundary', async () => {
    const user = userEvent.setup()
    render(<Slider defaultValue={[0]} min={0} />)

    const slider = screen.getByRole('slider')
    slider.focus()
    await user.keyboard('{ArrowLeft}')

    expect(slider).toHaveAttribute('aria-valuenow', '0')
  })

  it('respects max boundary', async () => {
    const user = userEvent.setup()
    render(<Slider defaultValue={[100]} max={100} />)

    const slider = screen.getByRole('slider')
    slider.focus()
    await user.keyboard('{ArrowRight}')

    expect(slider).toHaveAttribute('aria-valuenow', '100')
  })

  it('applies custom className', () => {
    render(<Slider className="custom-slider" data-testid="slider" />)
    expect(screen.getByTestId('slider')).toHaveClass('custom-slider')
  })

  it('renders disabled state', () => {
    render(<Slider disabled data-testid="slider" />)
    expect(screen.getByTestId('slider')).toHaveAttribute('data-disabled', '')
  })

  it('renders range slider with two thumbs', () => {
    render(<Slider defaultValue={[25, 75]} />)
    const sliders = screen.getAllByRole('slider')
    expect(sliders).toHaveLength(2)
  })

  it('handles Home key to jump to min', async () => {
    const user = userEvent.setup()
    render(<Slider defaultValue={[50]} min={0} />)

    const slider = screen.getByRole('slider')
    slider.focus()
    await user.keyboard('{Home}')

    expect(slider).toHaveAttribute('aria-valuenow', '0')
  })

  it('handles End key to jump to max', async () => {
    const user = userEvent.setup()
    render(<Slider defaultValue={[50]} max={100} />)

    const slider = screen.getByRole('slider')
    slider.focus()
    await user.keyboard('{End}')

    expect(slider).toHaveAttribute('aria-valuenow', '100')
  })

  it('renders vertical orientation', () => {
    render(<Slider orientation="vertical" data-testid="slider" />)
    expect(screen.getByTestId('slider')).toHaveAttribute('data-orientation', 'vertical')
  })
})
