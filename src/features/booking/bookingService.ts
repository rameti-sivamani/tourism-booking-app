import { discountedPrice } from '../../lib/format'
import { readJson, writeJson } from '../../lib/storage'
import type { Booking, BookingRequest } from '../../types'
import { getDestination } from '../destinations/data'

const STORAGE_KEY = 'tourism.bookings'

/**
 * The booking API. It is async so the localStorage implementation can be
 * swapped for real HTTP calls to a backend without changing any component.
 */
export const bookingService = {
  async create(request: BookingRequest): Promise<Booking> {
    const destination = getDestination(request.destinationId)
    if (!destination) throw new Error(`Unknown destination: ${request.destinationId}`)

    const booking: Booking = {
      ...request,
      reference: createReference(),
      createdAt: new Date().toISOString(),
      totalPrice: discountedPrice(destination.price, destination.discount) * request.travellers,
    }
    writeJson(STORAGE_KEY, [booking, ...(await this.list())])
    return booking
  },

  async list(): Promise<Booking[]> {
    return readJson<Booking[]>(STORAGE_KEY, [])
  },

  async get(reference: string): Promise<Booking | undefined> {
    return (await this.list()).find((booking) => booking.reference === reference)
  },
}

function createReference(): string {
  return `TRV-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
}
