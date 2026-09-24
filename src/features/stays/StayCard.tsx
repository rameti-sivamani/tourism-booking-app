import { Icon } from '../../components/ui/Icon'
import { PriceTag } from '../../components/ui/PriceTag'
import { Rating } from '../../components/ui/Rating'
import type { Stay } from '../../types'
import styles from './StayCard.module.css'

const typeTone: Record<Stay['type'], string> = {
  Hotel: styles.hotel,
  Resort: styles.resort,
  Homestay: styles.homestay,
}

export function StayCard({ stay }: { stay: Stay }) {
  return (
    <article className={styles.card}>
      <div className={`${styles.banner} ${typeTone[stay.type]}`}>
        <Icon name="bed" size={28} />
        <span className={styles.type}>{stay.type}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.city}>
            <Icon name="pin" size={14} /> {stay.city}
          </span>
          <Rating value={stay.rating} />
        </div>
        <h3>{stay.name}</h3>
        <ul className={styles.amenities} aria-label="Amenities">
          {stay.amenities.map((amenity) => (
            <li key={amenity}>
              <Icon name="check" size={14} /> {amenity}
            </li>
          ))}
        </ul>
        <PriceTag price={stay.pricePerNight} unit="night" />
      </div>
    </article>
  )
}
