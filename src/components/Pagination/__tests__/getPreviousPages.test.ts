import { describe, it, expect } from 'vitest'
import { getPreviousPages } from '../utils'

describe('getPreviousPages', () => {
  it('should return empty array when actual page is 1', () => {
    const result = getPreviousPages(1)
    expect(result).toEqual([])
  })

  it('should return one previous page when actual page is 2', () => {
    const result = getPreviousPages(2)
    expect(result).toEqual([1])
  })

  it('should return two previous pages when actual page is 3', () => {
    const result = getPreviousPages(3)
    expect(result).toEqual([1, 2])
  })

  it('should return maximum three previous pages when actual page is greater than 4', () => {
    const result = getPreviousPages(5)
    expect(result).toEqual([2, 3, 4])
  })

  it('should return pages in ascending order', () => {
    const result = getPreviousPages(4)
    expect(result).toEqual([1, 2, 3])
    // Verify the order is ascending
    expect(result[0]).toBeLessThan(result[1])
    expect(result[1]).toBeLessThan(result[2])
  })
})