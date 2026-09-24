import { discountedPrice, formatDate, formatPrice } from './format'

describe('formatPrice', () => {
  it('formats rupees with Indian digit grouping', () => {
    expect(formatPrice(129999)).toBe('₹1,29,999')
  })
})

describe('discountedPrice', () => {
  it('applies the discount and rounds to whole rupees', () => {
    expect(discountedPrice(24999, 0.2)).toBe(19999)
  })

  it('returns the full price when there is no discount', () => {
    expect(discountedPrice(5000, 0)).toBe(5000)
  })
})

describe('formatDate', () => {
  it('formats an ISO date without shifting the day across time zones', () => {
    expect(formatDate('2026-12-01')).toBe('1 December 2026')
  })
})
