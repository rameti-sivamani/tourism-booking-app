import type { BookingRequest } from '../../types'
import { todayIso, validateBooking } from './validation'

const TODAY = '2026-09-24'

const valid: BookingRequest = {
  destinationId: 'taj-mahal',
  startDate: '2026-10-10',
  travellers: 2,
  firstName: 'Asha',
  lastName: 'Rao',
  email: 'asha@example.com',
  phone: '9876543210',
  contactMethod: 'email',
  contactTime: 'any',
  notes: '',
}

describe('validateBooking', () => {
  it('accepts a complete, valid request', () => {
    expect(validateBooking(valid, TODAY)).toEqual({})
  })

  it('requires every mandatory field', () => {
    const errors = validateBooking(
      {
        ...valid,
        destinationId: '',
        startDate: '',
        firstName: ' ',
        lastName: '',
        email: '',
        phone: '',
      },
      TODAY,
    )
    expect(Object.keys(errors).sort()).toEqual(
      ['destinationId', 'email', 'firstName', 'lastName', 'phone', 'startDate'].sort(),
    )
  })

  it('rejects start dates in the past but allows today', () => {
    expect(validateBooking({ ...valid, startDate: '2026-09-23' }, TODAY).startDate).toBeDefined()
    expect(validateBooking({ ...valid, startDate: TODAY }, TODAY).startDate).toBeUndefined()
  })

  it.each([0, -1, 1.5, 11])('rejects %s travellers', (travellers) => {
    expect(validateBooking({ ...valid, travellers }, TODAY).travellers).toBeDefined()
  })

  it.each(['12345', '5876543210', '98765432100', '98765abcde'])('rejects phone %s', (phone) => {
    expect(validateBooking({ ...valid, phone }, TODAY).phone).toBeDefined()
  })

  it('rejects malformed email addresses', () => {
    expect(validateBooking({ ...valid, email: 'asha@' }, TODAY).email).toBeDefined()
  })
})

describe('todayIso', () => {
  it('returns a YYYY-MM-DD string', () => {
    expect(todayIso(new Date(2026, 0, 5, 23, 30))).toBe('2026-01-05')
  })
})
