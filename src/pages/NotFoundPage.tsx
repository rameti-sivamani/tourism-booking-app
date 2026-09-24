import { ButtonLink } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import page from './Page.module.css'

export default function NotFoundPage() {
  useDocumentTitle('Page not found')
  return (
    <div className={`container ${page.page}`}>
      <EmptyState icon="compass" title="Looks like you’re off the map">
        <p>The page you’re looking for doesn’t exist or has moved.</p>
        <ButtonLink to="/">Back to home</ButtonLink>
      </EmptyState>
    </div>
  )
}
