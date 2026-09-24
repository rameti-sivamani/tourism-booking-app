import { useId, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { discountedPrice, formatPrice } from '../../lib/format'
import type { BookingRequest, ContactTime } from '../../types'
import { destinations, getDestination } from '../destinations/data'
import { bookingService } from './bookingService'
import styles from './BookingForm.module.css'
import { MAX_TRAVELLERS, todayIso, validateBooking, type BookingErrors } from './validation'

const CONTACT_TIMES: Array<{ value: ContactTime; label: string }> = [
  { value: 'morning', label: 'Morning (8:30–11:45)' },
  { value: 'afternoon', label: 'Afternoon (12:30–15:30)' },
  { value: 'evening', label: 'Evening (16:00–20:30)' },
  { value: 'any', label: 'Any time' },
]

function emptyRequest(destinationId: string): BookingRequest {
  return {
    destinationId,
    startDate: '',
    travellers: 2,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    contactMethod: 'email',
    contactTime: 'any',
    notes: '',
  }
}

export function BookingForm({ initialDestinationId = '' }: { initialDestinationId?: string }) {
  const navigate = useNavigate()
  const [values, setValues] = useState(() =>
    emptyRequest(getDestination(initialDestinationId) ? initialDestinationId : ''),
  )
  const [errors, setErrors] = useState<BookingErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const destination = getDestination(values.destinationId)
  const perPerson = destination ? discountedPrice(destination.price, destination.discount) : 0

  function update(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    const key = name as keyof BookingRequest
    setValues((current) => ({ ...current, [key]: key === 'travellers' ? Number(value) : value }))
    // Clear a field's error as soon as the user edits it.
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const found = validateBooking(values)
    setErrors(found)
    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    setSubmitting(true)
    setSubmitError('')
    try {
      const booking = await bookingService.create(values)
      navigate(`/booking/${booking.reference}`)
    } catch {
      setSubmitError('Something went wrong while saving your booking. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.fields}>
        <fieldset className={styles.section}>
          <legend>Trip details</legend>
          <Field label="Destination" name="destinationId" error={errors.destinationId} wide>
            {(props) => (
              <select {...props} value={values.destinationId} onChange={update}>
                <option value="">Select a destination</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}, {d.country}
                  </option>
                ))}
              </select>
            )}
          </Field>
          <Field label="Start date" name="startDate" error={errors.startDate}>
            {(props) => (
              <input
                {...props}
                type="date"
                min={todayIso()}
                value={values.startDate}
                onChange={update}
              />
            )}
          </Field>
          <Field label="Travellers" name="travellers" error={errors.travellers}>
            {(props) => (
              <input
                {...props}
                type="number"
                min={1}
                max={MAX_TRAVELLERS}
                value={values.travellers}
                onChange={update}
              />
            )}
          </Field>
        </fieldset>

        <fieldset className={styles.section}>
          <legend>Your details</legend>
          <Field label="First name" name="firstName" error={errors.firstName}>
            {(props) => (
              <input
                {...props}
                autoComplete="given-name"
                value={values.firstName}
                onChange={update}
              />
            )}
          </Field>
          <Field label="Last name" name="lastName" error={errors.lastName}>
            {(props) => (
              <input
                {...props}
                autoComplete="family-name"
                value={values.lastName}
                onChange={update}
              />
            )}
          </Field>
          <Field label="Email address" name="email" error={errors.email}>
            {(props) => (
              <input
                {...props}
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={update}
              />
            )}
          </Field>
          <Field label="Mobile number" name="phone" error={errors.phone}>
            {(props) => (
              <input
                {...props}
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="98765 43210"
                value={values.phone}
                onChange={update}
              />
            )}
          </Field>
        </fieldset>

        <fieldset className={styles.section}>
          <legend>How should we reach you?</legend>
          <div className={styles.choices} role="radiogroup" aria-label="Preferred contact method">
            {(['email', 'phone'] as const).map((method) => (
              <label key={method} className={styles.choice}>
                <input
                  type="radio"
                  name="contactMethod"
                  value={method}
                  checked={values.contactMethod === method}
                  onChange={update}
                />
                {method === 'email' ? 'Email' : 'Phone call'}
              </label>
            ))}
          </div>
          <Field label="Best time to contact" name="contactTime" wide>
            {(props) => (
              <select {...props} value={values.contactTime} onChange={update}>
                {CONTACT_TIMES.map((time) => (
                  <option key={time.value} value={time.value}>
                    {time.label}
                  </option>
                ))}
              </select>
            )}
          </Field>
          <Field label="Anything we should know? (optional)" name="notes" wide>
            {(props) => <textarea {...props} rows={3} value={values.notes} onChange={update} />}
          </Field>
        </fieldset>
      </div>

      <aside className={styles.summary} aria-label="Price summary">
        <h2 className={styles.summaryTitle}>Your trip</h2>
        {destination ? (
          <>
            <img src={destination.image} alt="" className={styles.summaryImage} />
            <p className={styles.summaryName}>{destination.name}</p>
            <dl className={styles.breakdown}>
              <div>
                <dt>Price per person</dt>
                <dd>{formatPrice(perPerson)}</dd>
              </div>
              <div>
                <dt>Travellers</dt>
                <dd>× {values.travellers || 0}</dd>
              </div>
              <div className={styles.total}>
                <dt>Total</dt>
                <dd>{formatPrice(perPerson * (values.travellers || 0))}</dd>
              </div>
            </dl>
          </>
        ) : (
          <p className={styles.muted}>Choose a destination to see your price.</p>
        )}
        {submitError && (
          <p className={styles.submitError} role="alert">
            {submitError}
          </p>
        )}
        <Button type="submit" size="lg" disabled={submitting} className={styles.submit}>
          {submitting ? 'Booking…' : 'Confirm booking'}
        </Button>
        <p className={styles.muted}>Free cancellation up to 7 days before departure.</p>
      </aside>
    </form>
  )
}

interface FieldControlProps {
  id: string
  name: string
  'aria-invalid': boolean
  'aria-describedby': string | undefined
}

interface FieldProps {
  label: string
  name: keyof BookingRequest
  error?: string
  wide?: boolean
  children: (props: FieldControlProps) => ReactNode
}

function Field({ label, name, error, wide, children }: FieldProps) {
  const id = useId()
  const errorId = `${id}-error`
  return (
    <div className={`${styles.field} ${wide ? styles.wide : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children({
        id,
        name,
        'aria-invalid': Boolean(error),
        'aria-describedby': error ? errorId : undefined,
      })}
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  )
}
