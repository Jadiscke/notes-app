import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ListNotes from '../index'

// Mock the DeleteNoteButton component
vi.mock('@/components/DeleteNoteButton', () => ({
  default: ({ note_id }: { note_id: string }) => {
    return <button data-testid={`delete-${note_id}`}>Delete</button>
  }
}))

describe('ListNotes', () => {
  const mockNotes = [
    {
      id: '1',
      content: 'Test note content',
      created_at: '2023-12-25T14:30:00',
      updated_at: '2023-12-25T14:30:00',
      user_id: 'user1'
    }
  ]

  it('should render notes when provided', () => {
    render(<ListNotes notes={mockNotes} />)
    
    // Check if date is rendered correctly
    expect(screen.getByText('2023-12-25 14:30')).toBeInTheDocument()
    
    // Check if edit link exists using the SVG role
    const editLinks = screen.getAllByRole('link')
    expect(editLinks[0]).toHaveAttribute('href', '/notes/1/edit')
  })

  it('should render empty state when no notes are provided', () => {
    render(<ListNotes notes={[]} />)
    const emptyDiv = screen.getByTestId('empty-state')
    expect(emptyDiv).toBeInTheDocument()
  })

  it('should render multiple notes', () => {
    const multipleNotes = [
      ...mockNotes,
      {
        id: '2',
        content: 'Second note',
        created_at: '2023-12-26T15:30:00',
        updated_at: '2023-12-26T15:30:00',
        user_id: 'user1'
      }
    ]
    
    render(<ListNotes notes={multipleNotes} />)
    const editLinks = screen.getAllByRole('link')
    expect(editLinks).toHaveLength(2)
  })
})