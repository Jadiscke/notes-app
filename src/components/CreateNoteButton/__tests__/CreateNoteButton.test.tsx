import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CreateNoteButton from '../index'
import userEvent from '@testing-library/user-event'

// Mock the create note action
vi.mock('@/app/actions/create_notes', () => ({
  createNoteToDb: vi.fn()
}))

// First declare the mock functions that will be used
const mockAction = vi.hoisted(() => vi.fn())
const mockSetShowError = vi.hoisted(() => vi.fn())
const mockUseActionState = vi.hoisted(() => vi.fn())
const mockUseState = vi.hoisted(() => vi.fn())

// Then use vi.mock() which gets hoisted to the top
vi.mock('react', async () => {
  const actual = await vi.importActual<typeof import('react')>('react')
  return {
    ...actual,
    useActionState: mockUseActionState,
    useState: mockUseState
  }
})

describe('CreateNoteButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Set default mock implementations
    mockUseActionState.mockReturnValue([{}, mockAction, false])
    mockUseState.mockReturnValue([false, mockSetShowError])
  })

  it('renders create button with plus icon', () => {
    render(<CreateNoteButton />)
    const button = screen.getByRole('button', { name: 'Create new note' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-black', 'text-white', 'p-2', 'rounded')
  })

  it('disables button when action is pending', () => {
    mockUseActionState.mockReturnValue([{}, mockAction, true])
    render(<CreateNoteButton />)
    const button = screen.getByRole('button', { name: 'Create new note' })
    expect(button).toBeDisabled()
  })

  it('shows error modal when creation fails', () => {
    mockUseActionState.mockReturnValue([{ success: false }, mockAction, false])
    render(<CreateNoteButton />)
    expect(screen.getByText('Error')).toBeInTheDocument()
  })

  it('closes error modal when clicking close button', async () => {
    const user = userEvent.setup()

    // First render with success: false to trigger the useEffect
    mockUseActionState.mockReturnValue([{ success: false }, mockAction, false])
    mockUseState.mockReturnValue([true, mockSetShowError])
    
    render(<CreateNoteButton />)
    
    // Get the button by its exact aria-label from the component
    const errorModal = screen.queryByLabelText('Error modal')
    expect(errorModal).toBeInTheDocument()
    const closeButton = screen.getByRole('button', { name: 'Close error button' })
    expect(closeButton).toBeInTheDocument()
    
    // Use userEvent for better interaction simulation
    await user.click(closeButton)
    
    expect(errorModal).not.toBeInTheDocument()
    
  })
})