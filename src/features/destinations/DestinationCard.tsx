import { Link } from 'react-router-dom'
import { Icon } from '../../components/ui/Icon'
import { PriceTag } from '../../components/ui/PriceTag'
import { Rating } from '../../components/ui/Rating'
import type { Destination } from '../../types'
import { WishlistButton } from '../wishlist/WishlistButton'
import styles from './DestinationCard.module.css'

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <img
          src={destination.image}
          alt={destination.name}
          loading="lazy"
          width={480}
          height={320}
        />
        <span className={styles.region}>{destination.region}</span>
        <div className={styles.save}>
          <WishlistButton id={destination.id} name={destination.name} />
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.location}>
            <Icon name="pin" size={14} /> {destination.country}
          </span>
          <Rating value={destination.rating} />
        </div>
        <h3 className={styles.title}>
          <Link to={`/destinations/${destination.id}`} className={styles.link}>
            {destination.name}
          </Link>
        </h3>
        <p className={styles.summary}>{destination.summary}</p>
        <div className={styles.footer}>
          <PriceTag price={destination.price} discount={destination.discount} />
          <span className={styles.duration}>
            <Icon name="clock" size={14} /> {destination.durationDays} days
          </span>
        </div>
      </div>
    </article>
  )
}
