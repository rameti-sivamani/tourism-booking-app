import type { BookingRequest } from '../../types'

export type BookingErrors = Partial<Record<keyof BookingRequest, string>>

export const MAX_TRAVELLERS = 10

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Indian mobile numbers: 10 digits starting with 6–9.
const PHONE_PATTERN = /^[6-9]\d{9}$/

/** Returns today's date as YYYY-MM-DD in the user's local time zone. */
export function todayIso(now: Date = new Date()): string {
  const offsetMs = now.getTimezoneOffset() * 60_000
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10)
}

export function validateBooking(
  request: BookingRequest,
  today: string = todayIso(),
): BookingErrors {
  const errors: BookingErrors = {}

  if (!request.destinationId) errors.destinationId = 'Choose a destination.'

  if (!request.startDate) errors.startDate = 'Pick a start date.'
  else if (request.startDate < today) errors.startDate = 'The start date cannot be in the past.'

  if (!Number.isInteger(request.travellers) || request.travellers < 1) {
    errors.travellers = 'At least one traveller is required.'
  } else if (request.travellers > MAX_TRAVELLERS) {
    errors.travellers = `Groups are limited to ${MAX_TRAVELLERS} travellers.`
  }

  if (!request.firstName.trim()) errors.firstName = 'Enter your first name.'
  if (!request.lastName.trim()) errors.lastName = 'Enter your last name.'

  if (!EMAIL_PATTERN.test(request.email.trim())) errors.email = 'Enter a valid email address.'
  if (!PHONE_PATTERN.test(request.phone.trim())) {
    errors.phone = 'Enter a 10-digit mobile number starting with 6–9.'
  }

  return errors
}
