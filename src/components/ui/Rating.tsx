import { Icon } from './Icon'
import styles from './Rating.module.css'

export function Rating({ value }: { value: number }) {
  return (
    <span className={styles.rating} role="img" aria-label={`Rated ${value.toFixed(1)} out of 5`}>
      <Icon name="star" size={16} filled className={styles.star} />
      <span aria-hidden="true">{value.toFixed(1)}</span>
    </span>
  )
}
