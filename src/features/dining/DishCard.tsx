import { Icon } from '../../components/ui/Icon'
import { Rating } from '../../components/ui/Rating'
import { formatPrice } from '../../lib/format'
import type { Dish } from '../../types'
import styles from './DishCard.module.css'

export function DishCard({ dish }: { dish: Dish }) {
  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <span className={`${styles.diet} ${dish.vegetarian ? styles.veg : styles.nonVeg}`}>
          <span className={styles.dot} aria-hidden="true" />
          {dish.vegetarian ? 'Veg' : 'Non-veg'}
        </span>
        <Rating value={dish.rating} />
      </div>
      <h3>{dish.name}</h3>
      <p className={styles.cuisine}>
        <Icon name="utensils" size={14} /> {dish.cuisine}
      </p>
      <p className={styles.description}>{dish.description}</p>
      <p className={styles.price}>{formatPrice(dish.price)}</p>
    </article>
  )
}
