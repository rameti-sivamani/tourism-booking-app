import { useSearchParams } from 'react-router-dom'
import { SectionHeading } from '../components/ui/SectionHeading'
import { BookingForm } from '../features/booking/BookingForm'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import page from './Page.module.css'

export default function BookingPage() {
  useDocumentTitle('Book a trip')
  const [params] = useSearchParams()
  return (
    <div className={`container ${page.page}`}>
      <SectionHeading
        as="h1"
        eyebrow="Booking"
        title="Plan your trip"
        description="“We travel not to escape life, but for life not to escape us.” Tell us a little about your trip and we will take care of the rest."
      />
      <BookingForm initialDestinationId={params.get('destination') ?? ''} />
    </div>
  )
}
