import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SearchBar from '../index'
import userEvent from '@testing-library/user-event'

// Mock debounce function
vi.mock('@/lib/utils', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  debounce: (fn: Function) => fn
}))

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

describe('SearchBar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockSearchParams.delete('search')
    mockSearchParams.delete('page')
  })

  it('renders search input', () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText('Search')
    expect(input).toBeInTheDocument()
  })

  it('initializes with empty search if no search param exists', () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText('Search') as HTMLInputElement
    expect(input.value).toBe('')
  })

  it('initializes with existing search param value', () => {
    mockSearchParams.set('search', 'test query')
    render(<SearchBar />)
    const input = screen.getByPlaceholderText('Search') as HTMLInputElement
    expect(input.value).toBe('test query')
  })

  it('updates search value on input change', async () => {
    const user = userEvent.setup()
    render(<SearchBar />)
    const input = screen.getByPlaceholderText('Search')
    
    await user.type(input, 'test')
    
    expect(mockPush).toHaveBeenCalledWith('/notes?page=1&search=test')
  })

  it('resets page to 1 when searching', async () => {
    const user = userEvent.setup()
    mockSearchParams.set('page', '5')
    render(<SearchBar />)
    
    const input = screen.getByPlaceholderText('Search')
    await user.type(input, 'test')
    
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('page=1'))
  })

  it('preserves other query parameters when searching', async () => {
    const user = userEvent.setup()
    mockSearchParams.set('filter', 'active')
    render(<SearchBar />)
    
    const input = screen.getByPlaceholderText('Search')
    await user.type(input, 'test')
    
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('filter=active'))
  })

  it('updates search value when searchParams is set', async () => {
    // Set up initial search params
    mockSearchParams.set('search', 'new search')
    
    // Initial render with the search param already set
    render(<SearchBar />)
    
    // Check if the input value is updated
    const input = screen.getByPlaceholderText('Search') as HTMLInputElement
    expect(input.value).toBe('new search')
  })
})