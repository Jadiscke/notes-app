import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Pagination from '../index'

// Mock next/navigation
const mockPush = vi.fn()
const mockSearchParams = vi.hoisted(() => new URLSearchParams())
const mockPathname = '/notes'

vi.mock('next/navigation', () => ({
  useSearchParams: () => mockSearchParams,
  usePathname: () => mockPathname,
  useRouter: () => ({
    push: mockPush
  })
}))

describe('Pagination', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })


  describe('Pagination component', () => {
    it('should render current page', () => {
      mockSearchParams.set('page', '1')
      render(<Pagination totalPages={5} />)
      expect(screen.getByText('1')).toBeInTheDocument()
    })

    it('should show next pages when available', () => {
      mockSearchParams.set('page', '1')
      render(<Pagination totalPages={5} />)
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
      expect(screen.getByText('4')).toBeInTheDocument()
    })

    it('should show previous pages when available', () => {
      mockSearchParams.set('page', '5')
      render(<Pagination totalPages={5} />)
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
      expect(screen.getByText('4')).toBeInTheDocument()
    })

    it('should redirect to page 1 when no page param exists', () => {
      mockSearchParams.delete('page')
      render(<Pagination totalPages={5} />)
      expect(mockPush).toHaveBeenCalledWith('/notes?page=1')
    })
  })
})