import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import BackButton from '../index'

// Mock next/navigation
const mockBack = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack
  })
}))

describe('BackButton', () => {
  it('renders the back button with icon', () => {
    render(<BackButton />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-black', 'text-white', 'p-2', 'rounded')
  })

  it('calls router.back when clicked', () => {
    render(<BackButton />)
    const button = screen.getByRole('button')
    
    fireEvent.click(button)
    expect(mockBack).toHaveBeenCalledTimes(1)
  })

  it('renders with correct icon size', () => {
    render(<BackButton />)
    const svg = screen.getByTestId('arrow-left-icon')
    expect(svg).toHaveAttribute('width', '20')
    expect(svg).toHaveAttribute('height', '20')
  })
})