import { ButtonLink } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'
import { SectionHeading } from '../components/ui/SectionHeading'
import { DestinationGrid } from '../features/destinations/DestinationGrid'
import { destinations } from '../features/destinations/data'
import { useWishlist } from '../features/wishlist/useWishlist'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import page from './Page.module.css'

export default function WishlistPage() {
  useDocumentTitle('Wishlist')
  const { ids } = useWishlist()
  const saved = destinations.filter((destination) => ids.includes(destination.id))

  return (
    <div className={`container ${page.page}`}>
      <SectionHeading as="h1" eyebrow="Wishlist" title="Your saved destinations" />
      {saved.length > 0 ? (
        <DestinationGrid destinations={saved} />
      ) : (
        <EmptyState icon="heart" title="Nothing saved yet">
          <p>Tap the heart on any destination to keep it here for later.</p>
          <ButtonLink to="/destinations">Browse destinations</ButtonLink>
        </EmptyState>
      )}
    </div>
  )
}
