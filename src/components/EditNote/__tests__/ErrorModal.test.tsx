import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import ErrorModal from '../ErrorModal'

describe('ErrorModal', () => {
  const mockOnClose = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders error modal when error is provided', () => {
    render(<ErrorModal error="Test error message" onClose={mockOnClose} />)
    
    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.getByText('Test error message')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
  })

  it('does not render when error is empty', () => {
    render(<ErrorModal error="" onClose={mockOnClose} />)
    
    expect(screen.queryByText('Error')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    render(<ErrorModal error="Test error" onClose={mockOnClose} />)
    
    const closeButton = screen.getByRole('button', { name: 'Close' })
    await user.click(closeButton)
    
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('renders with correct styling', () => {
    render(<ErrorModal error="Test error" onClose={mockOnClose} />)
    
    const modal = screen.getByRole('dialog', { hidden: true })
    const button = screen.getByRole('button', { name: 'Close' })
    
    expect(modal).toHaveClass('fixed', 'inset-0', 'bg-black', 'bg-opacity-50')
    expect(button).toHaveClass('bg-red-600', 'text-white')
  })
})