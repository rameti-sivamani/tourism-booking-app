import type { BookingRequest } from '../../types'
import { bookingService } from './bookingService'

const request: BookingRequest = {
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

beforeEach(() => localStorage.clear())

describe('bookingService', () => {
  it('creates a booking with a reference and the discounted total', async () => {
    const booking = await bookingService.create(request)
    expect(booking.reference).toMatch(/^TRV-[0-9A-F]{8}$/)
    // Taj Mahal: ₹24,999 with 20% off = ₹19,999 per person.
    expect(booking.totalPrice).toBe(19999 * 2)
  })

  it('persists bookings newest first and finds them by reference', async () => {
    const first = await bookingService.create(request)
    const second = await bookingService.create({ ...request, travellers: 1 })
    const all = await bookingService.list()
    expect(all.map((b) => b.reference)).toEqual([second.reference, first.reference])
    expect(await bookingService.get(first.reference)).toEqual(first)
  })

  it('rejects unknown destinations', async () => {
    await expect(bookingService.create({ ...request, destinationId: 'atlantis' })).rejects.toThrow(
      'Unknown destination',
    )
  })

  it('recovers from corrupted storage', async () => {
    localStorage.setItem('tourism.bookings', '{not json')
    expect(await bookingService.list()).toEqual([])
  })
})
