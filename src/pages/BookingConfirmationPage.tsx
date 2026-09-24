import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ButtonLink } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'
import { Icon } from '../components/ui/Icon'
import { bookingService } from '../features/booking/bookingService'
import { getDestination } from '../features/destinations/data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatDate, formatPrice } from '../lib/format'
import type { Booking } from '../types'
import styles from './BookingConfirmationPage.module.css'
import page from './Page.module.css'

export default function BookingConfirmationPage() {
  useDocumentTitle('Booking confirmed')
  const { reference = '' } = useParams()
  const [booking, setBooking] = useState<Booking | null | undefined>(undefined)

  useEffect(() => {
    let active = true
    bookingService.get(reference).then((found) => active && setBooking(found ?? null))
    return () => {
      active = false
    }
  }, [reference])

  if (booking === undefined)
    return <div className={page.page} role="status" aria-label="Loading booking" />

  if (booking === null) {
    return (
      <div className={`container ${page.page}`}>
        <EmptyState icon="calendar" title="We couldn’t find that booking">
          <p>Bookings are saved in this browser. Check the reference or make a new booking.</p>
          <ButtonLink to="/booking">Book a trip</ButtonLink>
        </EmptyState>
      </div>
    )
  }

  const destination = getDestination(booking.destinationId)

  return (
    <div className={`container ${page.page}`}>
      <div className={styles.card}>
        <span className={styles.check}>
          <Icon name="check" size={32} />
        </span>
        <h1 className={styles.title}>You’re going to {destination?.name}!</h1>
        <p className={styles.lead}>
          Thanks, {booking.firstName}. We’ve received your booking and will contact you by{' '}
          {booking.contactMethod === 'email'
            ? `email at ${booking.email}`
            : `phone on ${booking.phone}`}
          .
        </p>

        <dl className={styles.details}>
          <div>
            <dt>Reference</dt>
            <dd className={styles.reference}>{booking.reference}</dd>
          </div>
          <div>
            <dt>Start date</dt>
            <dd>{formatDate(booking.startDate)}</dd>
          </div>
          <div>
            <dt>Travellers</dt>
            <dd>{booking.travellers}</dd>
          </div>
          <div>
            <dt>Total</dt>
            <dd>{formatPrice(booking.totalPrice)}</dd>
          </div>
        </dl>

        <div className={styles.actions}>
          <ButtonLink to="/destinations" variant="secondary">
            Keep exploring
          </ButtonLink>
          <ButtonLink to="/">Back to home</ButtonLink>
        </div>
      </div>
    </div>
  )
}
