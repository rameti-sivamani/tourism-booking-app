import { Link, useParams } from 'react-router-dom'
import { ButtonLink } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { PriceTag } from '../components/ui/PriceTag'
import { Rating } from '../components/ui/Rating'
import { getDestination } from '../features/destinations/data'
import { WishlistButton } from '../features/wishlist/WishlistButton'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import NotFoundPage from './NotFoundPage'
import styles from './DestinationDetailPage.module.css'
import page from './Page.module.css'

export default function DestinationDetailPage() {
  const { id = '' } = useParams()
  const destination = getDestination(id)
  useDocumentTitle(destination?.name ?? 'Not found')

  if (!destination) return <NotFoundPage />

  return (
    <article className={`container ${page.page}`}>
      <Link to="/destinations" className={page.back}>
        <Icon name="arrowLeft" size={16} /> All destinations
      </Link>

      <div className={styles.layout}>
        <div className={styles.media}>
          <img src={destination.image} alt={destination.name} width={960} height={640} />
          <div className={styles.save}>
            <WishlistButton id={destination.id} name={destination.name} />
          </div>
        </div>

        <div>
          <p className={styles.location}>
            <Icon name="pin" size={16} /> {destination.country} · {destination.region}
          </p>
          <h1>{destination.name}</h1>
          <Rating value={destination.rating} />
          <p className={styles.description}>{destination.description}</p>

          <dl className={styles.facts}>
            <div>
              <dt>
                <Icon name="clock" size={16} /> Duration
              </dt>
              <dd>{destination.durationDays} days</dd>
            </div>
            <div>
              <dt>
                <Icon name="calendar" size={16} /> Best season
              </dt>
              <dd>{destination.bestSeason}</dd>
            </div>
          </dl>

          <h2 className={styles.subheading}>What’s included</h2>
          <ul className={styles.highlights}>
            {destination.highlights.map((highlight) => (
              <li key={highlight}>
                <Icon name="check" size={16} /> {highlight}
              </li>
            ))}
          </ul>

          <div className={styles.book}>
            <div>
              <PriceTag price={destination.price} discount={destination.discount} unit="person" />
            </div>
            <ButtonLink to={`/booking?destination=${destination.id}`} size="lg">
              Book this trip
            </ButtonLink>
          </div>
        </div>
      </div>
    </article>
  )
}
