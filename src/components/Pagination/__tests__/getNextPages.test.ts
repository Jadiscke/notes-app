import { describe, it, expect } from 'vitest'
import { getNextPages } from '../utils'

describe('getNextPages', () => {
  it('should return empty array when actualPage equals totalPages', () => {
    console.log(getNextPages)
    const result = getNextPages(5, 5)
    expect(result).toEqual([])
  })

  it('should return next 3 pages when there are more than 3 pages ahead', () => {
    const result = getNextPages(10, 1)
    expect(result).toEqual([2, 3, 4])
  })

  it('should return remaining pages when less than 3 pages ahead', () => {
    const result = getNextPages(5, 3)
    expect(result).toEqual([4, 5])
  })

  it('should return empty array when actualPage is greater than totalPages', () => {
    const result = getNextPages(3, 4)
    expect(result).toEqual([])
  })

  it('should handle negative actualPage', () => {
    const result = getNextPages(5, -1)
    expect(result).toEqual([0, 1, 2])
  })

  it('should handle zero totalPages', () => {
    const result = getNextPages(0, 1)
    expect(result).toEqual([])
  })
})