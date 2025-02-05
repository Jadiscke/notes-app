import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DeleteNoteButton from '../index'
import userEvent from '@testing-library/user-event'

// Mock the delete note action
vi.mock('@/app/actions/delete_notes', () => ({
  deleteNoteFromDb: vi.fn()
}))

// First declare the mock functions that will be used
const mockAction = vi.hoisted(() => vi.fn())
const mockSetShowConfirm = vi.hoisted(() => vi.fn())
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

describe('DeleteNoteButton', () => {
  const mockNoteId = '123'

  beforeEach(() => {
    vi.clearAllMocks()
    // Set default mock implementations
    mockUseActionState.mockReturnValue([{}, mockAction, false])
    mockUseState.mockReturnValue([false, mockSetShowConfirm])
  })

  it('renders delete button with trash icon', () => {
    render(<DeleteNoteButton note_id={mockNoteId} />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('shows confirmation modal when delete button is clicked', async () => {
    const user = userEvent.setup()
    mockUseState.mockReturnValue([true, mockSetShowConfirm])
    
    render(<DeleteNoteButton note_id={mockNoteId} />)
    const deleteButton = screen.getByRole('button', { name: 'Delete note' })
    await user.click(deleteButton)
    
    const modal = await screen.findByText('Confirm Delete')
    expect(modal).toBeInTheDocument()
    expect(screen.getByText('Are you sure you want to delete this note?')).toBeInTheDocument()
  })

  it('hides modal when cancel button is clicked', async () => {
    const user = userEvent.setup()
    mockUseState.mockReturnValue([true, mockSetShowConfirm])
    
    render(<DeleteNoteButton note_id={mockNoteId} />)
    const cancelButton = screen.getByText('Cancel')
    
    await user.click(cancelButton)
    expect(mockSetShowConfirm).toHaveBeenCalledWith(false)
  })

  it('disables delete button when action is pending', () => {
    mockUseActionState.mockReturnValue([{}, mockAction, true])
    render(<DeleteNoteButton note_id={mockNoteId} />)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('submits form when delete is confirmed', async () => {
    const user = userEvent.setup()
    mockUseState.mockReturnValue([true, mockSetShowConfirm])
    mockUseActionState.mockReturnValue([{}, mockAction, false])
    
    render(<DeleteNoteButton note_id={mockNoteId} />)
    const deleteButton = screen.getByText('Delete')
    const form = screen.getByTestId('delete-form')
    expect(form).toBeInTheDocument()
    
    await user.click(deleteButton)
    expect(mockAction).toHaveBeenCalled();
  })
})