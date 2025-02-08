import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import EditNote from '../index'
import userEvent from '@testing-library/user-event'
import { saveNoteToDb } from '@/app/actions/save_note'

// Mock the save note action
vi.mock('@/app/actions/save_note', () => ({
  saveNoteToDb: vi.fn().mockImplementation(() => 
    new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, error: null }), 500)
    })
  )
}))

// Mock debounce to execute immediately
vi.mock('@/lib/utils', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  debounce: (fn: Function) => fn
}))

describe('EditNote save functionality', () => {
  const mockNoteId = '123'
  const mockContent = '# Test Content'
  const mockNewContent = '# Updated Content'

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows saving state and then saved state on successful save', async () => {
    vi.mocked(saveNoteToDb).mockImplementation(() => 
      new Promise((resolve) => {
        setTimeout(() => resolve({ success: true, error: null }), 200)
      })
    )
    
    render(<EditNote noteId={mockNoteId} content={mockContent} />)
    const editor = screen.getByRole('textbox')
    
    // Directly trigger change event with new value
    fireEvent.change(editor, { target: { value: mockNewContent } })

    // Wait for saving state
    await waitFor(() => {
      expect(screen.getByText(/saving/i)).toBeInTheDocument()
    }, { timeout: 1500})

    // Wait for saved state
    await waitFor(() => {
      expect(screen.getByText(/saved/i)).toBeInTheDocument()
    })

    expect(saveNoteToDb).toHaveBeenCalledWith(mockNoteId, mockNewContent)
  })

  it('shows error state when save fails with error message', async () => {
    vi.mocked(saveNoteToDb).mockResolvedValue({ 
      success: false, 
      error: 'Failed to save' 
    })
    
    render(<EditNote noteId={mockNoteId} content={mockContent} />)
    const editor = screen.getByRole('textbox')
    
    // Clear and set new content
    fireEvent.change(editor, { target: { value: mockNewContent } })

    await waitFor(() => {
      expect(screen.getByText(/error:/i)).toBeInTheDocument()
    })
    
    expect(saveNoteToDb).toHaveBeenCalledWith(mockNoteId, mockNewContent)

  })

  it('shows generic error message when save throws exception', async () => {
    vi.mocked(saveNoteToDb).mockRejectedValue(new Error('Network error'))
    
    render(<EditNote noteId={mockNoteId} content={mockContent} />)
    const editor = screen.getByRole('textbox')
    
    // Trigger change event directly
    fireEvent.change(editor, { target: { value: mockNewContent } })

    await waitFor(() => {
      expect(screen.getByText(/error: An unknown error occurred/i)).toBeInTheDocument()
    }, { timeout: 1000 })

    expect(saveNoteToDb).toHaveBeenCalledWith(mockNoteId, mockNewContent)
    
  })

  it('allows closing error modal', async () => {
    vi.mocked(saveNoteToDb).mockRejectedValue(new Error('Network error'))
    
    render(<EditNote noteId={mockNoteId} content={mockContent} />)
    const editor = screen.getByRole('textbox')
    
    await userEvent.type(editor, mockNewContent)

    // Wait for error modal to appear
    await waitFor(() => {
      expect(screen.getAllByText(/An unknown error occurred/i)).toHaveLength(2)
    })  

    // Close error modal
    const closeButton = screen.getByRole('button', { name: /close/i })
    await userEvent.click(closeButton)

    // Check if error message is gone and state is reset
    expect(screen.queryByText(/error:/i)).not.toBeInTheDocument()
    expect(screen.getByText('saved')).toBeInTheDocument()
  })
})